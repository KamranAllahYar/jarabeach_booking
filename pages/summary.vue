<template>
  <div>
    <h1 class="mb-6 text-xl font-bold text-center md:text-2xl">
      Here's your booking summary!
    </h1>
    <div
      v-if="!agreed"
      class="fixed top-0 left-0 font-rubik w-full h-screen z-20 px-3 overflow-y-auto"
      style="background-color: #00000096"
    >
      <div
        class="md:w-1/2 z-20 m-auto mt-10 bg-white shadow-lg rounded-2xl p-3 no-scrollbar"
      >
        <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
          <div class="text-base font-bold capitalize">{{ currentPolicy.name }}</div>
        </div>

        <div class="px-3 py-4 bg-gray-100">
          <pre class="w-full overflow-y-auto h-80" v-html="currentPolicy.content"></pre>
        </div>
        <div class="mt-4">
          <MainButton @click="agreed = true"> Agree </MainButton>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row"
    >
      <div class="w-full md:w-7/12">
        <div
          class="px-6 pt-6 text-gray-700 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg"
        >
          <div class="rounded-md">
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
              </div>-->
              <div class="flex items-center justify-between px-3 py-4">
                <div class="text-base">
                  <div>Stay ({{ totalNights }} Nights - {{ totalRooms }} Rooms)</div>
                </div>
                <div class="text-lg font-bold text-right">
                  <div>{{ currency(roomsPrice) }}</div>
                </div>
              </div>
              <div
                class="flex items-center justify-between px-3 py-4"
                v-for="extra in specialPrices"
                :key="extra.id"
              >
                <div>
                  {{
                    extra.name == "Go-Kart and Horse Riding" ? "Horse Riding" : extra.name
                  }}
                </div>
                <div class="text-lg font-bold">
                  {{ currency(extra.price) }}
                  <div
                    class="text-xs font-light text-right text-red-500 cursor-pointer hover:underline"
                    @click="removeExtra(extra)"
                  >
                    Remove
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="!$store.state.editMode || $store.state.adminEditMode"
            class="mt-6 mb-12 border border-gray-100 rounded-md bg-gray-50 ring-gray-200 focus-within:ring ring-offset-2"
          >
            <form @submit.prevent="checkDiscount()" class="flex justify-between p-2">
              <input
                class="w-full ml-2 bg-transparent outline-none"
                v-model="code"
                placeholder="Enter Voucher/Discount code"
              />
              <div class="w-40 ml-3">
                <button
                  :loading="loadingCode"
                  type="submit"
                  class="w-full px-4 py-2 text-white font-bold border rounded-lg focus:ring-2 ring-offset-1 bg-black ring-brand-blue-300 focus:outline-none"
                >
                  Apply
                </button>
                <!-- <MainButton :loading="loadingCode" type="submit" class="text-white rounded-md focus:outline-none focus:ring bg-brand-blue-100">Apply</MainButton> -->
              </div>
            </form>
          </div>
          <label class="inline-flex items-center font-bold cursor-pointer">
            <input
              type="checkbox"
              v-model="agreed"
              class="w-6 h-6 mr-4 text-green-600 rounded-full focus:ring-1 focus:ring-green-600"
            />
            I accept Jara's booking terms and conditions
          </label>

          <div
            class="flex flex-wrap gap-y-2 items-center w-full my-6 space-y-2 md:space-y-0  md:space-x-2"
          >
            <MainButton class="md:w-16" summary @click="gotoBack()">Back</MainButton>
            <template v-if="shouldShowPaymentButton">
              <template v-if="totalPrice > 0">
                <div class="relative flex-shrink-0 w-full md:w-48 " v-if="shouldShowBookOnHold" @mouseenter="holdDisclaimerToggle(true)" @mouseleave="holdDisclaimerToggle(false)" >
                  <MainButton summarybbg class="px-2" :loading="loading" @click.native="bookOnHoldBooking('Hold Bank Transfer')">
                    <div class="flex justify-center">
                      <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      Hold | Bank Transfer
                    </div>
                  </MainButton>
                  <div v-if="holdDisclaimer" class="absolute p-2 mx-auto text-xs bg-white border-2 rounded border-brand-blue-300" style="top: -120px">
                    Booking will only be held for
                    <b>30 mins</b>. You must send a proof of payment to
                    <b>bookings@jarabeachresort.com</b> within that time or the hold on
                    the booking will be cancelled.
                  </div>
                </div>
                <div class="relative flex-shrink-0 w-full md:w-48 " v-if="shouldShowBookOnHold" @mouseenter="holdDisclaimer30Toggle(true)" @mouseleave="holdDisclaimer30Toggle(false)" >
                  <!-- <MainButton summarybbg :loading="loading" @click.native="bookPartPaymentBooking('Part Payment')"> -->
                  <MainButton summarybbg class="px-2" :loading="loading" @click.native="bookOnHoldBooking('Book Part Payment')">
                    <div class="flex justify-center">
                      <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      Book | Part Payment
                    </div>
                  </MainButton>
                  <div v-if="holdDisclaimer30" class="absolute p-2 mx-auto text-xs bg-white border-2 rounded border-brand-blue-300" style="top: -120px">
                    By proceeding, you understand that Jara Beach Resort will hold your reservation on receipt of your <b>non-refundable 70%</b> payment.
                  </div>
                </div>
                <div class="flex-shrink-0 w-full md:w-56">
                  <Paystack
                    v-if="trans_ref != null && agreed"
                    :amount="totalPrice"
                    :email="guestEmail"
                    :paystackkey="paystackkey"
                    :reference="trans_ref"
                    :callback="completeBooking"
                    :close="closePayment"
                    :embed="false"
                    :channels="paystackChannels"
                  >
                    <MainButton summarybbg class="md:px-2" :loading="loading" :disabled="!agreed">
                      <div class="flex justify-center">
                        <svg
                          class="w-6 h-6 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        Book | Pay With Paystack
                      </div>
                    </MainButton>
                  </Paystack>
                </div>
              </template>
              <div v-if="totalPrice <= 0">
                <MainButton :loading="loading" @click.native="completeFreeBooking()">
                  <div class="flex justify-center">
                    <!-- <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg> -->
                    Complete Booking
                  </div>
                </MainButton>
              </div>
            </template>
            <template v-else>
              <MainButton :loading="loading" @click="updateBooking()"
                >Update Booking</MainButton
              >
            </template>
          </div>
        </div>

        <div class="flex items-center w-full my-6 space-x-2">
          <StartOverButton class="w-full"></StartOverButton>
        </div>
      </div>
      <div class="flex-shrink-0 w-full px-6 md:px-0 md:w-4/12">
        <ReservationBox showDiscount :showGuests="true" />
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
      agreed: false,

      code: "",
      loadingCode: false,
      loading: false,
      trans_ref: null,
      holdDisclaimer: false,
      holdDisclaimer30: false,
      paystackChannels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    };
  },
  computed: {
    currentPolicy() {
      const allPolicies = this.$store.getters.policies;

      return allPolicies[0];
    },
    specialPrices() {
      return this.specials
        .map((special) => {
          let price = 0;
          switch (special.type) {
            case "cakes":
              price = this.$store.getters["extras/cakesPrice"];
              break;
            case "drinks":
              price = this.$store.getters["extras/drinksPrice"];
              break;
            case "massages":
              price = this.$store.getters["extras/massagesPrice"];
              break;
            case "bikes":
              price = this.$store.getters["extras/bikesPrice"];
              break;
            case "photoshoot":
              price = this.$store.getters["extras/photoshootPrice"];
              break;
            case "roomDecoration":
              price = this.$store.getters["extras/decorationPrice"];
              break;
            case "unforgettableExperience":
              price = this.$store.getters["extras/experiencePrice"];
              break;
            case "domesticStaff":
              price = this.$store.getters["extras/staffPrice"];
              break;
            case "massage":
              price = this.$store.getters["extras/massagePrice"];
              break;
            case "newmassage":
              price = this.$store.getters["extras/newmassagePrice"];
              break;
            case "quadbike":
              price = this.$store.getters["extras/quadbikePrice"];
              break;
            case "lookout":
              price = this.$store.getters["extras/lookoutPrice"];
              break;
            case "conferences":
              price = this.$store.getters["extras/conferencePrice"];
              break;
            case "teams":
              price = this.$store.getters["extras/teamsPrice"];
              break;
            default:
              price = 0;
              break;
          }

          return {
            id: special.id,
            name: special.name,
            type: special.type,
            price: price,
          };
        })
        .filter((sp) => sp.type == "roomDecoration" || sp.price > 0);
    },
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
      // return this.rooms.reduce((price, room) => price + room.price, 0);
      return this.$store.getters.roomPrice;
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
    subTotal() {
      return this.$store.getters.subTotal;
    },
  },
  methods: {
    holdDisclaimerToggle(v) {
      this.holdDisclaimer = v;
    },
    holdDisclaimer30Toggle(v) {
      this.holdDisclaimer30 = v;
    },
    removeExtra(extra) {
      //console.log(extra);
      const ex = extra.type;
      this.$store.commit("extras/REMOVE_EXTRA", ex);
      this.createTransaction();
    },
    async createTransaction() {
      this.loading = true;
      const trans_ref = await this.$store.dispatch("createTransaction");
      //console.log(trans_ref);

      this.trans_ref = trans_ref;
      this.loading = false;
    },
    async completeBooking(paystack_res) {
      //console.log(paystack_res);

      if (paystack_res.status == "success") {
        const bookingFrom = localStorage.getItem("bookingFrom");
        const res = await this.$store.dispatch("createBooking", {
          trans_ref: this.trans_ref,
          method_ref: paystack_res.transaction,
          method: "Paystack",
          booking_from: bookingFrom,
        });
        //console.log(res);
        if (res) {
          //console.log(res);
          this.$router.push("/done");
          this.$store.commit("RESET_STORE");
          this.$store.commit("extras/RESET_STORE");
        }
      } else {
        this.$toasted.error(res.message);
      }
      this.loading = false;
    },
    async completeFreeBooking() {
      const res = await this.$store.dispatch("createBooking", {
        trans_ref: this.trans_ref,
        method_ref: "ZeroBalance",
        method: "ZeroBalance",
      });

      //console.log(res);
      if (res) {
        //console.log(res);
        this.$router.push("/done");
        this.$store.commit("RESET_STORE");
        this.$store.commit("extras/RESET_STORE");
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
        //console.log(res);
        this.$router.push("/done");
        this.$store.commit("RESET_STORE");
        this.$store.commit("extras/RESET_STORE");
      }
      this.loading = false;
    },
    async bookOnHoldBooking(paymentMethod) {
      //console.log('Clickling book on hold');
      if (!this.agreed) {
        this.$toasted.error("Please accept the policy first", {
          duration: 6000,
          position: "bottom-center",
          className: "bg-yellow-500",
        });
        return;
      }

      if (this.loading) return;

      this.loading = true;
      const res = await this.$store.dispatch("createBooking", {
        trans_ref: this.trans_ref,
        method_ref: "offline booking",
        method: "Offline",
        payment_method: paymentMethod
      });
      //console.log(res);
      if (res) {
        //console.log(res);
        if(paymentMethod == "Book Part Payment"){
          this.$router.push("/done_hold_part_payment");
        }else{
          this.$router.push("/done_hold");
        }
        this.$store.commit("RESET_STORE");
        this.$store.commit("extras/RESET_STORE");
      }
      this.loading = false;
    },
    currency(num) {
      return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    gotoBack() {
      this.$router.push("/profile/more");
    },
    removeRoom(room) {
      //console.log(room);
      this.$store.commit("REMOVE_ROOM", room);
    },
    async checkDiscount() {
      this.$store.commit("UPDATE_DISCOUNT", null);
      if (this.code.length <= 2) {
        this.$toast.info("Please input a proper code");
        return;
      }
      this.loadingCode = true;
      //console.log('Check for - ' + this.code);

      this.$axios
        .post(`/check-discount`, {
          code: this.code,
          total: this.subTotal,
          date: this.rooms[0].date,
          rooms: this.rooms
        })
        .then(({ data }) => {
          //console.log(data);
          if (data.success) {
            this.$toasted.success(data.message);

            const discount = Object.assign({}, data.data);
            //console.log(discount);
            this.$store.commit("UPDATE_DISCOUNT", discount);
            this.createTransaction();
          } else {
            this.$toasted.error(data.message);
          }

          //console.log(data);
        })
        .finally(() => {
          this.loadingCode = false;
        });
    },
    closePayment() {
      //console.log('You closed payment');
      this.$toast.error("Payment was not completed");
      this.createTransaction();
    },
  },
  mounted() {
    this.createTransaction();
  },
  middleware({ store, redirect, $toast }) {
    // if (!store.state.policy_done) {
    //   // $toast.info("Please accept all policies first");
    //   redirect("/policies");
    // }
    store.commit("UPDATE_DISCOUNT", null);
  },
};
</script>

<style>
  .payButton {
    flex: 1;
    width: 100%;
  }
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  pre {
    font-family: "Maison Neue", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
  }
</style>
