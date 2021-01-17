<template>
    <div>
        <h1 class="mb-6 text-xl font-bold text-center md:text-2xl">Here's your booking summary!</h1>

        <div class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row">
            <div class="w-full md:w-6/12">
                <div class="px-6 pt-6 text-gray-700 bg-white border rounded-lg shadow-lg">
                    <div class="border rounded-md">
                        <div class="flex flex-col divide-y">
                            <!-- <div class="flex items-center justify-between px-3 py-4" v-for="(room, i) in rooms" :key="i">
                                <div class="text-base">
                                    <div>{{room.date}}</div>
                                    <div class="text-sm">{{room.name}}</div>
                                </div>
                                <div class="text-lg font-bold text-right">
                                    <div>{{ currency(room.price) }}</div>
                                    <div class="text-xs font-light text-red-500 cursor-pointer hover:underline" @click="removeRoom(room)">Remove</div>
                                </div>
                            </div> -->
                            <div class="flex items-center justify-between px-3 py-4">
                                <div class="text-base">
                                    <div>Stay ({{rooms.length}} Nights)</div>
                                </div>
                                <div class="text-lg font-bold text-right">
                                    <div>{{ currency(roomsPrice) }}</div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between px-3 py-4" v-for="extra in specials" :key="extra.id">
                                <div>{{ extra.name }}</div>
                                <div class="text-lg font-bold">
                                    <span v-if="extra.type == 'cake'">
                                        {{ currency($store.getters['extras/cakePrice']) }}
                                    </span>
                                    <span v-else-if="extra.type == 'drinks'">
                                        {{ currency($store.getters['extras/drinksPrice']) }}
                                    </span>
                                    <span v-else-if="extra.type == 'photoshoot'">
                                        {{ currency($store.getters['extras/photoshootPrice']) }}
                                    </span>
                                    <span v-else-if="extra.type == 'roomDecoration'">
                                        {{ currency($store.getters['extras/decorationPrice']) }}
                                    </span>
                                    <span v-else-if="extra.type == 'domesticStaff'">
                                        {{ currency($store.getters['extras/staffPrice']) }}
                                    </span>
                                    <span v-else-if="extra.type == 'massage'">
                                        {{ currency($store.getters['extras/massagePrice']) }}
                                    </span>
                                    <span v-else-if="extra.type == 'quadbike'">
                                        {{ currency($store.getters['extras/quadbikePrice']) }}
                                    </span>
                                    <span v-else-if="extra.type == 'lookout'">
                                        {{ currency($store.getters['extras/lookoutPrice']) }}
                                    </span>
                                    <span v-else>
                                        {{ currency(0) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 mb-12 border border-gray-100 rounded-md bg-gray-50 ring-gray-200 focus-within:ring ring-offset-2">
                        <form @submit.prevent="checkDiscount()" class="flex justify-between p-2">
                            <input class="w-full ml-2 bg-transparent outline-none" v-model="code" placeholder="Enter Discount code" />
                            <div class="w-40 ml-3">
                                <MainButton :loading="loadingCode" type="submit" class="text-white rounded-md focus:outline-none focus:ring bg-brand-blue-400">Apply</MainButton>
                            </div>
                        </form>
                    </div>

                    <div class="flex items-center w-full my-6 space-x-2">
                        <MainButton outline @click="gotoBack()">Back</MainButton>
                        <MainButton :loading="loading" @click="completeBooking()">
                            <div class="flex justify-center">
                                <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                </svg>
                                Pay
                            </div>
                        </MainButton>
                        <!-- <nuxt-link tag="div" to="/done" class="cursor-pointer">&rarr;</nuxt-link> -->
                    </div>
                </div>
            </div>
            <div class="flex-shrink-0 w-full md:w-3/12">
                <ReservationBox showDiscount :showGuests="false" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            code: "",
            loadingCode: false,
            loading: false,
        };
    },
    computed: {
        rooms() {
            return this.$store.getters.bookedRooms;
        },
        roomsPrice() {
            return this.rooms.reduce((price, room) => price + room.price, 0);
        },
        specials() {
            return this.$store.getters["extras/allSelected"];
        },
    },
    methods: {
        async completeBooking() {
            this.loading = true;
            const trans_ref = await this.$store.dispatch("createTransaction");
            console.log(trans_ref);

            if (trans_ref) {
                const res = await this.$store.dispatch(
                    "createBooking",
                    trans_ref
                );
                if (res) {
                    console.log(res);
                    this.$router.push("/done");
                    this.$store.commit("RESET_STORE");
                    this.$store.commit("extras/RESET_STORE");
                }
            }
            this.loading = false;
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        gotoBack() {
            this.$router.push("/policies");
        },
        removeRoom(room) {
            console.log(room);
            this.$store.commit("REMOVE_ROOM", room);
        },
        async checkDiscount() {
            this.$store.commit("UPDATE_DISCOUNT", null);
            if (this.code.length <= 2) {
                this.$toast.info("Please input a proper code");
                return;
            }
            this.loadingCode = true;
            console.log("Check for - " + this.code);

            this.$axios
                .post(`/check-discount/${this.code}`)
                .then(({ data }) => {
                    console.log(data);
                    if (data.success) {
                        this.$toasted.success(data.message);

                        const discount = Object.assign({}, data.data);
                        console.log(discount);
                        this.$store.commit("UPDATE_DISCOUNT", discount);
                    } else {
                        this.$toasted.error(data.message);
                    }

                    console.log(data);
                })
                .finally(() => {
                    this.loadingCode = false;
                });
        },
    },
    middleware({ store, redirect, $toast }) {
        if (!store.state.policy_done) {
            $toast.info("Please accept all policies first");
            redirect("/policies");
        }
        store.commit("UPDATE_DISCOUNT", null);
    },
};
</script>

