<template>
    <div class="flex flex-col w-full md:flex-row">
        <div class="relative w-full md:w-6/12 h-60 md:h-auto">
            <img src="@/assets/images/specials/quadbike.png" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="w-full p-6 md:w-7/12">
            <div class="font-semibold">Quad Bikes</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Jara is proud to offer quad bike hire - available via a local partner (signed waiver and
                pre-booking required). Half and full day hire is available, to ride on the beachfront or at
                the back of the property on the sandy road. Quad bikes are ideal for small-average size
                guest riders.
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this?</div>

            <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>

            <div class="mt-6 font-semibold">How Many?</div>

            <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
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
                    <div v-for="quadbike in quadbikes" :key="quadbike.id">
                        <label class="flex items-center"
                            :class="{'opacity-25' :!isAvailable(quadbike.id)}">
                            <input type="radio" :value="quadbike.id" :disabled="!isAvailable(quadbike.id)" v-model="selectedQuadbike" class="mr-3 rounded-full focus-within:ring-0 border-brand-blue-400 text-brand-blue-400">
                            <div>{{ quadbike.description }} <span class="font-bold">{{ currency(quadbike.price) }}</span></div>
                        </label>
                        <div v-if="hasClashes(quadbike.clash, quadbike.id)" class="text-xs text-red-500 ml-7" :key="quadbike.id+'error'">
                            {{ hasClashes(quadbike.clash, quadbike.id) }}
                        </div>
                    </div>
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
        allClashes() {
            return this.$store.getters["extras/allClashes"];
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
                if (!this.$store.state.editMode) {
                    this.selectedQuadbike = null;
                }
            }
        },
    },
    methods: {
        hasClashes(clashes, id) {
            if (id != this.selectedQuadbike) return false;

            const AC = this.allClashes;

            let hasClash = false;
            for (var key in AC) {
                if (key != "quadbike") {
                    if (AC.hasOwnProperty(key)) {
                        const clashData = AC[key];

                        if (clashData.date == this.selectedDate) {
                            const compClashes = clashData.clash.filter(
                                (value) => clashes.includes(value)
                            );

                            if (compClashes.length > 0) {
                                hasClash = key;
                            }
                        }
                    }
                }
            }

            if (hasClash) {
                return `This time slot conflicts with your ${hasClash} booking`;
            }

            return false;
        },
        isAvailable(slot_id) {
            if (this.selectedDate == this.dates[0]) {
                if (slot_id == 1) return false;
                if (slot_id == 3) return false;
            }

            if (this.currentAvailableQuadbikes) {
                return this.currentAvailableQuadbikes.includes(slot_id);
            }

            return false;
        },
        next() {
            if (
                this.selectedQuadbike == null ||
                this.selectedQuadbike.length <= 0
            ) {
                this.$toast.info("Please select a time slot to proceed");
                return;
            }
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
            let oldBookingId = null;
            if (this.$store.state.editMode) {
                console.log("in edit mode");
                if (this.$store.state.editBooking) {
                    oldBookingId = this.$store.state.editBooking.id;
                }
            }

            return this.$axios
                .post("check-quadbike-booking", {
                    dates: this.dates,
                    quantity: this.selectedQuantity,
                    oldBookingId: oldBookingId,
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
