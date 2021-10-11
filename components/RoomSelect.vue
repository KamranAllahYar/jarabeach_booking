<template>
    <div style="min-width: 185px">
        <!-- {{ startDate }} - {{ endDate }} - {{ seRoom }} -->
        <!-- {{ initialRooms }} -->
        <div class="flex items-center justify-between p-2 bg-gray-100">
            <button @click="prevDate()" :class="canPrev ? '' : 'opacity-50 cursor-not-allowed'" :disabled="!canPrev">
                <svg class="w-6 h-6 transform rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
            </button>
            <div>
                {{ formatDate(currentDate) }}
            </div>
            <button @click="nextDate()" :class="canNext ? '' : 'opacity-50 cursor-not-allowed'" :disabled="!canNext">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        <div class="flex px-3 py-2 space-x-5">
            <div class="w-full text-center" v-if="loading">
                <svg class="w-5 h-5 mx-auto text-center text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
            <div class="w-full" v-else :style="currentRooms && currentRooms.length > 5 ? 'width: 350px' : 'width: 185px'">
                <div class="grid w-full grid-flow-col" :class="popoverGridPatternClass">
                    <div class="text-center" v-if="currentRooms && currentRooms.length <= 0">
                        No Rooms on this day
                    </div>
                    <div class="flex items-center py-2 cursor-pointer" v-for="room in currentRooms" :key="room.id"
                        @click="selectRoom(room, currentDate)">
                        <svg v-if="!isRoomSelected(room, currentDate)" viewBox="0 0 16 16" class="flex-shrink-0 inline-block w-6 h-6 mr-2 text-brand-blue" fill="none" stroke="currentColor">
                            <path d="M8 14.703a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg v-else class="flex-shrink-0 inline-block w-6 h-6 mr-2 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        <span class="text-gray-700 whitespace-nowrap">
                            {{ room.name }}
                        </span>
                    </div>
                </div>
                <div class="py-2 text-xs text-left">
                    <button class="flex items-center justify-end w-full pt-2 text-gray-800" @click="$emit('back')">
                        <svg class="w-3 h-3 transform rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        Back
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import isWeekend from "date-fns/isWeekend";

const getDatesBetweenDates = (startDate, endDate) => {
    let dates = [];
    //to avoid modifying the original date
    const theDate = new Date(startDate);
    while (theDate < endDate) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
    }

    dates.push(endDate);
    return dates;
};

export default {
    props: {
        startDate: String,
        endDate: String,
        seRoom: String,
        initialRooms: Array,
        notAllRooms: Boolean,
    },
    watch: {
        initialRooms: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.setupInitialRooms();
            }
        },
    },
    data() {
        return {
            dateIndex: 0,
            dates: [],
            weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            allRooms: [],
            loading: false,
            selectedRooms: [],
        };
    },
    computed: {
        popoverGridPatternClass() {
            const totalRooms = this.currentRooms.length;
            if (totalRooms <= 0) {
                return "grid-rows-0 grid-cols-1";
            }

            if (this.notAllRooms) {
                if (this.seRoom == "family") {
                    return `grid-rows-${totalRooms} grid-cols-2`;
                }
                if (this.seRoom == "standard") {
                    return `grid-rows-${totalRooms} grid-cols-2`;
                }
            }

            if (totalRooms < 5) {
                return `grid-rows-${totalRooms} grid-cols-2`;
            }

            return "grid-rows-5 grid-cols-2";

            // "grid-rows-1 grid-rows-2 grid-rows-3 grid-rows-4 grid-rows-5"
        },
        currentDate() {
            return this.dates[this.dateIndex];
        },
        currentRooms() {
            if (this.dates.length <= 0) return [];
            return this.allRooms[format(this.currentDate, "yyyy-MM-dd")];
        },
        canNext() {
            return this.dateIndex < this.dates.length - 1;
        },
        canPrev() {
            return this.dateIndex > 0;
        },
    },
    methods: {
        formatDate(date) {
            return this.weekDays[getDay(date)] + format(date, ". d MMM");
        },
        nextDate() {
            if (this.dateIndex >= this.dates.length - 1) {
                this.dateIndex = 0;
            } else {
                this.dateIndex += 1;
            }
        },
        prevDate() {
            if (this.dateIndex <= 0) {
                this.dateIndex = this.dates.length - 1;
            } else {
                this.dateIndex -= 1;
            }
        },
        async getAvailableDates() {
            this.loading = true;

            let bookingId = null;
            if (this.$store.state.editMode) {
                bookingId = this.$store.state.editBooking.id;
            }

            return await this.$axios
                .post("/check-dates", {
                    start: this.startDate,
                    end: this.endDate,
                    type: this.notAllRooms ? this.seRoom : null,
                    // type: this.seRoom,
                    booking_id: bookingId,
                })
                .then((res) => {
                    console.log(res.data.data);
                    const aRooms = res.data.data;

                    this.allRooms = aRooms;
                })
                .finally(() => {
                    // this.loadingRoomOptions = false;
                    this.loading = false;
                });
        },
        selectRoom(room, date) {
            if (this.isRoomSelected(room, date)) {
                for (let i = 0; i < this.selectedRooms.length; i++) {
                    const selectedRoom = this.selectedRooms[i];
                    if (
                        selectedRoom.room_id === room.id &&
                        selectedRoom.date === format(date, "yyyy-MM-dd")
                    ) {
                        this.selectedRooms.splice(i, 1);
                        return;
                    }
                }

                // this.selectedRooms = this.selectedRooms.filter(
                //     (r) =>
                //         r.id !== room.id &&
                //         r.date !== format(date, "yyyy-MM-dd")
                // );

                console.log("Already selected");
            } else {
                this.selectedRooms.push({
                    room_id: room.id,
                    date: format(date, "yyyy-MM-dd"),
                    isWeekend: isWeekend(date),
                });
            }

            this.emitSelectedRooms();
        },
        isRoomSelected(room, date) {
            for (let i = 0; i < this.selectedRooms.length; i++) {
                const selectedRoom = this.selectedRooms[i];
                if (
                    selectedRoom.room_id === room.id &&
                    selectedRoom.date === format(date, "yyyy-MM-dd")
                ) {
                    return true;
                }
            }

            return false;
        },
        emitSelectedRooms() {
            this.$emit("selected", this.selectedRooms);
        },
        setupInitialRooms() {
            this.selectedRooms = this.initialRooms;
        },
    },
    created() {
        console.log("Room Select Created ----");
        this.setupInitialRooms();

        const startDate = parseISO(this.startDate);
        const endDate = parseISO(this.endDate);

        this.dates = getDatesBetweenDates(startDate, endDate);

        this.getAvailableDates();
    },
};
</script>
