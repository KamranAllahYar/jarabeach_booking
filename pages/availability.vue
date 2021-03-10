<template>
    <div class="pb-60">
        <h1 class="px-6 mb-6 text-xl font-bold text-center md:px-0 md:text-2xl">What dates would you like to stay for?</h1>

        <div class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row md:px-6">
            <div class="w-full md:w-10/12">
                <div class="pt-6 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg">
                    <RoomCalendar class="w-full" @selected="selectRooms($event)" :initialRooms="rooms" @viewsetup="closeTour()" />

                    <div class="flex w-11/12 mx-auto mb-6 space-x-2 md:space-x-6 md:w-9/12" v-if="rooms.length > 0">
                        <MainButton @click="gotoBack()" outline>Back</MainButton>
                        <MainButton @click="gotoNext()">Next</MainButton>
                    </div>
                </div>
            </div>
            <div class="flex-shrink-0 w-full px-6 md:px-0 md:w-3/12">
                <ReservationBox />
            </div>
        </div>

        <v-tour name="myTour" :steps="steps"></v-tour>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            noOfDays: 1,
            rooms: [],
            steps: [
                {
                    target: "#roomSetup",
                    // header: {
                    //     title: "Get Started",
                    // },
                    content: `Click here to see what<br />the rooms look like`,
                    params: {
                        placement: "top",
                    },
                },
            ],
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
        async gotoNext() {
            this.$store.commit("UPDATE_ROOMS", this.rooms);

            this.$store.commit("COMPLETE_AVAILABILITY");

            if (this.$store.state.editMode) {
                const oldBooking = this.$store.state.editBooking;
                await this.$store.dispatch("extras/loadOldExtras", oldBooking);
            }

            this.$router.push({ path: "/extras" });
        },
        gotoBack() {
            this.$store.commit("UPDATE_ROOMS", this.rooms);

            this.$router.push({ path: "/guests" });
        },
        selectRooms(rooms) {
            console.log("Availability page");
            console.log(rooms);
            this.rooms = rooms.slice(0);
            console.log(this.rooms);
            this.$store.commit("UPDATE_ROOMS", rooms);
        },
        closeTour() {
            this.$tours["myTour"].stop();
        },
    },
    mounted() {
      setTimeout(() => {
        this.$tours["myTour"].start();
      }, 100)
    },
    created() {
        console.log("STORE_ROOMS");
        this.rooms = this.$store.state.rooms.slice(0);

        console.log(this.rooms);
    },
    middleware({ store, redirect, $toast }) {
        if (!store.state.guests_done) {
            $toast.info("Please tell us the number of guests first");
            redirect("/guests");
        }
    },
};
</script>
