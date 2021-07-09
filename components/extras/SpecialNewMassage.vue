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
                <!-- <div class="mt-6 font-semibold">At what time?</div> -->
                <div class="mt-6 font-semibold">What type of massage?</div>
                <div class="flex items-center flex-1 mt-3 border rounded-md focus-within:ring">
                    <select v-model="selectedNewmassage" placeholder="Select the massage" class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                        <option v-for="massage in massages" :value="massage.id" :key="massage.id">
                            {{ massage.name }} ({{ massage.duration }})
                        </option>
                    </select>
                </div>

                <!-- <div class="grid gap-3 mt-2 font-light md:grid-cols-1">
                    <div v-for="massage in massages" :key="massage.id">
                        <label class="flex items-center"
                            :class="{'opacity-25' :!isAvailable(massage.id)}">
                            <input type="radio" :value="massage.id" :disabled="!isAvailable(massage.id)" v-model="selectedNewmassage" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                            <div>{{ massage.name }} ({{ massage.duration }})</div>
                        </label>
                        <div v-if="hasClashes(massage.clash, massage.id)" class="ml-6 text-xs text-red-500" :key="massage.id+'error'">
                            {{ hasClashes(massage.clash, massage.id) }}
                        </div>
                    </div>
                </div> -->
            </div>

            <div class="mt-6 font-semibold">At what time of the day?</div>
            <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
                <label class="flex items-center" v-for="time in timesAvailable" :key="time">
                    <input type="radio" :value="time" v-model="selectedTime" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ time }}</div>
                </label>
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
            selectedTime: "Afternoon",
            selectedNewmassage: null,
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
            return this.$store.getters["extras/allNewmassages"];
        },
        dates() {
            return this.$store.getters.bookingDates;
        },
        allClashes() {
            return this.$store.getters["extras/allClashes"];
        },
        timesAvailable() {
            if (this.selectedDate == this.dates[0]) {
                return ["Afternoon"];
            }
            return ["Morning", "Afternoon"];
        },
    },
    watch: {
        selectedDate(_, oldVal) {
            console.log(oldVal);
            // if (oldVal != null) {
            //     if (!this.$store.state.editMode) {
            //         this.selectedNewmassage = null;
            //     }
            // }

            if (this.timesAvailable) {
                if (!this.timesAvailable.includes(this.selectedTime)) {
                    return (this.selectedTime = this.timesAvailable[0]);
                }
            }
        },
    },
    methods: {
        hasClashes(clashes, id) {
            return false;
            if (id != this.selectedNewmassage) return false;

            const AC = this.allClashes;

            let hasClash = false;
            for (var key in AC) {
                if (key != "massage") {
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
            return true;

            // if (this.selectedDate == this.dates[0]) {
            //     if (slot_id == 1) return false;
            //     else if (slot_id == 2) return false;
            // }

            // if (this.currentAvailableMassages) {
            //     // console.log(this.currentAvailableMassages);
            //     return this.currentAvailableMassages.includes(slot_id);
            // }

            // return false;
        },
        next() {
            console.log("NEXT");
            this.$store.commit("extras/SET_SELECTED_NEWMASSAGE", {
                newmassage: this.selectedNewmassage,
                date: this.selectedDate,
                time: this.selectedTime,
            });
            this.$emit("next");
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_NEWMASSAGE", {
                newmassage: this.selectedNewmassage,
                date: this.selectedDate,
                time: this.selectedTime,
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
                .post("check-newmassage-booking", {
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
        this.$store.dispatch("extras/getSpecialNewmassages");
        this.checkOptions();

        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.selectedNewmassage) {
            this.selectedNewmassage =
                this.$store.state.extras.selectedNewmassage;
        }
        if (this.$store.state.extras.dateNewmassage) {
            this.selectedDate = this.$store.state.extras.dateNewmassage;
        }
        if (this.$store.state.extras.timeNewmassage) {
            this.selectedTime = this.$store.state.extras.timeNewmassage;
        }
    },
};
</script>
