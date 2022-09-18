<template>
	<div>
		<div class="flex max-w-6xl mx-auto space-x-6 text-center">
			<div class="flex-1 border divide-y">
				<div v-for="option in selectedDayPassOptions" :key="option.id" class="mx-auto">
					<div class="flex items-center justify-between px-6 py-4 space-x-8">
						<div class="flex flex-col items-start">
							<div>{{ option.name }}</div>
							<div>{{ currency(optionPrice(option)) }}</div>
						</div>
						<div class="flex h-10 item-center"> 
							<div class="flex items-center h-full px-4 font-semibold border cursor-pointer text-md" @click="decreaseQuantity(option)">-</div>
							<input type="text" class="w-12 h-full" v-model="option.quantity" />
							<div class="flex items-center h-full px-4 font-semibold border cursor-pointer text-md" @click="increaseQuantity(option)">+</div>
						</div>
					</div>
				</div>
			</div>
			<ReservationBox showDiscount/>
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
import ReservationBox from '@/components/daypass/DayPassReservationBox.vue'
export default {
	layout: 'day-pass',
	components: {ReservationBox},
	data() {
		return {
			selectedDayPassOptions: [],
		};
	},
	computed: {
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
			if (this.selectedOptionType === 'weekend') return option.weekend_price;
			return option.weekday_price;
		},
		goToNext() {
			// if (!this.canGoToNext) return;
			let optionQuantitySelected = 0;
			this.selectedDayPassOptions.forEach(option => optionQuantitySelected += option.quantity)
			if(optionQuantitySelected < this.guestsNumber){
				this.$toast.info('Quantity selected is less than guests selected!')
				return;
			}
			if(optionQuantitySelected > this.guestsNumber){
				this.$toast.info('Quantity selected is more than guests selected!')
				return;
			}
			this.updateStores();
			this.$store.commit('day_pass/COMPLETE_OPTIONS');
			this.$router.push({ path: '/day-pass-extras' });
		},
		currency(num) {
			return '₦' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		increaseQuantity(option) {
			option.quantity++;
		},
		decreaseQuantity(option) {
			if (option.quantity === 0) return;
			option.quantity--;
		},
		updateStores() {
			this.$store.commit('day_pass/UPDATE_SELECTED_OPTIONS', this.selectedDayPassOptions);
		},
		updateFromStore() {
			this.selectedDayPassOptions = this.$store.state.day_pass.selected_options;
		},
	},
	mounted() {
		if (this.$store.state.day_pass.selected_options.length) {
			this.updateFromStore();
			return;
		}
		const newDayPassOptions = this.dayPassOptions.map(option => {
			return { ...option, quantity: 0 };
		});
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
