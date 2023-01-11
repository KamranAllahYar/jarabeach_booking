<template>
	<div class="flex flex-col space-y-6">
		<div class="w-full text-gray-800 border rounded-md border-brand-blue-300 bg-brand-blue-100">
			<div class="px-3 py-3 text-xl font-bold border-b border-brand-blue-300">
				Your Reservation
			</div>
			<div class="py-6">
				<div class="flex items-center justify-between px-3">
					<div>Visiting Date</div>
					<div>{{showDate(bookingDate)}}</div>
				</div>
				<div class="flex justify-between px-3 mt-3 item-center" v-for="selectedOption in selectedOptions" :key="selectedOption.id">
					<div class="w-2/3 text-left truncate">{{selectedOption.name}}</div>
					<div>{{currency(optionPrice(selectedOption))}}</div>
				</div>
			</div>
			<template v-for="extra in specialPrices">
				<div class="flex items-center justify-between px-3 my-3" :key="extra.id">
					<div>{{ extra.name }}</div>
					<div>
						<span>{{ currency(extra.price) }}</span>
					</div>
				</div>
			</template>
		</div>

		<div class="w-full text-gray-800 border rounded-md border-brand-blue-300 bg-brand-blue-100" v-if="showDiscount">
			<div class="flex justify-between px-3 my-3">
				<div>Sub-total</div>
				<div class="font-bold">{{ currency(subTotal) }}</div>
			</div>
			<!-- <div class="flex justify-between px-3 my-3" v-if="memberDiscount > 0">
				<div>100Club Discount</div>
				<div class="font-bold">- {{ currency(memberDiscount) }}</div>
			</div> -->
			<div class="flex justify-between px-3 my-3" v-if="discount > 0">
				<div>Discount</div>
				<div class="font-bold">- {{ currency(discount) }}</div>
			</div>
		</div>

		<div class="w-full px-3 py-3 border rounded-md border-brand-blue-300 bg-brand-blue-100">
			<div class="flex justify-between w-full">
				<div class="text-sm">Consumption Tax and VAT (12.5%)</div>
				<div class="text-sm font-bold">{{ currency(taxTotal) }}</div>
			</div>
			<div class="flex justify-between w-full">
				<div class="text-xl">Total</div>
				<div class="text-xl font-bold">{{ currency(totalPrice) }}</div>
			</div>
		</div>

		<div v-if="$store.state.editMode" class="w-full px-3 py-3 border rounded-md border-brand-blue-300 bg-brand-blue-100">
			<div v-if="$store.state.editBooking.previous_change" class="flex justify-between">
				<div class="text-xs">
					Booking Transfer Charge (12.5% VAT and Consumption tax included)
				</div>
				<div class="text-xs font-bold">{{ currency(28125) }}</div>
			</div>
			<div class="flex justify-between">
				<div class="text-xl">Difference to Pay</div>
				<div class="text-xl font-bold">{{ currency(differenceToPay) }}</div>
			</div>
			<div class="flex justify-between mt-8 text-xs">
				<div>Previous Cost</div>
				<div class="font-bold">{{ currency(previousTotalPaid) }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { mapGetters } from 'vuex';

export default {
	props: {
		showDiscount: {
			type: Boolean,
			default: false,
		},
	},
	// data() {
	//     return {
	//         discount: 0,
	//     };
	// },
	computed: {
		...mapGetters({
			noDiscountDates: 'noDiscountDates',
		}),
		isDateSeasonalDate() {
			const isDateAvailable = this.noDiscountDates.filter(d => {
				const bookingDateParsed = parseISO(this.bookingDate);
                const dDate = parseISO(d);
				return format(bookingDateParsed, 'yyyy-MM-dd') === format(dDate, 'yyyy-MM-dd');
			});

			return isDateAvailable.length;
		},
		specialPrices() {
			return this.specials
				.map(special => {
					let price = 0;
					switch (special.type) {
						case 'cakes':
							price = this.$store.getters['extras/cakesPrice'];
							break;
						case 'drinks':
							price = this.$store.getters['extras/drinksPrice'];
							break;
						case 'massages':
							price = this.$store.getters['extras/massagesPrice'];
							break;
						case 'bikes':
							price = this.$store.getters['extras/bikesPrice'];
							break;
						case 'photoshoot':
							price = this.$store.getters['extras/photoshootPrice'];
							break;
						case 'roomDecoration':
							price = this.$store.getters['extras/decorationPrice'];
							break;
						case 'unforgettableExperience':
							price = this.$store.getters['extras/experiencePrice'];
							break;
						case 'domesticStaff':
							price = this.$store.getters['extras/staffPrice'];
							break;
						case 'massage':
							price = this.$store.getters['extras/massagePrice'];
							break;
						case 'newmassage':
							price = this.$store.getters['extras/newmassagePrice'];
							break;
						case 'quadbike':
							price = this.$store.getters['extras/quadbikePrice'];
							break;
						case 'lookout':
							price = this.$store.getters['extras/lookoutPrice'];
							break;
						default:
							price = 0;
							break;
					}

					return {
						id: special.id,
						name: special.name,
						type: special.type,
						price: price,
					};
				})
				.filter(sp => sp.type == 'roomDecoration' || sp.price > 0);
		},
		editBooking() {
			return this.$store.state.editBooking;
		},
		differenceToPay() { 
			return this.$store.getters.differenceToPay;
		},
		bookingDate() {
			return this.$store.getters['day_pass/bookingDate'];
		},
		specials() {
			return this.$store.getters['extras/allSelected'];
		},
		memberDiscount() { 
			return this.$store.getters['day_pass/memberDiscount'];
		},
		taxTotal() {
			return this.$store.getters['day_pass/taxTotal'];
		},
		subTotal() {
			return this.$store.getters['day_pass/subTotal'];
		},
		discount() {
			return this.$store.getters['day_pass/discount'];
		},
		totalPrice() {
			return this.$store.getters['day_pass/totalPrice'];
		},
		previousTotalPaid() {
			return this.$store.getters['day_pass/previousTotalPaid'];
		},
		selectedOptions() {
			let selectedOptions = this.$store.getters['day_pass/selectedOptions'];
			let filteredSelectedOptions = selectedOptions.filter(option => option.quantity > 0);
			return filteredSelectedOptions;
		},
		optionType() {
			return this.$store.getters['day_pass/optionType'];
		},
	},
	methods: {
		optionPrice(option){
			if(this.isDateSeasonalDate) return option.seasonal_price;
			if(this.optionType === 'weekend') return option.weekend_price * option.quantity;
			return option.weekday_price * option.quantity
		},
		showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
		formatAndString(arrs) {
			const arr = [...new Set(arrs)];
			if (arr.length == 1) return arr[0];

			arr.sort();
			const last = arr[arr.length - 1];

			arr.pop();

			return arr.join(', ') + ' & ' + last;
		},
		formatAndStringCabin(arrs) {
			const arr = [...new Set(arrs)];

			const index = arr.indexOf(6);
			if (index > -1) {
				arr.splice(index, 1);
			}

			if (arr.length == 0) return false;
			if (arr.length == 1) return arr[0];

			arr.sort();
			const last = arr[arr.length - 1];

			arr.pop();

			return arr.join(', ') + ' & ' + last;
		},
		formatDate(date) {
			return format(parseISO(date), 'do MMM yyyy');
		},
		currency(num) {
			return '₦' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
	},
};
</script>
