<template>
    <div>
        <h1 class="mb-6 text-2xl text-center">What dates would you like to stay for?</h1>

        <div class="grid grid-cols-12">
            <div class="col-span-10">

                <div class="py-6 bg-white border rounded-lg shadow-lg">
                    <RoomCalendar class="w-full mb-6" @selected="selectRooms($event)" />
                </div>

            </div>
            <!-- <div class="w"></div> -->
        </div>

        <!-- <div class="w-full">
            <RoomCalendar class="w-full mb-6" @selected="selectRooms($event)" />
        </div> -->
        <!--
        <Calendar class="w-1/2" />
        <div
            class="flex items-center p-3 space-x-10 bg-gray-100"
            v-for="(room, index) in rooms"
            :key="index">
            <div class="flex items-center w-1/2 space-x-5">
                <label for="date" class="">Dates:</label>
                <input type="date" id="date" v-model="room.date" />
            </div>
            <div class="flex items-center w-1/2 space-x-5">
                <label for="type" class="">Room-type Available:</label>
                <select name="type" id="type" v-model="room.room_id" class="text-sm">
                    <option value="">Select Room</option>
                    <option v-for="type in roomOptions" :key="type.id" :value="type.id">
                        {{ type.name }}
                    </option>
                </select>
            </div>
            <div class="rounded hover:bg-white" @click="removeRoom(index)">
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"></path>
                </svg>
            </div>
        </div>
        <div class="flex items-center justify-end py-2 space-x-3">
            <div class="bg-gray-100 rounded" @click="addRoom">
                <svg
                    class="w-6 h-6 cursor-pointer hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
            </div>
        </div> -->
        <!-- <span @click="gotoNext()" class="p-3 mt-10 bg-gray-200 rounded cursor-pointer ">Next</span> -->
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            noOfDays: 1,
            rooms: [],
        };
    },
    computed: {
        roomOptions() {
            return this.$store.getters.roomsData;
        },
    },
    methods: {
        addRoom() {
            this.rooms.push({
                date: null,
                room_id: null,
            });
        },
        removeRoom(i) {
            if (this.rooms.length == 1) {
                return;
            } else {
                this.rooms.splice(i, 1);
            }
        },
        gotoNext() {
            this.$store.commit("UPDATE_ROOMS", this.rooms);

            this.$router.push({ path: "/profile" });
        },
        selectRooms(rooms) {
            console.log(rooms);
            this.rooms = rooms;
        },
    },
};
</script>

<style>
</style>
