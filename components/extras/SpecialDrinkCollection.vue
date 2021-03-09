<template>
    <div class="flex flex-col w-full md:flex-row md:h-640">
        <div class="relative w-full md:h-auto md:w-6/12 h-60">
            <img src="@/assets/images/specials/drinks.png" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="flex flex-col w-full h-full py-6 md:w-7/12">
            <div class="flex-1 px-6 pb-4 md:overflow-y-auto" id="con_scroll">
                <div class="font-semibold">Premium Drink Collection</div>
                <p class="mt-3 font-light leading-relaxed text-gray-600">
                    We have curated a small, but memorable range of champagnes, wines and spirits -
                    available to be purchased during your stay via POS or bank transfer (JARA is a completely cashless resort).
                    Items can also be pre-ordered at the time of booking.
                    The following items represent some of the items currently available to buy.
                    We can source any bottle found in Nigeria, so if it's not listed, please do not hesitate to let us know what you'd like us to prepare for you.
                </p>
                <div class="mt-6 font-semibold">What date would you like to have this</div>
                <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
                    <label class="flex items-center" v-for="date in dates" :key="date">
                        <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400">
                        <div>{{ showDate(date) }}</div>
                    </label>
                </div>
                <div>
                    <div class="mt-6 font-semibold">Select Wine or Champagne or Spirit</div>

                    <div @click="addDrinks" class="flex items-center flex-1 flex-shrink-0 h-10 mb-3 text-xs cursor-pointer text-brand-blue hover:text-brand-blue-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <div>Add</div>
                    </div>
                    <div class="flex flex-wrap items-center justify-between w-full mt-3 space-y-4 md:space-y-3">
                        <div class="flex flex-col items-center w-full space-x-0 space-y-2 font-light md:space-y-0 md:space-x-3 md:items-end md:flex-row" v-for="(sDrink, ix) in selectedDrinks" :key="ix">
                            <div class="flex items-center flex-1 pl-2 border rounded-md focus-within:ring">
                                <svg
                                    class="w-5 h-5" fill="none" viewBox="0 0 15 15"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.625 14.5312h3.75M7.5 14.5312v-3.75M8.96444 10.3375a2.6397 2.6397 0 01-1.465.4439 2.63968 2.63968 0 01-1.465-.4439 2.64065 2.64065 0 01-1.16-2.50625L5.58131.89a.46936.46936 0 01.46688-.42125h2.9025A.46935.46935 0 019.41756.89l.70684 6.94125a2.64088 2.64088 0 01-.22621 1.41686 2.6407 2.6407 0 01-.93375 1.08939v0zM5.24316 4.21875h4.5125" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.79688 5.625a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865M6.79688 8.4375a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865M8.20313 7.03125a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865"
                                        stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <select v-model="sDrink.id" class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                    <option v-for="drink in drinks" :value="drink.id" :key="drink.id">{{drink.name}}</option>
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
                            <!-- <div @click="addDrinks" v-if="ix == selectedDrinks.length-1" class="flex items-center flex-1 flex-shrink-0 h-10 mb-3 text-xs cursor-pointer text-brand-blue hover:text-brand-blue-300">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                <div>Add</div>
                            </div> -->
                            <div @click="removeDrink(ix)" class="flex items-center flex-1 flex-shrink-0 h-10 mb-3 text-xs cursor-pointer text-brand-red hover:text-red-300">
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

export default {
    data() {
        return {
            selectedDate: null,
            selectedDrinks: [],
        };
    },
    computed: {
        dates() {
            return this.$store.getters.bookingDates;
        },
        drinks() {
            return this.$store.getters["extras/allDrinks"];
        },
    },
    methods: {
        next() {
            this.$store.commit("extras/SET_SELECTED_DRINKS", {
                drinks: this.selectedDrinks,
                date: this.selectedDate,
            });
            this.$emit("next");
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_DRINKS", {
                drinks: this.selectedDrinks,
                date: this.selectedDate,
            });
            this.$emit("prev");
        },
        addDrinks() {
            this.selectedDrinks.unshift({
                id: this.drinks[0].id,
                qty: 1,
            });
            this.$nextTick(() => {
                var container = this.$el.querySelector("#con_scroll");
                container.scrollTop = container.scrollHeight;
            });
            // setTimeout(() => {
            // }, 1000);
        },
        removeDrink(ix) {
            this.selectedDrinks.splice(ix, 1);
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
    },
    mounted() {
        this.$store.dispatch("extras/getSpecialDrinks");

        if (this.$store.state.extras.selectedDrinks) {
            this.selectedDrinks = this.$store.state.extras.selectedDrinks.map(
                (x) => x
            );
        }

        // if (this.drinks.length > 0 && this.selectedDrinks.length <= 0) {
        //     this.selectedDrinks.push({
        //         id: this.drinks[0].id,
        //         qty: 1,
        //     });
        // }

        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.dateDrink) {
            this.selectedDate = this.$store.state.extras.dateDrink;
        }
    },
};
</script>
