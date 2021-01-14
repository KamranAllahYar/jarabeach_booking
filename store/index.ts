import { GetterTree, MutationTree, ActionTree } from 'vuex';
import differenceInDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';

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

  booking: true,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  roomsData: (state: RootState) => state.roomsData,
  policies: (state: RootState) => state.policies,
  bookedRooms: (state: RootState) => {
    const bRooms = [] as any[];

    state.rooms.forEach(room => {
      let rData = state.roomsData.find(r => r.id === room.room_id);

      bRooms.push({
        room_id: rData.id,
        name: rData.name,
        date: room.date,
        price: room.isWeekend ? rData.weekend_price : rData.price,
        isWeekend: room.isWeekend,
      });
    });

    return bRooms;
  },
  getSpecials: (state: RootState) => state.specials,
  getBooking: (state: RootState) => state.booking,
  bookingDates: (state: RootState, getters) => {
    const dates = getters.bookedRooms.map((r: any) => r.date)

    return [...new Set(dates)];
  },
}

export const mutations: MutationTree<RootState> = {
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

  UPDATE_GUEST: (state, payload) => {
    state.guest = JSON.parse(JSON.stringify(payload.guest));
    // state.other_guests = payload.others || []
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
    const email = state.guest.email;
    const days_left = differenceInDays(parseISO(state.rooms[0].date), new Date());

    state.done_email = email || "";
    state.done_days_left = days_left || 0;

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

  async createBooking({ state, rootState, rootGetters }) {
    //@ts-ignore
    const extraState = rootState.extras;
    console.log(extraState, rootGetters);

    const allExtras = (rootGetters["extras/allSelected"] as any[]).map(s => s.type);
    let specialsToSend = {
      "extras": allExtras,
    } as any;

    if (allExtras.includes('cake')) {
      specialsToSend['cake'] = {
        date: extraState.dateCake,
        info: extraState.selectedCake,
      }
    }
    if (allExtras.includes('photoshoot')) {
      specialsToSend['photoshoot'] = {
        date: extraState.datePhotoshoot,
        quantity: extraState.selectedPhotoshoot,
      }
    }
    if (allExtras.includes('roomDecoration')) {
      specialsToSend['roomDecoration'] = {
        date: extraState.dateDecoration,
        options: extraState.selectedDecorations.map((sd: any) => sd.id),
      }
    }
    if (allExtras.includes('drinks')) {
      specialsToSend['drinks'] = {
        date: extraState.dateDrink,
        options: extraState.selectedDrinks,
      }
    }
    if (allExtras.includes('domesticStaff')) {
      specialsToSend['domesticStaff'] = {
        dates: extraState.dateStaff,
        info: extraState.selectedStaff,
      }
    }
    if (allExtras.includes('quadbike')) {
      specialsToSend['quadbike'] = {
        date: extraState.dateQuadbike,
        options: extraState.selectedQuadbike,
        quantity: extraState.selectedQuadbikeQty,
      }
    }
    if (allExtras.includes('massage')) {
      specialsToSend['massage'] = {
        date: extraState.dateMassage,
        options: extraState.selectedMassage,
      }
    }

    console.log(specialsToSend);
    // return;


    let dataToPost: any = {
      booking: {
        full_names: state.other_guests || [],
        adult_no: state.adult_no,
        child_no: state.child_no,
        extra_info: "state.extra_info",
      },
      booked_rooms: state.rooms,
    }

    console.log(dataToPost);

    if (state.guest.id) {
      dataToPost.guest_id = state.guest.id;
    }

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
