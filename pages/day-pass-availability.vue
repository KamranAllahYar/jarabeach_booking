<template>
	<div class="max-w-4xl px-4 mx-auto md:px-0">
		<div class="items-center justify-between mb-4 space-y-2 md:flex md:space-y-0">
			<div class="font-bold text-md md:text-lg">Are you booking on a weekday (MON-THUR), weekend (FRI-SUN) or Seasonal?</div>
			<div>More about seasonal <a href="https://www.jarabeachresort.com/day-pass" class="font-bold" target="_blank">here</a></div>
		</div>
		<div class="flex flex-col items-start justify-between md:mt-0 md:items-center md:flex-row">
			<div class="mb-2 font-semibold md:hidden">Select your option</div>
			<select name="option_type" id="option_type" v-model="option_type" class="order-last block border rounded-md outline-none md:order-first focus:outline-none" style="box-shadow: none">
				<option value="weekend">Weekend</option>
				<option value="weekday">Weekday</option>
				<option value="seasonal">Seasonal</option>
			</select>
			<div class="items-center order-first space-y-2 md:space-y-0 md:space-x-4 md:order-last md:flex">
				<div class="font-semibold">Check Seasonal Dates here</div>
				<select name="option_type" id="option_type" class="block border rounded-md outline-none focus:outline-none" style="box-shadow: none">
					<option value="weekend" v-for="(date, index) in noDiscountDates" :key="index">{{dropdownDate(date)}}</option>
				</select>
			</div>
		</div>
		<div class="mt-6">
			<vc-calendar :min-date="new Date().toISOString().split('T')[0]" @dayclick="onDayClick" :attributes="attributes" v-if="option_type === 'seasonal'"/>
			<vc-calendar :min-date="new Date().toISOString().split('T')[0]" @dayclick="onDayClick" :attributes="attributes" :disabled-dates="disabledDates" v-else/>
		</div>
		<div class="w-32 mt-6 space-x-3" v-if="canGoToNext">
			<!-- <MainButton outline>Back</MainButton> -->
			<MainButton @click="goToNext()">Next</MainButton>
		</div>
		<div class="flex items-center w-full my-6 space-x-2">
			<StartOverButton class="w-full" isDayPassBooking></StartOverButton>
		</div>
	</div>
</template>
<script>
import isBefore from 'date-fns/isBefore';
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
	layout: 'day-pass',
	data() {
		return {
			option_type: 'weekend',
			date: null,
		};
	},
	mounted() {
		this.updateFromStore();
	},
	watch: {
		option_type(newValue) {
			if (newValue !== this.$store.state.day_pass.option_type) {
				this.date = null;
			}
		},
	},
	methods: {
		dropdownDate(date){
			return moment(date).format('MMMM Do YYYY')
		},
		onDayClick(day) {
			let daySelected = new Date(day.id).toISOString();
			daySelected = daySelected.split('T')[0];

			let today = new Date().toISOString();
			today = today.split('T')[0];

			if (isBefore(new Date(daySelected), new Date(today))) {
				this.$toast.info('You cant select a day in the past!', { duration: 5000 });
				return;
			}
			const dayOfTheWeek = new Date(day.id).getDay();
			console.log(dayOfTheWeek);
			if (this.option_type === 'weekday' && (dayOfTheWeek > 4 || dayOfTheWeek === 0)) {
				this.$toast.info('Please select a weekday from monday - thursday', { duration: 5000 });
				return;
			}
			if (this.option_type === 'weekend' && dayOfTheWeek !== 5 && dayOfTheWeek !== 6 && dayOfTheWeek !== 0) {
				this.$toast.info('Please select a weekend from friday - sunday', { duration: 5000 });
				return;
			}
			console.log(moment(this.noDiscountDates[19]).format('DD/MM/YYYY'), moment(day.id).format('DD/MM/YYYY'))
			let isSeasonalDate = false;
			this.noDiscountDates.forEach(d => {
				if(moment(d).format('DD/MM/YYYY') === moment(day.id).format('DD/MM/YYYY')){
					isSeasonalDate = true;
				}
			})
			if(this.option_type === 'seasonal' && !isSeasonalDate){
				this.$toast.error('That is not a seasonal date, please see seasonal dates in the dropdown!', { duration: 5000 });
				return;
			}
			this.date = new Date(day.id).toISOString();
		},
		goToNext() {
			if (this.date === null) {
				this.$toast.info('Please select a date', { duration: 5000 });
				return;
			}
			let daySelected = new Date(this.date).toISOString();
			daySelected = daySelected.split('T')[0];

			let today = new Date().toISOString();
			today = today.split('T')[0];
			if (isBefore(new Date(daySelected), new Date(today))) {
				this.$toast.info('You cant select a day in the past!', { duration: 5000 });
				return;
			}
			if (this.canGoToNext) {
				this.updateStores();
				this.$store.commit('day_pass/COMPLETE_AVAILABILITY');
				this.$router.push({ path: '/day-pass-options' });
			}
		},
		updateStores() {
			this.$store.commit('day_pass/UPDATE_AVAILABILITY', {
				option_type: this.option_type,
				booking_date: this.date,
			});
		},
		updateFromStore() {
			this.option_type = this.$store.state.day_pass.option_type;
			this.date = this.$store.state.day_pass.booking_date;
		},
	},
	computed: {
		...mapGetters({
			noDiscountDates: 'noDiscountDates',
		}),
		isDateSeasonalDate() {
			const isDateAvailable = this.noDiscountDates.filter(d => {
				return moment(this.bookingDate).format('DD/MM/YYYY') === moment(d).format('DD/MM/YYYY');
			});

			return isDateAvailable.length;
		},
		disabledDates() {
			if (this.option_type === 'weekday') return { weekdays: [1, 6, 7] };
			return { weekdays: [2, 3, 4, 5] };
		},
		canGoToNext() {
			return (this.option_type === 'weekday' || this.option_type === 'weekend' || this.option_type === 'seasonal') && this.date !== null;
		},
		attributes() {
			return [
				{
					highlight: true,
					dates: this.date,
				},
			];
		},
	},
	middleware({ store, redirect, $toast }) {
		if (!store.state.day_pass.guests_done) {
			// $toast.info("Please accept all policies first");
			redirect('/day-pass');
		}
	},
};
</script>
