<template>
	<div>
		<div class="max-w-6xl px-4 mx-auto space-y-4 text-center md:space-y-0 md:flex md:px-0 md:space-x-6">
			<!-- <div>{{isDateSeasonalDate}}</div> -->
			<div class="flex-1 border divide-y">
				<div v-for="[index, option] of selectedDayPassOptions.entries()" :key="option.id" class="mx-auto">
					<div class="flex items-center justify-between px-6 py-4 space-x-8">
						<div class="flex flex-col items-start">
							<div>{{ option.name }}</div>
							<div v-if="option.description" class="my-2 text-sm text-left">{{option.description}}</div>
							<div>{{ currency(optionPrice(option)) }}</div>
							<!-- <div>{{option.quantity}}</div> -->
						</div>
						<div class="flex h-10 item-center">
							<div class="flex items-center h-full px-4 font-semibold border cursor-pointer text-md" @click="decreaseQuantity(option)">-</div>
							<input type="text" class="w-12 h-full" v-model="option.quantity" />
							<div class="flex items-center h-full px-4 font-semibold border cursor-pointer text-md" @click="increaseQuantity(option)">+</div>
						</div>
					</div>
				</div>
			</div>
			<ReservationBox showDiscount />
		</div>
		<div class="w-32 mx-auto mt-6 space-x-3" v-if="canGoToNext">
			<!-- <MainButton outline>Back</MainButton> -->
			<MainButton @click="goToNext()">Next</MainButton>
		</div>
		<div class="flex items-center w-full my-6 space-x-2">
			<StartOverButton class="w-full" isDayPassBooking></StartOverButton>
		</div>
	</div>
</template>

<script>
import ReservationBox from '@/components/daypass/DayPassReservationBox.vue';
import { mapGetters } from 'vuex';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import moment from 'moment';



export default {
	layout: 'day-pass',

	components: { ReservationBox },
	data() {
		return {
			selectedDayPassOptions: [],
		};
	},
	computed: {
		...mapGetters({
			noDiscountDates: 'noDiscountDates',
		}),
		isDateSeasonalDate() {
			const isDateAvailable = this.noDiscountDates.filter(d => {
				const bookingDateParsed = parseISO(this.bookingDate);
                const dDate = parseISO(d);
				return format(bookingDateParsed, 'yyyy-MM-dd') === format(dDate, 'yyyy-MM-dd');
			});

			return isDateAvailable.length;
		},
		bookingDate() {
			return this.$store.getters['day_pass/bookingDate'];
		},
		dayPassOptions() {
			return this.$store.state.day_pass.day_pass_options;
		},
		canGoToNext() {
			const isAtLeastOneOptionSelected = this.selectedDayPassOptions.filter(option => option.quantity > 0).length;
			return isAtLeastOneOptionSelected;
		},
		selectedOptionType() {
			return this.$store.state.day_pass.option_type;
		},
		guestsNumber() {
			return this.$store.getters['day_pass/noGuests'];
		},
	},
	methods: {
		optionPrice(option) {

			let type = this.isDateSeasonalDate ? 'seasonal' : (this.selectedOptionType === 'weekend' ? 'weekend' : 'weekday');

			let price = option[type+'_price'] || 0;

			let booking_date = moment(this.$store.state.day_pass.booking_date).utcOffset(0, false).add(11.5, 'hours');
			let current_date = moment().utcOffset(0, true);

			let diff = current_date.diff(booking_date, 'seconds');

			// console.log('booking_date, current_date, diff', booking_date.format('YYYY-MM-DD HH:mm:ss'), current_date.format('YYYY-MM-DD HH:mm:ss'), diff)

			if(diff >= 0) {
				price = option.urgent_charges > 0 ? price + (price * option.urgent_charges / 100) : price;
			}

			return price;

			/* if(this.isDateSeasonalDate) return option.seasonal_price;
			if (this.selectedOptionType === 'weekend') return option.weekend_price;
			return option.weekday_price; */
		},
		goToNext() {
			// if (!this.canGoToNext) return;
			let optionQuantitySelected = 0;
			this.selectedDayPassOptions.forEach(option => (optionQuantitySelected += option.quantity));
			if (optionQuantitySelected < this.guestsNumber) {
				this.$toast.info('Quantity selected is less than guests selected!');
				return;
			}
			if (optionQuantitySelected > this.guestsNumber) {
				this.$toast.info('Quantity selected is more than guests selected!');
				return;
			}
			this.updateStores();
			this.$store.commit('day_pass/COMPLETE_OPTIONS');
			this.$router.push({ path: '/day-pass-extras' });
		},
		currency(num) {
			//console.log(num);
			return '₦' + num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		increaseQuantity(option) {
			option.quantity++;
			this.updateStores();
			this.updateFromStore();
		},
		decreaseQuantity(option) {
			if(option.quantity !== 0) {
				option.quantity--;
			}
			this.updateStores();
			this.updateFromStore();
		},
		updateStores() {
			this.$store.commit('day_pass/UPDATE_SELECTED_OPTIONS', this.selectedDayPassOptions);
		},
		updateFromStore() {
			this.selectedDayPassOptions = structuredClone(this.$store.state.day_pass.selected_options);
		},
	},
	mounted() {
		if (this.$store.state.day_pass.selected_options.length) {
			this.updateFromStore();
			return;
		}
		const newDayPassOptions = this.dayPassOptions.map(option => {
			//console.log(option);
			return { ...option, seasonal_price: option.seasonal_price, quantity: 0 };
		});

		// //console.log(this.dayPassOptions);
		this.selectedOptionType = this.$store.state.day_pass.option_type;
		this.selectedDayPassOptions = newDayPassOptions;
	},
	middleware({ store, redirect, $toast }) {
		if (!store.state.day_pass.availability_done) {
			// $toast.info("Please accept all policies first");
			redirect('/day-pass-availability');
		}
	},
};
</script>
