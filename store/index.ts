import { GetterTree, MutationTree, ActionTree } from 'vuex';
import differenceInDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';

var groupBy = function (xs: any, key: any) {
  return xs.reduce(function (rv: any, x: any) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const state = () => ({
  groupType: 'individual' as string,
  adult_no: 0 as number,
  child_no: 0 as number,
  children_ages: [] as any[],

  rooms: [] as any[],
  roomsData: [] as any[],
  policies: [] as any[],

  guest: {} as any,
  saveForNextTime: true as boolean,
  guestFormData: {} as FormData,
  weHaveData: false as boolean,
  other_guests: [] as any[],

  guests_done: false as boolean,
  availability_done: false as boolean,
  profile_done: false as boolean,
  policy_done: false as boolean,

  done_email: "" as string,
  done_days_left: 0 as number,

  extra: '' as string,
  showExtra: false as boolean,
  specials: ["lookout", "massage", "quadbike", "photoshoot", "drinks", "cake", "roomDecoration", "domesticStaff"] as any[],

  booking: null as any,
  discount: null as any,

  lastUpdate: null as Date | null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  totalPeople: (state: RootState) => state.adult_no + state.child_no,
  roomsData: (state: RootState) => state.roomsData,
  policies: (state: RootState) => state.policies,
  bookedRooms: (state: RootState) => {
    const bRooms = [] as any[];

    state.rooms.forEach(room => {
      let rData = state.roomsData.find(r => r.id === room.room_id);

      bRooms.push({
        room_id: room.room_id,
        name: rData.name,
        type: rData.type,
        date: room.date,
        price: rData.price,
        single_price: rData.single_price,
        isWeekend: room.isWeekend,
      });
    });

    return bRooms;
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
  roomDiscountPercent: (state: RootState, getters) => {
    const totalNights = getters.totalNights;
    let percent = 0;
    if (totalNights == 2) percent = 5;
    else if (totalNights == 3) percent = 10;
    else if (totalNights >= 4) percent = 15;

    return percent;
  },
  roomDiscount: (state: RootState, getters) => {
    return getters.roomPrice * (getters.roomDiscountPercent / 100);
  },
  subTotal: (state: RootState, getters) => {
    const roomPrices = getters.roomPrice;

    let extraPrices = 0;
    getters["extras/allSelected"].forEach((extra: any) => {
      if (extra.type == "cake") {
        extraPrices += getters["extras/cakePrice"];
      }
      if (extra.type == "drinks") {
        extraPrices += getters["extras/drinksPrice"];
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
      if (extra.type == "domesticStaff") {
        extraPrices += getters["extras/staffPrice"];
      }
      if (extra.type == "massage") {
        extraPrices += getters["extras/massagePrice"];
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
      return percent * getters.subTotal;
    }

    return 0;
  },
  totalPrice: (state: RootState, getters) => {
    return getters.subTotal - getters.discount - getters.roomDiscount;
  }
}

export const mutations: MutationTree<RootState> = {
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
      });
    }
    for (let i = 0; i < payload.child_no; i++) {
      otherguests.push({
        first_name: "",
        last_name: "",
        type: 'child',
        num: i + 1,
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

  RESET_STORE: (state) => {
    if (state.rooms.length > 0) {
      const email = state.guest.email;
      const days_left = differenceInDays(parseISO(state.rooms[0].date), new Date());

      state.done_email = email || "";
      state.done_days_left = days_left || 0;
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

    state.weHaveData = false as boolean;
    state.other_guests = [] as any[];
    state.guests_done = false as boolean;
    state.availability_done = false as boolean;
    state.profile_done = false as boolean;
    state.policy_done = false as boolean;

    state.saveForNextTime = true as boolean;

    state.discount = null as any;
  },
}

export const actions: ActionTree<RootState, RootState> = {

  loadRooms({ commit }) {
    this.$axios.get("/rooms").then((res) => {
      console.log(res.data.data);
      commit("UPDATE_ROOMS_DATA", res.data.data);
    });
  },

  loadPolicies({ commit }) {
    this.$axios.get("/policies").then((res) => {
      console.log(res.data.data);
      commit("UPDATE_POLICIES", res.data.data);
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
          this.app.$toast.error(res.data.message);
          return false;
        }

        commit("UPDATE_GUEST", { guest: res.data.data });
        this.app.$toast.success(res.data.message);
        return true;
      })
  },

  async createTransaction({ state, getters }) {
    console.log(getters);
    let dataToPost = {
      "method": "Paystack",
      "subtotal": getters.subTotal,
      "total": getters.totalPrice,
    } as any;

    const discount = state.discount;
    if (discount) {
      if (discount.type == 'discount') {
        dataToPost['discount'] = discount.amount;
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

  async createBooking({ state, rootState, rootGetters }, { trans_ref, method_ref }) {
    //@ts-ignore
    const extraState = rootState.extras;
    console.log(extraState, rootGetters);

    const allExtras = (rootGetters["extras/allSelected"] as any[]).map(s => s.type);
    let specialsToSend = {
      "extras": allExtras,
    } as any;

    let prices = {
      rooms: rootGetters.roomPrice,
      subtotal: rootGetters.subTotal,
      roomDiscount: rootGetters.roomDiscount,
    } as any;

    if (allExtras.includes('cake')) {
      specialsToSend['cake'] = {
        date: extraState.dateCake,
        info: extraState.selectedCake,
      }
      prices['cake'] = rootGetters['extras/cakePrice'];
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
        options: extraState.selectedDecorations.map((sd: any) => sd.id),
      }
      prices['roomDecoration'] = rootGetters['extras/decorationPrice'];
    }
    if (allExtras.includes('drinks')) {
      specialsToSend['drinks'] = {
        date: extraState.dateDrink,
        options: extraState.selectedDrinks,
      }
      prices['drinks'] = rootGetters['extras/drinksPrice'];
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
    if (allExtras.includes('lookout')) {
      specialsToSend['lookout'] = {
        date: extraState.dateLookout,
        packages: extraState.selectedLookouts,
      }
      prices['lookout'] = rootGetters['extras/lookoutPrice'];
    }

    console.log(specialsToSend);

    let dataToPost: any = {
      booking: {
        full_names: state.other_guests || [],
        adult_no: state.adult_no,
        child_no: state.child_no,
        extra_info: "state.extra_info",
        trans_ref: trans_ref,
        method_ref: method_ref,
      },
      booked_rooms: state.rooms,
      prices: prices,
    }

    if (state.guest.id) {
      dataToPost.guest_id = state.guest.id;
    }
    if (state.discount) {
      dataToPost.discount = state.discount;
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
      } else {
        this.app.$toast.error(res.data.message);
      }
      return res.data.success;
    } catch (err) {
      this.app.$toast.error(err);
      return false;
    }
  },

}
