<template>
    <div class="flex flex-col w-full">
        <div class="flex items-center px-6 mb-6 space-x-4">
            <div class="flex items-center w-40 h-10 text-2xl font-semibold text-brand-blue-400">
                {{ months[calMonth-1] }}. {{calYear}}
            </div>

            <div class="flex items-center justify-end space-x-2">
                <div @click="prevMonth()" class="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full cursor-pointer text-brand-blue-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </div>
                <div @click="nextMonth()" class="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full cursor-pointer text-brand-blue-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
                <div class="w-7">
                    <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        </div>

        <div class="flex w-full" v-for="(monthDays, k) in [firstHalfDays, secondHalfDays]" :key="k">
            <div class="flex-shrink-0 bg-cal-box w-36">
                <div class="flex items-center px-6 text-xl font-bold border border-l-0 border-gray-100 h-14">
                    <span v-if="k == 0">
                        {{ months[calMonth-1] }}.
                        {{calYear}}
                    </span>
                </div>
                <div v-for="roomType in roomTypes" :key="roomType" class="flex items-center w-full px-6 capitalize border border-l-0 border-gray-100 h-14">
                    {{ roomType }}
                </div>
            </div>
            <div class="flex-1">
                <div class="grid" :class="`grid-cols-${monthDays.length}`">
                    <div v-for="w in monthDays" :key="w" class="flex flex-col items-center justify-center flex-shrink-0 text-sm text-center text-black border border-gray-100 bg-cal-box h-14">
                        <div class="text-base">{{ dayOfWeek(w) }}.</div>
                        <div class="text-base font-light">{{ w }}</div>
                    </div>
                </div>
                <div class="grid" :class="`grid-cols-${monthDays.length}`" v-for="roomType in roomTypes" :key="roomType">
                    <div v-for="day in monthDays" :key="day"
                        class="relative flex items-center justify-center flex-shrink-0 text-xl text-gray-500 border border-gray-100 cursor-pointer font-extralight bg-opacity-20 h-14"
                        :class="roomsAvailable(roomType, day) <= 0 ? 'bg-white' : 'bg-brand-blue-300'"
                        @click="selectRoom(roomType, day)">

                        <div v-if="isSingle(roomType, day)" class="flex items-center justify-center w-full h-10 transform scale-110 bg-green-300 rounded-full">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div v-else-if="isStart(roomType, day)" class="flex items-center justify-center w-full h-10 transform scale-110 bg-green-300 rounded-l-full">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div v-else-if="isEnd(roomType, day)" class="flex items-center justify-center w-full h-10 transform scale-110 bg-green-300 rounded-r-full">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div v-else-if="isBetween(roomType, day)" class="w-full h-10 transform scale-110 bg-green-300"></div>
                        <span v-else-if="loading">-</span>
                        <span v-else-if="roomsAvailable(roomType, day) <= 0">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 19 19">
                                <path d="M5.5415 3.1665L13.4582 15.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.4582 3.1665L5.5415 15.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span v-else>{{ roomsAvailable(roomType, day) }}</span>

                        <!-- POPOVER -->
                        <div v-if="isEnd(roomType, day)" @click.stop=""
                            class="absolute top-0 right-0 z-10 py-2 pl-3 pr-4 text-sm transform translate-x-full bg-white border rounded-lg w-36"
                            style="--tw-translate-x: 104%">
                            <div v-if="loadingRoomOptions">
                                <svg class="w-5 h-5 mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <div v-else>
                                <template v-for="h in hoveredRooms">
                                    <div v-if="h.available == true" :key="h.room.id" class="flex items-center py-2 cursor-pointer"
                                        @click="h.available == true ? addToBookedRoom(h.room.id, h.date) : ''">
                                        <svg v-if="!isBooked(h.room.id, h.date)" viewBox="0 0 16 16" class="inline-block w-6 h-6 mr-2 text-brand-blue" fill="none" stroke="currentColor">
                                            <path d="M8 14.703a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <svg v-else class="inline-block w-6 h-6 mr-2 text-brand-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                        </svg>

                                        <span class="text-gray-700 whitespace-nowrap">
                                            {{ h.room.name }}
                                        </span>
                                    </div>
                                </template>
                                <div class="px-1" v-if="hoveredRooms.length <= 0">
                                    No rooms available for booking on this date
                                </div>
                            </div>
                        </div>
                        <!-- POPOVER END -->

                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center p-6">
            <div class="flex items-center text-gray-600">
                <div class="w-5 h-5 mr-4 rounded-sm bg-cal-non-avail bg-opacity-20"></div> Not available
            </div>
            <div class="flex items-center text-gray-600 ml-14">
                <div class="w-5 h-5 mr-4 rounded-sm bg-cal-avail bg-opacity-20"></div> Available - numbers represent available rooms
            </div>
        </div>

        <!-- !!!! DONT REMOVE !!! : grid-cols-17 grid-cols-16 grid-cols-15 grid-cols-14 grid-cols-13 grid-cols-12 (for purgecss )-->
    </div>
</template>

<script>
import getDay from "date-fns/getDay";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import parseISO from "date-fns/parseISO";
import isWeekend from "date-fns/isWeekend";
import isToday from "date-fns/isToday";

var getDaysArray = function (s, e) {
    for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        a.push(new Date(d));
    }
    return a;
};

export default {
    props: ["initialRooms"],
    data() {
        return {
            rooms: [],
            calMonth: new Date().getMonth() + 1,
            calYear: new Date().getFullYear(),
            weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
            ],
            availableRooms: [],
            loading: false,
            hoveredRooms: [],
            bookedRooms: [],
            maxYear: new Date().getFullYear() + 1,
            maxMonth: new Date().getMonth() + 1,
            minYear: new Date().getFullYear(),
            minMonth: new Date().getMonth() + 1,

            startDate: null,
            endDate: null,
            seRoom: null,
            loadingRoomOptions: false,

            roomIds: [],
        };
    },
    computed: {
        daysInMonth() {
            return new Date(this.calYear, this.calMonth, 0).getDate();
        },
        firstHalfDays() {
            let num = Math.ceil(this.daysInMonth / 2);
            console.log(this.daysInMonth);

            const nums = [];
            for (let n = 1; n <= num; n++) {
                nums.push(n);
            }
            return nums;
        },
        secondHalfDays() {
            const num = this.daysInMonth - this.firstHalfDays.length + 1;

            console.log(num + 1);

            const nums = [];
            for (let n = num + 1; n <= this.daysInMonth; n++) {
                nums.push(n);
            }
            return nums;
        },
        dayMonth() {
            return new Date(this.calYear, this.calMonth, 0);
        },
        firstWeekDay() {
            return getDay(new Date(this.calYear, this.calMonth - 1, 1)) + 1;
        },
        roomTypes() {
            const types = [];
            this.rooms.forEach((room) => {
                if (!types.includes(room.type)) {
                    types.push(room.type);
                }
            });

            return types;
        },
        isMaxMonthYear() {
            return (
                this.calYear >= this.maxYear && this.calMonth >= this.maxMonth
            );
        },
        isMinMonthYear() {
            return (
                this.calYear <= this.minYear && this.calMonth <= this.minMonth
            );
        },
    },
    methods: {
        getDateStr(date) {
            let m = this.calMonth;
            if (m < 10) m = `0${m}`;
            let d = date;
            if (date < 10) d = `0${date}`;
            return `${this.calYear}-${m}-${d}`;
        },
        isBooked(room_id, dateStr) {
            return this.roomIds.includes(room_id);
        },
        addToBookedRoom(room_id, dateStr) {
            if (this.roomIds.includes(room_id)) {
                const ix = this.roomIds.findIndex((rid) => rid == room_id);
                if (ix >= 0) {
                    this.roomIds.splice(ix, 1);
                }
            } else {
                this.roomIds.push(room_id);
            }

            this.generateAndEmitBookedRooms();
        },
        generateAndEmitBookedRooms() {
            const dates = this.getDatesInbetween();

            let bookedRooms = [];

            this.roomIds.forEach((roomId) => {
                dates.forEach((date) => {
                    bookedRooms.push({
                        room_id: roomId,
                        date: date,
                        isWeekend: isWeekend(parseISO(date)),
                    });
                });
            });

            this.$emit("selected", bookedRooms);
        },
        isStart(roomType, date) {
            if (this.seRoom != roomType) return false;
            if (this.startDate == null) return false;
            const dateStr = this.getDateStr(date);
            return this.startDate == dateStr;
        },
        isEnd(roomType, date) {
            if (this.seRoom != roomType) return false;
            if (this.endDate == null) return false;
            const dateStr = this.getDateStr(date);
            return this.endDate == dateStr;
        },
        isSingle(roomType, date) {
            return this.isStart(roomType, date) && this.isEnd(roomType, date);
        },
        isBetween(roomType, date) {
            if (this.seRoom != roomType) return false;
            if (this.startDate == null || this.endDate == null) return false;

            const startStr = this.startDate.substring(0, 10);
            const endStr = this.endDate.substring(0, 10);

            return (
                isAfter(parseISO(this.getDateStr(date)), parseISO(startStr)) &&
                isBefore(parseISO(this.getDateStr(date)), parseISO(endStr))
            );

            console.log(startStr, endStr);
        },
        selectRoom(roomType, date) {
            if (this.roomsAvailable(roomType, date) <= 0) return;
            const dateStr = this.getDateStr(date);

            this.seRoom = roomType;
            if (this.startDate == null) {
                this.startDate = dateStr;
            } else if (this.endDate == null) {
                if (isBefore(parseISO(dateStr), parseISO(this.startDate))) {
                    this.endDate = this.startDate;
                    this.startDate = dateStr;

                    this.getRoomsAvailableForPeriod();
                } else {
                    this.endDate = dateStr;

                    this.getRoomsAvailableForPeriod();
                }
            } else {
                this.endDate = null;
                this.startDate = dateStr;
            }
        },
        getRoom(roomId) {
            return this.rooms.find((room) => room.id == roomId);
        },
        roomsAvailable(roomType, date) {
            let m = this.calMonth;
            if (m < 10) m = `0${m}`;

            let d = date;
            if (date < 10) d = `0${date}`;

            const dateStr = `${this.calYear}-${m}-${d}`;
            const roomsHere = this.availableRooms[dateStr];

            if (isToday(parseISO(dateStr))) {
                const today = new Date();
                const todayHrs = today.getHours();
                if (todayHrs >= 11) return 0;
            } else if (isBefore(parseISO(dateStr), new Date())) {
                return 0;
            }

            let count = 0;

            if (roomsHere) {
                roomsHere.forEach((room, ix) => {
                    const rs = this.roomTypeIds(roomType);
                    if (rs.includes(room.room_id)) {
                        if (room.available == true) count++;
                    }
                });
            }

            return count;
        },
        roomTypeIds(roomType) {
            return this.rooms
                .filter((room) => room.type == roomType)
                .map((room) => room.id);
        },
        dayOfWeek(day) {
            return this.weekDays[
                getDay(new Date(this.calYear, this.calMonth - 1, day))
            ];
        },
        nextMonth() {
            if (this.isMaxMonthYear) {
                this.$toast.info("You cannot book more than a year ahead");
                return;
            }

            if (this.calMonth == 12) {
                this.calMonth = 1;
                this.calYear++;
            } else {
                this.calMonth++;
            }

            this.getRoomsForMonth();
        },
        prevMonth() {
            if (this.isMinMonthYear) {
                this.$toast.info("You cannot book in the past");
                return;
            }

            if (this.calMonth == 1) {
                this.calMonth = 12;
                this.calYear--;
            } else {
                this.calMonth--;
            }

            this.getRoomsForMonth();
        },
        getRooms() {
            this.$axios.get("/rooms").then((res) => {
                this.rooms = res.data.data;
            });
        },
        getRoomsForMonth() {
            this.loading = true;

            const dataToSend = {
                date: `${this.calYear}-${this.calMonth}-01`,
                days: this.daysInMonth,
            };

            setTimeout(() => {
                this.$axios
                    .post("/available-rooms-days", dataToSend)
                    .then((res) => {
                        this.availableRooms = res.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }, 0);
        },
        async getRoomsAvailableForPeriod() {
            this.loadingRoomOptions = true;
            const date = this.startDate;
            this.roomIds = [];

            await this.$axios
                .post("/check-rooms", {
                    start: this.startDate,
                    end: this.endDate,
                    type: this.seRoom,
                })
                .then((res) => {
                    console.log(res.data.data);
                    const aRooms = res.data.data;

                    this.hoveredRooms = [];
                    aRooms.map((room) => {
                        this.hoveredRooms.push({
                            room: room,
                            available: true,
                            date: date,
                        });
                    });
                });

            this.loadingRoomOptions = false;
        },
        getDatesInbetween() {
            if (this.startDate == null || this.endDate == null) return [];

            var dateList = getDaysArray(
                new Date(this.startDate),
                new Date(this.endDate)
            ).map((v) => v.toISOString().slice(0, 10));

            console.log(dateList);

            return dateList;
        },
    },
    mounted() {
        this.getRooms();
        this.getRoomsForMonth();

        console.log("ROOM CALENDAR MOUNTED");
        console.log(this.initialRooms);

        // if (this.initialRooms) {
        //     this.bookedRooms = this.initialRooms;
        // }
    },
};
</script>

<style>
.show-from-top-enter-active,
.show-from-top-leave-active {
    transition: transform 100ms, opacity 100ms;
}
.show-from-top-enter,
.show-from-top-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
