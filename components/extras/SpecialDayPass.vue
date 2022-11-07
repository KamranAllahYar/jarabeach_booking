<template>
    <div class="flex flex-col w-full md:flex-row md:h-640">
        <div class="relative w-full md:h-auto md:w-6/12 h-60">
            <img src="@/assets/images/specials/dayPass.jpeg" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="flex flex-col w-full h-full py-6 md:w-7/12">
            <div class="flex-1 px-6 pb-4 md:overflow-y-auto" id="con_scroll">
                <div class="font-semibold">Day Pass</div>
                <p class="mt-3 font-light leading-relaxed text-gray-600">
                    Want the Jara experience, but just for the day? No problem, we've got you covered! <br/><br/>Our DAY PASS EXTENSION allows you to check out of your room at 11am, but enjoy all Jara activities until 5:30pm - both alcohol and non-alcohol passes available. Full Day Pass information available at: <a href="www.jarabeachresort.com/day-pass" class="text-brand-blue">www.jarabeachresort.com/day-pass</a>
                </p>
                <label class="flex items-center mt-6">
                    <input type="radio" checked class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400">
                    <div>{{ showDate(dates[dates.length - 1]) }}</div>
                </label>
                   <div class="flex items-center mt-2 space-x-3">
                    <div>Arrival Time:</div>
                    <div class="font-semibold">11:30 AM</div>
                </div>
                <div class="flex items-center mt-2 space-x-3">
                    <div>Departure Time:</div>
                    <div class="font-semibold">5:30 PM</div>
                </div>
                <div>
                    <div class="mt-6 font-semibold">Select Your Day Pass Extension Tickets</div>

                    <div @click="addDayPass" class="flex items-center flex-shrink-0 w-20 h-10 mb-3 text-xs cursor-pointer text-brand-blue hover:text-brand-blue-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <div>Add</div>
                    </div>
                    <div class="flex flex-wrap items-center mt-3 space-y-4 justify-betweenl md:space-y-3">
                        <div class="flex flex-col w-full space-y-2 font-light" v-for="(sDrink, ix) in selectedDayPass" :key="ix">
                            <div class="flex items-center flex-1 pl-2 border rounded-md focus-within:ring">
                                <svg class="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                <select v-model="sDrink.id" class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                    <option v-for="dayPass in dayPassOptions" :value="dayPass.id" :key="dayPass.id">{{dayPass.name}} - {{currency(priceToShow(dayPass))}}</option>
                                </select>
                            </div>
                            <div class="flex">
                                <div class="pl-2 border rounded-md focus-within:ring">
                                    <select v-model="sDrink.qty" class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                        <option value="0">Qty</option>
                                        <option v-for="num in 20" :value="num" :key="num">
                                            {{ num }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex-1 hidden md:block"></div>
                            <div @click="removeDayPass(ix)" v-if="selectedDayPass.length > 1" class="flex items-center flex-1 flex-shrink-0 h-10 mb-3 text-xs cursor-pointer text-brand-red hover:text-red-300">
                                <div>Remove</div>
                            </div>
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
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { mapGetters } from 'vuex';


export default {
    data() {
        return {
            selectedDate: null,
            selectedDayPass: [],
            noDates: [],
        };
    },
    computed: {
        bookingDates() {
            return this.$store.getters.bookingDates;
        },
        isWeekend() {
            var dayOfWeek = new Date(this.dates[this.dates.length - 1]).getDay();
            var isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0);
            return isWeekend;
        },
        ...mapGetters({
			noDiscountDates: 'noDiscountDates',
		}),
		isDateSeasonalDate() {
			const isDateAvailable = this.noDiscountDates.filter(d => {
                const bookingDateParsed = parseISO(this.dates[this.dates.length - 1]);
                const dDate = parseISO(d);
				return format(bookingDateParsed, 'yyyy-MM-dd') === format(dDate, 'yyyy-MM-dd');
			});
			return isDateAvailable.length;
		},
        dates() {
            return this.bookingDates.filter((date) => {
                return !this.noDates.includes(date);
            });
        },
        dayPassOptions() {
            return this.$store.getters["extras/allDayPass"];
        },
    },
    methods: {
        priceToShow(option) {
            if(this.isDateSeasonalDate) return option.seasonal_price;
            if(this.isWeekend) return option.weekend_price;
            return option.weekday_price;
        },
        next() {
            if(!this.selectedDayPass.length){
                this.$toast.error('Please select a day pass option.');
                return;
            }
            this.$store.commit("extras/SET_SELECTED_DAY_PASS", {
                dayPassOptionsSelected: this.selectedDayPass,
                date: this.dates[this.dates.length - 1],
            });
            this.$emit("next");
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_DAY_PASS", {
                dayPassOptionsSelected: this.selectedDayPass,
                date: this.dates[this.dates.length - 1],
            });
            this.$emit("prev");
        },
        addDayPass() {
            this.selectedDayPass.unshift({
                id: this.dayPassOptions[0].id,
                qty: 1,
            });
            this.$nextTick(() => {
                var container = this.$el.querySelector("#con_scroll");
                container.scrollTop = container.scrollHeight;
            });
        },
        removeDayPass(ix) {
            this.selectedDayPass.splice(ix, 1);
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        async getNoDrinksDates() {
            await this.$axios
                .get("/extra-no-dates?extra=drinks")
                .then((res) => {
                    const noDates = res.data.data;

                    this.noDates = noDates;

                    //console.log(noDates);
                });
        },
    },
    async created() {
        await this.getNoDrinksDates();
    },
    mounted() {
        this.$store.dispatch("extras/getDayPassOptions");
        if (this.$store.state.extras.selectedDayPassOptions) {
            this.selectedDayPass = this.$store.state.extras.selectedDayPassOptions.map(
                (x) => x
            );
        }

        if (this.dayPassOptions.length > 0 && this.selectedDayPass.length <= 0) {
            this.selectedDayPass.push({
                id: this.dayPassOptions[0].id,
                qty: 1,
            });
        }
    },
};
</script>
