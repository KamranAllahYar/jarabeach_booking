<template>
    <div class="flex flex-col w-full md:flex-row md:h-640">
        <div class="relative w-full md:h-auto md:w-6/12 h-60">
            <img src="@/assets/images/specials/dayPass.jpeg" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="flex flex-col w-full h-full py-6 md:w-7/12">
            <div class="flex-1 px-6 pb-4 md:overflow-y-auto" id="con_scroll">
                <div class="font-semibold">Day Pass</div>
                <p class="mt-3 font-light leading-relaxed text-gray-600">
                    Want the Jara experience, but just for the day? No problem, we've got you covered! We are delighted to offer our DAY PASS - both alcohol and non-alcohol passes available. Come and spend the day, enjoy the facilities and indulge!
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
                    <div class="mt-6 font-semibold">Select Wine or Champagne or Spirit</div>

                    <div @click="addDayPass" class="flex items-center flex-shrink-0 w-20 h-10 mb-3 text-xs cursor-pointer text-brand-blue hover:text-brand-blue-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <div>Add</div>
                    </div>
                    <div class="flex flex-wrap items-center mt-3 space-y-4 justify-betweenl md:space-y-3">
                        <div class="flex flex-col items-center w-full space-x-0 space-y-2 font-light md:space-y-0 md:space-x-3 md:items-end md:flex-row" v-for="(sDrink, ix) in selectedDayPass" :key="ix">
                            <div class="flex items-center flex-1 pl-2 border rounded-md focus-within:ring">
                                <svg
                                    class="w-5 h-5" fill="none" viewBox="0 0 15 15"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.625 14.5312h3.75M7.5 14.5312v-3.75M8.96444 10.3375a2.6397 2.6397 0 01-1.465.4439 2.63968 2.63968 0 01-1.465-.4439 2.64065 2.64065 0 01-1.16-2.50625L5.58131.89a.46936.46936 0 01.46688-.42125h2.9025A.46935.46935 0 019.41756.89l.70684 6.94125a2.64088 2.64088 0 01-.22621 1.41686 2.6407 2.6407 0 01-.93375 1.08939v0zM5.24316 4.21875h4.5125" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.79688 5.625a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865M6.79688 8.4375a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865M8.20313 7.03125a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865"
                                        stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <select v-model="sDrink.id" class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                    <option v-for="dayPass in dayPassOptions" :value="dayPass.id" :key="dayPass.id">{{dayPass.name}} - {{currency(priceToShow(dayPass))}}</option>
                                </select>
                            </div>
                            <div class="flex items-center flex-1 pl-2 border rounded-md focus-within:ring">
                                <select v-model="sDrink.qty" class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                    <option value="0">Qty</option>
                                    <option v-for="num in 20" :value="num" :key="num">
                                        {{ num }}
                                    </option>
                                </select>
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
import moment from 'moment';


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
				return moment(this.dates[this.dates.length - 1]).format('DD/MM/YYYY') === moment(d).format('DD/MM/YYYY');
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
