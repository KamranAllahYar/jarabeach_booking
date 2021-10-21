import { GetterTree, MutationTree, ActionTree } from 'vuex';
import differenceInDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import Bugsnag from '@bugsnag/js'

var groupBy = function (xs: any, key: any) {
  return xs.reduce(function (rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

var onlyUnique = function (value: any, index: any, self: string | any[]) {
  return self.indexOf(value) === index;
}

export const state = () => ({
  groupType: 'individual' as string,
  adult_no: 0 as number,
  child_no: 0 as number,
  children_ages: [] as any[],

  rooms: [] as any[],
  roomsData: [] as any[],
  policies: [] as any[],

  guest: {} as any,
  saveForNextTime: false as boolean,
  guestFormData: {} as FormData,
  weHaveData: false as boolean,
  other_guests: [] as any[],

  guests_done: false as boolean,
  availability_done: false as boolean,
  profile_done: false as boolean,
  policy_done: false as boolean,

  done_data: {} as any,

  extra: '' as string,
  showExtra: false as boolean,
  specials: [
    "lookout", "massage", "newmassage", "quadbike",
    "photoshoot", "drinks", "cakes", "roomDecoration", "unforgettableExperience",
    "domesticStaff"
  ] as any[],

  booking: null as any,
  discount: null as any,

  lastUpdate: null as Date | null,

  editMode: false as boolean,
  editBooking: null as any,
  adminEditMode: false as boolean,

  fullPageLoader: false as boolean,

  noDiscountDates: [] as string[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  totalPeople: (state: RootState) => state.adult_no + state.child_no,
  noAdults: (state: RootState) => state.adult_no,
  noChildren: (state: RootState) => state.child_no,
  noDiscountDates: (state: RootState) => state.noDiscountDates,
  noTeens: (state: RootState) => state.other_guests.filter((child) => child.type == "teen").length,
  bigPeople: (state: RootState, getters) => getters.noAdults + getters.noTeens,
  smallPeople: (state: RootState, getters) => getters.noChildren - getters.noTeens,
  roomsData: (state: RootState) => state.roomsData,
  policies: (state: RootState) => state.policies,
  bookedRooms: (state: RootState) => {
    const bRooms = [] as any[];

    state.rooms.forEach(room => {
      let rData = state.roomsData.find(r => r.id === room.room_id);

      if (rData) {
        bRooms.push({
          room_id: room.room_id,
          name: rData.name,
          type: rData.type,
          date: room.date,
          price: rData.price,
          single_price: rData.single_price,
          isWeekend: room.isWeekend,
        });
      }
    });

    return bRooms;
  },
  uniqueBookedRooms: (state: RootState, getters) => {
    return getters.bookedRooms.filter(onlyUnique);
  },
  dateFromTo: (state: RootState, getters) => {
    const dates = getters.bookedRooms.map((room: any) => room.date);

    let orderedDates = dates.sort(function (a: string, b: string) {
      return Date.parse(a) > Date.parse(b);
    });

    if (orderedDates.length == 0) return;

    if (orderedDates.length == 1) {
      return format(parseISO(orderedDates[0]), "do MMM Y");
    } else {
      return format(parseISO(orderedDates[0]), "do MMM Y") + " - " + format(parseISO(orderedDates[orderedDates.length - 1]), "do MMM Y");;
    }
  },
  roomsDetailsStandard: (state: RootState, getters) => {
    const rooms = getters.bookedRooms.filter((room: any) => room.type == 'standard').map((room: any) => room.room_id);
    return rooms.filter(onlyUnique);
  },
  roomsDetailsFamily: (state: RootState, getters) => {
    const rooms = getters.bookedRooms.filter((room: any) => room.type == 'family').map((room: any) => room.room_id);
    return rooms.filter(onlyUnique);
  },
  uniqueRooms: (state: RootState, getters) => {
    const roomGroup = groupBy(getters.bookedRooms, 'room_id');
    return Object.keys(roomGroup);
  },
  totalRooms: (state: RootState, getters) => {
    const roomGroup = groupBy(getters.bookedRooms, 'room_id');
    return Object.keys(roomGroup).length;
  },
  totalNights: (state: RootState, getters) => {
    const roomGroup = groupBy(getters.bookedRooms, 'date');
    return Object.keys(roomGroup).length;
  },
  getSpecials: (state: RootState) => state.specials,
  getBooking: (state: RootState) => state.booking,
  bookingDates: (state: RootState, getters) => {
    const dates = getters.bookedRooms.map((r: any) => r.date)

    return [...new Set(dates)];
  },
  extraPeoplePrice: (state: RootState, getters) => {
    let price = 0;
    const bigPrice = 50000;
    const smallPrice = 35000;

    const noOfRooms = getters.totalRooms;
    if (noOfRooms == 0) return price;

    const bigMax = 3 * noOfRooms;
    let smallMax = 2 * noOfRooms;

    if (getters.bigPeople > bigMax) {
      const bigExtra = getters.bigPeople - bigMax;

      if (getters.noTeens > 0) {
        const noOfTeens = getters.noTeens;

        if (bigExtra <= noOfTeens) {
          price += smallPrice * bigExtra;
        } else {
          const teenPrice = smallPrice * noOfTeens;
          const normalPrice = (bigExtra - noOfTeens) * bigPrice;

          price += teenPrice + normalPrice;
        }
      } else {
        price += bigExtra * bigPrice;
      }
    } else {
      smallMax = smallMax + (bigMax - getters.bigPeople);
    }

    if (getters.smallPeople > smallMax) {
      const smallExtra = getters.smallPeople - smallMax;
      price += smallExtra * smallPrice;
    }

    price = price * +getters.totalNights;

    return price;
  },
  confirmEnoughRooms: (state: RootState, getters) => {
    const roomTypes = getters.uniqueRooms.map((roomid: any) => {
      const r = state.roomsData.find(r => r.id == roomid);
      if (r) {
        return r.type;
      }
    });

    const standardBigMax = 2;
    const familyBigMax = 6;
    const standardSmallMax = 2;
    const familySmallMax = 2;

    let totalBigMax = 0;
    let totalSmallMax = 0;

    roomTypes.forEach((type: any) => {
      if (type == 'standard') {
        totalBigMax += standardBigMax;
        totalSmallMax += standardSmallMax;
      } else if (type == 'family') {
        totalBigMax += familyBigMax;
        totalSmallMax += familySmallMax;
      }
    });

    const bigDiff = totalBigMax - getters.bigPeople;
    if (bigDiff < 0) return false;

    totalSmallMax += bigDiff;

    return getters.smallPeople <= totalSmallMax;
  },
  roomPrice: (state: RootState, getters) => {
    const roomPrices = getters.bookedRooms.reduce((price: number, room: any) => {
      if (room.type == 'family') {
        return price + room.price;
      }
      else if (room.type == 'standard') {
        if (getters.totalPeople == 1) {
          return price + room.single_price;
        } else {
          return price + room.price;
        }
      }
    }, 0);

    return roomPrices;
  },
  // roomPrice: (state: RootState, getters) => {
  //   let totalPeople = getters.totalPeople;
  //   let nowSingles = false;

  //   let roomsLeft = getters.uniqueRooms.map((room_id: any) => {
  //     return getters.bookedRooms.find((room: any) => room.room_id == room_id);
  //   });

  //   let roomPrices = 0;
  //   for (let i = 0; i < getters.bookedRooms.length; i++) {
  //     const nowRoom = getters.bookedRooms[i];

  //     if (roomsLeft.length >= totalPeople) {
  //       nowSingles = true;
  //     } else {
  //       nowSingles = false;
  //     }

  //     if (nowSingles) {
  //       roomPrices += nowRoom.single_price;
  //     } else {
  //       roomPrices += nowRoom.price;
  //     }

  //     if (nowRoom.type == 'family') totalPeople -= 3;
  //     if (nowRoom.type == 'standard') totalPeople -= 2;
  //     roomsLeft.splice(i, 1);
  //   }

  //   return roomPrices;
  // },
  roomDiscountPercent: (state: RootState, getters) => {
    const roomGroup = groupBy(getters.bookedRooms, 'date');

    const myDates = Object.keys(roomGroup);
    const noDiscountDates = getters.noDiscountDates;
    let t = 0;

    myDates.forEach(date => {
      let shouldCount = true;
      noDiscountDates.some((noDate: string) => {
        // console.log("----");
        // console.log(parseISO(date));
        // console.log(parseISO(noDate));
        // console.log("Day -- " + isSameDay(parseISO(date), parseISO(noDate)));
        // console.log("Month -- " + isSameMonth(parseISO(date), parseISO(noDate)));
        // if ((isSameDay(parseISO(date), parseISO(noDate)) && isSameMonth(parseISO(date), parseISO(noDate)))) {
        if ((isSameDay(parseISO(date), parseISO(noDate)) && isSameMonth(parseISO(date), parseISO(noDate)) && isSameYear(parseISO(date), parseISO(noDate)))) {
          shouldCount = false;
          return true;
        }
      });

      if (shouldCount) t++;
    });

    console.log("Total nights: " + t);

    // const totalNights = getters.totalNights;
    const totalNights = t;
    let percent = 0;
    if (totalNights == 2) percent = 5;
    else if (totalNights == 3) percent = 10;
    else if (totalNights >= 4) percent = 15;

    return percent;
  },
  roomDiscount: (state: RootState, getters) => {
    return getters.roomPrice * (getters.roomDiscountPercent / 100);
  },
  memberDiscount: (state: RootState, getters) => {
    if (state.guest.is_member) {
      return getters.roomPrice * (20 / 100);
    }

    return 0;
  },
  subTotal: (state: RootState, getters) => {
    const roomPrices = getters.roomPrice;

    let extraPrices = 0;
    getters["extras/allSelected"].forEach((extra: any) => {
      if (extra.type == "cakes") {
        extraPrices += getters["extras/cakesPrice"];
      }
      if (extra.type == "drinks") {
        extraPrices += getters["extras/drinksPrice"];
      }
      if (extra.type == "massages") {
        extraPrices += getters["extras/massagesPrice"];
      }
      if (extra.type == "photoshoot") {
        extraPrices += getters[
          "extras/photoshootPrice"
        ];
      }
      if (extra.type == "roomDecoration") {
        extraPrices += getters[
          "extras/decorationPrice"
        ];
      }
      if (extra.type == "unforgettableExperience") {
        extraPrices += getters[
          "extras/experiencePrice"
        ];
      }
      if (extra.type == "domesticStaff") {
        extraPrices += getters["extras/staffPrice"];
      }
      if (extra.type == "massage") {
        extraPrices += getters["extras/massagePrice"];
      }
      if (extra.type == "newmassage") {
        extraPrices += getters["extras/newmassagePrice"];
      }
      if (extra.type == "quadbike") {
        extraPrices += getters["extras/quadbikePrice"];
      }
      if (extra.type == "lookout") {
        extraPrices += getters["extras/lookoutPrice"];
      }
    });

    return extraPrices + roomPrices;
  },
  discount: (state: RootState, getters) => {
    const discount = state.discount;
    if (!discount) return 0;

    if (discount.type == "voucher") {
      return discount.amount;
    } else if (discount.type == "discount") {
      const percent = discount.amount / 100;
      return percent * getters.roomPrice;
    }

    return 0;
  },
  preTotal: (state: RootState, getters) => {
    return (+getters.subTotal) - (+getters.discount) - (+getters.roomDiscount) - (+getters.memberDiscount) + (+getters.extraPeoplePrice);
  },
  taxTotal: (state: RootState, getters) => {
    return (+getters.preTotal * 0.05).toFixed(2);
  },
  totalPrice: (state: RootState, getters) => {
    return ((+getters.preTotal) + (+getters.taxTotal)).toFixed(2);
  },
  previousTotalPaid: (state: RootState, getters) => {
    // return state.editBooking.payment.subtotal;
    return state.editBooking.payment.total + (Math.abs(state.editBooking.payment.discount_amount) + Math.abs(state.editBooking.payment.voucher))
  },
  differenceToPay: (state: RootState, getters) => {
    if (!state.editBooking) return 0;

    let diff = getters.totalPrice - getters.previousTotalPaid;

    if (diff < 0) {
      diff = 0;
    }

    if (state.editBooking.previous_change) {
      if (state.adminEditMode == true) {
      } else {
        diff = diff + 25000;
      }
    }

    return diff;
  },
}

export const mutations: MutationTree<RootState> = {
  TOGGLE_FULL_PAGE_LOADER: (state: RootState, value) => {
    state.fullPageLoader = value
  },
  UPDATE_ADMIN_EDIT_MODE: (state: RootState, value) => {
    state.adminEditMode = value;
  },
  CANCEL_EDIT: (state: RootState) => {
    state.editMode = false;
    state.editBooking = null;
  },
  UPDATE_EDIT_MODE: (state: RootState, value) => {
    state.editMode = value;
  },
  SET_EDIT_BOOKINGS: (state: RootState, updateBooking) => {
    state.editBooking = updateBooking;
  },
  TRANSFORM_EDIT_TO_REAL: (state: RootState, booking) => {
    const oldBooking = booking;

    console.log(booking);

    // Guest info transformation
    state.adult_no = oldBooking.adult_no;
    state.child_no = oldBooking.child_no;
    let otherguests = oldBooking.full_names;

    state.other_guests = otherguests;
    state.guests_done = true;

    // ROOM TRANSFORMATION
    state.rooms = oldBooking.rooms.map((room: any) => {
      return {
        isWeekend: false,
        room_id: room.room_id,
        date: format(parseISO(room.date), "yyyy-MM-dd"),
      }
    });
    state.availability_done = true;

    //Guest TRANSFORMATION
    state.guest = oldBooking.guest;
    state.guest.identification = oldBooking.guest.id_url;
    state.guest.dob = format(parseISO(oldBooking.guest.dob), "yyyy-MM-dd");
    state.profile_done = true;

    //POLICIES TRANSFORMATION
    state.policy_done = true;
  },
  UPDATE_EXPIRY: (state, date: Date) => {
    state.lastUpdate = date;
  },
  UPDATE_GROUP: (state, payload) => {
    state.groupType = payload.groupType
    state.adult_no = payload.adult_no
    state.child_no = payload.child_no
    state.children_ages = payload.children_ages.map((age: any) => age.age)

    let otherguests = [];
    for (let i = 0; i < payload.adult_no; i++) {
      otherguests.push({
        first_name: "",
        last_name: "",
        type: 'adult',
        num: i + 1,
        age: "",
      });
    }
    for (let i = 0; i < payload.child_no; i++) {
      let childType = 'teen';
      if (state.children_ages[i] == '0 - 2') childType = 'infant';
      if (state.children_ages[i] == '3 - 5') childType = 'child';

      otherguests.push({
        first_name: "",
        last_name: "",
        type: childType,
        num: i + 1,
        age: state.children_ages[i],
      });
    }

    state.other_guests = otherguests;
  },

  UPDATE_DISCOUNT: (state, discount) => {
    state.discount = discount;
  },
  UPDATE_GUEST: (state, payload) => {
    state.guest = JSON.parse(JSON.stringify(payload.guest));
  },
  GUEST_WEHAVEDATA: (state, payload: boolean) => {
    state.weHaveData = payload;
  },
  GUEST_SAVE_DATA: (state, payload: boolean) => {
    state.saveForNextTime = payload;
  },
  UPDATE_ROOMS: (state, roomsData) => {
    state.rooms = roomsData;
  },
  REMOVE_ROOM: (state, room) => {
    const ix = state.rooms.findIndex(r => room.room_id === r.room_id && room.date == r.date);
    if (ix > -1) {
      state.rooms.splice(ix, 1);
    }
  },
  UPDATE_ROOMS_DATA: (state, roomsData) => {
    state.roomsData = roomsData;
  },
  UPDATE_POLICIES: (state, policies) => {
    state.policies = policies;
  },
  COMPLETE_GUEST: (state) => state.guests_done = true,
  COMPLETE_AVAILABILITY: (state) => state.availability_done = true,
  COMPLETE_PROFILE: (state) => state.profile_done = true,
  COMPLETE_POLICY: (state) => state.policy_done = true,
  SET_BOOKING: (state, payload) => state.booking = payload,

  UPDATE_NO_DISCOUNT_DATES: (state, dates: string[]) => {
    state.noDiscountDates = dates;
  },

  RESET_STORE: (state) => {
    if (state.rooms.length > 0) {
      const email = state.guest.email;
      const days_left = differenceInDays(parseISO(state.rooms[0].date), new Date()) + 1;

      state.done_data.email = email || "";
      state.done_data.days_left = days_left || 0;
      state.done_data.booking_ref = "";
    }

    state.groupType = 'individual' as string;
    state.adult_no = 0 as number;
    state.child_no = 0 as number;
    state.children_ages = [] as any[];
    state.rooms = [] as any[];
    state.roomsData = [] as any[];
    state.policies = [] as any[];

    if (!state.saveForNextTime) {
      state.guest = {} as any;
    }
    state.guest.is_member = false;

    state.weHaveData = false as boolean;
    state.other_guests = [] as any[];
    state.guests_done = false as boolean;
    state.availability_done = false as boolean;
    state.profile_done = false as boolean;
    state.policy_done = false as boolean;

    state.saveForNextTime = false as boolean;

    state.discount = null as any;

    state.editMode = false as boolean;
    state.editBooking = null as any;
    state.adminEditMode = false as boolean;
  },
}

export const actions: ActionTree<RootState, RootState> = {

  loadRooms({ commit }) {
    return this.$axios.get("/rooms").then((res) => {
      console.log(res.data.data);
      commit("UPDATE_ROOMS_DATA", res.data.data);
    })
  },

  loadPolicies({ commit }) {
    this.$axios.get("/policies").then((res) => {
      console.log(res.data.data);
      commit("UPDATE_POLICIES", res.data.data);
    });
  },

  loadNoDiscountDates({ commit }) {
    this.$axios.get("/no-discount-dates").then((res) => {
      // console.log(res.data.data);
      commit("UPDATE_NO_DISCOUNT_DATES", res.data.data);
    });
  },

  async confirmGuest({ }, email: string) {
    return await this.$axios.post("confirm/guest", { email })
      .then(res => {
        console.log(res);
        return res.data
      })
  },

  async saveGuest({ commit }, formData: FormData) {
    return await this.$axios.post("guests", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        console.log(res);
        // return res.data

        if (!res.data.success) {
          let msg = res.data.message;

          let dataError = res.data.data;
          if (dataError) {
            for (let key in dataError) {
              if (dataError.hasOwnProperty(key)) {
                console.log(key + " -> " + dataError[key]);

                dataError[key].forEach((m: any) => {
                  msg += "<br /><br />" + m;
                });
                // for (let m in dataError[key]) {
                // }
              }
            }
          }

          this.app.$toast.error(msg);
          return false;
        }

        commit("UPDATE_GUEST", { guest: res.data.data });
        this.app.$toast.success(res.data.message);
        return true;
      })
  },

  async createTransaction({ state, getters }) {
    console.log(getters);
    let dataToPost = {} as any;
    if (!state.editMode) {
      dataToPost = {
        "method": "Paystack",
        "subtotal": getters.subTotal,
        "taxTotal": getters.taxTotal,
        "total": getters.totalPrice,
      };
    } else {
      console.log(state.editBooking.previous_change);
      let diff = getters.differenceToPay;

      dataToPost = {
        "method": "Paystack",
        "subtotal": getters.subTotal,
        "total": getters.totalPrice,
        "previousTotal": state.editBooking.payment.total,
        "differenceForUpdate": diff,
      };
    }

    const discount = state.discount;
    if (discount) {
      if (discount.type == 'discount') {
        dataToPost['discount'] = discount.amount;
        dataToPost['discount_amount'] = getters.discount;
      } else if (discount.type == 'voucher') {
        dataToPost['voucher'] = discount.amount;
      }
    }

    console.log(dataToPost);
    try {
      const res = await this.$axios.post("transactions", dataToPost);
      console.log(res.data);

      if (res.data.success) {
        return res.data.reference;
      }

      return false;
    } catch (e) {
      return false;
    }
  },

  async createBooking({ state, getters, rootState, rootGetters }, { trans_ref, method_ref, method }) {
    //@ts-ignore
    const extraState = rootState.extras;
    console.log(extraState, rootGetters);

    const allExtras = (rootGetters["extras/allSelected"] as any[]).map(s => s.type);
    let specialsToSend = {
      "extras": allExtras,
    } as any;

    let prices = {
      "Rooms": rootGetters.roomPrice,
      "Room Discount": "-" + rootGetters.roomDiscount,
      "100Club Member Discount": "-" + rootGetters.memberDiscount,
      "Extra People Cost": "+" + rootGetters.extraPeoplePrice,
    } as any;

    if (allExtras.includes('cakes')) {
      specialsToSend['cakes'] = {
        date: extraState.dateCake,
        options: extraState.selectedCakes,
        message: extraState.cakeMessage,
      }
      prices['cakes'] = rootGetters['extras/cakesPrice'];
    }
    if (allExtras.includes('photoshoot')) {
      specialsToSend['photoshoot'] = {
        date: extraState.datePhotoshoot,
        quantity: extraState.selectedPhotoshoot,
      }
      prices['photoshoot'] = rootGetters['extras/photoshootPrice'];
    }
    if (allExtras.includes('roomDecoration')) {
      specialsToSend['roomDecoration'] = {
        date: extraState.dateDecoration,
        welcomeNote: extraState.decorationWelcomeNote,
        petalsNote: extraState.decorationPetalsNote,
        balloonsColor: extraState.decorationBalloonsColor,
        // picnicDate: extraState.decorationPicnicDate,
        // breakfastDate: extraState.decorationBreakfastDate,
        // breakfastTime: extraState.decorationBreakfastTime,
        room: extraState.decorationRoom,
        options: extraState.selectedDecorations.map((sd: any) => sd.id),
      }
      prices['roomDecoration'] = rootGetters['extras/decorationPrice'];
    }
    if (allExtras.includes('unforgettableExperience')) {
      specialsToSend['unforgettableExperience'] = {
        picnicDate: extraState.decorationPicnicDate,
        paintingDate: extraState.decorationPaintingDate,
        breakfastDate: extraState.decorationBreakfastDate,
        breakfastTime: extraState.decorationBreakfastTime,
        options: extraState.selectedExperiences.map((sd: any) => sd.id),
      }
      prices['unforgettableExperience'] = rootGetters['extras/experiencePrice'];
    }
    if (allExtras.includes('drinks')) {
      specialsToSend['drinks'] = {
        date: extraState.dateDrink,
        options: extraState.selectedDrinks,
      }
      prices['drinks'] = rootGetters['extras/drinksPrice'];
    }
    if (allExtras.includes('massages')) {
      specialsToSend['massages'] = {
        date: extraState.dateMassages,
        options: extraState.selectedMassages,
      }
      prices['massages'] = rootGetters['extras/massagesPrice'];
    }
    if (allExtras.includes('domesticStaff')) {
      specialsToSend['domesticStaff'] = {
        dates: extraState.dateStaff,
        info: extraState.selectedStaff,
      }
      prices['domesticStaff'] = rootGetters['extras/staffPrice'];
    }
    if (allExtras.includes('quadbike')) {
      specialsToSend['quadbike'] = {
        date: extraState.dateQuadbike,
        options: extraState.selectedQuadbike,
        quantity: extraState.selectedQuadbikeQty,
      }
      prices['quadbike'] = rootGetters['extras/quadbikePrice'];
    }
    if (allExtras.includes('massage')) {
      specialsToSend['massage'] = {
        date: extraState.dateMassage,
        options: extraState.selectedMassage,
      }
      prices['massage'] = rootGetters['extras/massagePrice'];
    }
    if (allExtras.includes('newmassage')) {
      specialsToSend['newmassage'] = {
        date: extraState.dateNewmassage,
        options: extraState.selectedNewmassage,
        time: extraState.timeNewmassage,
      }
      prices['newmassage'] = rootGetters['extras/newmassagePrice'];
    }
    if (allExtras.includes('lookout')) {
      specialsToSend['lookout'] = {
        date: extraState.dateLookout,
        packages: extraState.selectedLookouts,
      }
      prices['lookout'] = rootGetters['extras/lookoutPrice'];
    }

    prices["Sub Total"] = rootGetters.subTotal;
    // prices["Total"] = rootGetters.total;

    if (state.editMode) {
      let diff = getters.differenceToPay;

      prices["Previous Total"] = state.editBooking.payment.total;
      prices["Balance Paid"] = diff;
    }

    console.log(specialsToSend);

    let dataToPost: any = {
      booking: {
        full_names: state.other_guests || [],
        adult_no: state.adult_no,
        child_no: state.child_no,
        extra_info: "ex",
        trans_ref: trans_ref,
        method_ref: method_ref,
        method: method,
      },
      booked_rooms: state.rooms,
      prices: prices,
      admin_edit_mode: state.adminEditMode,
    }

    if (state.guest.id) {
      dataToPost.guest_id = state.guest.id;
    }

    if (!dataToPost.guest_id) {
      this.app.$toast.info("Please fill your profile information again");
      return;
    }

    if (state.discount) {
      dataToPost.discount = state.discount;
      dataToPost.discount_amount = getters.discount;
    }

    if (state.editMode) {
      dataToPost.oldBookingId = state.editBooking.id;
    }

    console.log(dataToPost);

    console.log(prices);

    try {
      const res = await this.$axios.post("bookings", dataToPost);
      console.log(res.data);

      if (res.data.success) {
        const newBooking = res.data.data.booking;
        console.log(newBooking);
        const sRes = await this.$axios.post(`/book-specials/${newBooking.id}`, specialsToSend);
        console.log(sRes.data);

        this.app.$toast.success(res.data.message);
        state.done_data.booking = newBooking;
      } else {
        this.app.$toast.error(res.data.message);
      }
      return res.data.success;
    } catch (err: any) {
      this.app.$toast.error(err);
      return false;
    }
  },

  loadOldBooking({ state, dispatch, commit }) {
    if (!state.editMode) {
      this.app.$toast.info("You are currently not in Edit mode");
      return;
    }

    const oldBooking = state.editBooking;
    commit("TRANSFORM_EDIT_TO_REAL", oldBooking);
    dispatch("extras/loadOldExtras", oldBooking);
  }

}
