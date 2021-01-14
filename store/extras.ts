import { RootState } from './index';
import { GetterTree, MutationTree, ActionTree } from 'vuex';

export const state = () => ({
  specials: [
    { type: 'lookout', name: 'Lookout Experience', available: true, range: '50,000' },
    { type: 'massage', name: 'Massage', available: false, range: '30,000' },
    { type: 'quadbike', name: 'Quad Bikes', available: true, range: '25,000' },
    { type: 'photoshoot', name: 'Photoshoot', available: true, range: '50,000' },
    { type: 'drinks', name: 'ca', available: true, range: '5,000' },
    { type: 'cake', name: 'Cake', available: true, range: '15,000' },
    { type: 'roomDecoration', name: 'Room Decoration', available: true, range: '50,000' },
    { type: 'domesticStaff', name: 'Domestic Staff', available: true, range: '30,000' }
  ] as { name: string, type: string, range: string, available: boolean }[],
  selected: [] as { name: string, type: string, range: string, available: boolean }[],
  selectedIndex: 0 as number,

  lookoutOptions: [] as any[],
  selectedLookouts: [] as any[],
  dateLookout: null as String | null,

  massageOptions: [] as any[],
  selectedMassage: [] as any[],
  dateMassage: null as String | null,

  quadbikeOptions: [] as any[],
  selectedQuadbike: [] as any[],
  selectedQuadbikeQty: 1 as number,
  dateQuadbike: null as String | null,

  decorationOptions: [] as any[],
  selectedDecorations: [] as any[],
  dateDecoration: null as String | null,

  selectedStaff: {
    menu: [],
    type: [],
  } as any,
  dateStaff: [] as String[] | null,

  drinkOptions: [] as any[],
  selectedDrinks: [] as any[],
  dateDrink: null as String | null,

  selectedCake: {},
  dateCake: null as String | null,

  selectedPhotoshoot: 0 as number,
  datePhotoshoot: null as String | null,
})

export type ExtraState = ReturnType<typeof state>

export const getters: GetterTree<ExtraState, RootState> = {
  allSpecials: (state: ExtraState) => state.specials,
  allSelected: (state: ExtraState) => state.selected,
  allDrinks: (state: ExtraState) => state.drinkOptions,
  allDecorations: (state: ExtraState) => state.decorationOptions,
  allLookouts: (state: ExtraState) => state.lookoutOptions,
  allMassages: (state: ExtraState) => state.massageOptions,
  allQuadbikes: (state: ExtraState) => state.quadbikeOptions,

  cakePrice: (state: ExtraState) => {
    if (state.selectedCake) {
      return 15000;
    }

    return 0;
  },
  drinksPrice: (state: ExtraState) => {
    if (state.selectedDrinks.length <= 0) return 0;
    let price = 0;

    for (let i = 0; i < state.selectedDrinks.length; i++) {
      const sDrink = state.selectedDrinks[i];

      const drink = state.drinkOptions.find(dko => dko.id == sDrink.id);

      if (drink) {
        price += (+drink.price * +sDrink.qty);
      }
    }

    return price;
  },
  photoshootPrice: (state: ExtraState) => {
    if (state.selectedPhotoshoot > 0) {
      return 50000 + (+state.selectedPhotoshoot * 15000)
    }

    return 50000;
  },
  decorationPrice: (state: ExtraState) => {
    if (state.selectedDecorations.length <= 0) return 0;

    let price = 0;
    for (let i = 0; i < state.selectedDecorations.length; i++) {
      const deco = state.selectedDecorations[i];

      if (deco) {
        price += +deco.price;
      }
    }
    return price;
  },
  staffPrice: (state: ExtraState) => {
    let price = 0;
    if (state.selectedStaff.type.length > 0) {
      if (state.selectedStaff.type.includes('nanny')) {
        price += 30000
      }
      if (state.selectedStaff.type.includes('driver')) {
        price += 15000
      }

      const totalStaff = state.selectedStaff.type.length;
      if (state.selectedStaff.menu.includes('breakfast')) {
        price += totalStaff * 3000
      }
      if (state.selectedStaff.menu.includes('lunch')) {
        price += totalStaff * 4000
      }
      if (state.selectedStaff.menu.includes('dinner')) {
        price += totalStaff * 5000
      }
    }

    const totalDays = state.dateStaff?.length || 0;

    return totalDays * price;
  },
  massagePrice: (state: ExtraState) => {
    let price = 0;
    const massage = state.massageOptions.find(mo => mo.id == state.selectedMassage);

    if (massage) {
      price = massage.price;
    }

    return price;
  },
  quadbikePrice: (state: ExtraState) => {
    let price = 0;
    const quadbike = state.quadbikeOptions.find(qo => qo.id == state.selectedQuadbike);

    if (quadbike) {
      price = quadbike.price;
    }
    if (state.selectedQuadbikeQty > 1) {
      price = price * state.selectedQuadbikeQty;
    }

    return price;
  },
  lookoutPrice: (state: ExtraState) => {
    if (state.selectedLookouts.length <= 0) return 0;
    let price = 0;

    for (let i = 0; i < state.selectedLookouts.length; i++) {
      const packageId = state.selectedLookouts[i];
      const pack = state.lookoutOptions.find(l => l.id == packageId);

      if (pack) {
        price += pack.price
      }
    }

    return price;
  },
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

  LOAD_LOOKOUT_OPTIONS: (state, lookouts) => {
    state.lookoutOptions = lookouts
  },
  SET_SELECTED_LOOKOUT: (state, payload) => {
    state.selectedLookouts = payload.lookouts;
    state.dateLookout = payload.date;
  },

  LOAD_MASSAGE_OPTIONS: (state, massages) => {
    state.massageOptions = massages
  },
  SET_SELECTED_MASSAGE: (state, payload) => {
    state.selectedMassage = payload.massage;
    state.dateMassage = payload.date;
  },

  LOAD_QUADBIKE_OPTIONS: (state, quadbikes) => {
    state.quadbikeOptions = quadbikes
  },
  SET_SELECTED_QUADBIKE: (state, payload) => {
    state.selectedQuadbike = payload.quadbike;
    state.selectedQuadbikeQty = payload.quantity || 1;
    state.dateQuadbike = payload.date;
  },

  LOAD_DECORATION_OPTIONS: (state, decorations) => {
    state.decorationOptions = decorations
  },
  SET_SELECTED_DECORATION: (state, payload) => {
    state.selectedDecorations = payload.decorations;
    state.dateDecoration = payload.date;
  },

  SET_SELECTED_STAFF: (state, payload) => {
    state.selectedStaff = payload.selectedStaff
    state.dateStaff = payload.dates
  },

  LOAD_DRINK_OPTIONS: (state, drinks) => {
    state.drinkOptions = drinks
  },
  SET_SELECTED_DRINKS: (state, payload) => {
    state.selectedDrinks = payload.drinks
    state.dateDrink = payload.date
  },

  SET_SELECTED_CAKE: (state, payload) => {
    state.selectedCake = payload.cake;
    state.dateCake = payload.date;
  },

  SET_SELECTED_PHOTOSHOOT: (state, payload) => {
    state.selectedPhotoshoot = payload.num;
    state.datePhotoshoot = payload.date;
  },

  RESET_STORE: (state) => {
    state.selected = [] as { name: string, type: string, range: string, available: boolean }[];
    state.selectedIndex = 0 as number;

    state.lookoutOptions = [] as any[];
    state.selectedLookouts = [] as any[];
    state.dateLookout = null as String | null;

    state.massageOptions = [] as any[];
    state.selectedMassage = [] as any[];
    state.dateMassage = null as String | null;

    state.quadbikeOptions = [] as any[];
    state.selectedQuadbike = [] as any[];
    state.selectedQuadbikeQty = 1 as number;
    state.dateQuadbike = null as String | null;

    state.decorationOptions = [] as any[];
    state.selectedDecorations = [] as any[];
    state.dateDecoration = null;

    state.selectedStaff = {
      menu: [],
      type: [],
    };
    state.dateStaff = [];

    state.drinkOptions = [] as any[];
    state.selectedDrinks = [] as any[];
    state.dateDrink = null;

    state.selectedCake = {};
    state.dateCake = null;

    state.selectedPhotoshoot = 0 as number;
    state.datePhotoshoot = null;
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
  },

  getSpecialMassages({ commit }) {
    this.$axios.get("/massage-options").then((res) => {
      console.log("Massages")
      console.log(res.data.data);
      commit("LOAD_MASSAGE_OPTIONS", res.data.data);
    });
  },

  getLookoutOptions({ commit }) {
    this.$axios.get("/lookout-options").then((res) => {
      console.log("Lookout options")
      console.log(res.data.data);
      commit("LOAD_LOOKOUT_OPTIONS", res.data.data);
    });
  },

  getQuadbikeOptions({ commit }) {
    this.$axios.get("/quadbike-options").then((res) => {
      console.log("Quadbike options")
      console.log(res.data.data);
      commit("LOAD_QUADBIKE_OPTIONS", res.data.data);
    });
  }

}
