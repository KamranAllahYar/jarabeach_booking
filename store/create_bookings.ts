const getDataToSend = ({ state, getters, rootState, rootGetters }: any, transData = {} as any) => {
	//@ts-ignore
	const extraState = rootState.extras;

	const allExtras = (rootGetters['extras/allSelected'] as any[]).map(s => s.type);
	let specialsToSend = {
		extras: allExtras,
	} as any;

	let prices = {
		Rooms: rootGetters.roomPrice,
		'Room Discount': '-' + rootGetters.roomDiscount,
		'100Club Member Discount': '-' + rootGetters.memberDiscount,
		'Extra People Cost': '+' + rootGetters.extraPeoplePrice,
	} as any;

	if (allExtras.includes('cakes')) {
		specialsToSend['cakes'] = {
			date: extraState.dateCake,
			options: extraState.selectedCakes,
			message: extraState.cakeMessage,
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
	console.log(allExtras)
	if (allExtras.includes('dayPass')) {
		specialsToSend['dayPass'] = {
			date: extraState.dayPassDate,
			options: extraState.selectedDayPassOptions,
		};
		prices['dayPass'] = rootGetters['extras/dayPassPrices'];
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

	const trans_ref = transData.trans_ref ?? 'trans_ref';
	const method_ref = transData.method_ref ?? 'trans_ref';
	const method = transData.method ?? 'trans_ref';

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
		booked_rooms: state.rooms,
		prices: prices,
		admin_edit_mode: state.adminEditMode,
		multi_room: state.multiRoom,
	};

	if (state.guest?.id) {
		dataToPost.guest_id = state.guest.id;
	}

	// if (!dataToPost.guest_id) {
	//   $app.$toast.info("Please fill your profile information again");
	//   return;
	// }

	if (state.discount) {
		dataToPost.discount = state.discount;
		dataToPost.discount_amount = getters.discount;
	}

	if (state.editMode) {
		dataToPost.oldBookingId = state.editBooking.id;
	}

	return { dataToPost, specialsToSend };

	// try {
	//   const res = await $axios.post("bookings", dataToPost);
	//   //console.log(res.data);

	//   if (res.data.success) {
	//     const newBooking = res.data.data.booking;
	//     //console.log(newBooking);
	//     const sRes = await $axios.post(`/book-specials/${newBooking.id}`, specialsToSend);
	//     //console.log(sRes.data);

	//     $app.$toast.success(res.data.message);
	//     state.done_data.booking = newBooking;
	//   } else {
	//     $app.$toast.error(res.data.message);
	//   }
	//   return res.data.success;
	// } catch (err: any) {
	//   $app.$toast.error(err);
	//   return false;
	// }
};

export default getDataToSend;
