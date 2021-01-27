<template>
    <div>
        <div class="flex flex-col w-full md:flex-row" v-show="!showStaff">
            <div class="relative flex-shrink-0 w-full md:w-6/12 h-60 md:h-auto">
                <img src="@/assets/images/specials/domesticStaff.png" alt="" class="object-cover object-center w-full h-full">
                <NavSpecials :index="8" @prev="$emit('prev')" />
            </div>
            <div class="flex flex-col w-full p-6">
                <div class="font-semibold">Domestic Staff</div>

                <p class="mt-3 font-light leading-relaxed text-gray-600">
                    We welcome guests with nannies or drivers, subject to availability. No discounts/ offers apply to domestic staff pricing.
                    We have (will have at the time we go live) a nannies room and a drivers room (2 max in each). Booked in advance.
                </p>

                <div>
                    <div class="mt-4 font-semibold">Select dates for domestic staff</div>
                    <div class="mt-2 font-light ">
                        <template v-for="date in dates">
                            <label class="flex items-center mt-4" :key="date">
                                <input type="checkbox" :value="date" v-model="selectedDates" class="w-5 h-5 mr-3 rounded focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                                <div>{{ showDate(date) }}</div>

                            </label>
                            <div v-if="availableStaffs[date]" :key="date+'ii'" class="ml-8 text-sm text-gray-400">
                                <span v-if="!availableStaffs[date].nanny">
                                    Nanny quaters is full for this day
                                </span>
                                <span v-if="!availableStaffs[date].driver">
                                    Driver quaters is full for this day
                                </span>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="flex-1"></div>

                <div class="flex w-full mx-auto mt-8 space-x-2 md:w-2/3">
                    <MainButton outline @click="prev()">Back</MainButton>
                    <MainButton @click="toggleStaffInfo(true)">Next</MainButton>
                </div>
            </div>
        </div>

        <SpecialDomesticStaffInfo v-if="showStaff"
            :initial="selectedStaff"
            :availableStaffRooms="availableStaffRooms"

            @close="toggleStaffInfo(false)"
            @prev="toggleStaffInfo(false)"
            @next="next()"
            @details="updateSelection($event)" />
    </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default {
    data() {
        return {
            showStaff: false,
            selectedDates: [],
            selectedStaff: {
                menu: [],
                type: [],
            },
            availableStaffs: {},
        };
    },
    computed: {
        dates() {
            return this.$store.getters.bookingDates;
        },
        availableStaffRooms() {
            const defaultData = {
                nanny: true,
                driver: true,
            };

            if (this.selectedDates.length <= 0 || !this.availableStaffs) {
                return defaultData;
            }

            if (this.selectedDates.length > 0) {
                let nannyBool = true;
                let driverBool = true;

                this.selectedDates.forEach((date) => {
                    const availData = this.availableStaffs[date];
                    console.log(date);
                    console.log(this.availableStaffs[date]);
                    if (availData.nanny == false) nannyBool = false;
                    if (availData.driver == false) driverBool = false;

                    console.log(`nanny - ${nannyBool}, driver - ${driverBool}`);
                });

                return {
                    nanny: nannyBool,
                    driver: driverBool,
                };
            }

            return defaultData;
        },
    },
    methods: {
        toggleStaffInfo(view) {
            this.$store.commit("extras/SET_SELECTED_STAFF", {
                selectedStaff: this.selectedStaff,
                dates: this.selectedDates,
            });
            this.showStaff = view;
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_STAFF", {
                selectedStaff: this.selectedStaff,
                dates: this.selectedDates,
            });
            this.$emit("prev");
        },
        next() {
            this.$store.commit("extras/SET_SELECTED_STAFF", {
                selectedStaff: this.selectedStaff,
                dates: this.selectedDates,
            });
            this.$emit("next", this.selectedDates.length <= 0);
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        updateSelection(details) {
            this.selectedStaff = details;
        },
        checkOptions() {
            this.$axios
                .post("check-staffroom-booking", { dates: this.dates })
                .then((res) => {
                    console.log(res.data.data);
                    this.availableStaffs = res.data.data;
                });
        },
    },
    mounted() {
        this.checkOptions();
        if (this.$store.state.extras.selectedStaff.type.length > 0) {
            this.selectedStaff = Object.assign(
                {},
                this.$store.state.extras.selectedStaff
            );
        }

        if (this.$store.state.extras.dateStaff) {
            this.selectedDates = this.$store.state.extras.dateStaff;
        }
    },
};
</script>
