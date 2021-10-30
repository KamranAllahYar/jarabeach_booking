<template>
    <div class="pb-60">
        <h1 class="px-6 mb-6 text-xl font-bold text-center md:px-0 md:text-2xl">Select the dates you would like to stay</h1>

        <div class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row md:px-6">
            <div class="w-full md:w-10/12">
                <div class="pt-6 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg">
                    <NewRoomCalendar class="w-full" @selected="selectRooms($event)" :initialRooms="rooms" @viewsetup="closeTour()" />
                    <!-- <hr /> -->

                    <!-- <RoomCalendar class="w-full" @selected="selectRooms($event)" :initialRooms="rooms" @viewsetup="closeTour()" /> -->

                    <div class="flex w-11/12 mx-auto mt-6 mb-6 space-x-2 md:space-x-6 md:w-9/12">
                        <MainButton @click="gotoBack()" outline>Back</MainButton>
                        <MainButton @click="gotoNext()" v-if="rooms.length > 0">Next</MainButton>
                    </div>
                </div>
                <div class="flex items-center w-full my-6 space-x-2">
                    <StartOverButton class="w-full"></StartOverButton>
                </div>
            </div>
            <!-- <pre>
              {{ extraPeople }}

              ----

              {{ hasVillaMix }}
            </pre> -->
            <div class="flex-shrink-0 w-full px-6 md:px-0 md:w-3/12">
                <ReservationBox showDiscount :hideExtraGuests="false" />
            </div>
        </div>

        <div v-if="showExtraSelection" class="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-20">
            <div class="w-full max-w-3xl p-12 bg-white rounded-md shadow-lg">
                You have {{ extraPeople.total }} extra guests. Please select how to sperate them

                <div class="grid grid-cols-3 mt-12 gap-x-6 gap-y-8">
                    <template v-for="extraType in ['big', 'teen', 'small']">
                        <div v-for="i in extraPeople[extraType]" :key="i+extraType">
                            <div>
                                <span v-if="extraType == 'big'">Adult</span>
                                <span v-else-if="extraType == 'teen'">Teen</span>
                                <span v-else-if="extraType == 'small'">Child</span>
                            </div>
                            <select @change="addToExtraRooms($event.target.value, extraType, i)" class="w-full border border-gray-400 rounded-md outline-none focus:ring focus:outline-none"
                                style="box-shadow: none">
                                <option value="">--SELECT ROOM--</option>
                                <option v-for="(room, ix) in uniqueRooms" :key="ix" :value="roomData[room.room_id].type">
                                    {{ roomData[room.room_id].name }}
                                </option>
                            </select>
                        </div>
                    </template>
                </div>

                <div class="flex w-11/12 mx-auto mt-12 space-x-2 md:space-x-6 md:w-6/12 md:justify-end md:ml-auto md:items-end">
                    <MainButton @click="selectionFinish(false)" outline>Change Rooms</MainButton>
                    <MainButton @click="selectionFinish(true)" v-if="Object.keys(extraRoomTypes).length >= extraPeople.total">Next</MainButton>
                </div>
            </div>
        </div>

        <v-tour name="myTour" :steps="steps">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                        v-if="tour.steps[tour.currentStep]"
                        :key="tour.currentStep"
                        :step="tour.steps[tour.currentStep]"
                        :previous-step="tour.previousStep"
                        :next-step="tour.nextStep"
                        :stop="tour.stop"
                        :skip="tour.skip"
                        :is-first="tour.isFirst"
                        :is-last="tour.isLast"
                        :labels="tour.labels">
                        <template v-if="tour.isLast">
                            <div slot="actions">
                                <button @click="tour.stop" class="px-3 py-1 border">Close</button>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
    </div>
</template>

<script>
const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export default {
    layout: "booking",
    data() {
        return {
            rooms: [],
            extraRoomTypes: {},
            steps: [
                {
                    target: "#roomSetup",
                    // header: {
                    //     title: "Get Started",
                    // },
                    content: `Please click here to<br />view our rooms.`,
                    params: {
                        placement: "top",
                    },
                },
            ],
            showExtraSelection: false,
            selectedExtra: false,
            extras: {},
        };
    },
    computed: {
        uniqueRooms() {
            const allRooms = this.rooms;

            let rooms = [];
            allRooms.forEach(function (room) {
                const found = rooms.find((r) => {
                    return r.room_id == room.room_id;
                });

                if (!found) {
                    rooms.push(room);
                }
            });

            return rooms;
        },
        roomOptions() {
            return this.$store.getters.roomsData;
        },
        roomData() {
            const roomData = this.$store.getters.roomsData;

            let rooms = {};
            for (let i = 0; i < roomData.length; i++) {
                const room = roomData[i];

                rooms[room.id] = room;
            }

            return rooms;
        },
        enoughRooms() {
            return this.$store.getters.confirmEnoughRooms;
        },
        totalPeople() {
            return this.$store.getters.totalPeople;
        },
        totalRooms() {
            return this.$store.getters.totalRooms;
        },
        extraPeople() {
            return this.$store.getters.extraPeople;
        },
        hasVillaMix() {
            return this.$store.getters.hasVillaMixed;
        },
        extraPeople() {
            return this.$store.getters.extraPeople;
        },
        // showExtraSelection() {},
    },
    methods: {
        selectionFinish(goNext = false) {
            let extras = [];
            for (const key in this.extraRoomTypes) {
                if (Object.hasOwnProperty.call(this.extraRoomTypes, key)) {
                    const anExtra = this.extraRoomTypes[key];

                    extras.push(anExtra);
                }
            }

            console.log(extras);
            this.$store.commit("UPDATE_VILLA_EXTRAS", extras);

            this.selectedExtra = true;
            this.showExtraSelection = false;

            if (goNext) {
                this.gotoNext(true);
            }
        },
        addToExtraRooms(roomType, extraType, index) {
            console.log(roomType, extraType, index);

            if (roomType == "") {
                delete this.extraRoomTypes[extraType + index];
            } else {
                this.extraRoomTypes[extraType + index] = {
                    room: roomType,
                    type: extraType,
                };
            }

            const temp = Object.assign({}, this.extraRoomTypes);
            this.extraRoomTypes = {};

            this.$nextTick(() => {
                this.extraRoomTypes = Object.assign({}, temp);
                console.log(this.extraRoomTypes);
            });
        },
        isSameRoomsAcrossDates() {
            const nights = Object.keys(groupBy(this.rooms, "date"));
            const totalRooms = Object.keys(
                groupBy(this.rooms, "room_id")
            ).length;

            let maxRoom = null;
            for (let i = 0; i < nights.length; i++) {
                const date = nights[i];

                const totalRoomsForDate = this.rooms.filter(
                    (r) => r.date == date
                ).length;

                if (maxRoom != null) {
                    if (maxRoom != totalRoomsForDate) return false;
                }

                maxRoom = totalRoomsForDate;

                console.log("total room for date: " + totalRoomsForDate);
            }

            return true;
        },
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
        async gotoNext(skipExtras = false) {
            if (!this.enoughRooms) {
                this.$toast.error(
                    `You have not selected enough rooms to accommodate the number / type of guests in your booking request -
                    please click <a target='_blank' class='mx-2 font-bold text-yellow-100' href='https://www.jarabeachresort.com/room-detail'>here</a> for room information.`
                );
                return;
            }

            if (!this.isSameRoomsAcrossDates()) {
                this.$toast.error(
                    "Please select the same amount of rooms across each date"
                );
            }

            if (this.totalRooms > this.totalPeople) {
                this.$toast.error(
                    "You have selected more rooms than number of guests expected. Please add more guests or select less rooms."
                );
                return;
            }

            if (!skipExtras) {
                if (this.hasVillaMix && this.extraPeople.total > 0) {
                    this.showExtraSelection = true;
                    return;
                }
            }

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
        getExtraValue(type, index) {
            if (this.extras[type + index]) {
                return this.extras[type + index].room;
            }
            return null;
        },
        transformExtras() {
            console.log("TRANSFORMING_-------");
            const extras = this.$store.getters.customVillaExtras;
            for (let i = 0; i < extras.length; i++) {
                const extra = extras[i];

                if (extra) {
                    this.extras[extra.type + (i + 1)] = extra;
                }
            }
        },
    },
    mounted() {
        const trigger = "viewTour";

        const hasShown = window.localStorage.getItem(trigger);

        if (!hasShown) {
            setTimeout(() => {
                this.$tours["myTour"].start();
                window.localStorage.setItem(trigger, true);
            }, 100);
        }

        setTimeout(() => {
            this.$store.commit("TOGGLE_FULL_PAGE_LOADER", false);
        }, 2000);
    },
    created() {
        console.log("STORE_ROOMS");
        this.rooms = this.$store.state.rooms.slice(0);

        console.log(this.rooms);
        console.log("-------CREATED--------");
        console.log(this.$store.getters.customVillaExtras);
        if (this.$store.getters.customVillaExtras.length > 0) {
            this.transformExtras();
        } else {
            this.$store.commit("UPDATE_VILLA_EXTRAS", []);
        }
    },
    middleware({ store, redirect, $toast }) {
        if (!store.state.guests_done) {
            // $toast.info("Please tell us the number of guests first");
            redirect("/guests");
        }
    },
};
</script>
