<template>
	<div class="px-6">
		<div class="text-3xl font-semibold text-rubik text-center mb-5">Here’s your booking summary:</div>

		<div class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-3 md:flex-row">
			<!-- <div class="w-full md:w-9/12">
				<div class="overflow-hidden bg-white border rounded-lg shadow-lg">
					<DayPassExtrasLayout :currentSpecial="special" />
				</div>
			</div> -->
			<div class=" w-full md:w-7/12">
				<ReservationBox showDiscount />
			</div>
		</div>
		<div class="mt-6 mb-12 pb-4  w-full md:w-7/12 mx-auto   bg-gray-button ">
			<div class="my-3 font-rubik pt-5 px-5  ">
				<input id="chk" type="checkbox">
				<label for="chk">Agree with the Booking Terms and Conditions and Proceed to payment</label>
			</div>
			<form @submit.prevent="checkDiscount" class="flex justify-between p-2">
				<input class="w-full ml-2 bg-transparent border border-gray-text p-2 rounded-md outline-none" v-model="code"
					placeholder="Enter Voucher/Discount code" />
				<div class="w-40 ml-3">
					<button :loading="loadingCode" type="submit"
						class="w-full px-5 py-3 font-medium  rounded-md text-white text-sm  bg-black focus:outline-none">
						Apply
					</button>
				</div>
			</form>
		</div>
		<div class="mx-auto flex gap-5 w-full md:w-5/12">
			<button @click="gotoBack" class="w-64 bg-gray-button rounded-lg py-4 font-rubik text-sm font-medium">
				Back
			</button>
			<Paystack v-if="trans_ref != null" :amount="totalPrice" :email="guestEmail" :paystackkey="paystackkey"
				:reference="trans_ref" :callback="completeBooking" :close="closePayment" :embed="false">
				<button class="w-64 bg-black text-white rounded-lg py-4 font-rubik text-sm font-medium">
					Pay With Paystack
				</button>
			</Paystack>
		</div>
	</div>
</template>

<script>
import DayPassExtrasLayout from '~/components/daypass/DayPassExtrasLayout.vue'
import ReservationBox from '@/components/daypass/DayPassReservationBox.vue'
import Paystack from 'vue-paystack';


export default {
	layout: 'day-pass',
	components: {
		DayPassExtrasLayout,
		ReservationBox,
		Paystack
	},
	data() {
		return {
			special: 'lookout',
			code: '',
			loadingCode: false,
			trans_ref: null,
			holdDisclaimer: false,
			loading: false,
		};
	},
	computed: {
		selected() {
			return this.$store.getters['extras/allSelected'];
		},
		specials() {
			return this.$store.getters['extras/allSelected'];
		},
		bookingDate() {
			return this.$store.getters['day_pass/bookingDate']
		},
		totalPrice() {
			return this.$store.getters['day_pass/totalPrice'] * 100;
		},
		guestEmail() {
			return this.$store.getters['day_pass/bookingEmail'];
		},
		paystackkey() {
			return this.$config.PAYMENT_PUBLIC_KEY;
		},
		subTotal() {
			return this.$store.getters['day_pass/subTotal'];
		},
	},
	methods: {
		gotoBack() {
			this.$router.push('/day-pass-options');
		},
		async checkDiscount() {
			this.$store.commit('UPDATE_DISCOUNT', null);
			if (this.code.length <= 2) {
				this.$toast.info('Please input a proper code');
				return;
			}
			this.loadingCode = true;

			this.$axios
				.post(`/check-daypass-discount`, {
					code: this.code,
					total: this.subTotal,
					date: this.bookingDate,
				})
				.then(({ data }) => {
					console.log(data);
					if (data.success) {
						this.$toasted.success(data.message);
						const discount = Object.assign({}, data.data);
						console.log(discount);
						this.$store.commit('day_pass/UPDATE_DISCOUNT', discount);
						this.createTransaction();
					} else {
						this.$toasted.error(data.message);
					}

					//console.log(data);
				})
				.finally(() => {
					this.loadingCode = false;
				});
		},
		removeExtra() {
			//console.log(this.special);
			this.$store.commit('extras/REMOVE_EXTRA', this.special);
		},
		checkAndRemove() {
			let beenRemoved = true;
			this.selected.forEach(special => {
				if (special.type == this.special) {
					beenRemoved = false;
				}
			});

			//console.log('Been Removed - ' + beenRemoved);

			if (beenRemoved) {
				this.$router.push({ path: '/extras' });
			}
		},
		async createTransaction() {
			this.loading = true;
			const trans_ref = await this.$store.dispatch('day_pass/createTransaction');
			//console.log(trans_ref);

			this.trans_ref = trans_ref;
			this.loading = false;
		},
		async completeBooking(paystack_res) {
			//console.log(paystack_res);
			if (paystack_res.status == 'success') {
				const bookingFrom = localStorage.getItem('bookingFrom');
				const res = await this.$store.dispatch('day_pass/createBooking', {
					trans_ref: this.trans_ref,
					method_ref: paystack_res.transaction,
					method: 'Paystack',
					booking_from: bookingFrom,
				});
				//console.log(res);
				if (res) {
					//console.log(res);
					this.$router.push('/done');
					this.$store.commit('day_pass/RESET_STORE');
					this.$store.commit('extras/RESET_STORE');
				}
			} else {
				this.$toasted.error(res.message);
			}
			this.loading = false;
		},
		closePayment() {
			//console.log('You closed payment');
			this.$toast.error('Payment was not completed');
			// this.createTransaction();
		},
	},
	mounted() {
		this.createTransaction();

		const special = this.$route.params.special;

		if (special) {
			this.special = special;
		}

		this.checkAndRemove();
	},
	updated() {
		//console.log('updated');
	},
	// middleware({ store, redirect, $toast }) {
	// 	if (!store.state.availability_done) {
	// 		redirect('/availability');
	// 	}
	// },
};
</script>
