<template>
  <div class="w-full border-b md:px-0 px-4 pb-10 mb-10 border-borderColor-light">
    <div class="text-3xl font-semibold text-rubik mb-5">Availability</div>
    <div class="flex items-center justify-between mb-4">
      <div class="font-light font-rubik text-sm text-gray-text">
        Are you booking on a weekday (MON-THUR), weekend (FRI-SUN) or Seasonal?
      </div>
      <!-- <div class="hidden text-sm md:block">
        More about seasonal
        <a
          href="https://www.jarabeachresort.com/day-pass"
          class="font-bold"
          target="_blank"
          >here</a
        >
      </div> -->
    </div>
    <div class="flex flex-col gap-5">
      <div class="mb-2 font-semibold md:hidden">Select your option</div>
      <div class="items-center justify-between md:flex-row flex-col flex gap-5 w-full">
        <div class="md:w-1/2 w-full">
          <select
            name="option_type"
            id="option_type"
            v-model="option_type"
            class="border border-borderColor-light w-full rounded-xlg outline-none focus:outline-none p-3 text-gray-text font-rubik text-sm"
            style="box-shadow: none"
          >
            <option value="" hidden>Select</option>
            <option value="weekend">Weekend</option>
            <option value="weekday">Weekday</option>
            <option value="seasonal">Seasonal</option>
          </select>
        </div>
        <div class="md:w-1/2 w-full relative">
          <div
            class="absolute top-3 right-3 cursor-pointer"
            @click="calanderShow = !calanderShow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path
                  d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827c.26.02.506.045.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c.233-.031.48-.056.739-.076V2.5A.75.75 0 0 1 7 1.75ZM5.71 4.89c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.023.17-.042.35-.058.539h18.336c-.016-.19-.035-.369-.058-.54c-.135-1.005-.389-1.585-.812-2.008c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14ZM2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812c-.423-.423-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289v-2Z"
                  clip-rule="evenodd"
                />
              </g>
            </svg>
          </div>
          <input
            placeholder="Select Date"
            type="text"
            v-model="dateShow"
            class="block border border-borderColor-light w-full rounded-xlg p-3 text-gray-text font-rubik text-sm"
          />
          <div class="mt-6 absolute top-6" v-if="calanderShow">
            <vc-calendar
              :min-date="new Date().toISOString().split('T')[0]"
              @dayclick="onDayClick"
              :attributes="attributes"
              v-if="option_type === 'seasonal'"
            />
            <vc-calendar
              :min-date="new Date().toISOString().split('T')[0]"
              @dayclick="onDayClick"
              :attributes="attributes"
              :disabled-dates="disabledDates"
              v-else
            />
          </div>
        </div>
      </div>

      <div class="items-center hidden md:flex gap-4" v-if="option_type === 'seasonal'">
        <div class="font-semibold w-1/2">Check Seasonal Dates here</div>
        <select
          name="option_type"
          id="option_type"
          class="border border-borderColor-light w-1/2 rounded-xlg outline-none focus:outline-none p-3 text-gray-text font-rubik text-sm"
          style="box-shadow: none"
          @change="selectedDate = 'see your date'"
          v-model="selectedDate"
        >
          <option value="see your date" selected>See Seasonal Date</option>
          <option
            class="pointer-events-none"
            v-for="(date, index) in sortedNoDiscountDays"
            :key="index"
          >
            {{ dropdownDate(date) }}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-4 md:hidden" v-if="option_type === 'seasonal'">
      <div class="font-semibold">Check Seasonal Dates here</div>
      <select
        name="option_type"
        id="option_type"
        class="block mt-2 border rounded-md outline-none focus:outline-none"
        style="box-shadow: none"
        @change="selectedDate = 'see your date'"
        v-model="selectedDate"
      >
        <option value="see your date" selected>See Seasonal Date</option>
        <option
          class="pointer-events-none"
          v-for="(date, index) in sortedNoDiscountDays"
          :key="index"
        >
          {{ dropdownDate(date) }}
        </option>
      </select>
    </div>
    <div class="mt-4 text-sm md:hidden">
      More about seasonal
      <a href="https://www.jarabeachresort.com/day-pass" class="font-bold" target="_blank"
        >here</a
      >
    </div>
    <!-- <div class="mt-6">
      <vc-calendar
        :min-date="new Date().toISOString().split('T')[0]"
        @dayclick="onDayClick"
        :attributes="attributes"
        v-if="option_type === 'seasonal'"
      />
      <vc-calendar
        :min-date="new Date().toISOString().split('T')[0]"
        @dayclick="onDayClick"
        :attributes="attributes"
        :disabled-dates="disabledDates"
        v-else
      />
    </div> -->

    <!-- <div class="w-32 mt-6 space-x-3" v-if="canGoToNext">
      <MainButton outline>Back</MainButton>
      <MainButton @click="goToNext()">Next</MainButton>
    </div> -->
    <!-- <div class="flex items-center w-full my-6 space-x-2">
      <StartOverButton class="w-full" isDayPassBooking></StartOverButton>
    </div> -->
  </div>
</template>
<script>
import isBefore from "date-fns/isBefore";
import { mapGetters } from "vuex";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  layout: "day-pass",
  data() {
    return {
      option_type: "",
      date: null,
      selectedDate: "see your date",
      dateShow: null,
      calanderShow: false,
    };
  },
  mounted() {
    this.updateFromStore();
  },
  watch: {
    option_type(newValue) {
      if (newValue !== this.$store.state.day_pass.option_type) {
        // this.date = null;
      }
    },
  },
  methods: {
    dropdownDate(date) {
      const dropdownDate = parseISO(date);
      return format(dropdownDate, "MMMM Do yyyy");
    },
    onDayClick(day) {
      let daySelected = new Date(day.id).toISOString();
      daySelected = daySelected.split("T")[0];

      let today = new Date().toISOString();
      today = today.split("T")[0];

      if (isBefore(new Date(daySelected), new Date(today))) {
        this.$toast.info("You cant select a day in the past!", { duration: 5000 });
        return;
      }
      let isBookingDateBlocked = false;
      this.noDayPassBookingDates.forEach((d) => {
        const dayDate = parseISO(day.id);
        const dDate = parseISO(d);
        if (format(dDate, "yyyy-MM-dd") === format(dayDate, "yyyy-MM-dd")) {
          isBookingDateBlocked = true;
        }
      });
      if (isBookingDateBlocked) {
        this.$toast.error(
          "There are no Day Pass tickets available on this date. Apologies for any inconvenience caused.",
          { duration: 5000 }
        );
        return;
      }
      const dayOfTheWeek = new Date(day.id).getDay();
      //console.log(dayOfTheWeek);
      if (this.option_type === "weekday" && (dayOfTheWeek > 4 || dayOfTheWeek === 0)) {
        this.$toast.info("Please select a weekday from monday - thursday", {
          duration: 5000,
        });
        return;
      }
      if (
        this.option_type === "weekend" &&
        dayOfTheWeek !== 5 &&
        dayOfTheWeek !== 6 &&
        dayOfTheWeek !== 0
      ) {
        this.$toast.info("Please select a weekend from friday - sunday", {
          duration: 5000,
        });
        return;
      }
      //console.log(moment(this.noDiscountDates[19]).format('yyyy-MM-dd'), moment(day.id).format('yyyy-MM-dd'))
      let isSeasonalDate = false;
      this.noDiscountDates.forEach((d) => {
        const dayDate = parseISO(day.id);
        const dDate = parseISO(d);
        if (format(dDate, "yyyy-MM-dd") === format(dayDate, "yyyy-MM-dd")) {
          isSeasonalDate = true;
        }
      });
      if (this.option_type === "seasonal" && !isSeasonalDate) {
        this.$toast.error(
          "That is not a seasonal date, please see seasonal dates in the dropdown!",
          { duration: 5000 }
        );
        return;
      }
      this.date = new Date(day.id).toISOString();
      this.dateShow = new Date(day.id).toDateString();
      this.calanderShow = false;
    },
    goToNext() {
      if (this.date === null) {
        this.$toast.info("Please select a date", { duration: 5000 });
        return;
      }
      let daySelected = new Date(this.date).toISOString();
      daySelected = daySelected.split("T")[0];

      let today = new Date().toISOString();
      today = today.split("T")[0];
      if (isBefore(new Date(daySelected), new Date(today))) {
        this.$toast.info("You cant select a day in the past!", { duration: 5000 });
        return;
      }
      if (this.canGoToNext) {
        this.updateStores();
        this.$store.commit("day_pass/COMPLETE_AVAILABILITY");
        this.$router.push({ path: "/day-pass-options" });
      }
    },
    updateStores() {
      this.$store.commit("day_pass/UPDATE_AVAILABILITY", {
        option_type: this.option_type,
        booking_date: this.date,
      });
    },
    updateFromStore() {
      this.option_type = this.$store.state.day_pass.option_type;
      this.date = this.$store.state.day_pass.booking_date;
    },
  },
  computed: {
    ...mapGetters({
      noDiscountDates: "noDiscountDates",
      noDayPassBookingDates: "day_pass/getNoDayPassBookingDates",
    }),
    sortedNoDiscountDays() {
      return this.noDiscountDates.sort((a, b) => a - b);
    },
    isDateSeasonalDate() {
      const isDateAvailable = this.noDiscountDates.filter((d) => {
        const bookingDateParsed = parseISO(this.bookingDate);
        const dDate = parseISO(d);
        return format(bookingDateParsed, "yyyy-MM-dd") === format(dDate, "yyyy-MM-dd");
      });

      return isDateAvailable.length;
    },
    disabledDates() {
      if (this.option_type === "weekday") return { weekdays: [1, 6, 7] };
      return { weekdays: [2, 3, 4, 5] };
    },
    canGoToNext() {
      return (
        (this.option_type === "weekday" ||
          this.option_type === "weekend" ||
          this.option_type === "seasonal") &&
        this.date !== null
      );
    },
    attributes() {
      return [
        {
          highlight: true,
          dates: this.date,
        },
      ];
    },
  },
  //   middleware({ store, redirect, $toast }) {
  //     if (!store.state.day_pass.guests_done) {
  //       // $toast.info("Please accept all policies first");
  //       redirect("/day-pass");
  //     }
  //   },
};
</script>
