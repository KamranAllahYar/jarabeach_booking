<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    style="background-color: #000000c7"
  >
    <div class="md:p-6 p-3 w-full md:w-9/12 mx-auto rounded-lg bg-white">
      <h1 class="mb-6 text-xl font-bold text-center md:text-2xl">
        Select an Extra experience to make your stay even more memorable!
      </h1>

      <div
        class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-3 md:flex-row"
      >
        <div class="">
          <div class="overflow-hidden bg-[#000000] border rounded-lg shadow-lg">
            <ExtrasLayout :currentSpecial="special" if />
            <DaypassDayPassExtrasLayout
              :currentSpecial="special"
              v-if="$store.state.extras_booking == 'day-pass'"
            />
          </div>
        </div>
        <!-- <div class="flex-shrink-0 w-full md:w-3/12">
          <ReservationBox showDiscount />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "booking",
  data() {
    return {
      special: "lookout",
    };
  },
  computed: {
    selected() {
      return this.$store.getters["extras/allSelected"];
    },
  },
  methods: {
    removeExtra() {
      //console.log(this.special);
      this.$store.commit("extras/REMOVE_EXTRA", this.special);
    },
    checkAndRemove() {
      let beenRemoved = true;
      this.selected.forEach((special) => {
        if (special.type == this.special) {
          beenRemoved = false;
        }
      });

      //console.log('Been Removed - ' + beenRemoved);

      if (beenRemoved) {
        this.$router.push({ path: "/availability" });
      }
    },
  },
  mounted() {
    const special = this.$store.getters["extras/extrasBookingSelected"];

    if (special) {
      this.special = special;
    }

    this.checkAndRemove();
    this.$store.subscribe((mutation) => {
      if (mutation.type === "extras/SET_EXTRAS_BOOKING_SELECTED") {
        // The `SET_EXTRAS_BOOKING_SELECTED` mutation has occurred
        // Run your desired function here
        // console.log(mutation);
        this.special = mutation.payload;
      }
    });
  },
  updated() {
    //console.log('updated');
  },
  middleware({ store, redirect, $toast }) {
    if (!store.state.availability_done) {
      redirect("/availability");
    }
  },
};
</script>
