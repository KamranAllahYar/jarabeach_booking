<template>
    <div class="flex flex-col w-full">
        <div class="flex items-center justify-between px-6 mb-6 space-x-4">
            <div class="flex items-center h-10 text-2xl font-semibold text-brand-blue-400">
                {{ months[calMonth-1] }}. {{calYear}}
            </div>
            <div class="flex items-center space-x-4">
                <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <button class="px-4 text-white rounded-md bg-brand-blue-400" @click="prevMonth()">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </button>
                <button class="px-4 text-white rounded-md bg-brand-blue-400" @click="nextMonth()">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="flex w-full">
            <div class="w-48">
                <div class="flex items-center px-6 text-xl font-bold border border-l-0 border-gray-100 h-14">
                    {{ months[calMonth-1] }}.
                    {{calYear}}
                </div>
                <div v-for="roomType in roomTypes" :key="roomType" class="flex items-center w-full px-6 capitalize border border-l-0 border-gray-100 h-14">
                    {{ roomType }}
                </div>
            </div>
            <div class="flex-1 overflow-auto">
                <div class="flex">
                    <div v-for="w in daysInMonth" :key="w" class="flex flex-col items-center justify-center flex-shrink-0 text-sm text-center text-black border border-gray-100 w-14 h-14">
                        <div class="text-base">{{ dayOfWeek(w) }}.</div>
                        <div class="text-base font-light">{{ w }}</div>
                    </div>
                </div>
                <div class="flex" v-for="roomType in roomTypes" :key="roomType">
                    <div v-for="day in daysInMonth" :key="day"
                        v-popover.right="{ name: 'rooms-available' }"
                        class="flex items-center justify-center flex-shrink-0 text-2xl text-gray-500 border border-gray-100 cursor-pointer font-extralight w-14 bg-opacity-20 h-14"
                        :class="roomsAvailable(roomType, day) <= 0 ? 'bg-brand-red' : 'bg-brand-blue-300'"
                        @click="hoverRoom(roomType, day)">
                        <transition name="fade">
                            <span v-if="loading">-</span>
                            <span v-else>{{ roomsAvailable(roomType, day) }}</span>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center p-6">
            <div class="flex items-center text-gray-600">
                <div class="w-6 h-6 mr-4 bg-brand-red bg-opacity-20"></div> Not available
            </div>
            <div class="flex items-center text-gray-600 ml-14">
                <div class="w-6 h-6 mr-4 bg-brand-blue-300 bg-opacity-20"></div> Available
            </div>
        </div>

        <popover
            event="click"
            transition="show-from-top"
            pointer
            :name="`rooms-available`">
            <div class="flex flex-col py-2 space-y-3">
                <template v-for="h in hoveredRooms">
                    <div v-if="h.available == true" :key="h.room.id" class="flex items-center cursor-pointer"
                        :class="h.available == true ? 'text-brand-blue' : 'text-red-600'"
                        @click="h.available == true ? addToBookedRoom(h.room.id, h.date) : ''">
                        <svg v-if="!isBooked(h.room.id, h.date)" class="inline-block w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 20a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8m0-18A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" />
                        </svg>
                        <svg v-else class="inline-block w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>

                        <span class="text-gray-700">
                            {{ h.room.name }}
                        </span>
                    </div>
                </template>
                <div class="px-1" v-if="hoveredRooms.length <= 0">
                    No rooms available for booking on this date
                </div>
            </div>
        </popover>

        <div class="flex">
            <!-- <div class="ml-12">
                <div v-for="h in hoveredRooms" :key="h.room.id"
                    class="text-blue-600 cursor-pointer">
                    {{ h.room.name }}
                    <span v-if="h.available == false">- closed</span>
                    <span v-else-if="h.available == true"></span>
                    <span v-else>- {{h.available}}</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import getDay from "date-fns/getDay";
import isBefore from "date-fns/isBefore";
import parseISO from "date-fns/parseISO";
import isWeekend from "date-fns/isWeekend";

export default {
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
        };
    },
    computed: {
        daysInMonth() {
            return new Date(this.calYear, this.calMonth, 0).getDate();
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
    },
    methods: {
        isBooked(room_id, dateStr) {
            const ix = this.bookedRooms.findIndex(
                (br) => room_id == br.room_id && br.date == dateStr
            );

            return ix >= 0;
        },
        addToBookedRoom(room_id, dateStr) {
            const ix = this.bookedRooms.findIndex(
                (br) => br.room_id == room_id && br.date == dateStr
            );

            if (ix < 0) {
                this.bookedRooms.push({
                    room_id: room_id,
                    date: dateStr,
                    isWeekend: isWeekend(parseISO(dateStr)),
                });
            } else {
                this.bookedRooms.splice(ix, 1);
            }

            this.$emit("selected", this.bookedRooms);
        },
        hoverRoom(roomType, date) {
            this.hoveredRooms = [];

            if (this.roomsAvailable(roomType, date) <= 0) return;
            console.log(roomType);

            let m = this.calMonth;
            if (m < 10) m = `0${m}`;

            let d = date;
            if (date < 10) d = `0${date}`;

            const dateStr = `${this.calYear}-${m}-${d}`;
            console.log(dateStr);

            const roomsHere = this.availableRooms[dateStr];
            if (roomsHere) {
                roomsHere.forEach((room, ix) => {
                    const rs = this.roomTypeIds(roomType);

                    if (rs.includes(room.room_id)) {
                        this.hoveredRooms.push({
                            room: this.getRoom(room.room_id),
                            available: room.available,
                            date: dateStr,
                        });
                    }
                });
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

            if (isBefore(parseISO(dateStr), new Date())) {
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
            if (this.calMonth == 12) {
                this.calMonth = 1;
                this.calYear++;
            } else {
                this.calMonth++;
            }

            this.getRoomsForMonth();
        },
        prevMonth() {
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
    },
    mounted() {
        this.getRooms();
        this.getRoomsForMonth();
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
