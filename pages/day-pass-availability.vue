<template>
	<div class="max-w-4xl mx-auto">
		<div class="text-lg font-bold">Are you booking on a weekday or weekend?</div>
		<select name="option_type" id="option_type" v-model="option_type" class="block mt-4 border rounded-md outline-none focus:outline-none" style="box-shadow: none">
			<option value="weekend">Weekend</option>
			<option value="weekday">Weekday</option>
		</select>
		<div class="mt-6">
			<vc-calendar :min-date="new Date().toISOString().split('T')[0]" @dayclick="onDayClick" :attributes="attributes" :disabled-dates="disabledDates" />
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
export default {
	layout: 'day-pass',
	data() {
		return {
			option_type: 'weekend',
			date: null,
		};
	},
	watch: {
		option_type(newValue){
			this.date = null;
		}
	},
	methods: {
		onDayClick(day) {
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
			this.date = new Date(day.id).toISOString();
		},
		goToNext() {
			if (this.date === null) {
				this.$toast.info('Please select a date', { duration: 5000 });
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
		disabledDates() {
			if (this.option_type === 'weekday') return { weekdays: [1, 6, 7] };
			return { weekdays: [2, 3, 4, 5] };
		},
		canGoToNext() {
			return (this.option_type === 'weekday' || this.option_type === 'weekend') && this.date !== null;
		},
		attributes() {
			return [{
				highlight: true,
				dates: this.date,
			}];
		},
	},
};
</script>
