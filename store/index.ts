import { GetterTree, MutationTree, ActionTree } from 'vuex';
import differenceInDays from 'date-fns/differenceInDays';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import Bugsnag from '@bugsnag/js';

import { calcExtraPeoplePrice, calcRoomLimit, calcRoomPrice } from './functions.js';
import getDataToSend from './create_bookings';

var groupBy = function(xs: any, key: any) {
	return xs.reduce(function(rv: any, x: any) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

var onlyUnique = function(value: any, index: any, self: string | any[]) {
	return self.indexOf(value) === index;
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
	specials: ['lookout', 'massage', 'newmassage', 'quadbike', 'photoshoot', 'drinks', 'cakes', 'roomDecoration', 'unforgettableExperience', 'domesticStaff'] as any[],

	booking: null as any,
	discount: null as any,

	lastUpdate: null as Date | null,

	editMode: false as boolean,
	editBooking: null as any,
	adminEditMode: false as boolean,

	fullPageLoader: false as boolean,

	noDiscountDates: [] as string[],

	customVillaExtras: [] as any[],

	multiRoom: false as boolean,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
	totalPeople: (state: RootState) => state.adult_no + state.child_no,
	noAdults: (state: RootState) => state.adult_no,
	noChildren: (state: RootState) => state.child_no,
	noDiscountDates: (state: RootState) => state.noDiscountDates,
	noTeens: (state: RootState) => state.other_guests.filter(child => child.type == 'teen').length,
	noChild: (state: RootState) => state.other_guests.filter(child => child.type == 'child').length,
	noSmallPeopleWithoutChild: (state: RootState, getters) => getters.noChildren - (getters.noTeens + getters.noChild),
	bigPeople: (state: RootState, getters) => getters.noAdults + getters.noTeens,
	smallPeople: (state: RootState, getters) => getters.noChildren - getters.noTeens,
	roomsData: (state: RootState) => state.roomsData,
	policies: (state: RootState) => state.policies,
	customVillaExtras: (state: RootState) => state.customVillaExtras,
	multiRoom: (state: RootState) => state.multiRoom,
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
	individualDates: (state: RootState, getters) => {
		let newRooms = {} as any;
		const rooms = getters.bookedRooms;
		for (let i = 0; i < rooms.length; i++) {
			const room = rooms[i];

			if (newRooms[room.date]) {
				newRooms[room.date].push(room);
			} else {
				newRooms[room.date] = [room];
			}
		}
		return newRooms;
	},
	dateFromTo: (state: RootState, getters) => {
		const dates = getters.bookedRooms.map((room: any) => room.date);

		let orderedDates = dates.sort(function(a: string, b: string) {
			return Date.parse(a) > Date.parse(b);
		});

		if (orderedDates.length == 0) return;

		if (orderedDates.length == 1) {
			const startDate = parseISO(orderedDates[0]);
			return format(startDate, 'do MMM yyyy');
		} else {
			const beginDate = parseISO(orderedDates[0]);
			const endDate = parseISO(orderedDates[orderedDates.length - 1]);
			return format(beginDate, 'do MMM yyyy') + ' - ' + format(endDate, 'do MMM yyyy');
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
	roomsDetailsVilla: (state: RootState, getters) => {
		const rooms = getters.bookedRooms.filter((room: any) => room.type == 'villa').map((room: any) => room.room_id);
		return rooms.filter(onlyUnique);
	},
	roomsDetailsLoft: (state: RootState, getters) => {
		const rooms = getters.bookedRooms.filter((room: any) => room.type == 'loft').map((room: any) => room.room_id);
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
		const dates = getters.bookedRooms.map((r: any) => r.date);

		return [...new Set(dates)];
	},
	hasVillaMixed: (state: RootState, getters) => {
		let villa = 0;
		let notVilla = 0;

		for (let i = 0; i < getters.uniqueRooms.length; i++) {
			const roomid = getters.uniqueRooms[i];
			const r = state.roomsData.find(r => r.id == roomid);

			if (r.type == 'standard' || r.type == 'family') {
				notVilla++;
			} else if (r.type == 'villa') {
				villa++;
			}
		}

		if (villa > 0 && notVilla > 0) {
			return true;
		}
		return false;
	},
	extraPeopleRoomFit: (state: RootState, getters) => {
		const allExtra = getters.extraPeople.total;

		let onlyVilla = true;
		getters.uniqueRooms.map((roomid: any) => {
			const r = state.roomsData.find(r => r.id == roomid);
			if (r.type == 'standard' ) {
				onlyVilla = false;
			} else if (r.type == 'family') {
				onlyVilla = false;
			} else if (r.type == 'loft') {
				onlyVilla = false;
			}
		});

		if (onlyVilla) {
			return {
				standard: 0,
				villa: allExtra,
			};
		}

		return {
			standard: allExtra,
			villa: 0,
		};
	},
	extraPeople: (state: RootState, getters) => {
		let bigMax = 0;
		let smallMax = 0;

		getters.uniqueRooms.map((roomid: any) => {
			const r = state.roomsData.find(r => r.id == roomid);
			if (r.type == 'standard') {
				bigMax += 2;
				smallMax += 1;
			} else if (r.type == 'family') {
				bigMax += 3;
				smallMax += 2;
			} else if (r.type == 'villa') {
				bigMax += 2;
				smallMax += 2;
			} else if (r.type == 'loft') {
				bigMax += 3;
				smallMax += 2;
			}
		});

		const noTeens = getters.noTeens;

		let totalBig = Math.max(getters.bigPeople - bigMax, 0);
		const totalSmall = Math.max(getters.smallPeople - smallMax, 0);

		let totalTeen = 0;

		if (totalBig >= noTeens) {
			totalBig -= noTeens;
			totalTeen = noTeens;
		} else {
			totalTeen = totalBig;
			totalBig = 0;
		}

		return {
			big: Math.max(totalBig, 0),
			teen: totalTeen,
			small: totalSmall,
			total: totalBig + totalSmall + totalTeen,
		};
	},
	extraPeoplePrice: (state: RootState, getters) => {
		let price = 0;

		const nights = getters.individualDates;
		for (const date in nights) {
			if (Object.prototype.hasOwnProperty.call(nights, date)) {
				const rooms = nights[date];

				price += calcExtraPeoplePrice(getters, rooms);
			}
		}

		return price;
	},
	oldExtraPeoplePrice: (state: RootState, getters) => {
		let price = 0;
		const bigPrice = 60000;
		const bigVillaPrice = 100000;
		const smallPrice = 42000;

		const noOfRooms = getters.totalRooms;
		if (noOfRooms == 0) return price;

		// const bigMax = 3 * noOfRooms;
		let bigMax = 0;
		getters.uniqueRooms.map((roomid: any) => {
			const r = state.roomsData.find(r => r.id == roomid);
			if (r.type == 'standard') {
				bigMax += 2;
			} else if (r.type == 'family') {
				bigMax += 3;
			} else if (r.type == 'villa') {
				bigMax += 3;
			}
		});

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
		const nights = getters.individualDates;
		for (const date in nights) {
			if (Object.prototype.hasOwnProperty.call(nights, date)) {
				const rooms = nights[date];

				if (!calcRoomLimit(getters, rooms)) {
					return false;
				}
			}
		}

		return true;
	},
	oldRoomPrice: (state: RootState, getters) => {
		const roomPrices = getters.bookedRooms.reduce((price: number, room: any) => {
			if (room.type == 'family') {
				return price + room.price;
			} else if (room.type == 'standard') {
				if (getters.totalPeople == 1) {
					return price + room.single_price;
				} else {
					return price + room.price;
				}
			}
		}, 0);

		return roomPrices;
	},
	roomPrice: (state: RootState, getters) => {
		let price = 0;

		const nights = getters.individualDates;
		for (const date in nights) {
			if (Object.prototype.hasOwnProperty.call(nights, date)) {
				const rooms = nights[date];

				price += calcRoomPrice(getters, rooms);
			}
		}

		return price;
	},
	roomVillaPrices: (state: RootState, getters) => {
		let price = 0;
		getters.bookedRooms.forEach((room: any) => {
			if (room.type == 'villa') {
				price += room.price;
			}
		});

		return price;
	},
	roomLoftPrices: (state: RootState, getters) => {
		let price = 0;
		getters.bookedRooms.forEach((room: any) => {
			if (room.type == 'loft') {
				price += room.price;
			}
		});

		return price;
	},
	roomDiscountPercent: (state: RootState, getters) => {
		const roomGroup = groupBy(getters.bookedRooms, 'date');

		const myDates = Object.keys(roomGroup);
		const noDiscountDates = getters.noDiscountDates;
		let tNights = 0;

		myDates.forEach(date => {
			let shouldCount = true;
			noDiscountDates.some((noDate: string) => {
				if (isSameDay(parseISO(date), parseISO(noDate)) && isSameMonth(parseISO(date), parseISO(noDate)) && isSameYear(parseISO(date), parseISO(noDate))) {
					shouldCount = false;
					return true;
				}
			});

			if (shouldCount) tNights++;
		});

		console.log('Total nights: ' + tNights);

		// const totalNights = getters.totalNights;
		const totalNights = tNights;
		let percent = 0;
		if (totalNights == 2) percent = 5;
		else if (totalNights == 3) percent = 10;
		else if (totalNights >= 4) percent = 15;

		return percent;
	},
	roomDiscount: (state: RootState, getters) => {
		const roomPriceForDiscount = getters.roomPrice - getters.roomVillaPrices - getters.roomLoftPrices;
		return roomPriceForDiscount * (getters.roomDiscountPercent / 100);
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
		getters['extras/allSelected'].forEach((extra: any) => {
			if (extra.type == 'cakes') {
				extraPrices += getters['extras/cakesPrice'];
			}
			if (extra.type == 'drinks') {
				extraPrices += getters['extras/drinksPrice'];
			}
			if (extra.type == 'massages') {
				extraPrices += getters['extras/massagesPrice'];
			}
			if (extra.type == 'bikes') {
				extraPrices += getters['extras/bikesPrice'];
			}
			if (extra.type == 'photoshoot') {
				extraPrices += getters['extras/photoshootPrice'];
			}
			if (extra.type == 'roomDecoration') {
				extraPrices += getters['extras/decorationPrice'];
			}
			if (extra.type == 'unforgettableExperience') {
				extraPrices += getters['extras/experiencePrice'];
			}
			if (extra.type == 'domesticStaff') {
				extraPrices += getters['extras/staffPrice'];
			}
			if (extra.type == 'massage') {
				extraPrices += getters['extras/massagePrice'];
			}
			if (extra.type == 'newmassage') {
				extraPrices += getters['extras/newmassagePrice'];
			}
			if (extra.type == 'quadbike') {
				extraPrices += getters['extras/quadbikePrice'];
			}
			if (extra.type == 'lookout') {
				extraPrices += getters['extras/lookoutPrice'];
			}
		});

		return extraPrices + roomPrices + +getters.extraPeoplePrice;
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
	preTotal: (state: RootState, getters) => {
		const preTotal = +getters.subTotal - +getters.discount - +getters.roomDiscount - +getters.memberDiscount ;
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
	UPDATE_VILLA_EXTRAS: (state: RootState, extras) => {
		state.customVillaExtras = extras;
	},
	UPDATE_MULTI_ROOM: (state: RootState, payload) => {
		state.multiRoom = payload;
	},
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
				date: format(parseISO(room.date), 'yyyy-MM-dd'),
			};
		});
		state.availability_done = true;

		//Guest TRANSFORMATION
		state.guest = oldBooking.guest;
		state.guest.identification = oldBooking.guest.id_url;
		state.guest.dob = format(parseISO(oldBooking.guest.dob), 'yyyy-MM-dd');
		state.profile_done = true;

		//POLICIES TRANSFORMATION
		state.policy_done = true;
	},
	UPDATE_EXPIRY: (state, date: Date) => {
		state.lastUpdate = date;
	},
	UPDATE_GROUP: (state, payload) => {
		state.groupType = payload.groupType;
		state.adult_no = payload.adult_no;
		state.child_no = payload.child_no;
		state.children_ages = payload.children_ages.map((age: any) => age.age);

		let otherguests = [];
		for (let i = 0; i < payload.adult_no; i++) {
			otherguests.push({
				first_name: '',
				last_name: '',
				type: 'adult',
				num: i + 1,
				age: '',
			});
		}
		for (let i = 0; i < payload.child_no; i++) {
			let childType = 'teen';
			if (state.children_ages[i] == '0 - 2') childType = 'infant';
			if (state.children_ages[i] == '3 - 5') childType = 'child';

			otherguests.push({
				first_name: '',
				last_name: '',
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
	COMPLETE_GUEST: state => (state.guests_done = true),
	COMPLETE_AVAILABILITY: state => (state.availability_done = true),
	COMPLETE_PROFILE: state => (state.profile_done = true),
	COMPLETE_POLICY: state => (state.policy_done = true),
	SET_BOOKING: (state, payload) => (state.booking = payload),

	UPDATE_NO_DISCOUNT_DATES: (state, dates: string[]) => {
		state.noDiscountDates = dates;
	},

	RESET_STORE: state => {
		if (state.rooms.length > 0) {
			const email = state.guest.email;
			const days_left = differenceInDays(parseISO(state.rooms[0].date), new Date()) + 1;

			state.done_data.email = email || '';
			state.done_data.days_left = days_left || 0;
			state.done_data.booking_ref = '';
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

		state.customVillaExtras = [] as any[];

		state.multiRoom = false as boolean;
	},
};

export const actions: ActionTree<RootState, RootState> = {
	loadRooms({ commit }) {
		return this.$axios.get('/rooms').then(res => {
			console.log(res.data.data);
			commit('UPDATE_ROOMS_DATA', res.data.data);
		});
	},

	loadPolicies({ commit }) {
		this.$axios.get('/policies').then(res => {
			console.log(res.data.data);
			commit('UPDATE_POLICIES', res.data.data);
		});
	},

	loadNoDiscountDates({ commit }) {
		this.$axios.get('/no-discount-dates').then(res => {
			// console.log(res.data.data);
			commit('UPDATE_NO_DISCOUNT_DATES', res.data.data);
		});
	},

	async confirmGuest({}, email: string) {
		return await this.$axios.post('confirm/guest', { email }).then(res => {
			console.log(res);
			return res.data;
		});
	},

	async saveGuest({ commit }, formData: FormData) {
		return await this.$axios
			.post('guests', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
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
								console.log(key + ' -> ' + dataError[key]);

								dataError[key].forEach((m: any) => {
									msg += '<br /><br />' + m;
								});
								// for (let m in dataError[key]) {
								// }
							}
						}
					}

					// this.app.$toast.error(msg);
					throw msg;
				}

				commit('UPDATE_GUEST', { guest: res.data.data });
				this.app.$toast.success(res.data.message);
				return true;
			})
			.catch(err => {
				throw err;
			});
	},

	async createTransaction({ state, getters, rootState, rootGetters }) {
		console.log(getters);
		let dataToPost = {} as any;
		if (!state.editMode) {
			dataToPost = {
				method: 'Paystack',
				subtotal: getters.subTotal,
				taxTotal: getters.taxTotal,
				total: getters.totalPrice,
			};
		} else {
			console.log(state.editBooking.previous_change);
			let diff = getters.differenceToPay;

			dataToPost = {
				method: 'Paystack',
				subtotal: getters.subTotal,
				total: getters.totalPrice,
				previousTotal: state.editBooking.payment.total,
				differenceForUpdate: diff,
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

		console.log('Create transaction Data to Post:');

		const { dataToPost: bookingDataToPost, specialsToSend } = getDataToSend({ state, getters, rootState, rootGetters });

		dataToPost['booking_data'] = bookingDataToPost;
		dataToPost['specials_data'] = specialsToSend;
		const bookingFrom = localStorage.getItem('bookingFrom');
		if(bookingFrom){
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
		console.log(extraState, rootGetters);

		const allExtras = (rootGetters['extras/allSelected'] as any[]).map(s => s.type);
		let specialsToSend = {
			extras: allExtras,
		} as any;

		let prices = {
			Rooms: rootGetters.roomPrice,
			'Room Discount': '-' + rootGetters.roomDiscount,
			'100Club Member Discount': '-' + rootGetters.memberDiscount,
			'Extra People Cost': '+' + rootGetters.extraPeoplePrice,
      taxTotal: rootGetters.taxTotal,
      tax: rootGetters.taxTotal,
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
			};
			prices['roomDecoration'] = rootGetters['extras/decorationPrice'];
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
		if (allExtras.includes('domesticStaff')) {
			specialsToSend['domesticStaff'] = {
				dates: extraState.dateStaff,
				info: extraState.selectedStaff,
			};
			prices['domesticStaff'] = rootGetters['extras/staffPrice'];
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

		prices['Sub Total'] = rootGetters.subTotal;
		// prices["Total"] = rootGetters.total;

		if (state.editMode) {
			let diff = getters.differenceToPay;

			prices['Previous Total'] = state.editBooking.payment.total;
			prices['Balance Paid'] = diff;
		}

		console.log(specialsToSend);

		let dataToPost: any = {
			booking: {
				full_names: state.other_guests || [],
				adult_no: state.adult_no,
				child_no: state.child_no,
				extra_info: 'ex',
				trans_ref: trans_ref,
				method_ref: method_ref,
				method: method,
			},
			booking_from,
			booked_rooms: state.rooms,
			prices: prices,
			admin_edit_mode: state.adminEditMode,
			multi_room: state.multiRoom,
		};

		if (state.guest?.id) {
			dataToPost.guest_id = state.guest.id;
		}

		if (!dataToPost.guest_id) {
			this.app.$toast.info('Please fill your profile information again');
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
			const res = await this.$axios.post('bookings', dataToPost);
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
		} catch (err) {
			this.app.$toast.error(err);
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
