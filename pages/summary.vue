<template>
    <div>
        <h1 class="mb-6 text-xl font-bold text-center md:text-2xl">Here's your booking summary!</h1>

        <div class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row">
            <div class="w-full md:w-6/12">
                <div class="px-6 pt-6 text-gray-700 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg">
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
                                    <div>Stay ({{totalNights}} Nights - {{totalRooms}} Rooms)</div>
                                </div>
                                <div class="text-lg font-bold text-right">
                                    <div>{{ currency(roomsPrice) }}</div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between px-3 py-4" v-for="extra in specials" :key="extra.id">
                                <div>{{ extra.name }}</div>
                                <div class="text-lg font-bold">
                                    <span v-if="extra.type == 'cakes'">
                                        {{ currency($store.getters['extras/cakesPrice']) }}
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
                                    <div class="text-xs font-light text-right text-red-500 cursor-pointer hover:underline" @click="removeExtra(extra)">Remove</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="!$store.state.editMode" class="mt-6 mb-12 border border-gray-100 rounded-md bg-gray-50 ring-gray-200 focus-within:ring ring-offset-2">
                        <form @submit.prevent="checkDiscount()" class="flex justify-between p-2">
                            <input class="w-full ml-2 bg-transparent outline-none" v-model="code" placeholder="Enter Discount code" />
                            <div class="w-40 ml-3">
                                <MainButton :loading="loadingCode" type="submit" class="text-white rounded-md focus:outline-none focus:ring bg-brand-blue-400">Apply</MainButton>
                            </div>
                        </form>
                    </div>

                    <div class="flex flex-col items-center w-full my-6 space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                        <MainButton class="w-3/12" outline @click="gotoBack()">Back</MainButton>
                        <template v-if="shouldShowPaymentButton">
                            <div class="relative flex-shrink-0 w-full md:w-5/12" v-if="shouldShowBookOnHold" @mouseenter="holdDisclaimerToggle(true)" @mouseleave="holdDisclaimerToggle(false)">
                                <MainButton :loading="loading" @click.native="bookOnHoldBooking()">
                                    <div class="flex justify-center">
                                        <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                        </svg>
                                        Hold | Bank Transfer
                                    </div>
                                </MainButton>
                                <div v-if="holdDisclaimer" class="absolute p-2 mx-auto text-xs bg-white border-2 rounded border-brand-blue-300" style="top: -120px">
                                    Booking will only be held for <b>30 mins</b>. You must send a proof of payment to
                                    <b>bookings@jarabeachresort.com</b> within that time or the hold on the
                                    booking will be cancelled.
                                    <br />
                                    <i class="text-red-800">Option not available between 6pm-9am WAT</i>
                                </div>
                            </div>
                            <div class="flex-shrink-0 w-full md:w-4/12 ">
                                <Paystack
                                    v-if="trans_ref != null"
                                    :amount="totalPrice"
                                    :email="guestEmail"
                                    :paystackkey="paystackkey"
                                    :reference="trans_ref"
                                    :callback="completeBooking"
                                    :close="closePayment"
                                    :embed="false">
                                    <MainButton :loading="loading">
                                        <div class="flex justify-center">
                                            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                            </svg>
                                            Book | Paystack
                                        </div>
                                    </MainButton>
                                </Paystack>
                            </div>
                        </template>
                        <template v-else>
                            <MainButton :loading="loading" @click="updateBooking()">
                                Update Booking
                            </MainButton>
                        </template>
                    </div>
                </div>

                <div class="flex items-center w-full my-6 space-x-2">
                    <StartOverButton class="w-full"></StartOverButton>
                </div>
            </div>
            <div class="flex-shrink-0 w-full px-6 md:px-0 md:w-3/12">
                <ReservationBox showDiscount :showGuests="false" />
            </div>
        </div>
    </div>
</template>

<script>
import Paystack from "vue-paystack";

export default {
    layout: "booking",
    components: {
        Paystack,
    },
    data() {
        return {
            code: "",
            loadingCode: false,
            loading: false,
            trans_ref: null,
            holdDisclaimer: false,
        };
    },
    computed: {
        shouldShowBookOnHold() {
            if (this.$store.state.editMode) return false;

            return true;
        },
        shouldShowPaymentButton() {
            if (!this.$store.state.editMode) return true;
            if (this.$store.state.editMode) {
                if (this.totalPrice <= 0) return false;
            }

            return true;
        },
        totalNights() {
            return this.$store.getters.totalNights;
        },
        totalRooms() {
            return this.$store.getters.totalRooms;
        },
        rooms() {
            return this.$store.getters.bookedRooms;
        },
        roomsPrice() {
            return this.rooms.reduce((price, room) => price + room.price, 0);
        },
        specials() {
            return this.$store.getters["extras/allSelected"];
        },
        totalPrice() {
            if (this.$store.state.editMode) {
                return this.$store.getters["differenceToPay"] * 100;
            }
            return this.$store.getters["totalPrice"] * 100;
        },
        guestEmail() {
            return this.$store.state.guest.email;
        },
        paystackkey() {
            return this.$config.PAYMENT_PUBLIC_KEY;
        },
    },
    methods: {
        holdDisclaimerToggle(v) {
            this.holdDisclaimer = v;
        },
        removeExtra(extra) {
            console.log(extra);
            const ex = extra.type;
            this.$store.commit("extras/REMOVE_EXTRA", ex);
            this.createTransaction();
        },
        async createTransaction() {
            this.loading = true;
            const trans_ref = await this.$store.dispatch("createTransaction");
            console.log(trans_ref);

            this.trans_ref = trans_ref;
            this.loading = false;
        },
        async completeBooking(paystack_res) {
            console.log(paystack_res);

            if (paystack_res.status == "success") {
                const res = await this.$store.dispatch("createBooking", {
                    trans_ref: this.trans_ref,
                    method_ref: paystack_res.transaction,
                    method: "Paystack",
                });
                console.log(res);
                if (res) {
                    console.log(res);
                    this.$router.push("/done");
                    this.$store.commit("RESET_STORE");
                    this.$store.commit("extras/RESET_STORE");
                }
            } else {
                this.$toasted.error(res.message);
            }
            this.loading = false;
        },
        async updateBooking() {
            if (this.loading) return;

            this.loading = true;
            const res = await this.$store.dispatch("createBooking", {
                trans_ref: this.trans_ref,
                method_ref: "update booking",
                method: "Update",
            });

            if (res) {
                console.log(res);
                this.$router.push("/done");
                this.$store.commit("RESET_STORE");
                this.$store.commit("extras/RESET_STORE");
            }
            this.loading = false;
        },
        async bookOnHoldBooking() {
            console.log("Clickling book on hold");

            if (this.loading) return;

            this.loading = true;
            const res = await this.$store.dispatch("createBooking", {
                trans_ref: this.trans_ref,
                method_ref: "offline booking",
                method: "Offline",
            });
            console.log(res);
            if (res) {
                console.log(res);
                this.$router.push("/done_hold");
                this.$store.commit("RESET_STORE");
                this.$store.commit("extras/RESET_STORE");
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
                        this.createTransaction();
                    } else {
                        this.$toasted.error(data.message);
                    }

                    console.log(data);
                })
                .finally(() => {
                    this.loadingCode = false;
                });
        },
        closePayment() {
            console.log("You closed payment");
            this.$toast.error("Payment was not completed");
            this.createTransaction();
        },
    },
    mounted() {
        this.createTransaction();
    },
    middleware({ store, redirect, $toast }) {
        if (!store.state.policy_done) {
            // $toast.info("Please accept all policies first");
            redirect("/policies");
        }
        store.commit("UPDATE_DISCOUNT", null);
    },
};
</script>

<style>
.payButton {
    flex: 1;
    width: 100%;
}
</style>
