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
  selected: [] as { name: string, type: string, range: string, available: boolean }[],
  selectedIndex: 0 as number,

  decorationOptions: [],
  selectedDecorations: [],

  drinkOptions: [],
  selectedDrinks: [],

  selectedCake: {},

  selectedPhotoshoot: 0,
})

export type ExtraState = ReturnType<typeof state>

export const getters: GetterTree<ExtraState, RootState> = {
  allSpecials: (state: ExtraState) => state.specials,
  allSelected: (state: ExtraState) => state.selected,
  allDrinks: (state: ExtraState) => state.drinkOptions,
  allDecorations: (state: ExtraState) => state.decorationOptions,
}

export const mutations: MutationTree<ExtraState> = {
  LOAD_EXTRAS: (state, payload) => {
    state.specials = payload
  },
  LOAD_SELECTED: (state, payload) => {
    state.selected = payload
  },
  ADD_SELECTED: (state, sp) => {
    state.selected.push(sp);
  },
  REMOVE_SELECTED: (state, sp) => {
    const ix = state.selected.findIndex((s) => s.type == sp.type);
    if (ix >= 0) {
      state.selected.splice(ix, 1);
    }
  },

  RESET_INDEX: (state) => state.selectedIndex = 0,
  INC_INDEX: (state) => state.selectedIndex++,
  DEC_INDEX: (state) => state.selectedIndex--,

  LOAD_DECORATION_OPTIONS: (state, decorations) => {
    state.decorationOptions = decorations
  },
  SET_SELECTED_DECORATION: (state, decorations) => {
    state.selectedDecorations = decorations;
  },


  LOAD_DRINK_OPTIONS: (state, drinks) => {
    state.drinkOptions = drinks
  },
  SET_SELECTED_DRINKS: (state, drinks) => {
    state.selectedDrinks = drinks
  },

  SET_SELECTED_CAKE: (state, cake) => {
    state.selectedCake = cake
  },

  SET_SELECTED_PHOTOSHOOT: (state, num) => {
    state.selectedPhotoshoot = num
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

  getSpecialDrinks({ commit }) {
    this.$axios.get("/drink-options").then((res) => {
      console.log("Drinks")
      console.log(res.data.data);
      commit("LOAD_DRINK_OPTIONS", res.data.data);
    });
  },

  getSpecialDecorations({ commit }) {
    this.$axios.get("/decoration-options").then((res) => {
      console.log("Decorations")
      console.log(res.data.data);
      commit("LOAD_DECORATION_OPTIONS", res.data.data);
    });
  }

}
