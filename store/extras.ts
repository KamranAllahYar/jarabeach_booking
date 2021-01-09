import { RootState } from './index';
import { GetterTree, MutationTree, ActionTree } from 'vuex';

export const state = () => ({
  specials: [
    { type: 'lookout', name: 'Lookout Experience', available: true, range: '50,000' },
    { type: 'massage', name: 'Massage', available: false, range: '30,000' },
    { type: 'quadbikes', name: 'Quad Bikes', available: true, range: '25,000' },
    { type: 'photoshoot', name: 'Photoshoot', available: true, range: '50,000' },
    { type: 'drinks', name: 'ca', available: true, range: '5,000' },
    { type: 'cake', name: 'Cake', available: true, range: '15,000' },
    { type: 'roomDecoration', name: 'Room Decoration', available: true, range: '50,000' },
    { type: 'domesticStaff', name: 'Domestic Staff', available: true, range: '30,000' }
  ] as { name: string, type: string, range: string, available: boolean }[],
})

export type ExtraState = ReturnType<typeof state>

export const getters: GetterTree<ExtraState, RootState> = {
  allSpecials: (state: ExtraState) => state.specials,
}

export const mutations: MutationTree<ExtraState> = {
  LOAD_EXTRAS: (state, payload) => {
    state.specials = payload
  },
}

export const actions: ActionTree<ExtraState, RootState> = {

  updateSpecials({ commit }, dates: string[]) {
    this.$axios.post("/extras", { dates }).then((res) => {
      console.log("EXTRASSS")
      console.log(res.data);
      commit("LOAD_EXTRAS", res.data);
    });
  },

}
