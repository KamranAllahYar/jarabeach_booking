<template>
  <div>
    <h1 class="mb-6 text-xl font-bold text-center md:text-2xl">
      Here's your booking summary!
    </h1>

    <div
      class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row"
    >
      <div class="w-full md:w-6/12">
        <div class="px-4 mb-6">
          <img src="@/assets/payment_page_banner.jpeg" />
        </div>
        <div
          class="px-6 pt-6 text-gray-700 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg"
        >
          <div class="mb-4 font-semibold">
            ✓ Agree with the Booking
            <a
              class="text-blue-500"
              target="_blank"
              href="https://www.jarabeachresort.com/terms"
              >Terms and Conditions</a
            >
            and Proceed to payment
          </div>
          <div class="border rounded-md" v-if="specialPrices.length">
            <div class="flex flex-col divide-y">
              <div
                class="flex items-center justify-between px-3 py-4"
                v-for="extra in specialPrices"
                :key="extra.id"
              >
                <div>{{ extra.name }}</div>
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
            class="mt-6 mb-12 border border-gray-100 rounded-md bg-gray-50 ring-gray-200 focus-within:ring ring-offset-2"
          >
            <form @submit.prevent="checkDiscount" class="flex justify-between p-2">
              <input
                class="w-full ml-2 bg-transparent outline-none"
                v-model="code"
                placeholder="Enter Voucher/Discount code"
              />
              <div class="w-40 ml-3">
                <button
                  :loading="loadingCode"
                  type="submit"
                  class="w-full px-4 py-2 font-bold border rounded-lg focus:ring-2 ring-offset-1 bg-brand-blue-100 ring-brand-blue-300 border-brand-blue-300 hover:border-brand-blue-400 focus:outline-none"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
          <div class="flex-shrink-0 w-full md:hidden md:px-0 md:w-3/12">
            <DayPassReservationBox showDiscount />
          </div>
          <div
            class="flex flex-col items-center w-full my-6 space-y-2 md:space-y-0 md:flex-row md:space-x-2"
          >
            <MainButton class="md:w-3/12" outline @click="gotoBack()">Back</MainButton>
            <template v-if="totalPrice > 0">
              <div class="flex-shrink-0 w-full md:w-5/12">
                <Paystack
                  v-if="trans_ref != null"
                  :amount="totalPrice"
                  :email="guestEmail"
                  :paystackkey="paystackkey"
                  :reference="trans_ref"
                  :callback="completeBooking"
                  :close="closePayment"
                  :embed="false"
                >
                  <MainButton class="md:px-2" :loading="loading">
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
          </div>
        </div>

        <div class="flex items-center w-full my-6 space-x-2">
          <StartOverButton class="w-full" isDayPassBooking></StartOverButton>
        </div>
      </div>
      <div class="flex-shrink-0 hidden w-full px-6 md:px-0 md:w-3/12 md:block">
        <DayPassReservationBox showDiscount />
      </div>
    </div>
  </div>
</template>

<script>
import Paystack from "vue-paystack";
import DayPassReservationBox from "@/components/daypass/DayPassReservationBox.vue";

export default {
  layout: "day-pass",
  components: {
    Paystack,
    DayPassReservationBox,
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
    specialPrices() {
      return this.specials.map((special) => {
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
      });
    },
    specials() {
      return this.$store.getters["extras/allSelected"];
    },
    bookingDate() {
      return this.$store.getters["day_pass/bookingDate"];
    },
    totalPrice() {
      return this.$store.getters["day_pass/totalPrice"] * 100;
    },
    guestEmail() {
      return this.$store.getters["day_pass/bookingEmail"];
    },
    paystackkey() {
      return this.$config.PAYMENT_PUBLIC_KEY;
    },
    subTotal() {
      return this.$store.getters["day_pass/subTotal"];
    },
  },
  methods: {
    removeExtra(extra) {
      //console.log(extra);
      const ex = extra.type;
      this.$store.commit("extras/REMOVE_EXTRA", ex);
      // this.createTransaction();
    },
    async createTransaction() {
      this.loading = true;
      const trans_ref = await this.$store.dispatch("day_pass/createTransaction");
      //console.log(trans_ref);

      this.trans_ref = trans_ref;
      this.loading = false;
    },
    async completeBooking(paystack_res) {
      //console.log(paystack_res);
      if (paystack_res.status == "success") {
        const bookingFrom = localStorage.getItem("bookingFrom");
        const res = await this.$store.dispatch("day_pass/createBooking", {
          trans_ref: this.trans_ref,
          method_ref: paystack_res.transaction,
          method: "Paystack",
          booking_from: bookingFrom,
        });
        //console.log(res);
        if (res) {
          //console.log(res);
          this.$router.push("/done");
          this.$store.commit("day_pass/RESET_STORE");
          this.$store.commit("extras/RESET_STORE");
        }
      } else {
        this.$toasted.error(res.message);
      }
      this.loading = false;
    },
    currency(num) {
      return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    gotoBack() {
      this.$router.push("/day-pass-options");
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

      this.$axios
        .post(`/check-daypass-discount`, {
          code: this.code,
          total: this.subTotal,
          date: this.bookingDate,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            this.$toasted.success(data.message);
            const discount = Object.assign({}, data.data);
            console.log(discount);
            this.$store.commit("day_pass/UPDATE_DISCOUNT", discount);
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
      // this.createTransaction();
    },
  },
  mounted() {
    this.createTransaction();
  },
  middleware({ store, redirect, $toast }) {
    if (!store.state.day_pass.options_done) {
      redirect("/day-pass-options");
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
