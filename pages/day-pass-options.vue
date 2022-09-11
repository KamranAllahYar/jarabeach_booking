<template>
	<div>
		<!-- <div>{{selectedDayPassOptions}}</div> -->
		<div class="max-w-4xl mx-auto text-center border divide-y">
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
export default {
	layout: 'day-pass',
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
		selectedOptionType(){
			return this.$store.state.day_pass.option_type;
		}
	},
	methods: {
		optionPrice(option){
			if(this.selectedOptionType === 'weekend') return option.weekend_price;
			return option.weekday_price;
		},
		goToNext() {
			if(!this.canGoToNext) return;
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
	},
	mounted() {
		const newDayPassOptions = this.dayPassOptions.map(option => {
			return { ...option, quantity: 0 };
		});
		this.selectedDayPassOptions = newDayPassOptions;
	},
};
</script>
