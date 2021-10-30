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
            <div class="w-full max-w-lg p-12 bg-white rounded-md shadow-lg">
                Please specify which room your extra guests will be staying in
                <!-- You have {{ extraPeople.total }} extra guests. Please select how to sperate them -->

                <div class="grid grid-cols-2 mt-12 gap-x-6 gap-y-7">
                    <template v-for="extraType in ['big', 'teen', 'small']">
                        <div v-for="i in extraPeople[extraType]" :key="i+extraType">
                            <div class="text-sm">
                                <div class="flex items-center" v-if="extraType == 'big'">
                                    <svg class="flex-shrink-0 w-4 h-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.422 14.531a6.552 6.552 0 00-11.845 0M7.5 3.281a3.282 3.282 0 01-3.281 3.281 3.281 3.281 0 106.562 0A3.281 3.281 0 017.5 3.283v0z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.148 11.892a9.11 9.11 0 002.12-.63.938.938 0 00.476-1.225l-.86-2.006a2.813 2.813 0 01-.228-1.109V5.626a5.156 5.156 0 10-10.312 0v1.298c0 .38-.077.757-.228 1.108l-.86 2.006a.937.937 0 00.477 1.225 9.11 9.11 0 002.12.63" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="pl-2">Adult</div>
                                </div>
                                <div class="flex item-center" v-else-if="extraType == 'teen'">
                                    <svg class="flex-shrink-0 w-4 h-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" d="M61 29c-2.757 0-5 2.243-5 5v1h-4c-1.654 0-3 1.346-3 3 0 .768.29 1.469.766 2-.476.531-.766 1.232-.766 2s.29 1.469.766 2c-.476.531-.766 1.232-.766 2s.29 1.469.766 2a2.988 2.988 0 00-.756 1.9L39 48.159v-3.576a18.042 18.042 0 0010.74-13.658C52.145 30.564 54 28.503 54 26a5.01 5.01 0 00-4-4.899V20C50 8.882 40.657 2 32 2c-3.162 0-5.528.789-7.816 1.551C21.949 4.296 19.838 5 17 5c-5.4 0-7.287-1.702-7.293-1.707a.998.998 0 00-1.687.903c.037.183.778 3.741 3.441 6.233-.925.055-2.038-.009-3.145-.378a1 1 0 00-1.306 1.09c.041.288 1.019 6.702 6.44 10.129C11.455 21.927 10 23.787 10 26c0 2.503 1.855 4.564 4.26 4.925A18.044 18.044 0 0025 44.583v3.576L9.46 50.865A8.97 8.97 0 002 59.73V61a1 1 0 001 1h58a1 1 0 001-1V30a1 1 0 00-1-1zm-9-3a2.995 2.995 0 01-2.042 2.829c.013-.277.042-.549.042-.829v-4.816c1.161.414 2 1.514 2 2.816zM9.351 12.338c2.626.375 4.854-.352 4.966-.389a.999.999 0 00.131-1.843C12.6 9.182 11.46 7.49 10.795 6.091 12.165 6.576 14.171 7 17 7c3.162 0 5.528-.789 7.816-1.551C27.051 4.704 29.162 4 32 4c7.695 0 16 6.117 16 16v.963c-7.238-.543-8.958-6.925-9.03-7.206a1 1 0 00-1.97.241c-.001.299-.076 6.754-4.62 7.845.29-1.101.62-2.621.62-3.843a1 1 0 00-1.614-.79c-.085.066-8.586 6.573-15.939 2.895-3.828-1.914-5.461-5.679-6.096-7.767zM12 26c0-1.302.839-2.402 2-2.816V28c0 .28.029.552.042.829A2.995 2.995 0 0112 26zm4 2v-5.501c5.862 2.072 11.815-.694 14.751-2.46a25.795 25.795 0 01-.7 2.646A1 1 0 0031 24c4.537 0 6.68-3.362 7.53-6.54 1.512 2.348 4.374 5.176 9.47 5.506V28c0 8.822-7.178 16-16 16s-16-7.178-16-16zm16 18c1.736 0 3.41-.26 5-.721V49c0 2.757-2.243 5-5 5s-5-2.243-5-5v-3.721c1.59.461 3.264.721 5 .721zM4 59.73a6.978 6.978 0 015.801-6.895l15.305-2.665C25.666 53.474 28.54 56 32 56s6.334-2.526 6.894-5.829l10.948 1.904c.546.568 1.31.925 2.158.925h1v7H4zM60 60h-5v-8a1 1 0 00-1-1h-2c-.551 0-1-.449-1-1s.449-1 1-1a1 1 0 000-2c-.551 0-1-.449-1-1s.449-1 1-1a1 1 0 000-2c-.551 0-1-.449-1-1s.449-1 1-1a1 1 0 000-2c-.551 0-1-.449-1-1s.449-1 1-1h5a1 1 0 001-1v-2c0-1.304.836-2.416 2-2.829z" />
                                        <circle stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" cx="25" cy="26" r="2" />
                                        <circle stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" cx="39" cy="26" r="2" />
                                        <path stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" d="M36.77 32.638l-1.54-1.276C34.354 32.418 33.207 33 32 33s-2.354-.582-3.23-1.638l-1.54 1.276C28.493 34.161 30.187 35 32 35s3.507-.839 4.77-2.362z" />
                                    </svg>
                                    <div class="pl-2">
                                        (6 - 17)
                                    </div>
                                </div>
                                <div class="flex item-center" v-else-if="extraType == 'small'">
                                    <svg class="flex-shrink-0 w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="#225A89" stroke-width=".2" stroke-linecap="round" stroke-linejoin="round" d="M12 23a9.936 9.936 0 01-8.485-4.705.449.449 0 01-.029-.041 10.38 10.38 0 01-.642-1.219A10.03 10.03 0 012 13c-.015-.063-.5-3.312-.5-5 0-4.827 4.291-5.418 5.293-5.49C7.328 2.033 9.264.5 12 .5 16.36.5 22.5 2.827 22.5 8c0 1.657-.485 4.935-.505 5.073a9.947 9.947 0 01-.835 3.965c-.223.491-.467.94-.73 1.345a.467.467 0 01-.066.081C18.584 21.276 15.436 23 12 23zm-7.684-5.304a.343.343 0 01.029.041A8.943 8.943 0 0012 22a8.936 8.936 0 007.578-4.148c.02-.03.042-.06.068-.085.18-.291.4-.696.599-1.134.5-1.156.755-2.382.755-3.633.01-.106.5-3.416.5-5 0-4.483-5.555-6.5-9.5-6.5-2.761 0-4.628 1.835-4.646 1.854a.507.507 0 01-.353.146C6.817 3.501 2.5 3.57 2.5 8c0 1.614.49 4.893.495 4.926.005 1.328.26 2.55.764 3.704.177.396.361.747.557 1.066z" />
                                        <path stroke="#225A89" stroke-width=".2" stroke-linecap="round" stroke-linejoin="round" d="M21.288 15.5a.5.5 0 01-.48-.362l-1.185-4.14c-7.234-.06-10.164-1.862-11.33-3.121-.755 1.94-3.066 2.786-3.89 3.031l-1.21 4.229a.5.5 0 01-.961-.275l1.288-4.5a.498.498 0 01.366-.349c.037-.009 3.649-.891 3.649-3.454a.5.5 0 01.44-.496.494.494 0 01.546.377C8.529 6.467 9.659 10 20 10c.223 0 .419.147.48.362l1.288 4.5a.5.5 0 01-.48.638z" />
                                        <path stroke="#225A89" stroke-width=".2" stroke-linecap="round" stroke-linejoin="round" d="M21.48 16c-.116 0-.233-.011-.349-.021a.5.5 0 01-.449-.547.508.508 0 01.546-.449c.084.008.168.017.252.017a1.502 1.502 0 00.181-2.994.5.5 0 01-.437-.556.498.498 0 01.556-.437 2.503 2.503 0 01-.3 4.987zM2.5 16A2.503 2.503 0 010 13.5c0-1.278.957-2.348 2.225-2.487a.501.501 0 01.11.994A1.517 1.517 0 001 13.5c0 .827.673 1.5 1.5 1.5.08 0 .155-.007.219-.02a.496.496 0 01.59.389.5.5 0 01-.389.59c-.13.027-.272.041-.42.041zM8 15c-.827 0-1.5-.673-1.5-1.5S7.173 12 8 12s1.5.673 1.5 1.5S8.827 15 8 15zm0-2a.5.5 0 10.002 1.002A.5.5 0 008 13zM16 15c-.827 0-1.5-.673-1.5-1.5S15.173 12 16 12s1.5.673 1.5 1.5S16.827 15 16 15zm0-2a.5.5 0 10.002 1.002A.5.5 0 0016 13zM12 19.023a3.99 3.99 0 01-2.829-1.17.5.5 0 01.707-.707 3.003 3.003 0 004.243 0 .5.5 0 01.707.707A3.981 3.981 0 0112 19.023z" />
                                    </svg>
                                    <div class="pl-2">
                                        Child
                                    </div>
                                </div>
                            </div>
                            <select @change="addToExtraRooms($event.target.value, extraType, i)" class="w-full border border-gray-200 rounded-md outline-none focus:ring focus:outline-none"
                                style="box-shadow: none">
                                <option value="">--SELECT ROOM--</option>
                                <option v-for="(room, ix) in uniqueRooms" :key="ix" :value="roomData[room.room_id].type">
                                    {{ roomData[room.room_id].name }}
                                </option>
                            </select>
                        </div>
                    </template>
                </div>

                <div class="flex mx-auto mt-12 space-x-2 w-12/12 md:space-x-6 md:w-12/12 md:justify-end md:ml-auto md:items-end">
                    <MainButton @click="selectionFinish(false)" outline>Back to Availability</MainButton>
                    <MainButton @click="selectionFinish(true)" v-if="Object.keys(extraRoomTypes).length >= extraPeople.total">Done</MainButton>
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
