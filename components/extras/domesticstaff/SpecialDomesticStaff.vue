<template>
    <div>
        <div class="flex flex-col w-full md:flex-row" v-show="!showStaff">
            <div class="relative flex-shrink-0 w-full md:w-6/12 h-60 md:h-auto">
                <img src="@/assets/images/specials/domesticStaff.png" alt="" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex flex-col w-full p-6">
                <div class="font-semibold">Domestic Staff</div>

                <div class="mt-3 text-sm font-light leading-relaxed text-gray-600">
                    <!-- Nannies are welcome to sleep in our dedicated staff quarters - bedding and water provided - and partake in all meals
                    and make use of Jara's facilities. A separate food menu is available. Alcohol and the snack station is not included.
                    Cost per night: N30,000 (inc VAT). -->
                    <!-- We welcome guests with nannies or drivers, subject to availability. No discounts/ offers apply to domestic staff pricing.
                    We have a nannies room and a drivers room (2 max in each). Booked in advance. -->

                    We welcome guests with nannies or drivers, subject to availability. No discounts/ offers apply to domestic staff pricing.
                    <div class="h-2"></div>

                    WE HAVE ONE ROOM WITH TWO BEDS - AVAILABLE FOR NANNIES OR DRIVERS.
                    <div class="h-2"></div>

                    <b class="font-bold">NANNIES</b>
                    <br />
                    If not staying in a standard or family room [as a regular guest], Nannies are welcome to sleep in our dedicated staff quarters - bedding and water provided - and partake in all meals and make use of Jara's facilities. A separate food menu is available. Alcohol and the snack station is not included. Cost per night: N30,000 + 5% con tax.

                    <div class="h-2"></div>
                    <b class="font-bold">DRIVERS</b>
                    <br />
                    Drivers requiring accommodation are welcome to sleep in the allocated room, subject to availability (room access from 6pm) - bedding and water provided - and are not expected to remain inside the property between 9am and 6pm. Cost per night: N15,000 + 5% con tax. Food is available from a separate menu (below) and consumed in their room or at the back of the property, when paid in advance.

                    <div class="h-2"></div>
                    BREAKFAST Nigerian Breakfast (Boiled yam & Egg sauce) @ <b class="font-bold">N3,000</b>
                    <br />
                    LUNCH Indomie & Egg or Jollof Rice with Chicken & Beef Skewer@ <b class="font-bold">N4,000</b>
                    <br />
                    DINNER Nigerian Special @ <b class="font-bold">N5,000</b>
                </div>

                <div>
                    <div class="mt-4 font-semibold">Select your domestic staff</div>
                    <div class="mt-2 font-light ">
                        <template v-for="staff in ['nanny', 'driver']">
                            <label class="flex items-center mt-4" :key="staff">
                                <input type="checkbox" :value="staff" v-model="selectedStaff.type" class="w-5 h-5 mr-3 rounded focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                                <div class="capitalize">{{ staff }}</div>
                            </label>
                        </template>
                    </div>
                </div>

                <div>
                    <div class="mt-4 font-semibold">Select dates for domestic staff</div>
                    <div class="mt-2 font-light">
                        <template v-if="dates.length < 1">
                            No dates available
                        </template>
                        <template v-for="date in dates">
                            <label class="flex items-center mt-4" :key="date">
                                <input type="checkbox" :value="date" v-model="selectedDates" class="w-5 h-5 mr-3 rounded focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                                <div>{{ showDate(date) }}</div>
                            </label>
                            <!-- {{ checkAvailableDate(date, selectedStaff.type) }} -->
                            <div v-if="!checkAvailableDate(date, selectedStaff.type)" :key="date+'iis'" class="ml-8 text-sm text-gray-400">
                                Unavailable
                            </div>
                            <!-- <div v-if="availableStaffs[date]" :key="date+'ii'" class="ml-8 text-sm text-gray-400">
                                <span v-if="!availableStaffs[date].nanny">
                                    Nanny quaters is full for this day
                                </span>
                                <span v-if="!availableStaffs[date].driver">
                                    Driver quaters is full for this day
                                </span>
                            </div> -->
                        </template>
                    </div>
                </div>

                <div class="flex-1"></div>

                <div class="flex w-full mx-auto mt-8 space-x-2 md:w-2/3">
                    <MainButton outline @click="prev()">Back</MainButton>
                    <MainButton @click="next()">Next</MainButton>
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

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export default {
    data() {
        return {
            showStaff: false,
            selectedDates: [],
            selectedStaff: {
                menu: [],
                type: ["nanny"],
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
                    if (availData) {
                        if (availData.nanny == false) nannyBool = false;
                        if (availData.driver == false) driverBool = false;
                    }

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
        checkAvailableDate(date, staffTypes) {
            console.log("recalculate");
            console.log(staffTypes);
            const availData = this.availableStaffs[date];

            if (availData) {
                if (availData.nanny >= 2 && availData.driver >= 2) {
                    this.selectedDates = removeItemOnce(
                        this.selectedDates,
                        date
                    );
                    return false;
                }

                if (
                    staffTypes.includes("nanny") &&
                    !staffTypes.includes("driver")
                ) {
                    console.log(date + "---nanny");
                    if (availData.nanny >= 2) {
                        this.selectedDates = removeItemOnce(
                            this.selectedDates,
                            date
                        );
                        return false;
                    }
                }
                if (
                    staffTypes.includes("driver") &&
                    !staffTypes.includes("nanny")
                ) {
                    console.log(date + "---driver");
                    if (availData.driver >= 2) {
                        this.selectedDates = removeItemOnce(
                            this.selectedDates,
                            date
                        );
                        return false;
                    }
                }

                if (
                    staffTypes.includes("driver") &&
                    staffTypes.includes("nanny")
                ) {
                    if (availData.nanny >= 2 || availData.driver >= 2) {
                        this.selectedDates = removeItemOnce(
                            this.selectedDates,
                            date
                        );
                        return false;
                    }
                }

                return true;
            }

            {
                this.selectedDates = removeItemOnce(this.selectedDates, date);
                return false;
            }
        },
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
            let d = parseISO(date);
            try {
                d = format(parseISO(date), "iii, MMM. do yyyy");
            } catch {}

            return d;
        },
        updateSelection(details) {
            this.selectedStaff = details;
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
                .post("check-staffroom-booking", {
                    dates: this.dates,
                    oldBookingId: oldBookingId,
                })
                .then((res) => {
                    console.log("Staff data");
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

        if (
            this.$store.state.extras.dateStaff &&
            this.$store.state.extras.dateStaff.length > 0
        ) {
            this.selectedDates = this.$store.state.extras.dateStaff;
        } else {
            this.selectedDates = this.dates;
        }
    },
};
</script>
