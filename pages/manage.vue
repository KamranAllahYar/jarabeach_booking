<template>
    <div>
        <div class="text-xl font-bold text-center md:text-2xl">
            Manage your booking
        </div>

        <div class="flex flex-col justify-center mt-10 mb-20 md:space-x-6 md:flex-row">
            <div class="order-last w-full max-w-md mt-10 md:mt-0 md:order-none md:w-1/3">
                <form @submit.prevent="findBooking()" class="flex-shrink-0 block w-full px-6 py-6 bg-white border rounded-lg shadow-lg">
                    <div class="border rounded-lg">
                        <div class="p-4">
                            <div class="mb-4 font-semibold">Booking Reference</div>

                            <div class="flex items-center pl-2 space-x-2 rounded-md focus-within:ring">
                                <svg viewBox="0 0 15 15" class="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1875 7.5A2.3444 2.3444 0 0114.14 5.1875a.46804.46804 0 00.2803-.15919.46741.46741 0 00.1109-.30269V3.28125a.93747.93747 0 00-.2745-.66291.93767.93767 0 00-.6629-.27459H1.40625a.93749.93749 0 00-.9375.9375v1.44563A.46813.46813 0 00.86 5.18875a2.34435 2.34435 0 011.9591 2.3125A2.34437 2.34437 0 01.86 9.81375a.46876.46876 0 00-.39125.46185v1.4432c0 .2486.09877.487.27459.6629a.93748.93748 0 00.66291.2745H13.5938c.2486 0 .487-.0987.6629-.2745a.93767.93767 0 00.2745-.6629v-1.4457a.4674.4674 0 00-.1109-.30266.46804.46804 0 00-.2803-.15919 2.34443 2.34443 0 01-1.399-.79849A2.34412 2.34412 0 0112.1875 7.5v0zM7.5 5.625h3.2812" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.60938 10.3125c.64722 0 1.17182-.52467 1.17182-1.17188 0-.6472-.5246-1.17187-1.17182-1.17187-.64721 0-1.17188.52467-1.17188 1.17187 0 .64721.52467 1.17188 1.17188 1.17188zM4.6875 4.92188a.23444.23444 0 01.14468-.21654.23441.23441 0 01.25542.05081.2344.2344 0 01.05081.25542.2344.2344 0 01-.21653.14468.23433.23433 0 01-.16573-.06865.23433.23433 0 01-.06865-.16572M4.6875 7.73437a.23443.23443 0 01.14468-.21653.23441.23441 0 01.25542.05081.2344.2344 0 01.05081.25542.2344.2344 0 01-.21653.14468.23433.23433 0 01-.16573-.06865.23433.23433 0 01-.06865-.16573zM4.6875 10.5469a.23457.23457 0 01.14468-.2166.23453.23453 0 01.25542.0508.23465.23465 0 01.06415.1201.23446.23446 0 01-.01334.1354.23482.23482 0 01-.08632.1052.23473.23473 0 01-.13021.0394.23412.23412 0 01-.16573-.0686.23447.23447 0 01-.06865-.1657z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input type="text" v-model="booking_ref" required placeholder="34ERBUI1" class="w-full px-0 border-0 border-transparent rounded-md" style="box-shadow: none" />
                            </div>
                        </div>
                        <div class="p-4 border-t">
                            <div class="mb-4 font-semibold">Last Name</div>

                            <div class="flex items-center pl-2 space-x-2 rounded-md focus-within:ring">
                                <svg viewBox="0 0 15 15" class="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.4221 14.5312a6.55244 6.55244 0 00-2.4175-2.7337 6.5535 6.5535 0 00-3.50495-1.0163 6.55326 6.55326 0 00-3.50492 1.0163 6.55215 6.55215 0 00-2.41758 2.7337M7.5 3.28125A3.28189 3.28189 0 014.21875 6.5625c0 .87024.3457 1.70484.96106 2.32019A3.28121 3.28121 0 0010.7812 6.5625a3.28119 3.28119 0 01-2.32014-.96106A3.28121 3.28121 0 017.5 3.28125v0z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.1473 11.8919a9.11006 9.11006 0 002.1193-.6294.93767.93767 0 00.4894-.5152.93758.93758 0 00-.0125-.7104l-.86-2.00628a2.8125 2.8125 0 01-.2275-1.10812V5.625A5.15617 5.15617 0 007.49976.46875 5.15627 5.15627 0 002.34351 5.625v1.2975a2.8125 2.8125 0 01-.2275 1.10812l-.86 2.00628a.9374.9374 0 00-.01252.7104.93765.93765 0 00.48939.5152 9.10925 9.10925 0 002.11938.6294" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <input type="text" v-model="last_name" required placeholder="Okpala" class="w-full px-0 border-0 border-transparent rounded-md" style="box-shadow: none" />
                            </div>
                        </div>
                    </div>

                    <div class="flex w-full mt-6 space-x-3">
                        <MainButton type="button" outline @click="gotoBack()">Back</MainButton>
                        <MainButton :loading="loading">
                            Find Booking
                        </MainButton>
                    </div>
                </form>
            </div>

            <div class="w-full px-4 md:px-0 md:w-1/3" v-if="fullBooking">
                <div class="mx-auto mt-6 mb-6 text-gray-800 border rounded-md border-brand-blue-300 bg-brand-blue-100">
                    <div class="px-3 py-3 text-xl font-bold border-b border-brand-blue-300">Your Booking</div>

                    <div class="flex items-center justify-between px-3 my-3">
                        <div>Booking Ref</div>
                        <div class="font-bold">
                            #{{ fullBooking.ref }}
                        </div>
                    </div>
                    <div class="flex items-center justify-between px-3 my-3">
                        <div>Number of Nights</div>
                        <div class="font-bold">
                            {{ totalNights }} Night<span v-if="totalNights > 1">s</span>
                        </div>
                    </div>
                    <div class="flex items-start justify-between px-3 my-3">
                        <div>Room(s)</div>
                        <div class="font-bold">
                            <div class="mb-1 text-right" v-for="(room, ix) in fullBooking.rooms" :key="ix">
                                <div>{{ formatDate(room.date) }}</div>
                                <div class="text-xs text-gray-600">{{ roomName(room.room_id) }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.cake">
                        <div>Cake</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.cake.date) }}
                        </div>
                    </div> -->
                    <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.cakes[0]">
                        <div>Cakes</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.cakes[0].date) }}
                        </div>
                    </div>
                    <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.photoshoot">
                        <div>Photoshoot</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.photoshoot.date) }}
                        </div>
                    </div>
                    <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.drinks[0]">
                        <div>Drinks</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.drinks[0].date) }}
                        </div>
                    </div>
                    <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.decorations[0]">
                        <div>Decorations</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.decorations[0].date) }}
                        </div>
                    </div>
                    <div class="flex items-start justify-between px-3 my-3" v-if="fullBooking.domestic_staff">
                        <div>Domestic Staff</div>
                        <div class="flex flex-col items-end justify-end font-bold">
                            <div v-for="(date, ix) in fullBooking.domestic_staff.dates" :key="'d'+ix">
                                {{ formatDate(date) }}
                            </div>
                        </div>
                    </div>
                    <!-- <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.massage">
                        <div>Massage</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.massage.date) }}
                        </div>
                    </div> -->
                    <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.new_massage">
                        <div>Massage</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.new_massage.date) }}
                        </div>
                    </div>
                    <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.quadbike">
                        <div>Quad Bikes</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.quadbike.date) }}
                        </div>
                    </div>
                    <div class="flex items-center justify-between px-3 my-3" v-if="fullBooking.lookouts[0]">
                        <div>Dining Experience</div>
                        <div class="font-bold">
                            {{ formatDate(fullBooking.lookouts[0].date) }}
                        </div>
                    </div>
                </div>

                <button disabled class="w-full px-4 py-2 font-bold text-gray-500 border border-gray-400 rounded-lg cursor-not-allowed focus:ring-2 ring-offset-1 ring-gray-400 hover:border-gray-500 focus:outline-none" v-if="fullBooking.payment.status == 'pending'">UNPAID</button>
                <button disabled class="w-full px-4 py-2 font-bold text-gray-500 border border-gray-400 rounded-lg cursor-not-allowed focus:ring-2 ring-offset-1 ring-gray-400 hover:border-gray-500 focus:outline-none" v-else-if="!canUpdate">UPDATE NOT AVAILABLE</button>
                <MainButton v-else @click="loadOldBooking()">Update Booking</MainButton>
                <!-- {{ canUpdate }}
                <pre>{{ fullBooking }}</pre> -->
            </div>
        </div>
    </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import differenceInHours from "date-fns/differenceInHours";

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export default {
    layout: "booking",
    data() {
        return {
            booking_ref: "",
            last_name: "",
            loading: false,
            fullBooking: null,
            admin_mode: false,
        };
    },
    computed: {
        rooms() {
            return this.$store.getters.roomsData;
        },
        totalNights() {
            if (this.fullBooking) {
                return Object.keys(groupBy(this.fullBooking.rooms, "date"))
                    .length;
            }
            return 0;
        },
        totalRooms() {
            if (this.fullBooking) {
                return Object.keys(groupBy(this.fullBooking.rooms, "room_id"))
                    .length;
            }
            return 0;
        },
        earliestDate() {
            if (this.fullBooking) {
                if (this.fullBooking.rooms.length > 0) {
                    return this.fullBooking.dates[0];
                }
            }
            return null;
        },
        canUpdate() {
            if (!this.earliestDate) return false;

            const hoursDiff = differenceInHours(
                parseISO(this.earliestDate),
                new Date()
            );
            const totalRooms = this.totalRooms;

            console.log(totalRooms);
            console.log(hoursDiff);

            if (totalRooms >= 5 && hoursDiff <= 169) {
                console.log("5 - 169");
                return false;
            } else if (totalRooms >= 3 && hoursDiff <= 96) {
                console.log("3 - 96");
                return false;
            } else if (totalRooms >= 2 && hoursDiff <= 72) {
                console.log("2 - 72");
                return false;
            } else if (totalRooms >= 1 && hoursDiff <= 48) {
                console.log("1 - 48");
                return false;
            } else if (hoursDiff <= 900) {
                return false;
            }

            return true;
        },
    },
    methods: {
        roomName(room_id) {
            const r = this.rooms.find((room) => room.id == room_id);
            if (r) {
                return r.name;
            }

            return "Room";
        },
        async findBooking() {
            this.loading = true;
            await this.$axios
                .post("bookings/manage", {
                    booking_ref: this.booking_ref,
                    last_name: this.last_name,
                })
                .then((res) => {
                    const response = res.data;
                    if (response.success) {
                        this.$toast.success(response.message);
                        this.fullBooking = response.data;
                    } else {
                        this.$toast.error(response.message);
                    }
                    console.log(res);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        async loadOldBooking() {
            this.$store.commit("SET_EDIT_BOOKINGS", this.fullBooking);
            this.$store.commit("UPDATE_EDIT_MODE", true);

            await this.$store.dispatch("loadRooms");

            await Promise.allSettled([
                this.$store.dispatch("loadRooms"),
                this.$store.dispatch("loadPolicies"),

                this.$store.dispatch("extras/getSpecialDrinks"),
                this.$store.dispatch("extras/getSpecialCakes"),
                this.$store.dispatch("extras/getSpecialDecorations"),
                this.$store.dispatch("extras/getLookoutOptions"),
                this.$store.dispatch("extras/getSpecialMassages"),
                this.$store.dispatch("extras/getSpecialNewmassages"),
                this.$store.dispatch("extras/getQuadbikeOptions"),
                this.$store.dispatch("extras/getMostPrices"),
            ]);

            this.$store.dispatch("loadOldBooking");
            this.$router.push({ path: "/availability" });
        },
        gotoBack() {
            this.$router.push({ path: "/guests" });
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        sentenceCase(text) {
            var result = text.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        },
        formatDate(date) {
            return format(parseISO(date), "do MMM  Y");
        },
    },
    mounted() {
        console.log(this.$route.query);

        if (
            this.$route.query.ref &&
            this.$route.query.name &&
            this.$route.query.admin
        ) {
            this.booking_ref = this.$route.query.ref;
            this.last_name = this.$route.query.name;
            this.admin_mode = this.$route.query.admin == 1 ? true : false;

            this.$store.commit("TOGGLE_FULL_PAGE_LOADER", true);
            this.$store.commit("RESET_STORE");

            setTimeout(() => {
                this.$store.commit("UPDATE_ADMIN_EDIT_MODE", this.admin_mode);

                this.findBooking().then(() => {
                    this.loadOldBooking();
                });
            }, 1000);
        }
    },
};
</script>
