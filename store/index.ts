import { GetterTree, MutationTree } from 'vuex';

export const state = () => ({
  groupType: 'individual' as string,
  adult_no: 1 as number,
  child_no: 0 as number,
  rooms: [] as any[],
  guest: {} as any,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {

}

export const mutations: MutationTree<RootState> = {
  UPDATE_GROUP: (state, payload) => {
    state.groupType = payload.groupType
    state.adult_no = payload.adult_no
    state.child_no = payload.child_no
  },

  UPDATE_GUEST: (state, payload) => {
    state.guest = payload
  },
  UPDATE_ROOMS: (state, roomsData) => {
    state.rooms = roomsData;

  },
}
