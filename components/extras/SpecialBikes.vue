<template>
  <div class="flex flex-col w-full md:flex-row md:h-auto">
    <div class="relative w-full md:h-auto md:w-6/12 h-60">
      <img src="@/assets/images/specials/bikes.png" alt class="object-cover object-center w-full h-full" />
    </div>
    <div class="flex flex-col w-full h-full py-6 md:w-7/12">
      <div class="flex-1 px-6 pb-4 md:overflow-y-auto" id="con_scroll">
        <div class="font-semibold">Go-Kart</div>
        <p class="mt-3 font-light leading-relaxed text-gray-600">
          “Gunnar”, Jara’s 196cc Go-Kart, available for Guest Rental
          <br />
          <br />Equipped with a powerful four-stroke engine and a heavy-duty frame with durable all-terrain tyres.
          This rugged 196cc go-kart has a top speed of 23mph. Strap yourself and a friend in (max load capacity of 125kg)
          with the safety harnesses and head out for an exciting ride through Jara’s sandy neighborhood terrain.
          <br />
          <br />Suitable for Adult drivers [only] and passengers (under 18yrs with signed guardian).
          Limited to the back road, sand driving only (not the beach). No reverse so big turning circle
          required. A riding waiver / terms of usage must be signed, prior to riding. All damages are chargeable.
          <!-- “Gunner”, Jara’s 196cc Go-Kart, available for Guest Rental
          <br />
          <br />Equipped with a powerful four-stroke engine and a heavy-duty frame with durable all-terrain tyres.
          This rugged 196cc go-kart has a load capacity of 125kg and a top speed of 23mph. Strap yourself and a
          friend in with the safety harnesses and head out for an exciting ride through Jara’s neighborhood.
          <br />
          <br />Suitable for Adult drivers [only] and passengers (under 18yrs with signed guardian).
          Limited to the back road, sand driving only (not the beach).
          No reverse so big turning circle required.
          A riding waiver / terms of usage must be signed, prior to riding.-->
        </p>

        <div class="mt-3">
          <div v-if="showAddButton" class="flex flex-wrap items-center justify-between mt-0 space-y-4 divide-y md:space-y-3">
            <div class="flex flex-col w-full py-3 md:flex-row md:items-center">
              <div class="flex flex-col items-center w-full space-x-0 space-y-2 font-light md:space-y-4 md:items-start">
                <div class="w-full">
                  <div class="pb-1 text-sm font-bold">Please select a package</div>
                  <div class="flex items-center flex-1 w-full border rounded-md focus-within:ring">
                    <select v-model="newBike.id" class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                      <option v-for="massage in bikes" :value="massage.id" :key="massage.id">{{ massage.name }} ({{ massage.duration }})</option>
                    </select>
                  </div>
                </div>
                <div class="w-full">
                  <div class="pb-1 text-sm font-bold">On what date would you like this service?</div>
                  <div class="flex w-full space-x-3">
                    <div class="flex-1">
                      <div class="flex items-center flex-1 border rounded-md focus-within:ring">
                        <select placeholder="Date" v-model="newBike.date" class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                          <option>Date</option>
                          <option v-for="date in dates" :value="date" :key="date">{{ showDate(date) }}</option>
                        </select>
                      </div>
                    </div>
                    <!-- <div class="flex items-center flex-shrink-0 border rounded-md focus-within:ring">
                                            <select placeholder="Time" v-model="newBike.time" class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                                <option>Time</option>
                                                <option v-for="time in getTimeOptions(newBike.date)" :value="time" :key="time">
                                                    {{ time }}
                                                </option>
                                            </select>
                    </div>-->
                  </div>
                  <div class="flex-1 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>

          <div @click="addNewMassage" v-if="showAddButton" class="flex items-center flex-shrink-0 h-10 mt-0 text-xs cursor-pointer w-44 text-brand-blue hover:text-brand-blue-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <div>Add</div>
          </div>

          <div class="flex flex-wrap items-center justify-between mt-4 space-y-4 md:space-y-3">
            <div class="flex flex-col w-full px-3 py-2 bg-gray-100 rounded md:flex-row md:items-center" v-for="(sMassage, ix) in selectedBikes" :key="ix">
              <div class="w-full">
                <div class="mb-1 font-bold truncate">{{ massageName(sMassage.id) }}</div>
                <div>{{ showDate(sMassage.date) }}</div>
              </div>

              <button @click="removeMassage(ix)" class="flex items-center flex-1 flex-shrink-0 h-10 mt-3 text-xs cursor-pointer md:ml-5 md:mt-0 text-brand-red hover:text-red-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t">
        <div class="flex w-full px-6 mx-auto mt-6 space-x-2 md:px-0 md:w-2/3">
          <MainButton outline @click="prev()">Back</MainButton>
          <MainButton @click="next()">Next</MainButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default {
  data() {
    return {
      selectedDate: null,
      selectedBikes: [],
      newBike: {},
      noDates: [],
    };
  },
  computed: {
    bookingDates() {
      return this.$store.getters.bookingDates;
    },
    dates() {
      return this.bookingDates.filter((date) => {
        return !this.noDates.includes(date);
      });
    },
    bikes() {
      return this.$store.getters["extras/allBikes"];
    },
    showAddButton() {
      return this.selectedBikes.length < 24;
    },
  },
  methods: {
    massageName(massageId) {
      const massage = this.bikes.find((m) => m.id == massageId);

      return `${massage.name} (${massage.duration})`;
    },
    // getTimeOptions(date) {
    //     if (date == this.dates[0]) {
    //         return ["Afternoon"];
    //     }
    //     return ["Morning", "Afternoon"];
    // },
    next() {
      this.$store.commit("extras/SET_SELECTED_BIKES", {
        bikes: this.selectedBikes,
        date: this.dates[0],
      });
      this.$emit("next");
    },
    prev() {
      this.$store.commit("extras/SET_SELECTED_BIKES", {
        bikes: this.selectedBikes,
        date: this.dates[0],
      });
      this.$emit("prev");
    },
    addNewMassage() {
      const massage = Object.assign({}, this.newBike);
      this.selectedBikes.unshift(massage);

      this.$nextTick(() => {
        var container = this.$el.querySelector("#con_scroll");
        container.scrollTop = container.scrollHeight;
      });
    },
    addMassage() {
      this.selectedBikes.unshift({
        id: this.bikes[0].id,
        date: this.dates[0],
      });
      this.$nextTick(() => {
        var container = this.$el.querySelector("#con_scroll");
        container.scrollTop = container.scrollHeight;
      });
      console.log(this.dates[0]);
    },
    removeMassage(ix) {
      this.selectedBikes.splice(ix, 1);
    },
    showDate(date) {
      return format(parseISO(date), "iii, MMM. do yyyy");
    },
    getNoBikesDates() {
      this.$axios.get("/extra-no-dates?extra=bikes").then((res) => {
        const noDates = res.data.data;

        this.noDates = noDates;

        console.log(noDates);
      });
    },
  },
  created() {
    this.getNoBikesDates();
    this.newBike = {
      id: this.bikes[0].id,
      date: this.dates[0],
    };
  },
  mounted() {
    this.$store.dispatch("extras/getSpecialDrinks");

    if (this.$store.state.extras.selectedBikes) {
      this.selectedBikes = this.$store.state.extras.selectedBikes.map(
        (x) => x
      );
    }

    if (this.bikes.length > 0 && this.selectedBikes.length <= 0) {
      // this.selectedBikes.push({
      //     id: this.bikes[0].id,
      //     date: this.dates.length > 0 ? this.dates[0] : null,
      //     time: "Afternoon",
      // });
    }

    if (this.dates.length > 0) {
      this.selectedDate = this.dates[0];
    }

    if (this.$store.state.extras.dateDrink) {
      this.selectedDate = this.$store.state.extras.dateDrink;
    }
  },
};
</script>
