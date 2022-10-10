import { GetterTree, MutationTree, ActionTree } from 'vuex';
import differenceInDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import Bugsnag from '@bugsnag/js';
import moment from 'moment';


import getDataToSend from './create_bookings';

export const state = () => ({
	guests_no: 0 as number,
	guest_first_name: '' as string,
	guest_last_name: '' as string,
	guest_email: '' as string,
	guest_phone: '' as string,
	booking_date: null,
	option_type: null,
	day_pass_options: [] as any,
	selected_options: [] as any,

	guests_done: false as boolean,
	availability_done: false as boolean,
	options_done: false as boolean,
	extras_done: false as boolean,

	done_data: {} as any,

	extra: '' as string,
	showExtra: false as boolean,
	specials: ['lookout', 'massage', 'newmassage', 'quadbike', 'photoshoot', 'drinks', 'cakes', 'roomDecoration', 'unforgettableExperience', 'domesticStaff'] as any[],

	booking: null as any,
	discount: null as any,

	lastUpdate: null as Date | null,

	editMode: false as boolean,
	editBooking: null as any,
	adminEditMode: false as boolean,

	fullPageLoader: false as boolean,

	noDiscountDates: [] as string[],
	noDayPassBookingDates: [] as string[],
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
	noGuests: (state: RootState) => state.guests_no,
	noDiscountDates: (state: RootState) => state.noDiscountDates,
	getNoDayPassBookingDates: (state: RootState) => state.noDayPassBookingDates,

	getSpecials: (state: RootState) => state.specials,
	getBooking: (state: RootState) => state.booking,
	bookingDate: (state: RootState) => {
		return state.booking_date;
	},
	selectedOptions: (state: RootState) => {
		return state.selected_options;
	},
	optionType: (state: RootState) => {
		return state.option_type;
	},
	bookingEmail: (state: RootState) => {
		return state.guest_email;
	},
	discount: (state: RootState, getters) => {
		const discount = state.discount;
		if (!discount) return 0;

		if (discount.type == 'voucher') {
			return discount.amount;
		} else if (discount.type == 'discount') {
			const percent = discount.amount / 100;
			return percent * getters.roomPrice;
		}

		return 0;
	},
	optionPrices: (state: RootState, getters, basic, rootGetters) => {
		let price = 0;
		let optionsWithQuantity = state.selected_options.filter((option: any) => option.quantity > 0);
		const isDateAvailable = rootGetters.noDiscountDates.filter((d: any) => {
			return moment(getters.bookingDate).format('DD/MM/YYYY') === moment(d).format('DD/MM/YYYY');
		});
		
		optionsWithQuantity.forEach((option: any) => {
			if(isDateAvailable.length){
				price += +option.seasonal_price * option.quantity;
			}
			if (getters.optionType === 'weekend' && !isDateAvailable.length) {
				price += +option.weekend_price * option.quantity;
			}
			if (getters.optionType === 'weekday' && !isDateAvailable.length) {
				price += +option.weekday_price * option.quantity;
			}
		});
		return price;
	},
	subTotal: (state: RootState, getters, basic, rootGetters) => {
		const optionPrices = getters.optionPrices;
		let extraPrices = 0;
		rootGetters['extras/allSelected'].forEach((extra: any) => {
			if (extra.type == 'cakes') {
				extraPrices += rootGetters['extras/cakesPrice'];
			}
			if (extra.type == 'drinks') {
				extraPrices += rootGetters['extras/drinksPrice'];
			}
			if (extra.type == 'massages') {
				extraPrices += rootGetters['extras/massagesPrice'];
			}
			if (extra.type == 'bikes') {
				extraPrices += rootGetters['extras/bikesPrice'];
			}
			if (extra.type == 'photoshoot') {
				extraPrices += rootGetters['extras/photoshootPrice'];
			}
			if (extra.type == 'roomDecoration') {
				extraPrices += rootGetters['extras/decorationPrice'];
			}
			if (extra.type == 'unforgettableExperience') {
				extraPrices += rootGetters['extras/experiencePrice'];
			}
			if (extra.type == 'domesticStaff') {
				extraPrices += rootGetters['extras/staffPrice'];
			}
			if (extra.type == 'massage') {
				extraPrices += rootGetters['extras/massagePrice'];
			}
			if (extra.type == 'newmassage') {
				extraPrices += rootGetters['extras/newmassagePrice'];
			}
			if (extra.type == 'quadbike') {
				extraPrices += rootGetters['extras/quadbikePrice'];
			}
			if (extra.type == 'lookout') {
				extraPrices += rootGetters['extras/lookoutPrice'];
			}
		});

		return extraPrices + optionPrices;
	},
	preTotal: (state: RootState, getters) => {
		const preTotal = +getters.subTotal - +getters.discount;
		if (preTotal < 0) return 0;

		return preTotal;
	},
	taxTotal: (state: RootState, getters) => {
		return (+getters.preTotal * 0.125).toFixed(2);
	},
	totalPrice: (state: RootState, getters) => {
		return (+getters.preTotal + +getters.taxTotal).toFixed(2);
	},
	previousTotalPaid: (state: RootState, getters) => {
		// return state.editBooking.payment.subtotal;
		if (!state.editBooking) return 0;

		return state.editBooking.payment.total + (Math.abs(state.editBooking.payment.discount_amount) + Math.abs(state.editBooking.payment.voucher));
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
				diff = diff + 28125;
			}
		}

		return diff;
	},
};

export const mutations: MutationTree<RootState> = {
	TOGGLE_FULL_PAGE_LOADER: (state: RootState, value) => {
		state.fullPageLoader = value;
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
		state.guests_no = oldBooking.guests_no;
		let otherguests = oldBooking.full_names;

		// state.guests_no = otherguests;
		state.guests_done = true;

		// ROOM TRANSFORMATION
		state.availability_done = true;

		//Guest TRANSFORMATION
		// state.guest = oldBooking.guest;
		// state.guest.identification = oldBooking.guest.id_url;
		// state.guest.dob = format(parseISO(oldBooking.guest.dob), 'yyyy-MM-dd');
		// state.profile_done = true;

		//POLICIES TRANSFORMATION
		// state.policy_done = true;
	},
	UPDATE_EXPIRY: (state, date: Date) => {
		state.lastUpdate = date;
	},
	UPDATE_GUESTS: (state, payload) => {
		state.guests_no = payload.guests_no;
		state.guest_first_name = payload.guest_first_name;
		state.guest_last_name = payload.guest_last_name;
		state.guest_email = payload.guest_email;
		state.guest_phone = payload.guest_phone;
	},
	UPDATE_AVAILABILITY: (state, payload) => {
		state.option_type = payload.option_type;
		state.booking_date = payload.booking_date;
	},

	UPDATE_DISCOUNT: (state, discount) => {
		state.discount = discount;
	},
	UPDATE_SELECTED_OPTIONS: (state, selectedOptions) => {
		state.selected_options = selectedOptions;
	},
	SET_DAY_PASS_OPTIONS: (state, options) => {
		state.day_pass_options = options;
	},
	// UPDATE_GUEST: (state, payload) => {
	// 	state.guest = JSON.parse(JSON.stringify(payload.guest));
	// },
	// GUEST_WEHAVEDATA: (state, payload: boolean) => {
	// 	state.weHaveData = payload;
	// },
	// GUEST_SAVE_DATA: (state, payload: boolean) => {
	// 	state.saveForNextTime = payload;
	// },
	COMPLETE_GUEST: state => (state.guests_done = true),
	COMPLETE_AVAILABILITY: state => (state.availability_done = true),
	COMPLETE_OPTIONS: state => (state.options_done = true),
	COMPLETE_EXTRAS: state => (state.extras_done = true),
	SET_BOOKING: (state, payload) => (state.booking = payload),

	UPDATE_NO_DISCOUNT_DATES: (state, dates: string[]) => {
		state.noDiscountDates = dates;
	},
	UPDATE_NO_DAY_PASS_BOOKING_DATES: (state, dates: string[]) => {
		state.noDayPassBookingDates = dates;
		console.log(state.noDayPassBookingDates)
	},

	RESET_STORE: state => {
		state.discount = null as any;
		state.availability_done = false;
		state.options_done = false;
		state.guests_done = false;
		state.extras_done = false;
		state.guests_no = 0;
		state.booking_date = null;
		state.option_type = null;
		state.guest_first_name = '' as string;
		state.guest_last_name = '' as string;
		state.guest_email = '' as string;
		state.guest_phone = '' as string;
		state.booking_date = null;
		state.option_type = null;
		state.selected_options = [] as any;
		state.guests_done = false as boolean;
		state.availability_done = false as boolean;
		state.options_done = false as boolean;
		state.extras_done = false as boolean;
		state.editMode = false as boolean;
		state.editBooking = null as any;
		state.adminEditMode = false as boolean;
	},
};

export const actions: ActionTree<RootState, RootState> = {
	loadNoDiscountDates({ commit }) {
		this.$axios.get('/no-discount-dates').then(res => {
			// console.log(res.data.data);
			commit('UPDATE_NO_DISCOUNT_DATES', res.data.data);
		});
	},
	loadNoDayPassBookingDates({ commit }) {
		this.$axios.get('/no-day-pass-booking-dates').then(res => {
			commit('UPDATE_NO_DAY_PASS_BOOKING_DATES', res.data.data);
			// console.log(res.data.data);
		});
	},
	getDayPassOptions({ commit }) {
		this.$axios.get('/day-pass-options').then(res => {
			commit('SET_DAY_PASS_OPTIONS', res.data.data);
		});
	},

	// async confirmGuest({}, email: string) {
	// 	return await this.$axios.post('confirm/guest', { email }).then(res => {
	// 		console.log(res);
	// 		return res.data;
	// 	});
	// },

	async createTransaction({ state, getters, rootState, rootGetters }) {
		console.log(getters);
		let dataToPost = {} as any;
		dataToPost = {
			method: 'Paystack',
			subtotal: getters.subTotal,
			taxTotal: getters.taxTotal,
			total: getters.totalPrice,
		};

		// const discount = state.discount;
		// if (discount) {
		// 	if (discount.type == 'discount') {
		// 		dataToPost['discount'] = discount.amount;
		// 		dataToPost['discount_amount'] = getters.discount;
		// 	} else if (discount.type == 'voucher') {
		// 		dataToPost['voucher'] = discount.amount;
		// 	}
		// }

		console.log('Create transaction Data to Post:');

		const { dataToPost: bookingDataToPost, specialsToSend } = getDataToSend({ state, getters, rootState, rootGetters });
		dataToPost['booking_data'] = {
			guest_first_name: state.guest_first_name,
			guest_last_name: state.guest_last_name,
			guest_email: state.guest_email,
			guest_phone: state.guest_phone,
			guests_no: state.guests_no,
			booking_date: state.booking_date,
			option_type: state.option_type,
			selected_options: state.selected_options.filter((option: any) => option.quantity > 0),
		};

		// dataToPost['booking_data'] = bookingDataToPost;
		dataToPost['specials_data'] = specialsToSend;
		const bookingFrom = localStorage.getItem('bookingFrom');
		if (bookingFrom) {
			console.log('I got a booking from', bookingFrom);
			dataToPost['booking_from'] = bookingFrom;
		}

		console.log(dataToPost);

		try {
			const res = await this.$axios.post('transactions', dataToPost);
			console.log(res.data);

			if (res.data.success) {
				return res.data.reference;
			}

			return false;
		} catch (e) {
			return false;
		}
	},

	async createBooking({ state, getters, rootState, rootGetters }, { trans_ref, method_ref, method, booking_from }) {
		//@ts-ignore
		const extraState = rootState.extras;
		// console.log(extraState, rootGetters);

		const allExtras = (rootGetters['extras/allSelected'] as any[]).map(s => s.type);
		let specialsToSend = {
			extras: allExtras,
		} as any;

		let prices = {
			optionsPrices: getters.optionPrices,
			taxTotal: getters.taxTotal,
			tax: getters.taxTotal,
		} as any;

		if (allExtras.includes('cakes')) {
			specialsToSend['cakes'] = {
				date: extraState.dateCake,
				options: extraState.selectedCakes,
				message: extraState.cakeMessage,
				gender: extraState.cakeGender,
			};
			prices['cakes'] = rootGetters['extras/cakesPrice'];
		}
		if (allExtras.includes('photoshoot')) {
			specialsToSend['photoshoot'] = {
				date: extraState.datePhotoshoot,
				quantity: extraState.selectedPhotoshoot,
			};
			prices['photoshoot'] = rootGetters['extras/photoshootPrice'];
		}
		if (allExtras.includes('unforgettableExperience')) {
			specialsToSend['unforgettableExperience'] = {
				picnicDate: extraState.decorationPicnicDate,
				paintingDate: extraState.decorationPaintingDate,
				paintingQty: extraState.decorationPaintingQty,
				breakfastDate: extraState.decorationBreakfastDate,
				breakfastTime: extraState.decorationBreakfastTime,
				options: extraState.selectedExperiences.map((sd: any) => sd.id),
			};
			prices['unforgettableExperience'] = rootGetters['extras/experiencePrice'];
		}
		if (allExtras.includes('drinks')) {
			specialsToSend['drinks'] = {
				date: extraState.dateDrink,
				options: extraState.selectedDrinks,
			};
			prices['drinks'] = rootGetters['extras/drinksPrice'];
		}
		if (allExtras.includes('massages')) {
			specialsToSend['massages'] = {
				date: extraState.dateMassages,
				options: extraState.selectedMassages,
			};
			prices['massages'] = rootGetters['extras/massagesPrice'];
		}
		if (allExtras.includes('bikes')) {
			specialsToSend['bikes'] = {
				date: extraState.dateBikes,
				options: extraState.selectedBikes,
			};
			prices['bikes'] = rootGetters['extras/bikesPrice'];
		}
		if (allExtras.includes('quadbike')) {
			specialsToSend['quadbike'] = {
				date: extraState.dateQuadbike,
				options: extraState.selectedQuadbike,
				quantity: extraState.selectedQuadbikeQty,
			};
			prices['quadbike'] = rootGetters['extras/quadbikePrice'];
		}
		if (allExtras.includes('massage')) {
			specialsToSend['massage'] = {
				date: extraState.dateMassage,
				options: extraState.selectedMassage,
			};
			prices['massage'] = rootGetters['extras/massagePrice'];
		}
		if (allExtras.includes('newmassage')) {
			specialsToSend['newmassage'] = {
				date: extraState.dateNewmassage,
				options: extraState.selectedNewmassage,
				time: extraState.timeNewmassage,
			};
			prices['newmassage'] = rootGetters['extras/newmassagePrice'];
		}
		if (allExtras.includes('lookout')) {
			specialsToSend['lookout'] = {
				date: extraState.dateLookout,
				packages: extraState.selectedLookouts,
			};
			prices['lookout'] = rootGetters['extras/lookoutPrice'];
		}

		console.log(specialsToSend);
		return;

		prices['Sub Total'] = getters.subTotal;
		// prices["Total"] = rootGetters.total;

		// if (state.editMode) {
		// 	let diff = getters.differenceToPay;

		// 	prices['Previous Total'] = state.editBooking.payment.total;
		// 	prices['Balance Paid'] = diff;
		// }

		// console.log(specialsToSend);

		let dataToPost: any = {
			booking: {
				guest_first_name: state.guest_first_name,
				guest_last_name: state.guest_last_name,
				guest_email: state.guest_email,
				guest_phone: state.guest_phone,
				guests_no: state.guests_no,
				booking_date: state.booking_date,
				option_type: state.option_type,
				selected_options: state.selected_options.filter((option: any) => option.quantity > 0),
				prices: prices,
				extra_info: 'ex',
				trans_ref: trans_ref,
				method: method,
				method_ref: method_ref,
			},
			booking_from,
			// admin_edit_mode: state.adminEditMode,
		};

		if (state.discount) {
			dataToPost.discount = state.discount;
			dataToPost.discount_amount = getters.discount;
		}

		// if (state.editMode) {
		// 	dataToPost.oldBookingId = state.editBooking.id;
		// }

		console.log(dataToPost);

		console.log(prices);

		try {
			const res = await this.$axios.post('day-pass-booking', dataToPost);
			console.log(res.data);

			if (res.data.success) {
				const newBooking = res.data.data.booking;
				console.log(newBooking);
				const sRes = await this.$axios.post(`/book-specials/${newBooking.id}`, specialsToSend);
				this.app.$toast.success(res.data.message);
				state.done_data.booking = newBooking;
			} else {
				this.app.$toast.error(res.data.message);
			}
			return res.data.success;
		} catch (err) {
			this.app.$toast.error(err as string);
			return false;
		}
	},

	loadOldBooking({ state, dispatch, commit }) {
		if (!state.editMode) {
			this.app.$toast.info('You are currently not in Edit mode');
			return;
		}

		const oldBooking = state.editBooking;
		commit('TRANSFORM_EDIT_TO_REAL', oldBooking);
		dispatch('extras/loadOldExtras', oldBooking);
	},
};
