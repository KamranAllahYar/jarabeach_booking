<template>
    <div>
        <h1 class="mb-6 text-2xl font-bold text-center">What dates would you like to stay for?</h1>

        <div class="flex justify-center space-x-6">
            <div class="w-9/12">
                <div class="pt-6 bg-white border rounded-lg shadow-lg">
                    <RoomCalendar class="w-full" @selected="selectRooms($event)" :initialRooms="rooms" />

                    <div class="flex w-9/12 mx-auto mb-6 space-x-6" v-if="rooms.length > 0">
                        <MainButton @click="gotoBack()" outline>Back</MainButton>
                        <MainButton @click="gotoNext()">Next</MainButton>
                    </div>
                </div>
            </div>
            <div class="flex-shrink-0 w-3/12">
                <ReservationBox />
            </div>
        </div>
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
                booking_date: null,
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

            this.$store.commit("COMPLETE_AVAILABILITY");

            this.$router.push({ path: "/profile" });
        },
        gotoBack() {
            this.$store.commit("UPDATE_ROOMS", this.rooms);

            this.$router.push({ path: "/guests" });
        },
        selectRooms(rooms) {
            console.log(rooms);
            this.rooms = rooms.slice(0);
            this.$store.commit("UPDATE_ROOMS", rooms);
        },
    },
    created() {
        console.log("STORE_ROOMS");
        this.rooms = this.$store.state.rooms.slice(0);

        console.log(this.rooms);
    },
};
</script>

<style>
</style>
