<template>
    <div class="flex flex-col w-full md:flex-row">
        <div class="relative w-full md:w-6/12 h-60 md:h-auto">
            <img src="@/assets/images/specials/massage.png" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="w-full p-6 md:w-7/12">
            <div class="font-semibold">Massage</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                A soothing massage at Jara Beach Resort – picture yourself lying in the shade of a coconut palm that sways gently in the breeze,
                or shaded by Jara's exclusive Lookout, your cares being eased away by one of our expert masseuses.
            </p>
            <p class="mt-2 font-light leading-relaxed text-gray-600">
                Outdoor Massage (one masseuse): 2 Hours (minimum) <span class="font-bold"> = N30,000</span>
            </p>

            <div class="mt-6 font-semibold">What date would you like to have this?</div>
            <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>

            <div>
                <div class="mt-6 font-semibold">At what time?</div>
                <div class="grid gap-3 mt-2 font-light md:grid-cols-2 ">
                    <div v-for="massage in massages" :key="massage.id">
                        <label class="flex items-center"
                            :class="{'opacity-25' :!isAvailable(massage.id)}">
                            <input type="radio" :value="massage.id" :disabled="!isAvailable(massage.id)" v-model="selectedMassage" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                            <div>{{ massage.name }}</div>
                        </label>
                        <div v-if="hasClashes(massage.clash)" class="ml-6 text-xs text-red-500" :key="massage.id+'error'">
                            {{ hasClashes(massage.clash) }}
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
            selectedMassage: null,
            availableMassages: {},
        };
    },
    computed: {
        currentAvailableMassages() {
            if (this.selectedDate == null) return [];
            if (this.availableMassages == null) return [];

            return this.availableMassages[this.selectedDate];
        },
        massages() {
            return this.$store.getters["extras/allMassages"];
        },
        dates() {
            return this.$store.getters.bookingDates;
        },
        allClashes() {
            return this.$store.getters["extras/allClashes"];
        },
    },
    watch: {
        selectedDate(_, oldVal) {
            if (oldVal != null) {
                if (!this.$store.state.editMode) {
                    this.selectedMassage = null;
                }
            }
        },
    },
    methods: {
        hasClashes(clashes) {
          console.log("clashes to compare");
          console.log(clashes);
            const AC = this.allClashes;

            let hasClash = false;
            for (var key in AC) {
                if (key != "massage") {
                    if (AC.hasOwnProperty(key)) {
                        const compClashes = AC[key].filter((value) =>
                            clashes.includes(value)
                        );

                        if (compClashes.length > 0) {
                            hasClash = key;
                        }
                    }
                }
            }

            if (hasClash) {
                return `This time slot clashes with a previously ${hasClash} extra`;
            }

            return false;
        },
        isAvailable(slot_id) {
            if (this.selectedDate == this.dates[0]) {
                if (slot_id == 1) return false;
                else if (slot_id == 2) return false;
            }

            if (this.currentAvailableMassages) {
                // console.log(this.currentAvailableMassages);
                return this.currentAvailableMassages.includes(slot_id);
            }

            return false;
        },
        next() {
            console.log("NEXT");
            this.$store.commit("extras/SET_SELECTED_MASSAGE", {
                massage: this.selectedMassage,
                date: this.selectedDate,
            });
            this.$emit("next");
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_MASSAGE", {
                massage: this.selectedMassage,
                date: this.selectedDate,
            });
            this.$emit("prev");
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        checkOptions() {
            let oldBookingId = null;
            if (this.$store.state.editMode) {
                console.log("in edit mode");
                if (this.$store.state.editBooking) {
                    oldBookingId = this.$store.state.editBooking.id;
                }
            }

            this.$axios
                .post("check-massage-booking", {
                    dates: this.dates,
                    oldBookingId: oldBookingId,
                })
                .then((res) => {
                    console.log(res.data.data);
                    this.availableMassages = res.data.data;
                });
        },
    },
    mounted() {
        this.$store.dispatch("extras/getSpecialMassages");
        this.checkOptions();

        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.selectedMassage) {
            this.selectedMassage = this.$store.state.extras.selectedMassage;
        }
        if (this.$store.state.extras.dateMassage) {
            this.selectedDate = this.$store.state.extras.dateMassage;
        }
    },
};
</script>
