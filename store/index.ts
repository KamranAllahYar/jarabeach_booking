import { GetterTree, MutationTree, ActionTree } from 'vuex';

export const state = () => ({
  groupType: 'individual' as string,
  adult_no: 1 as number,
  child_no: 0 as number,
  children_ages: [] as any[],
  rooms: [] as any[],
  guest: {} as any,
  roomsData: [] as any[],
  policies: [] as any[],
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
}

export const mutations: MutationTree<RootState> = {
  UPDATE_GROUP: (state, payload) => {
    state.groupType = payload.groupType
    state.adult_no = payload.adult_no
    state.child_no = payload.child_no
    state.children_ages = payload.childrenAges.map((age: any) => age.age)
  },

  UPDATE_GUEST: (state, payload) => {
    state.guest = payload
  },
  UPDATE_ROOMS: (state, roomsData) => {
    state.rooms = roomsData;
  },
  UPDATE_ROOMS_DATA: (state, roomsData) => {
    state.roomsData = roomsData;
  },
  UPDATE_POLICIES: (state, policies) => {
    state.policies = policies;
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

  createBooking({ commit, state, dispatch }) {

    const dataToPost = {
      guest: {
        first_name: state.guest.first_name,
        last_name: state.guest.last_name,
        phone: state.guest.phone,
        email: state.guest.email,
        gender: state.guest.gender,
        dob: state.guest.dob,
        identification: state.guest.identification,
        hear_of_us: state.guest.hear_of_us,
        concerns: state.guest.concerns
      },
      booking: {
        full_names: state.guest.full_names
      },
      booked_rooms: state.rooms,
    }

    this.$axios.post("bookings", dataToPost)
      .then(res => {
        console.log(res.data);

        this.app.$toast.success("Your booking has successfully been submitted");
      })
  },

}
