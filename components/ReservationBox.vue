<template>
  <div class="flex flex-col text-sm">
    <div class="w-full text-gray-800 bg-gray-button" v-if="showGuests">
      <div
        class="py-4 pt-5 text-center text-xl font-medium text-black border-b border-borderColor-light"
      >
        Your Reservation
      </div>

      <div class="text-sm font-medium mt-3 text-center">{{ dateFromTo }}</div>
      <div class="flex justify-between px-5 my-3">
        <div>Guests</div>
        <div>{{ adultNo }} Adult<span v-if="adultNo > 1">s</span></div>
      </div>
      <div class="flex justify-between px-5 my-3" v-if="childNo > 0">
        <div></div>
        <div class="text-right">
          <!-- {{ childNo }} Child<span v-if="childNo > 1">ren</span> -->
          <!-- <br /> -->
          <div v-for="(qty, age) in childrenAges" :key="age">
            {{ qty }} {{ ageToString(age, qty) }}
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between px-5 my-3" v-if="rooms.length > 0">
        <div>
          Duration
          <br />
          <div
            class="text-xs text-gray-700"
            v-if="roomDiscountPercent > 0 && roomDiscount > 0"
          >
            {{ roomDiscountPercent }}% Discount
          </div>
        </div>
        <div>
          <div class="text-base text-right">
            {{ totalNights }} night<span v-if="totalNights > 1">s</span>
          </div>
          <!-- <div class="mb-1 text-right" v-for="(room, ix) in rooms" :key="ix">
                        <div>{{ formatDate(room.date) }}</div>
                        <div class="text-xs text-gray-600">{{ room.name }}</div>
          </div>-->
        </div>
      </div>
      <div class="flex justify-between px-5 my-3" v-if="rooms.length > 0">
        <div>
          Room
          <span v-if="roomsDetailsStandard.length + roomsDetailsFamily.length > 1"
            >s</span
          >
        </div>
        <div>
          <!-- <div class="text-xs text-right">{{ dateFromTo }}</div> -->
          <div class="text-sm text-right" v-if="roomsDetailsStandard.length > 0">
            Standard Room {{ formatAndString(roomsDetailsStandard) }}
          </div>
          <div class="text-sm text-right" v-if="roomsDetailsFamily.length > 0">
            <div v-if="roomsDetailsFamily.includes(6)">Family Room 6</div>
            <div v-if="formatAndStringCabin(roomsDetailsFamily)">
              Family Cabin {{ formatAndStringCabin(roomsDetailsFamily) }}
            </div>
          </div>
          <div class="text-sm text-right" v-if="roomsDetailsVilla.length > 0">
            <div v-if="roomsDetailsVilla.length == 2">Sunrise 10 & Sunset 11</div>
            <div v-else-if="roomsDetailsVilla.includes(10)">Sunrise 10</div>
            <div v-else-if="roomsDetailsVilla.includes(11)">Sunset 11</div>
          </div>
          <div class="text-sm text-right" v-if="roomsDetailsLoft.length > 0">
            <div>{{ formatAndStringLoft() }}</div>
          </div>
          <div class="text-sm text-right" v-if="roomsDetailsStudio.length > 0">
              Studio {{ formatAndStringCabin(roomsDetailsStudio) }}
          </div>
          <!-- <div class="mb-1 text-right" v-for="(room, ix) in rooms" :key="ix">
                        <div>{{ formatDate(room.date) }}</div>
                        <div class="text-xs text-gray-600">{{ room.name }}</div>
          </div>-->
        </div>
      </div>
      <pre></pre>
      <template v-for="extra in specialPrices">
        <div class="flex items-center justify-between px-5 my-3" :key="extra.id">
          <div>
            {{ extra.name == "Go-Kart and Horse Riding" ? "Horse Riding" : extra.name }}
          </div>
          <div>
            <span>{{ currency(extra.price) }}</span>
          </div>
        </div>
        <!-- <div class="flex items-center justify-between px-5 my-3" :key="extra.id">
          <div>{{ extra.name }}</div>
          <div>
            <span v-if="extra.type == 'cakes'">
              {{ currency($store.getters['extras/cakesPrice']) }}
            </span>
            <span v-else-if="extra.type == 'drinks'">{{ currency($store.getters['extras/drinksPrice']) }}</span>
            <span v-else-if="extra.type == 'massages'">{{ currency($store.getters['extras/massagesPrice']) }}</span>
            <span v-else-if="extra.type == 'bikes'">{{ currency($store.getters['extras/bikesPrice']) }}</span>
            <span v-else-if="extra.type == 'photoshoot'">{{ currency($store.getters['extras/photoshootPrice']) }}</span>
            <span v-else-if="extra.type == 'roomDecoration'">{{ currency($store.getters['extras/decorationPrice']) }}</span>
            <span v-else-if="extra.type == 'unforgettableExperience'">{{ currency($store.getters['extras/experiencePrice']) }}</span>
            <span v-else-if="extra.type == 'domesticStaff'">{{ currency($store.getters['extras/staffPrice']) }}</span>
            <span v-else-if="extra.type == 'massage'">{{ currency($store.getters['extras/massagePrice']) }}</span>
            <span v-else-if="extra.type == 'newmassage'">{{ currency($store.getters['extras/newmassagePrice']) }}</span>
            <span v-else-if="extra.type == 'lookout'">{{ currency($store.getters['extras/quadbikePrice']) }}</span>
            <span v-else-if="extra.type == 'lookout'">{{ currency($store.getters['extras/lookoutPrice']) }}</span>
            <span v-else>{{ currency(0) }} - {{ extra.type }}</span>
          </div>
        </div>-->
      </template>
    </div>

    <div
      class="w-full text-gray-800 border-t border-borderColor-light bg-gray-button"
      v-if="showDiscount"
    >
      <!-- <div
        class="flex justify-between px-5 my-3"
        v-if="!hideExtraGuests && extraPeoplePrice > 0"
      >
        <div>Extra Guest(s)</div>
        <div class="font-bold">+ {{ currency(extraPeoplePrice) }}</div>
      </div> -->
      <div class="flex justify-between px-5 my-6">
        <div>Sub-total</div>
        <div class="font-bold">{{ currency(subTotal) }}</div>
      </div>
      <div
        class="flex justify-between px-5 my-3"
        v-if="roomDiscountPercent > 0 && roomDiscount > 0"
      >
        <div>
          {{ roomDiscountPercent }}% Room Discount
          <small
            class="text-xs text-gray-700"
            v-if="roomVillaPrices > 0 && roomLoftPrices > 0"
          >
            <br />(exludes Villas and The Loft)
          </small>
          <small class="text-xs text-gray-700" v-else-if="roomVillaPrices > 0">
            <br />(exludes Villas)
          </small>
          <small class="text-xs text-gray-700" v-else-if="roomLoftPrices > 0">
            <br />(exludes The Loft)
          </small>
        </div>
        <div class="font-bold">- {{ currency(roomDiscount) }}</div>
      </div>
      <div class="flex justify-between px-5 my-3" v-if="memberDiscount > 0">
        <div>100Club Discount</div>
        <div class="font-bold">- {{ currency(memberDiscount) }}</div>
      </div>
      <div class="flex justify-between px-5 my-3" v-if="discount > 0">
        <div>Discount</div>
        <div class="font-bold">- {{ currency(discount) }}</div>
      </div>
      <!-- <div class="flex justify-between px-5 my-3">
                <div>Extra Guest(s)</div>
                <pre>{{extraPeople}} -- {{ hasVillaMix }}</pre>
                <div class="font-bold"> + {{ currency(extraPeoplePrice) }}</div>
      </div>-->
    </div>

    <div class="w-full px-5 py-3 border-t border-borderColor-light bg-gray-button">
      <div class="flex justify-between w-full my-3">
        <div class="text-sm">Consumption Tax and VAT (12.5%)</div>
        <div class="text-sm font-bold">{{ currency(taxTotal) }}</div>
      </div>
      <div
        class="flex justify-between w-full my-3 mb-4"
        v-if="guestsDiscountPercent > 0 && guestsDiscount > 0"
      >
        <div>{{ guestsDiscountPercent }}% Guests Discount</div>
        <div class="font-bold">- {{ currency(guestsDiscount) }}</div>
      </div>
      <div class="flex justify-between w-full my-3">
        <div class="text-xl">Total</div>
        <div class="text-xl font-bold">{{ currency(totalPrice) }}</div>
      </div>
    </div>

    <div
      v-if="$store.state.editMode"
      class="w-full px-5 py-3 border rounded-md border-brand-blue-300 bg-brand-blue-100"
    >
      <div v-if="$store.state.editBooking.previous_change" class="flex justify-between">
        <div class="text-xs">
          Booking Transfer Charge (12.5% VAT and Consumption tax included)
        </div>
        <div class="text-xs font-bold">{{ currency(28125) }}</div>
      </div>
      <div class="flex justify-between">
        <div class="text-xl">Difference to Pay</div>
        <div class="text-xl font-bold">{{ currency(differenceToPay) }}</div>
      </div>
      <div class="flex justify-between mt-8 text-xs">
        <div>Previous Cost</div>
        <div class="font-bold">{{ currency(previousTotalPaid) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  props: {
    showGuests: {
      type: Boolean,
      default: true,
    },
    showDiscount: {
      type: Boolean,
      default: false,
    },
    hideExtraGuests: {
      type: Boolean,
      default: false,
    },
  },
  // data() {
  //     return {
  //         discount: 0,
  //     };
  // },
  computed: {
    specialPrices() {
      return this.specials
        .map((special) => {
          let price = 0;
          switch (special.type) {
            case "cakes":
              price = this.$store.getters["extras/cakesPrice"];
              break;
            case "drinks":
              price = this.$store.getters["extras/drinksPrice"];
              break;
            case "dayPass":
              price = this.$store.getters["extras/dayPassPrices"];
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
            case "conferences":
              price = this.$store.getters["extras/conferencePrice"];
              break;
            case "teams":
              price = this.$store.getters["extras/teamsPrice"];
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
        })
        .filter((sp) => sp.type == "roomDecoration" || sp.price > 0);
    },
    hasVillaMix() {
      return this.$store.getters.hasVillaMixed;
    },
    dayFromTo() {
      return this.$store.getters.dayFromTo;
    },
    dateFromTo() {
      return this.$store.getters.dateFromTo;
    },
    totalNights() {
      return this.$store.getters.totalNights;
    },
    roomsDetailsStandard() {
      return this.$store.getters.roomsDetailsStandard;
    },
    roomsDetailsFamily() {
      return this.$store.getters.roomsDetailsFamily;
    },
    roomsDetailsVilla() {
      return this.$store.getters.roomsDetailsVilla;
    },
    roomsDetailsLoft() {
      return this.$store.getters.roomsDetailsLoft;
    },
    roomsDetailsStudio() {
      return this.$store.getters.roomsDetailsStudio;
    },
    editBooking() {
      return this.$store.state.editBooking;
    },
    differenceToPay() {
      return this.$store.getters.differenceToPay;
    },
    specials() {
      return this.$store.getters["extras/allSelected"];
    },
    childrenAges() {
      const children = this.$store.state.other_guests.filter((g) => g.type != "adult");
      let ageObj = {};

      children.forEach((child) => {
        if (!ageObj[child.age]) {
          ageObj[child.age] = 1;
        } else {
          ageObj[child.age]++;
        }
      });

      return ageObj;
    },
    childNo() {
      return this.$store.state.child_no;
    },
    adultNo() {
      return this.$store.state.adult_no;
    },
    rooms() {
      return this.$store.getters.bookedRooms;
    },
    roomVillaPrices() {
      return this.$store.getters.roomVillaPrices;
    },
    roomLoftPrices() {
      return this.$store.getters.roomLoftPrices;
    },
    roomDiscountPercent() {
      return this.$store.getters.roomDiscountPercent;
    },
    roomDiscount() {
      return this.$store.getters.roomDiscount;
    },
    guestsDiscountPercent() {
      return this.$store.getters.guestsDiscountPercent
    },
    guestsDiscount() {
      return this.$store.getters.guestsDiscount
    },
    memberDiscount() {
      return this.$store.getters.memberDiscount;
    },
    taxTotal() {
      return this.$store.getters.taxTotal;
    },
    subTotal() {
      return this.$store.getters.subTotal;
    },
    discount() {
      return this.$store.getters.discount;
    },
    extraPeoplePrice() {
      return this.$store.getters.extraPeoplePrice;
    },
    extraPeople() {
      return this.$store.getters.extraPeople;
    },
    confirmEnoughRooms() {
      return this.$store.getters.confirmEnoughRooms;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
    previousTotalPaid() {
      return this.$store.getters.previousTotalPaid;
    },
    roomsData() {
      return this.$store.getters.roomsData;
    },
  },
  methods: {
    formatAndString(arrs) {
      const arr = [...new Set(arrs)];
      if (arr.length == 1) return arr[0];

      arr.sort();
      const last = arr[arr.length - 1];

      arr.pop();

      return arr.join(", ") + " & " + last;
    },
    formatAndStringCabin(arrs) {
      const arr = [...new Set(arrs)];

      const index = arr.indexOf(6);
      if (index > -1) {
        arr.splice(index, 1);
      }

      if (arr.length == 0) return false;
      if (arr.length == 1) return arr[0];

      arr.sort();
      const last = arr[arr.length - 1];

      arr.pop();

      return arr.join(", ") + " & " + last;
    },
    formatAndStringLoft() {
      const arr = this.roomsDetailsLoft;
      let str = ''

      for (let index = 0 ; index < arr.length  ; index ++) {
        const roomIndex = this.roomsData.findIndex((room) => room.id == arr[index]);
        str += this.roomsData[roomIndex].name?.replace('Loft - ','The Loft ')

        if(index != arr.length -1){
          str += ', '
        }
      }

      return str;
    },
    formatDate(date) {
      return format(parseISO(date), "do MMM yyyy");
    },
    currency(num) {
      return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    ageToString(age, qty) {
      const translate = {
        "0 - 12": "Infant (0 - 12) months",
        "1 - 3": "Toddler (1 - 3) yrs",
        "4 - 17": "Child (4 - 17) yrs",
      };

      const translatePlural = {
        "0 - 12": "Infants (0 - 12) months",
        "1 - 3": "Toddlers (1 - 3) yrs",
        "4 - 17": "Children (4 - 17) yrs",
      };

      if (qty > 1) {
        return translatePlural[age];
      }

      return translate[age];
    },
  },
};
</script>
