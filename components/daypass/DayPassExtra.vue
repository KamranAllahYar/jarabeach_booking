<template>
  <div class="flex pt-10">
    <main class="flex-1 w-full overflow-auto beach">
      <!-- <UpdateBookingBanner v-if="$store.state.editMode" /> -->
      <!-- <Navbar /> -->

      <!-- <div class="py-10 text-center">
                <img src="~/assets/logo_big.jpg" class="w-32 mx-auto md:w-40" />
            </div> -->

      <!-- <TopProgressBar /> -->

      <div class="relative z-20 pb-6 md:w-2/3 w-full">
        <div class="text-3xl font-semibold text-rubik mb-4">Extras</div>

        <div class="mt-3 mb-8 text-rubik text-gray-text">
          Here you can book in any extra special experiences.Please select the ones you
          wish to add to your booking.
        </div>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div
            v-for="(extra, i) in specials"
            :key="i"
            class="w-full overflow-hidden bg-white border for_hover"
            :class="!extra.available ? 'opacity-25' : 'cursor-pointer shadow-md '"
            @click="selectSpecial(extra)"
          >
            <div class="relative w-full h-48 overflow-hidden">
              <img
                :src="
                  require(`@/assets/images/thumbnails/${extra.type}.${fileExtension(
                    extra.type
                  )}`)
                "
                class="absolute object-cover object-center for_scale transition-all transform w-full h-full bg-cover"
                alt=""
              />
              <div
                class="absolute top-0 right-0 z-20 bg-black py-2 text-sm px-5 font-normal text-white"
              >
                From N{{ extra.range }}
              </div>
            </div>
            <div class="flex items-center justify-between px-3 py-4 bg-black">
              <div class="text-sm font-normal font-rubic capitalize text-white">
                {{ extra.name }}
              </div>
              <div v-if="isSelectedSpecial(extra)">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 .25C4.62391.25.25 4.62391.25 10c0 5.3761 4.37391 9.75 9.75 9.75 5.3761 0 9.75-4.3739 9.75-9.75 0-5.37609-4.3739-9.75-9.75-9.75zm5.0742 6.48234L8.77422 14.2323a.74795.74795 0 01-.25215.195.74963.74963 0 01-.31035.0727h-.01266a.74941.74941 0 01-.30508-.065.75065.75065 0 01-.25226-.1834l-2.7-3a.75129.75129 0 01-.15689-.2521.75025.75025 0 01.02387-.5816.74979.74979 0 01.17702-.2383.74958.74958 0 01.25564-.151.74947.74947 0 01.2942-.03999.75025.75025 0 01.28666.07729.75179.75179 0 01.23419.1825l2.12297 2.3588 5.74642-6.83954a.74986.74986 0 01.5077-.257.74973.74973 0 01.5419.17336.74993.74993 0 01.2643.50391.74964.74964 0 01-.1655.54441z"
                    fill="#5ACBC9"
                  />
                </svg>
              </div>
              <div class="text-white" v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z"
                  />
                </svg>
              </div>
            </div>
            <div class="relative z-10 h-full bg-black bg-opacity-25"></div>
          </div>
        </div>

        <!-- <div class="flex items-center w-full mx-auto mt-8 space-x-2 md:w-1/2" v-if="selected.length > 0">
					<MainButton @click="gotoBack()" outline>Back</MainButton>
					<MainButton @click="gotoNext()">Next</MainButton>
				</div>
				<div v-else class="flex items-center w-full mx-auto mt-8 space-x-2 md:w-1/2">
					<MainButton @click="gotoBack()" outline>Back</MainButton>
					<MainButton @click="skip()">Skip</MainButton>
				</div>

				<div class="flex items-center w-full my-6 space-x-2">
					<StartOverButton class="w-full" isDayPassBooking></StartOverButton>
				</div> -->
      </div>

      <!-- <div class="fixed bottom-0 z-10 w-full pointer-events-none h-80 "></div> -->
    </main>
  </div>
</template>

<script>
export default {
  layout: "day-pass",
  computed: {
    specials() {
      let specials = this.$store.getters["extras/allSpecials"];
      const includedSpecials = [
        "Massages",
        "Unforgettable Experiences",
        "Cake",
        "Premium Drink Collection",
        "Photoshoot (third-party photographer access)",
        "Horse Riding",
      ];
      let filteredSpecials = specials.filter((special) =>
        includedSpecials.includes(special.name)
      );
      // //console.log(filteredSpecials);
      return filteredSpecials;
    },
    selected() {
      return this.$store.getters["extras/allSelected"];
    },
    bookingDate() {
      return this.$store.getters["day_pass/bookingDate"];
    },
  },
  methods: {
    fileExtension(type) {
      //console.log(this.specials);
      if (type !== "unforgettableExperience" && type !== "massages") return "png";
      return "jpeg";
    },
    gotoBack() {
      this.$store.commit("extras/RESET_INDEX");
      this.$router.push({ path: "/day-pass-options" });
    },
    gotoNext() {
      this.$store.commit("extras/RESET_INDEX");

      const name = this.selected[0];
      if (name) {
        this.$store.dispatch("extras/updateExtrasSelected", name.type);
      }

      this.$router.push({ path: "/day-pass-payment" });
    },
    skip() {
      this.$store.commit("day_pass/COMPLETE_EXTRAS");
      this.$router.push({ path: "/day-pass-payment" });
    },
    isSelectedSpecial(sp) {
      return this.selected.some((s) => s.type == sp.type);
    },
    selectSpecial(sp) {
      if (sp.name === "Horse Riding") {
        this.$toast.error("Sorry, this is no longer available");
        return;
      }
      //console.log(sp);
      if (!sp.available) {
        this.$toast.info(sp.name + " is not available for the dates you selected");
        return;
      }

      if (this.isSelectedSpecial(sp)) {
        this.$store.commit("extras/REMOVE_SELECTED", sp);
      } else {
        this.$store.commit("extras/ADD_SELECTED", sp);
      }
    },
  },
  mounted() {
    this.$store.dispatch("extras/updateSpecials", [this.bookingDate]);
    this.$store.dispatch("extras/getSpecialDrinks");
    this.$store.dispatch("extras/getSpecialCakes");
    this.$store.dispatch("extras/getSpecialDecorations");
    this.$store.dispatch("extras/getLookoutOptions");
    this.$store.dispatch("extras/getSpecialMassages");
    this.$store.dispatch("extras/getSpecialBikes");
    this.$store.dispatch("extras/getSpecialNewmassages");
    this.$store.dispatch("extras/getQuadbikeOptions");
    this.$store.dispatch("extras/getMostPrices");
    if (this.$store.state.extras.extras_booking !== "day-pass") {
      this.$store.commit("extras/RESET_STORE");
      this.$store.commit("extras/UPDATE_EXTRAS_BOOKING_TYPE", "day-pass");
    }
  },
  // middleware({ store, redirect, $toast }) {
  // 	if (!store.state.day_pass.options_done) {
  // 		// $toast.info("Please accept all policies first");
  // 		redirect("/day-pass-options");
  // 	}
  // },
};
</script>
{ }
<style scoped>
.for_hover:hover .for_scale {
  transform: scale(1.05);
}
</style>
<style>
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
