<template>
  <div class="flex bg-transparent">
    <main class="flex-1 w-full pt-20 overflow-auto">
      <!-- <UpdateBookingBanner v-if="$store.state.editMode" /> -->
      <!-- <Navbar />

      <div class="py-10 text-center">
        <img src="~/assets/logo_big.jpg" class="w-32 mx-auto md:w-40" />
      </div>

      <TopProgressBar /> -->

      <div class="relative z-20 pb-6 md:w-2/3 w-full px-4">
        <div class="text-3xl font-semibold text-rubik mb-4">Extras</div>

        <div class="mt-3 mb-8 text-rubik text-gray-text">
          Here you can book in any extra special experiences.Please select the ones you
          wish to add to your booking.
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div
            v-for="(extra, i) in specials"
            :key="i"
            class="h-500 overflow-hidden bg-white border for_hover rounded-2xl	relative cursor-pointer shadow-md"

            @click="selectSpecial(extra)"
          >
            <div class="relative w-full h-full overflow-hidden">
              <img
                :src="
                  require(`@/assets/images/thumbnails/${extra.type}.${fileExtension(
                    extra.type
                  )}`)
                "
                class="absolute object-cover object-center w-full h-full for_scale transition-all transform bg-cover"
                alt=""
              />
              <div
                class="absolute top-0 right-0 z-20 bg-black py-1 mr-2 mt-2 text-sm px-1 font-normal text-white"
              >
                From N{{ extra.range }}
              </div>

              <div class="relative z-10 h-full bg-opacity-25"></div>
            </div>
            <div class="absolute bottom-0 w-full h-80 flex flex-col items-center justify-end px-3 py-4 text-zinc-50	bg-gradient-to-t from-blue-500 via-blury-blue to-transparent">
              <div class="text-center font-normal font-rubic capitalize text-white  text-2xl	mb-6 pb-4">
                {{
                  extra.name == "Go-Kart and Horse Riding" ? "Horse Riding" : extra.name
                }}
              </div>
              <hr class="w-44 bg-gray-500 opacity-30 mb-12">
              <div class="w-44 text-sm bg-transparent rounded-full py-2 px-6 border border-solid mb-8 " :class="[isSelectedSpecial(extra) ? 'border-red-400' : 'border-slate-400']">
                <div v-if="!isSelectedSpecial(extra)" class="flex items-center justify-start text-white font-medium	">
                  <svg viewBox="0 0 24 24" width="24px" height="24px" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M6 12H18" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M12 18V6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </svg>
                  <p class="ml-2">
                    Add extra
                  </p>
                </div>
                <div v-else class="flex items-center justify-start text-red-200 font-medium	 ">
                  <svg viewBox="0 0 24 24" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="minus"> <line fill="none" stroke="#AB7096" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="4" x2="20" y1="12" y2="12"></line> </g> </g> </g>
                  </svg>
                  <p class="ml-2">
                    Remove extra
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div
          class="flex items-center w-full mx-auto mt-8 space-x-2 md:w-1/2"
          v-if="selected.length > 0"
        >
          <MainButton @click="gotoBack()" outline>Back</MainButton>
          <MainButton @click="gotoNext()">Next</MainButton>
        </div>
        <div v-else class="flex items-center w-full mx-auto mt-8 space-x-2 md:w-1/2">
          <MainButton @click="gotoBack()" outline>Back</MainButton>
          <MainButton @click="skip()">Skip</MainButton>
        </div>

        <div class="flex items-center w-full my-6 space-x-2">
          <StartOverButton class="w-full"></StartOverButton>
        </div> -->
      </div>

      <!-- <div class="fixed bottom-0 z-10 w-full pointer-events-none h-80 bottom-beach"></div> -->
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    specials() {
      return this.$store.getters["extras/allSpecials"];
    },
    selected() {
      return this.$store.getters["extras/allSelected"];
    },
    dates() {
      return this.$store.getters.bookedRooms.map((room) => room.date);
    },
  },
  methods: {
    fileExtension(type) {
      //console.log(this.specials);
      if (type !== "unforgettableExperience" && type !== "massages" && type !== "dayPass" && type !== "lookout" && type !== "conferences" && type !== "teams")
        return "png";
      return "jpeg";
    },
    gotoBack() {
      this.$store.commit("extras/RESET_INDEX");
      this.$router.push({ path: "/availability" });
    },
    gotoNext() {
      this.$store.commit("extras/RESET_INDEX");
      const name = this.selected[0];
      if (name) {
        // this.$router.push({ path: "/extras/" + name.type });
        this.$store.dispatch("extras/updateExtrasSelected", name.type);
        this.$router.push({ path: "/profile" });
      } else {
        this.$router.push({ path: "/profile" });
      }
    },
    skip() {
      this.$router.push({ path: "/profile" });
    },
    isSelectedSpecial(sp) {
      return this.selected.some((s) => s.type == sp.type);
    },
    selectSpecial(sp) {
      if (sp.name === "Horse Riding") {
        this.$toast.error("Sorry, this is no longer available");
        return;
      }

      if (!sp.available && sp.name != "Dining Experiences") {
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
    this.$store.dispatch("extras/updateSpecials", this.dates);
    this.$store.dispatch("extras/getSpecialDrinks");
    this.$store.dispatch("extras/getSpecialCakes");
    this.$store.dispatch("extras/getSpecialDecorations");
    this.$store.dispatch("extras/getLookoutOptions");
    this.$store.dispatch("extras/getSpecialMassages");
    this.$store.dispatch("extras/getSpecialBikes");
    this.$store.dispatch("extras/getSpecialNewmassages");
    this.$store.dispatch("extras/getQuadbikeOptions");
    this.$store.dispatch("extras/getMostPrices");
    if (this.$store.state.extras.extras_booking !== "guests") {
      this.$store.commit("extras/RESET_STORE");
      this.$store.commit("extras/UPDATE_EXTRAS_BOOKING_TYPE", "guests");
    }
  },
  middleware({ store, redirect, $toast }) {
    if (!store.state.availability_done) {
      // $toast.info("Please provide availability first");
      redirect("/availability");
    }
  },
};
</script>
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
