import { RootState } from './index';
import { GetterTree, MutationTree, ActionTree } from 'vuex';

export const state = () => ({
  specials: [
    { type: 'lookout', name: 'Lookout Experience', available: true, range: '15,000' },
    { type: 'massage', name: 'Massage', available: false, range: '30,000' },
    { type: 'quadbike', name: 'Quad Bikes', available: true, range: '25,000' },
    { type: 'photoshoot', name: 'Photoshoot', available: true, range: '50,000' },
    { type: 'drinks', name: 'ca', available: true, range: '15,000' },
    { type: 'cake', name: 'Cake', available: true, range: '15,000' },
    { type: 'roomDecoration', name: 'Room Decoration', available: true, range: '0' },
    { type: 'domesticStaff', name: 'Domestic Staff', available: true, range: '15,000' }
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
  decorationWelcomeNote: "" as String,
  dateDecoration: null as String | null,

  staffPrices: [] as any[],
  selectedStaff: {
    menu: [],
    type: ['nanny'],
  } as any,
  dateStaff: [] as String[] | null,

  drinkOptions: [] as any[],
  selectedDrinks: [] as any[],
  dateDrink: null as String | null,

  cakePrices: [] as any[],
  selectedCake: {} as any,
  dateCake: null as String | null,

  photoshootPrices: [] as any[],
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
      let six_inch_price = 15000;
      let eight_inch_price = 20000;

      console.log("CAKEEEE PRICE");
      // console.log(price);

      if (state.cakePrices) {
        let p = state.cakePrices.find(_p => _p.name.toLowerCase() == "6inch");
        if (p) {
          six_inch_price = +p.price;
        }
        let e = state.cakePrices.find(_p => _p.name.toLowerCase() == "8inch");
        if (e) {
          eight_inch_price = +e.price;
        }
      }

      let quantity = +state.selectedCake.quantity;
      if (quantity <= 0) quantity = 1;


      let price = six_inch_price;
      if (state.selectedCake.type === '6inch') {
        console.log("its six inch");
        console.log(six_inch_price);
        console.log(quantity);
        price = six_inch_price * quantity;
      } else if (state.selectedCake.type === '8inch') {
        console.log("its eight inch");
        console.log(eight_inch_price);
        console.log(quantity);
        price = eight_inch_price * quantity;
      }
      console.log("CAKEEEE PRICE");
      console.log(state.selectedCake);
      console.log(price);

      return price;
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
      let photographerPrice = 50000;
      let assistantPrice = 15000;

      if (state.photoshootPrices) {
        let p = state.photoshootPrices.find(_p => _p.name.toLowerCase() == "photographer");
        if (p) {
          photographerPrice = +p.price;
        }
        let a = state.photoshootPrices.find(_a => _a.name.toLowerCase() == "assistant");
        if (a) {
          assistantPrice = +a.price;
        }
      }

      return photographerPrice + (+state.selectedPhotoshoot * assistantPrice)
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

    let driverPrice = 15000;
    let nannyPrice = 30000;
    let breakfastPrice = 3000;
    let lunchPrice = 4000;
    let dinnerPrice = 5000;

    if (state.staffPrices) {
      let d = state.staffPrices.find(_d => _d.name.toLowerCase() == "driver");
      if (d) {
        driverPrice = +d.price;
      }
      let n = state.staffPrices.find(_n => _n.name.toLowerCase() == "nanny");
      if (n) {
        nannyPrice = +n.price;
      }
      let b = state.staffPrices.find(_b => _b.name.toLowerCase() == "breakfast");
      if (b) {
        breakfastPrice = +b.price;
      }
      let l = state.staffPrices.find(_l => _l.name.toLowerCase() == "lunch");
      if (l) {
        lunchPrice = +l.price;
      }
      let di = state.staffPrices.find(_di => _di.name.toLowerCase() == "dinner");
      if (di) {
        dinnerPrice = +di.price;
      }
    }

    if (state.selectedStaff.type.length > 0) {
      if (state.selectedStaff.type.includes('nanny')) {
        price += nannyPrice
      }
      if (state.selectedStaff.type.includes('driver')) {
        price += driverPrice
      }

      const totalStaff = state.selectedStaff.type.length;
      if (state.selectedStaff.menu.includes('breakfast')) {
        price += totalStaff * breakfastPrice
      }
      if (state.selectedStaff.menu.includes('lunch')) {
        price += totalStaff * lunchPrice
      }
      if (state.selectedStaff.menu.includes('dinner')) {
        price += totalStaff * dinnerPrice
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

function getSpecialObjFromStr(specials: any[], specialStr: String): any {
  const special = specials.find(s => s.type == specialStr);
  if (special) return special;

  return null;
}

export const mutations: MutationTree<ExtraState> = {
  LOAD_EXTRAS: (state, payload) => {
    state.specials = payload
  },
  LOAD_SELECTED: (state, payload) => {
    state.selected = payload
  },
  REMOVE_EXTRA: (state, extra) => {
    console.log(extra);
    const ix = state.selected.findIndex(ex => ex.type === extra);

    if (ix >= 0) {
      state.selected.splice(ix, 1);
    }
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
  EMPTY_SELECTED: (state, sp) => {
    state.selected = [];
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
    state.decorationWelcomeNote = payload.note;
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

  SET_MOST_PRICES: (state, payload) => {
    state.cakePrices = payload.cake;
    state.photoshootPrices = payload.photoshoot;
    state.staffPrices = payload.domesticStaff;
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
    state.decorationWelcomeNote = "" as String;

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

  TRANSFORM_CAKE: (state, payload) => {
    const oldDates = payload.dates;
    const oldCake = payload.cake;

    state.selectedCake = oldCake.data;
    if (oldDates.includes(oldCake.date)) {
      state.dateCake = oldCake.date;
    }
  },
  TRANSFORM_DECORATION: (state, payload) => {
    const oldDates = payload.dates;
    const oldDecos = payload.decos;

    state.selectedDecorations = [];
    oldDecos.forEach((deco: any) => {
      if (oldDates.includes(deco.date)) {
        state.dateDecoration = deco.date;
      }

      if (deco.note) state.decorationWelcomeNote = deco.note;

      const option = state.decorationOptions.find((dOption) => dOption.id == deco.option_id);
      if (option) state.selectedDecorations.push(option);
    });
  },
  TRANSFORM_DRINKS: (state, payload) => {
    const oldDates = payload.dates;
    const oldDrinks = payload.drinks;

    state.selectedDrinks = [];
    oldDrinks.forEach((drink: any) => {
      if (oldDates.includes(drink.date)) {
        state.dateDrink = drink.date;
      }

      state.selectedDrinks.push({ id: drink.option_id, qty: drink.quantity });
    });
  },
  TRANSFORM_PHOTOSHOOT: (state, payload) => {
    const oldDates = payload.dates;
    const oldPhotoshoot = payload.photoshoot;

    state.selectedPhotoshoot = oldPhotoshoot.quantity;
    if (oldDates.includes(oldPhotoshoot.date)) {
      state.datePhotoshoot = oldPhotoshoot.date;
    }
  },
  TRANSFORM_STAFF: (state, payload) => {
    const oldDates = payload.dates;
    const oldStaff = payload.staff;

    console.log(oldStaff)

    state.dateStaff = [];
    oldStaff.dates.forEach((oldDate: string) => {
      if (oldDates.includes(oldDate)) {
        state.dateStaff!.push(oldDate);
      }
    })

    state.selectedStaff.menu = oldStaff.data.menu;
    state.selectedStaff.type = oldStaff.data.type;
  },
  TRANSFORM_QUADBIKE: (state, payload) => {
    const oldDates = payload.dates;
    const oldQuadbike = payload.quadbike;

    console.log(oldQuadbike)

    if (oldDates.includes(oldQuadbike.date)) {
      state.dateQuadbike = oldQuadbike.date;
      state.selectedQuadbike = oldQuadbike.option_id;
      state.selectedQuadbikeQty = oldQuadbike.quantity;
    }
  },
  TRANSFORM_MASSAGE: (state, payload) => {
    const oldDates = payload.dates;
    const oldMassage = payload.massage;

    console.log(oldMassage)

    if (oldDates.includes(oldMassage.date)) {
      state.dateMassage = oldMassage.date;
      state.selectedMassage = oldMassage.slot_id;
    }
  },
  TRANSFORM_LOOKOUTS: (state, payload) => {
    const oldDates = payload.dates;
    const oldLookout = payload.lookouts;

    state.selectedLookouts = [];
    let packages: any[] = [];
    oldLookout.forEach((lookout: any) => {
      if (oldDates.includes(lookout.date)) {
        console.log("----------");
        console.log(lookout);
        state.dateLookout = lookout.date;
        packages.push(lookout.package_id);
      }
    });
    state.selectedLookouts = packages;
    console.log(state.selectedLookouts);
  },
}

export const actions: ActionTree<ExtraState, RootState> = {

  updateSpecials({ commit, rootState }, dates: string[]) {
    let oldBookingId = null;
    if (rootState.editMode) {
      if (rootState.editBooking) {
        oldBookingId = rootState.editBooking.id;
      }
    }

    this.$axios.post("/extras", { dates, oldBookingId: oldBookingId }).then((res) => {
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
  },

  getMostPrices({ commit }) {
    this.$axios.get("/prices/most").then((res) => {
      console.log("Most prices")
      console.log(res.data.data);
      commit("SET_MOST_PRICES", res.data.data);
    });
  },

  //TODO: update the date to reflect current dates not oldBooking dates
  loadOldExtras({ commit, state, rootGetters }, oldBooking) {
    console.log("YESSS EXTRASS OLD BOOKING");
    commit("EMPTY_SELECTED");

    const newBookingDates = rootGetters.bookingDates;

    if (oldBooking.massage) {
      const s = getSpecialObjFromStr(state.specials, 'massage');
      if (s) {
        commit("ADD_SELECTED", s);
        commit("TRANSFORM_MASSAGE", { massage: oldBooking.massage, dates: newBookingDates });
      };
    }
    if (oldBooking.quadbike) {
      const s = getSpecialObjFromStr(state.specials, 'quadbike');
      if (s) {
        commit("ADD_SELECTED", s);
        commit("TRANSFORM_QUADBIKE", { quadbike: oldBooking.quadbike, dates: newBookingDates });
      };
    }
    if (oldBooking.lookouts) {
      const s = getSpecialObjFromStr(state.specials, 'lookout');

      if (s) {
        commit("ADD_SELECTED", s);
        commit("TRANSFORM_LOOKOUTS", { lookouts: oldBooking.lookouts, dates: newBookingDates });
      };
    }
    if (oldBooking.cake) {
      const s = getSpecialObjFromStr(state.specials, 'cake');
      if (s) {
        commit("ADD_SELECTED", s);
        commit("TRANSFORM_CAKE", { cake: oldBooking.cake, dates: newBookingDates });
      };
    }
    if (oldBooking.drinks) {
      const s = getSpecialObjFromStr(state.specials, 'drinks');
      if (s) {
        commit("ADD_SELECTED", s);
        commit("TRANSFORM_DRINKS", { drinks: oldBooking.drinks, dates: newBookingDates });
      };
    }
    if (oldBooking.photoshoot) {
      const s = getSpecialObjFromStr(state.specials, 'photoshoot');
      if (s) {
        commit("ADD_SELECTED", s);
        commit("TRANSFORM_PHOTOSHOOT", { photoshoot: oldBooking.photoshoot, dates: newBookingDates });
      };
    }
    if (oldBooking.decorations) {
      const s = getSpecialObjFromStr(state.specials, 'roomDecoration');
      if (s) {
        commit("ADD_SELECTED", s);
        commit("TRANSFORM_DECORATION", { decos: oldBooking.decorations, dates: newBookingDates });
      };
    }
    if (oldBooking.domestic_staff) {
      const s = getSpecialObjFromStr(state.specials, 'domesticStaff');
      if (s) {
        commit("ADD_SELECTED", s);
        commit("TRANSFORM_STAFF", { staff: oldBooking.domestic_staff, dates: newBookingDates });
      };
    }
  }

}
