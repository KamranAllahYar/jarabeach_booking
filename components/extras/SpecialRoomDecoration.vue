<template>
  <div class="flex flex-col w-full md:flex-row">
    <div class="relative w-full md:w-6/12 h-60 md:h-auto">
      <img
        src="@/assets/images/specials/roomDecoration.png"
        alt
        class="object-cover object-center w-full h-full"
      />
    </div>

    <div class="w-full p-6 md:w-7/12">
      <div class="font-semibold">Room Decoration</div>
      <p class="mt-3 font-light leading-relaxed text-gray-600">
        There are a number of expected extras we offer for free, including romantic room
        decoration and happy birthday messages. Add balloon decoration below for just
        N5,000.
        <br />
        <br />Helium Balloons or bespoke Special Decoration on request (please email
        <a class="text-brand-blue" href="mailto:bookings@jarabeachresort.com"
          >bookings@jarabeachresort.com</a
        >)
      </p>

      <div class="p-4 mt-6 bg-gray-100 rounded-lg">
        <div class="font-semibold">Room Decoration</div>
        <div class="flex items-center mt-5 space-x-6 font-normal">
          <div class="w-48">
            What
            <b>date</b> would you like to have this?
          </div>

          <select
            v-model="selectedDate"
            class="flex-1 py-2 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4"
          >
            <option v-for="date in dates" :value="date" :key="date">
              {{ showDate(date) }}
            </option>
          </select>
        </div>

        <div class="flex items-center mt-4 space-x-6 font-normal">
          <div class="w-48">
            What
            <b>room</b> would you like to have this in?
          </div>

          <select
            v-model="selectedRoom"
            class="flex-1 py-2 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4"
          >
            <option v-for="(room, i) in rooms" :key="i" :value="room.name">
              {{ room.name }}
            </option>
          </select>
        </div>

        <div class="mt-4 space-y-4">
          <div v-for="deco in decorations" :key="deco.id">
            <template v-if="deco.id == 4 || deco.id == 5 || deco.id == 6"></template>
            <template v-else>
              <label class="inline-flex items-center" :key="deco.id">
                <input
                  type="checkbox"
                  :value="deco"
                  v-model="selectedDecorations"
                  class="w-5 h-5 mr-3 rounded focus:ring-0 text-brand-blue-400"
                />
                <div class="inline-block">
                  {{ realDecoName(deco.name) }} -
                  <span class="font-bold uppercase" v-if="deco.price > 0">
                    {{ currency(deco.price) }}
                  </span>
                  <span class="font-bold uppercase" v-else>FREE</span>
                </div>
              </label>

              <div class="md:ml-8" v-if="showNote(deco)">
                <input
                  type="text"
                  :key="deco.id + 'ss'"
                  placeholder="What to write. 20 characters max"
                  maxlength="20"
                  v-model="myWelcomeNote"
                  class="w-full py-1 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4"
                />
              </div>

              <div class="md:ml-8" v-if="showPetalsNote(deco)">
                <input
                  type="text"
                  :key="deco.id + 'pt'"
                  placeholder="What to write. 6 characters max"
                  maxlength="6"
                  v-model="myPetalsNote"
                  class="w-full py-1 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4"
                />
              </div>

              <div class="md:ml-8" v-if="showColorOptions(deco)">
                <select
                  v-model="myBalloonsColor"
                  :key="deco.id + 'op'"
                  class="w-full py-1 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4"
                >
                  <option value>Select Color</option>
                  <option value="Blue">Blue</option>
                  <option value="Red">Red</option>
                  <option value="Pink">Pink</option>
                </select>
              </div>

              <div class="md:ml-8" v-if="showBreakfastOptions(deco)">
                <select
                  v-model="myBreakfastDate"
                  :key="deco.id + 'op'"
                  class="w-full py-1 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4"
                >
                  <option value>Select Date</option>
                  <option :value="date" v-for="date in breakfastDates" :key="date">
                    {{ showDate(date) }}
                  </option>
                </select>
                <div
                  class="grid items-center mt-3 font-light md:grid-cols-3 gap-y-2"
                  v-if="breakfastAvailableTimes && breakfastAvailableTimes.length > 0"
                >
                  <label
                    class="flex items-center"
                    v-for="(time, i) in breakfastAvailableTimes"
                    :key="i"
                  >
                    <input
                      type="radio"
                      :value="time"
                      v-model="myBreakfastTime"
                      class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400"
                    />
                    <div>{{ time }}</div>
                  </label>
                </div>
                <div class="mt-3 font-light" v-else>
                  <template v-if="breakfastLoading">Loading...</template>
                  <template v-else>Not available for this date</template>
                </div>
              </div>

              <div class="md:ml-8" v-if="showPicnicOptions(deco)">
                <select
                  v-if="picnicDates.length > 0"
                  v-model="myPicnicDate"
                  :key="deco.id + 'op'"
                  class="w-full py-1 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4"
                >
                  <option value>Select Date</option>
                  <option :value="date" v-for="date in picnicDates" :key="date">
                    {{ showDate(date) }}
                  </option>
                </select>
                <div class="mt-3 font-light" v-else>
                  <template v-if="picnicLoading">Loading...</template>
                  <template v-else>Not available during your visit</template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!--
						<div class="p-4 mt-6 bg-gray-100 rounded-lg">
								<label class="font-semibold cursor-pointer">
										<input type="checkbox" :value="breakfastSelection" v-model="selectedDecorations" class="w-5 h-5 mr-3 rounded focus:ring-0 text-brand-blue-400">
										{{ realDecoName(breakfastSelection.name) }} -
										<span class="font-bold uppercase" v-if="breakfastSelection.price >0">{{ currency(breakfastSelection.price) }}</span>
										<span class="font-bold uppercase" v-else>FREE</span>
								</label>
								<div v-if="showBreakfastOptions(breakfastSelection)">
										<div class="flex items-center mt-4 space-x-6 font-normal">
												<div class="w-48">
														What <b>date</b> would you like to have this?
												</div>

												<select v-model="myBreakfastDate" class="flex-1 py-2 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4">
														<option value="">Select Date</option>
														<option :value="date" v-for="date in breakfastDates" :key="date">{{ showDate(date) }}</option>
												</select>
										</div>
										<div class="flex items-center mt-6 space-x-6 font-normal">
												<div class="w-48">
														What <b>time</b> would you like this for?
												</div>

												<template v-if="breakfastAvailableTimes && breakfastAvailableTimes.length > 0">
														<select v-model="myBreakfastTime" class="flex-1 py-2 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4">
																<option :value="null">Select Time</option>
																<option :value="time" v-for="time in breakfastAvailableTimes" :key="time">{{ time }}</option>
														</select>
												</template>
												<div class="font-light" v-else>
														<template v-if="breakfastLoading">Loading...</template>
														<template v-else>
																Not available for this date
														</template>
												</div>
										</div>
								</div>
						</div>

						<div class="p-4 mt-6 bg-gray-100 rounded-lg">
								<label class="font-semibold cursor-pointer">
										<input type="checkbox" :value="picnicSelection" v-model="selectedDecorations" class="w-5 h-5 mr-3 rounded focus:ring-0 text-brand-blue-400">
										{{ realDecoName(picnicSelection.name) }} -
										<span class="font-bold uppercase" v-if="picnicSelection.price >0">{{ currency(picnicSelection.price) }}</span>
										<span class="font-bold uppercase" v-else>FREE</span>
								</label>
								<div class="flex items-center mt-4 space-x-6 font-normal" v-if="showPicnicOptions(picnicSelection)">
										<div class="w-48">
												What <b>date</b> would you like to have this?
										</div>

										<template v-if="picnicDates.length > 0">
												<select v-model="myPicnicDate" class="flex-1 py-2 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4">
														<option value="">Select Date</option>
														<option :value="date" v-for="date in picnicDates" :key="date">{{ showDate(date) }}</option>
												</select>
										</template>
										<div class="font-light" v-else>
												<template v-if="picnicLoading">Loading...</template>
												<template v-else>
														Not available during your visit
												</template>
										</div>
								</div>
      </div>-->

      <div class="flex w-full mx-auto mt-8 space-x-2 md:w-2/3">
        <MainButton outline @click="prev()">Back</MainButton>
        <MainButton @click="next()">Next</MainButton>
      </div>
    </div>
  </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import add from "date-fns/add";
import format from "date-fns/format";

export default {
  data() {
    return {
      selectedRoom: null,
      selectedDate: null,
      selectedDecorations: [],
      myWelcomeNote: "",
      myPetalsNote: "",
      myBalloonsColor: "",
      myPicnicDate: "",
      myBreakfastDate: "",
      myBreakfastTime: null,
      breakfastDates: [],
      breakfastDateTimes: {},
      picnicDates: [],
      breakfastLoading: false,
      picnicLoading: false,
      // breakfastTimes: ["9am", "9:30am", "10am"],
      noDates: [],
    };
  },
  watch: {
    myBreakfastDate() {
      if (this.breakfastAvailableTimes) {
        if (!this.breakfastAvailableTimes.includes(this.myBreakfastTime)) {
          this.myBreakfastTime = null;
        }
      }
    },
  },
  computed: {
    breakfastSelection() {
      return this.decorations.find((d) => d.id == 4);
    },
    picnicSelection() {
      return this.decorations.find((d) => d.id == 5);
    },
    rooms() {
      const rooms = this.$store.getters.uniqueBookedRooms;
      let uniqueRooms = [];

      rooms.forEach((r) => {
        const itsThere = uniqueRooms.some((i) => i.room_id == r.room_id);

        if (!itsThere) {
          uniqueRooms.push(r);
        }
      });

      return uniqueRooms;
    },
    decorations() {
      return this.$store.getters["extras/allDecorations"];
    },
    bookingDates() {
      return this.$store.getters.bookingDates;
    },
    dates() {
      return this.bookingDates.filter((date) => {
        return !this.noDates.includes(date);
      });
    },
    isWelcomeNoteSelected() {
      let has = false;
      this.selectedDecorations.forEach((d) => {
        if (d.name.toLowerCase() == "welcome note") {
          has = true;
        }
      });

      return has;
    },
    isBalloonSelected() {
      let has = false;
      this.selectedDecorations.forEach((d) => {
        if (d.name.toLowerCase() == "balloons") {
          has = true;
        }
      });

      return has;
    },
    isBreakfastSelected() {
      let has = false;
      this.selectedDecorations.forEach((d) => {
        if (d.name.toLowerCase() == "breakfast") {
          has = true;
        }
      });

      return has;
    },
    isPicnicSelected() {
      let has = false;
      this.selectedDecorations.forEach((d) => {
        if (d.name.toLowerCase() == "picnic") {
          has = true;
        }
      });

      return has;
    },
    isPetalsSelected() {
      let has = false;
      this.selectedDecorations.forEach((d) => {
        if (d.name.toLowerCase() == "flower petals") {
          has = true;
        }
      });

      return has;
    },
    welcomeNote() {
      if (this.isWelcomeNoteSelected) {
        return this.myWelcomeNote;
      }

      return null;
    },
    petalsNote() {
      if (this.isPetalsSelected) {
        return this.myPetalsNote;
      }

      return null;
    },
    balloonsColor() {
      if (this.isBalloonSelected) {
        return this.myBalloonsColor;
      }

      return null;
    },
    breakfastDate() {
      if (this.isBreakfastSelected && this.breakfastTime) {
        return this.myBreakfastDate;
      }

      return null;
    },
    breakfastTime() {
      if (this.isBreakfastSelected && this.myBreakfastTime) {
        return this.myBreakfastTime;
      }

      return null;
    },
    picnicDate() {
      if (this.isPicnicSelected) {
        return this.myPicnicDate;
      }

      return null;
    },
    breakfastAvailableTimes() {
      if (this.myBreakfastDate) {
        return this.breakfastDateTimes[this.myBreakfastDate];
      }

      return [];
    },
  },
  methods: {
    realDecoName(deconame) {
      if (deconame.toLowerCase() == "picnic") return "Sunset Picnic";
      if (deconame.toLowerCase() == "breakfast") return "Floating Breakfast (Pool)";

      return deconame;
    },
    showNote(deco) {
      return deco.name.toLowerCase() == "welcome note" && this.isWelcomeNoteSelected;
    },
    showBreakfastOptions(deco) {
      return deco.name.toLowerCase() == "breakfast" && this.isBreakfastSelected;
    },
    showPicnicOptions(deco) {
      return deco.name.toLowerCase() == "picnic" && this.isPicnicSelected;
    },
    showColorOptions(deco) {
      return deco.name.toLowerCase() == "balloons" && this.isBalloonSelected;
    },
    showPetalsNote(deco) {
      return deco.name.toLowerCase() == "flower petals" && this.isPetalsSelected;
    },
    next() {
      //console.log('NEXT');
      this.$store.commit("extras/SET_SELECTED_DECORATION", {
        note: this.welcomeNote,
        decorations: this.selectedDecorations,
        date: this.selectedDate,
        petalsNote: this.petalsNote,
        balloonsColor: this.balloonsColor,
        breakfastDate: this.breakfastDate,
        breakfastTime: this.breakfastTime,
        picnicDate: this.picnicDate,
        room: this.selectedRoom,
      });
      this.$emit("next");
    },
    prev() {
      this.$store.commit("extras/SET_SELECTED_DECORATION", {
        note: this.welcomeNote,
        decorations: this.selectedDecorations,
        date: this.selectedDate,
        petalsNote: this.petalsNote,
        balloonsColor: this.balloonsColor,
        breakfastDate: this.breakfastDate,
        breakfastTime: this.breakfastTime,
        picnicDate: this.picnicDate,
        room: this.selectedRoom,
      });
      this.$emit("prev");
    },
    showDate(date) {
      return format(parseISO(date), "iii, MMM. do yyyy");
    },
    currency(num) {
      return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    checkPicnicOptions() {
      this.picnicLoading = true;
      let oldBookingId = null;
      if (this.$store.state.editMode) {
        //console.log('in edit mode');
        if (this.$store.state.editBooking) {
          oldBookingId = this.$store.state.editBooking.id;
        }
      }

      this.$axios
        .post("check-decoration-picnic-booking", {
          dates: this.dates,
          oldBookingId: oldBookingId,
        })
        .then((res) => {
          //console.log(res.data.data);
          this.picnicDates = res.data.data;
        })
        .finally(() => {
          this.picnicLoading = false;
        });
    },
    checkBreakfastOptions() {
      this.breakfastLoading = true;
      let oldBookingId = null;
      if (this.$store.state.editMode) {
        //console.log('in edit mode');
        if (this.$store.state.editBooking) {
          oldBookingId = this.$store.state.editBooking.id;
        }
      }

      this.$axios
        .post("check-decoration-breakfast-booking", {
          dates: this.breakfastDates,
          oldBookingId: oldBookingId,
        })
        .then((res) => {
          //console.log('Breakfast options');
          //console.log(res.data.data);
          this.breakfastDateTimes = res.data.data;
        })
        .finally(() => {
          this.breakfastLoading = false;
        });
    },

    async getNoDecorationDates() {
      await this.$axios.get("/extra-no-dates?extra=decoration").then((res) => {
        const noDates = res.data.data;

        this.noDates = noDates;

        //console.log(noDates);
      });
    },
  },
  async created() {
    await this.getNoDecorationDates();
  },
  mounted() {
    this.$store.dispatch("extras/getSpecialDecorations");

    if (this.dates.length > 0) {
      this.selectedDate = this.dates[0];
    }

    if (this.dates.length > 0) {
      this.breakfastDates = [...new Set(this.dates)];

      const lastDate = this.breakfastDates[this.breakfastDates.length - 1];
      this.breakfastDates.push(
        format(add(parseISO(lastDate), { days: 1 }), "yyyy-MM-dd")
      );

      if (this.breakfastDates.length > 1) {
        this.breakfastDates.shift();
      }
      this.myBreakfastDate = this.breakfastDates[0];
    }

    if (this.dates.length > 0) {
      this.picnicDates = [...new Set(this.dates)];
      this.myPicnicDate = this.picnicDates[0];
    }

    // this.selectedRoom = this.rooms[0].name;

    if (this.$store.state.extras.selectedDecorations) {
      this.selectedDecorations = this.$store.state.extras.selectedDecorations.map(
        (x) => x
      );
    }
    if (this.$store.state.extras.decorationRoom) {
      this.selectedRoom = this.$store.state.extras.decorationRoom;
    }
    if (this.$store.state.extras.dateDecoration) {
      this.selectedDate = this.$store.state.extras.dateDecoration;
    }
    if (this.$store.state.extras.decorationWelcomeNote) {
      this.myWelcomeNote = this.$store.state.extras.decorationWelcomeNote;
    }
    if (this.$store.state.extras.decorationPetalsNote) {
      this.myPetalsNote = this.$store.state.extras.decorationPetalsNote;
    }
    if (this.$store.state.extras.decorationBalloonsColor) {
      this.myBalloonsColor = this.$store.state.extras.decorationBalloonsColor;
    }
    if (this.$store.state.extras.decorationBreakfastDate) {
      this.myBreakfastDate = this.$store.state.extras.decorationBreakfastDate;
    }
    if (this.$store.state.extras.decorationBreakfastTime) {
      this.myBreakfastTime = this.$store.state.extras.decorationBreakfastTime;
    }
    if (this.$store.state.extras.decorationPicnicDate) {
      this.myPicnicDate = this.$store.state.extras.decorationPicnicDate;
    }
  },
};
</script>
