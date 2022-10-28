<template>
	<div class="flex flex-col w-full md:flex-row md:h-640">
		<div class="relative w-full md:h-auto md:w-6/12 h-60">
			<img src="@/assets/images/specials/massages.jpeg" alt class="object-cover object-center w-full h-full" />
		</div>
		<div class="flex flex-col w-full h-full py-6 md:w-7/12">
			<div class="flex-1 px-6 pb-4 md:overflow-y-auto" id="con_scroll">
				<div class="font-semibold">Massages</div>
				<p class="mt-3 font-light leading-relaxed text-gray-600">
					Jara’s in-house masseuse provides a range of relaxing treatments. With indoor and outdoor options available - the Lookout on the beachfront provides a cool and gentle ocean breeze,
					allowing your cares to be eased away. The indoor Spa located on the first floor of the central block provides a more private, indoor alternative, great for the rainy season.
					<!-- A soothing massage at Jara Beach Resort – picture yourself lying in the shade
          of a coconut palm that sways gently in the breeze,
          or shaded by Jara's exclusive Lookout, your cares being eased away by one of our expert masseuses.-->
				</p>

				<div class="mt-3">
					<div v-if="showAddButton" class="flex flex-wrap items-center justify-between mt-0 space-y-4 divide-y md:space-y-3">
						<div class="flex flex-col w-full py-3 md:flex-row md:items-center">
							<div class="flex flex-col items-center w-full space-x-0 space-y-2 font-light md:space-y-4 md:items-start">
								<div class="w-full">
									<div class="pb-1 text-sm font-bold">Select what type of massage</div>
									<div class="flex items-center flex-1 w-full border rounded-md focus-within:ring">
										<select v-model="newMassage.id" class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
											<option v-for="massage in massages" :value="massage.id" :key="massage.id">{{ massage.name }} ({{ massage.duration }})</option>
										</select>
									</div>
								</div>
								<div class="w-full">
									<div class="pb-1 text-sm font-bold">What date and time would you like this?</div>
									<div class="flex w-full space-x-3">
										<div class="flex-1">
											<div class="flex items-center flex-1 border rounded-md focus-within:ring">
												<select
													placeholder="Date"
													v-model="newMassage.date"
													class="w-full text-sm border-0 rounded-md outline-none focus:outline-none"
													style="box-shadow: none"
												>
													<option :value="null">Date</option>
													<option  :value="bookingDate" >{{ showDate(bookingDate) }}</option>
												</select>
											</div>
										</div>
										<div class="flex items-center flex-shrink-0 border rounded-md focus-within:ring">
											<select placeholder="Time" v-model="newMassage.time" class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
												<option>Time</option>
												<option v-for="time in getTimeOptions" :value="time" :key="time">{{ time }}</option>
											</select>
										</div>
									</div>
									<div class="flex-1 hidden md:block"></div>
								</div>
							</div>
						</div>
					</div>

					<div @click="addNewMassage" v-if="showAddButton" class="flex items-center flex-shrink-0 h-10 mt-0 text-xs cursor-pointer w-44 text-brand-blue hover:text-brand-blue-300">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
						<div>Add</div>
					</div>

					<div class="flex flex-wrap items-center justify-between mt-4 space-y-4 md:space-y-3">
						<div class="flex flex-col w-full px-3 py-2 bg-gray-100 rounded md:flex-row md:items-center" v-for="(sMassage, ix) in selectedMassages" :key="ix">
							<div class="w-full">
								<div class="mb-1 font-bold truncate">{{ massageName(sMassage.id) }}</div>
								<div>
									{{ showDate(sMassage.date) }},
									{{ sMassage.time }}
								</div>
							</div>

							<button @click="removeMassage(ix)" class="flex items-center flex-1 flex-shrink-0 h-10 mt-3 text-xs cursor-pointer md:ml-5 md:mt-0 text-brand-red hover:text-red-300">
								<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="border-t">
				<div class="flex w-full px-6 mx-auto mt-6 space-x-2 md:px-0 md:w-2/3">
					<MainButton outline @click="prev()">Back</MainButton>
					<MainButton @click="next()">Next</MainButton>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

export default {
	data() {
		return {
			selectedDate: null,
			selectedMassages: [],
			newMassage: {},
			noDates: [],
		};
	},
	computed: {
		bookingDate() {
			return this.$store.getters['day_pass/bookingDate'];
		},
		// dates() {
		// 	return this.bookingDates.filter(date => {
		// 		return !this.noDates.includes(date);
		// 	});
		// },
		massages() {
			return this.$store.getters['extras/allNewmassages'];
		},
		showAddButton() {
			return this.selectedMassages.length < 24;
		},
		getTimeOptions() {
			return ['Morning', 'Afternoon'];
		},
	},
	methods: {
		massageName(massageId) {
			const massage = this.massages.find(m => m.id == massageId);

			return `${massage.name} (${massage.duration})`;
		},
		next() {
			if(!this.selectedMassages.length){
				this.$toast.error('You have not selected any massage option, remember to press the add button!')
				return;
			}
			this.$store.commit('extras/SET_SELECTED_MASSAGES', {
				massages: this.selectedMassages,
				date: this.bookingDate,
			});
			this.$emit('next');
		},
		prev() {
			this.$store.commit('extras/SET_SELECTED_MASSAGES', {
				massages: this.selectedMassages,
				date: this.bookingDate,
			});
			this.$emit('prev');
		},
		addNewMassage() {
			if (!this.newMassage.date) {
				this.$toast.show('Please select a date');
				return;
			}
			if (this.noDates.includes(this.newMassage.date)) {
				this.$toast.show('This date is not available');
				return;
			}

			const massage = Object.assign({}, this.newMassage);
			this.selectedMassages.unshift(massage);

			this.$nextTick(() => {
				var container = this.$el.querySelector('#con_scroll');
				container.scrollTop = container.scrollHeight;
			});
		},
		addMassage() {
			this.selectedMassages.unshift({
				id: this.massages[0].id,
				date: this.bookingDate,
				time: 'Afternoon',
			});
			this.$nextTick(() => {
				var container = this.$el.querySelector('#con_scroll');
				container.scrollTop = container.scrollHeight;
			});
			// //console.log(this.dates[0]);
		},
		removeMassage(ix) {
			this.selectedMassages.splice(ix, 1);
		},
		showDate(date) {
			return format(parseISO(date), 'iii, MMM. do yyyy');
		},
		getNoMassageDates() {
			this.$axios.get('/extra-no-dates?extra=massages').then(res => {
				const noDates = res.data.data;

				this.noDates = noDates;

			});
		},
	},
	created() {
		this.getNoMassageDates();
		// this.newMassage = {
		// 	id: this.massages[0].id,
		// 	date: this.bookingDate,
		// 	time: 'Afternoon',
		// };
	},
	mounted() {
		this.$store.dispatch('extras/getSpecialDrinks');

		if (this.$store.state.extras.selectedMassages) {
			this.selectedMassages = this.$store.state.extras.selectedMassages.map(x => x);
		}

		// if (this.massages.length > 0 && this.selectedMassages.length <= 0) {
		// 	let firstDate = this.bookingDate;
		// 	if (firstDate) {
		// 		if (!this.noDates.includes(firstDate)) {
		// 			this.selectedMassages.push({
		// 				id: this.massages[0].id,
		// 				date: firstDate,
		// 				time: 'Afternoon',
		// 			});
		// 		}
		// 	}
		// }

		this.selectedDate = this.bookingDate

		if (this.$store.state.extras.dateDrink) {
			this.selectedDate = this.$store.state.extras.dateDrink;
		}
	},
};
</script>
