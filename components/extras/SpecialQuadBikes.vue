<template>
    <div class="flex flex-col w-full md:flex-row">
        <div class="relative w-full md:w-6/12 h-60 md:h-auto">
            <img src="@/assets/images/specials/quadbike.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials color="bg-green-900" :index="3" @next="$emit('next')" @prev="$emit('prev')" />
        </div>
        <div class="w-full p-6 md:w-7/12">
            <div class="font-semibold">Quad Bikes</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Quad biking - external beach provider (signed disclaimer and pre-booking required).
                There are only 2 quad bikes available so the application will need to take this into consideration when managing availability.
                The guest can also select the number of quad bikes they want (1 or 2)
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>

            <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>

            <div class="mt-6 font-semibold">How Many?</div>

            <div class="grid items-center grid-cols-2 mt-3 font-light gap-y-2">
                <!-- <label class="flex items-center" v-for="qty in 2" :key="qty">
                    <input type="radio" :value="qty" v-model="selectedQuantity" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ qty }}</div>
                </label> -->
                <label class="flex items-center">
                    <input type="radio" :value="1" v-model="selectedQuantity" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>One quad bike</div>
                </label>
                <label class="flex items-center">
                    <input type="radio" :value="2" v-model="selectedQuantity" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>Two quad bikes</div>
                </label>
            </div>

            <div>
                <div class="mt-4 font-semibold">At what time?</div>
                <div class="mt-2 space-y-3 font-light ">
                    <label class="flex items-center" v-for="quadbike in quadbikes" :key="quadbike.id"
                        :class="{'opacity-50' :!isAvailable(quadbike.id)}">
                        <input type="radio" :value="quadbike.id" :disabled="!isAvailable(quadbike.id)" v-model="selectedQuadbike" class="mr-3 rounded-full focus-within:ring-0 border-brand-blue-400 text-brand-blue-400">
                        <div>{{ quadbike.description }} <span class="font-bold">{{ currency(quadbike.price) }}</span></div>
                    </label>
                </div>
            </div>

            <div class="flex w-full mx-auto mt-8 space-x-2 md:w-2/3">
                <MainButton outline @click="prev()">Back</MainButton>
                <MainButton @click="next()">Next</MainButton>
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
            selectedQuadbike: null,
            selectedQuantity: 1,
            availableQuadbikes: {},
        };
    },
    computed: {
        currentAvailableQuadbikes() {
            if (this.selectedDate == null) return [];
            if (this.availableQuadbikes == null) return [];

            return this.availableQuadbikes[this.selectedDate];
        },
        quadbikes() {
            return this.$store.getters["extras/allQuadbikes"];
        },
        dates() {
            return this.$store.getters.bookingDates;
        },
    },
    watch: {
        selectedDate(newVal, oldVal) {
            if (oldVal != null) {
                this.selectedQuadbike = null;
            }
        },
        async selectedQuantity(newVal, oldVal) {
            await this.checkOptions();
            if (oldVal != null) {
                this.selectedQuadbike = null;
            }
        },
    },
    methods: {
        isAvailable(slot_id) {
            if (this.currentAvailableQuadbikes) {
                return this.currentAvailableQuadbikes.includes(slot_id);
            }

            return false;
        },
        next() {
            console.log("NEXT");
            this.$store.commit("extras/SET_SELECTED_QUADBIKE", {
                quadbike: this.selectedQuadbike,
                quantity: this.selectedQuantity,
                date: this.selectedDate,
            });
            this.$emit("next");
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_QUADBIKE", {
                quadbike: this.selectedQuadbike,
                quantity: this.selectedQuantity,
                date: this.selectedDate,
            });
            this.$emit("prev");
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        checkOptions() {
            return this.$axios
                .post("check-quadbike-booking", {
                    dates: this.dates,
                    quantity: this.selectedQuantity,
                })
                .then((res) => {
                    console.log(res.data.data);
                    this.availableQuadbikes = res.data.data;
                });
        },
    },
    mounted() {
        this.$store.dispatch("extras/getQuadbikeOptions");
        this.checkOptions();

        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.selectedQuadbike) {
            this.selectedQuadbike = this.$store.state.extras.selectedQuadbike;
        }
        if (this.$store.state.extras.selectedQuadbikeQty) {
            this.selectedQuantity = this.$store.state.extras.selectedQuadbikeQty;
        }
        if (this.$store.state.extras.dateQuadbike) {
            this.selectedDate = this.$store.state.extras.dateQuadbike;
        }
    },
};
</script>
