<template>
	<div class="flex flex-col w-full md:flex-row md:h-640">
		<div class="relative w-full md:h-auto md:w-6/12 h-60">
			<img src="@/assets/images/specials/teams.jpeg" alt class="object-cover object-center w-full h-full" />
		</div>
		<div class="flex flex-col w-full h-full py-6 md:w-7/12">
			<div class="flex-1 px-6 pb-4 md:overflow-y-auto" id="con_scroll">
				<div class="font-semibold">Organised Team Bonding</div>
				<p class="mt-3 font-light leading-relaxed text-gray-600">
					Organised Team Bonding for a 4hr Session including Fun & Games.
				</p>

				<div class="mt-3">
					<div v-if="showAddButton" class="flex flex-wrap items-center justify-between mt-0 space-y-4 divide-y md:space-y-3">
						<div class="flex flex-col w-full py-3 md:flex-row md:items-center">
							<div class="flex flex-col items-center w-full space-x-0 space-y-2 font-light md:space-y-4 md:items-start">

								<div class="w-full">
									<div class="pb-1 text-sm font-bold">What date and time would you like this?</div>
									<div class="flex w-full space-x-3">
										<div class="flex-1">
											<div class="flex items-center flex-1 border rounded-md focus-within:ring">
												<select
													placeholder="Date"
													v-model="newDate"
													class="w-full text-sm border-0 rounded-md outline-none focus:outline-none"
													style="box-shadow: none"
												>
													<option :value="null">Date</option>
													<option v-for="date in dates" :value="date" :key="date">{{ showDate(date) }}</option>
												</select>
											</div>
										</div>
									</div>
									<div class="flex-1 hidden md:block"></div>
								</div>
							</div>
						</div>
					</div>

					<div @click="addNewConference" v-if="showAddButton" class="flex items-center flex-shrink-0 w-auto h-10 mt-0 text-xs cursor-pointer text-brand-blue hover:text-brand-blue-300">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
						<div>Click here to add section above to your booking</div>
					</div>

					<div class="flex flex-wrap items-center justify-between mt-4 space-y-4 md:space-y-3">
						<div class="flex flex-col w-full px-3 py-2 bg-gray-100 rounded md:flex-row md:items-center" v-for="(conferenceDate, ix) in selectedDates" :key="ix">
							<div class="w-full">
								<div class="mb-1 font-bold truncate"></div>
								<div>
									{{ showDate(conferenceDate) }},
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
      newDate: null,
			selectedDates: [],
			noDates: [],
		};
	},
	computed: {
		bookingDates() {
			return this.$store.getters.bookingDates;
		},
		dates() {
			return this.bookingDates.filter(date => {
				return !this.noDates.includes(date);
			});
		},
		showAddButton() {
			return this.selectedDates.length < 24;
		},
	},
	methods: {
		next() {
			if(!this.selectedDates.length){
				this.$toast.error('You have not selected any date, remember to press the add button!')
				return;
			}
			this.$store.commit('extras/SET_SELECTED_TEAMS', this.selectedDates);
			this.$emit('next');
		},
		prev() {
			this.$store.commit('extras/SET_SELECTED_TEAMS', this.selectedDates);
			this.$emit('prev');
		},
		addNewConference() {
			if (!this.newDate) {
				this.$toast.show('Please select a date');
				return;
			}
			if (this.noDates.includes(this.selectedDates)) {
				this.$toast.show('This date is not available');
				return;
			}

      if (!this.selectedDates.includes(this.newDate)) {
        this.selectedDates.push(this.newDate);
      }


			this.$nextTick(() => {
				var container = this.$el.querySelector('#con_scroll');
				container.scrollTop = container.scrollHeight;
			});
		},
		removeMassage(ix) {
			this.selectedDates.splice(ix, 1);
		},
		showDate(date) {
			return format(parseISO(date), 'iii, MMM. do yyyy');
		},
		getNoTeamDates() {
			this.$axios.get('/extra-no-dates?extra=conferences').then(res => {
				const noDates = res.data.data;
				this.noDates = this.noDates.concat(noDates);
			});

      this.$axios.post('/check-team-booking', {"dates": this.bookingDates}).then(res => {
        this.noDates = this.noDates.concat(res.data.data)

        if (this.dates.length == 0) {
          this.$toast.info("Organised Team Bonding is not available during your stay")
        }

        if ( this.selectedDates.length <= 0 && this.dates.length == 1) {
          let firstDate = this.dates[0];
            if (!this.noDates.includes(firstDate)) {
              this.selectedDates.push(firstDate);
            }
        }
      })


      this.newDate = this.dates[0]
		},
	},
	created() {
		this.getNoTeamDates();
	},
	mounted() {

		if (this.$store.getters["extras.allselectedTeamsDates"]) {
			this.selectedDates = this.$store.getters["extras.allselectedTeamsDates"];
		}
	},
};
</script>
