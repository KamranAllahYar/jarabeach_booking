<template>
  <div class="px-4">
    <div class="text-3xl font-semibold text-rubik mb-10">Options</div>

    <div
      class="space-y-4 text-center md:space-y-0 md:flex md:px-0 md:space-x-6 border-b pb-6 border-gray-text"
    >
      <!-- <div>{{isDateSeasonalDate}}</div> -->
      <div class="flex-1 divide-y md:w-2/3 w-full font-rubik">
        <div v-for="option in selectedDayPassOptions" :key="option.id" class="mx-auto">
          <div class="flex items-center justify-between py-4 space-x-8">
            <div class="flex flex-col items-start text-left">
              <div>{{ option.name }}</div>
              <div v-if="option.description" class="my-2 text-sm text-left">
                {{ option.description }}
              </div>
              <div>{{ currency(optionPrice(option)) }}</div>
              <!-- <div>{{option.quantity}}</div> -->
            </div>
            <div class="flex h-10 item-center">
              <div
                class="flex items-center h-full px-4 bg-gray-button font-semibold cursor-pointer text-md"
                @click="decreaseQuantity(option)"
              >
                -
              </div>
              <input
                type="text"
                class="w-12 h-full border-none text-center"
                v-model="option.quantity"
              />
              <div
                class="flex items-center h-full px-4 font-semibold bg-black text-white cursor-pointer text-md"
                @click="increaseQuantity(option)"
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReservationBox showDiscount class="md:w-1/3 w-full" />
    </div>
    <DayPassExtra ref="extraDayPassRef" />
    <div class="flex gap-5">
      <button
        @click="clearBooking()"
        class="w-64 bg-gray-button rounded-lg py-4 font-rubik text-sm font-medium"
      >
        Restart Booking
      </button>
      <button
        @click="goToNext()"
        class="w-64 bg-black text-white rounded-lg py-4 font-rubik text-sm font-medium"
      >
        Continue
      </button>
    </div>
    <!-- <div class="w-32 mx-auto mt-6 space-x-3" v-if="canGoToNext">
      <MainButton outline>Back</MainButton>
      <MainButton @click="goToNext()">Next</MainButton>
    </div>
    <div class="flex items-center w-full my-6 space-x-2">
      <StartOverButton class="w-full" isDayPassBooking></StartOverButton>
    </div> -->
  </div>
</template>

<script>
import ReservationBox from "@/components/daypass/DayPassReservationBox.vue";
import DayPassExtra from "~/components/daypass/DayPassExtra.vue";
import { mapGetters } from "vuex";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  layout: "day-pass",

  components: { ReservationBox, DayPassExtra },
  data() {
    return {
      selectedDayPassOptions: [],
    };
  },
  computed: {
    ...mapGetters({
      noDiscountDates: "noDiscountDates",
    }),
    isDateSeasonalDate() {
      const isDateAvailable = this.noDiscountDates.filter((d) => {
        const bookingDateParsed = parseISO(this.bookingDate);
        const dDate = parseISO(d);
        return format(bookingDateParsed, "yyyy-MM-dd") === format(dDate, "yyyy-MM-dd");
      });

      return isDateAvailable.length;
    },
    bookingDate() {
      return this.$store.getters["day_pass/bookingDate"];
    },
    dayPassOptions() {
      return this.$store.state.day_pass.day_pass_options;
    },
    canGoToNext() {
      const isAtLeastOneOptionSelected = this.selectedDayPassOptions.filter(
        (option) => option.quantity > 0
      ).length;
      return isAtLeastOneOptionSelected;
    },
    selectedOptionType() {
      return this.$store.state.day_pass.option_type;
    },
    guestsNumber() {
      return this.$store.getters["day_pass/noGuests"];
    },
  },
  methods: {
    clearBooking() {
      if (
        window.confirm(
          "Are you sure you want to clear this booking? You will loose all the progress so far!"
        )
      ) {
        let redirectUrl = "/day-pass";
        this.$store.commit("RESET_STORE");
        this.$store.commit("extras/RESET_STORE");
        this.$store.commit("day_pass/RESET_STORE");
        this.$router.push(redirectUrl);
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },
    optionPrice(option) {
      if (this.isDateSeasonalDate) return option.seasonal_price;
      if (this.selectedOptionType === "weekend") return option.weekend_price;
      return option.weekday_price;
    },
    goToNext() {
      // if (!this.canGoToNext) return;
      let optionQuantitySelected = 0;
      this.selectedDayPassOptions.forEach(
        (option) => (optionQuantitySelected += option.quantity)
      );
      if (optionQuantitySelected < this.guestsNumber) {
        this.$toast.info("Quantity selected is less than guests selected!");
        return;
      }
      if (optionQuantitySelected > this.guestsNumber) {
        this.$toast.info("Quantity selected is more than guests selected!");
        return;
      }
      this.updateStores();
      this.$store.commit("day_pass/COMPLETE_OPTIONS");
      // this.$router.push({ path: "/day-pass-extras" });
      this.$refs.extraDayPassRef.gotoNext();
    },
    currency(num) {
      //console.log(num);
      return "₦" + num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    increaseQuantity(option) {
      option.quantity++;
      this.updateStores();
    },
    decreaseQuantity(option) {
      if (option.quantity === 0) return;
      option.quantity--;
      this.updateStores();
    },
    updateStores() {
      this.$store.commit("day_pass/UPDATE_SELECTED_OPTIONS", this.selectedDayPassOptions);
    },
    updateFromStore() {
      this.selectedDayPassOptions = this.$store.state.day_pass.selected_options;
    },
  },
  mounted() {
    if (this.$store.state.day_pass.selected_options.length) {
      this.updateFromStore();
      return;
    }
    const newDayPassOptions = this.dayPassOptions.map((option) => {
      //console.log(option);
      return { ...option, seasonal_price: option.seasonal_price, quantity: 0 };
    });

    // //console.log(this.dayPassOptions);
    this.selectedOptionType = this.$store.state.day_pass.option_type;
    this.selectedDayPassOptions = newDayPassOptions;
  },
  //   middleware({ store, redirect, $toast }) {
  //     if (!store.state.day_pass.availability_done) {
  //       // $toast.info("Please accept all policies first");
  //       redirect("/day-pass-availability");
  //     }
  //   },
};
</script>
