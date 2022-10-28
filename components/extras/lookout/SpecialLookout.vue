<template>
  <div>
    <div class="flex flex-col w-full md:flex-row" v-show="!showMenu">
      <div class="relative w-full md:w-6/12 h-60 md:h-auto">
        <img src="@/assets/images/specials/lookout.png" alt class="object-cover object-center w-full h-full" />
      </div>
      <div class="w-full p-6 md:w-7/12">
        <div class="font-semibold">Dining Experiences</div>
        <p class="mt-3 font-light leading-relaxed text-gray-600">
          Jara provides a variety of extra-special dining experiences. As standard you’ll be served on the terrace,
          in your room or balcony. However, should you wish to dine on the beachfront, the Lookout provides
          breakfast and lunch options, while the beachfront arbor provides a magical evening setting.
          A speaker is included so you can connect your own playlist, or listen to Jara's own -
          curated to suit the sweet and soothing sound of the waves lapping against the beach.
          The perfect location for that extra-special romantic occasion. We will be happy to organise
          extras like flowers or cake for you at an additional cost, on request. Pre-booked exclusively,
          bookable experiences follow on the next page.

          <!-- The Lookout provides an experience like no other in the city. Pre-booked exclusively,
          the Lookout is only open for breakfast and lunch sessions daily.
          A speaker is included so you can connect your own playlist,
          or listen to Jara's own - curated to suit the sweet and soothing sound of the waves lapping against the beach.
          The perfect location for that extra-special romantic occasion. We will be happy to organise extras like flowers or cake for you at an additional cost, on request. -->
        </p>
        <div class="mt-6 font-semibold">What date would you like to have this?</div>

        <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
          <label class="flex items-center" v-for="date in dates" :key="date" :class="{ 'opacity-25': !hasOptions(date) }">
            <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400" :disabled="!hasOptions(date)" />
            <div>{{ showDate(date) }}</div>
          </label>
        </div>

        <div class="flex w-full mx-auto mt-8 space-x-2 md:w-2/3">
          <MainButton outline @click="$emit('prev')">Back</MainButton>
          <MainButton @click="toggleMenuInfo(true)">Next</MainButton>
        </div>
      </div>
    </div>

    <SpecialLookoutMeal v-show="showMenu" :initial="selectedPackages" :options="options" :availableOptions="currentAvailablePackages" :date="selectedDate" :fisrDay="isFirstDay" @close="toggleMenuInfo(false)" @prev="toggleMenuInfo(false)" @next="next()" @details="updateSelection($event)" />
  </div>
</template>
<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
export default {
  data() {
    return {
      showMenu: false,
      selectedDate: null,
      selectedPackages: [],
      availablePackages: null,
      noDates: [],
    };
  },
  computed: {
    currentAvailablePackages() {
      if (this.selectedDate == null) return [];
      if (this.availablePackages == null) return [];

      return this.availablePackages[this.selectedDate];
    },
    options() {
      return this.$store.getters["extras/allLookouts"];
    },
    bookingDates() {
      return this.$store.getters.bookingDates;
    },
    dates() {
      return this.bookingDates.filter((date) => {
        return !this.noDates.includes(date);
      });
    },
    isFirstDay() {
      if (this.selectedDate == null) return false;
      if (this.selectedDate == this.dates[0]) return true;

      return false;
    },
  },
  methods: {
    hasOptions(date) {
      if (this.availablePackages != null) {
        return this.availablePackages[date].length > 0;
      }

      return false;
    },
    toggleMenuInfo(view) {
      this.$store.commit("extras/SET_SELECTED_LOOKOUT", {
        lookouts: this.selectedPackages,
        date: this.selectedDate,
      });
      this.showMenu = view;
    },
    prev() {
      this.$store.commit("extras/SET_SELECTED_LOOKOUT", {
        lookouts: this.selectedPackages,
        date: this.selectedDate,
      });
      this.$emit("prev");
    },
    next() {
      this.$store.commit("extras/SET_SELECTED_LOOKOUT", {
        lookouts: this.selectedPackages,
        date: this.selectedDate,
      });
      this.$emit("next");
    },
    updateSelection(packages) {
      this.selectedPackages = packages;

      this.$store.commit("extras/SET_SELECTED_LOOKOUT", {
        lookouts: this.selectedPackages,
        date: this.selectedDate,
      });
    },
    showDate(date) {
      return format(parseISO(date), "iii, MMM. do yyyy");
    },
    checkOptions() {
      let oldBookingId = null;
      if (this.$store.state.editMode) {
        //console.log("in edit mode");
        if (this.$store.state.editBooking) {
          oldBookingId = this.$store.state.editBooking.id;
        }
      }

      this.$axios
        .post("check-lookout-booking", {
          dates: this.dates,
          oldBookingId: oldBookingId,
        })
        .then((res) => {
          //console.log(res.data.data);
          this.availablePackages = res.data.data;
        });
    },
    async getNoLookoutDates() {
      await this.$axios.get("/extra-no-dates?extra=lookout").then((res) => {
        const noDates = res.data.data;

        this.noDates = noDates;

        //console.log(noDates);
      });
    },
  },
  async created() {
    await this.getNoLookoutDates();
  },
  mounted() {
    this.$store.dispatch("extras/getLookoutOptions");
    this.checkOptions();

    if (this.dates.length > 0) {
      this.selectedDate = this.dates[0];
    }

    if (this.$store.state.extras.selectedLookouts) {
      this.selectedPackages =
        this.$store.state.extras.selectedLookouts.map((x) => x);
    }
    if (this.$store.state.extras.dateLookout) {
      this.selectedDate = this.$store.state.extras.dateLookout;
    }
  },
};
</script>
