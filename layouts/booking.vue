<template>
  <div>
    <ExtrasSpecialOverNight v-if="hasBookingSelected" />

    <div
      class="flex min-h-screen bg-white"
      :class="`${hasBookingSelected && 'overflow-hidden h-screen'}`"
    >
      <main class="flex-1 w-full pb-10 overflow-auto beach">
        <UpdateBookingBanner v-if="$store.state.editMode" />
        <!-- <Navbar /> -->

        <div class="py-4 bg-white text-center">
          <a href="https://www.jarabeachresort.com/">
            <img src="~/assets/logo_big.jpg" class="w-32 mx-auto md:w-40" />
          </a>
        </div>

        <!-- <TopProgressBar /> -->
        <div
          v-if="!routeCheck"
          class="h-44 md:h-60 banner_image w-full bg-black flex justify-center gap-4 flex-col items-center"
        >
          <h1 class="md:text-6xl text-4xl text-white font-rubik text-center font-bold">
            Overnight Booking
          </h1>
          <p class="md:text-md text-sm text-white font-rubik text-center font-normal">
            For all takeover, retreat, or private bookings, please email
            <a href="mailto:bookings@jarabeachresort.com" class="text-blue-400"
              >bookings@jarabeachresort.com</a
            >
          </p>
        </div>

        <div class="relative z-20 pt-6 md:pt-10 pb-6 mx-auto max-w-7xl">
          <Nuxt keep-alive />
        </div>

        <!-- <div class="fixed bottom-0 z-10 w-full pointer-events-none h-80 bottom-beach"></div> -->
      </main>

      <div
        v-if="$store.state.fullPageLoader"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-white"
      >
        <Logo class="w-96" />
        <div class="mt-12">Loading Booking Editor...</div>
        <svg
          class="w-12 h-12 mt-2 text-brand-blue animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import TopProgressBar from "@/components/global/TopProgressBar";
export default {
  middleware: ["clear"],
  components: {
    TopProgressBar,
  },
  computed: {
    routeCheck() {
      return this.$route.path === "/";
    },
    hasBookingSelected() {
      return this.$store.getters["extras/extrasBookingSelected"];
    },
  },
  created() {
    //console.log("Initial loadings");
    this.$store.dispatch("loadRooms");
    this.$store.dispatch("loadPolicies");
    this.$store.dispatch("loadNoDiscountDates");
    this.$store.dispatch("extras/loadNoDiscountDates");

    this.$store.dispatch("extras/getSpecialDrinks");
    this.$store.dispatch("extras/getSpecialCakes");
    this.$store.dispatch("extras/getSpecialDecorations");
    this.$store.dispatch("extras/getLookoutOptions");
    this.$store.dispatch("extras/getSpecialMassages");
    this.$store.dispatch("extras/getSpecialBikes");
    this.$store.dispatch("extras/getSpecialNewmassages");
    this.$store.dispatch("extras/getQuadbikeOptions");
    this.$store.dispatch("extras/getMostPrices");
  },
};
</script>

<style scoped>
@keyframes animatedBackground {
  from {
    background-position: 0 0;
  }
  50% {
    background-position: 200% 0;
  }
  to {
    background-position: 0 0;
  }
}
.banner_image {
  background: url("@/assets/images/background_banner.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
@media only screen and (max-width: 600px) {
  .banner_image {
    background-position: left;
  }
}

/* .beach {
    background: url("~assets/beach_top.svg");
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-repeat: repeat-x;
    animation: animatedBackground 60s linear infinite;
} */
.bottom-beach {
  background: url("~assets/beach_bottom.jpg");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  z-index: 0;
}
</style>
