<template>
	<div class="px-4 mx-auto md:w-1/2 lg:w-1/3 md:px-0">
		<div class="text-lg font-bold text-center">Please select the number of guests you want to book for (infants
			and toddlers included)</div>
		<div class="mt-3 mb-4 text-center">By proceeding you understand your payment is transferable but
			non-refundable in line with <a class="text-brand-blue"
				href="www.jarabeachresort.com/terms">www.jarabeachresort.com/terms</a> </div>
		<select name="guest" id="guest" v-model="noOfGuests" class="border rounded-md outline-none focus:outline-none"
			style="box-shadow: none">
			<option value="0">Guests</option>
			<option v-for="num in 50" :value="num" :key="num">
				{{ num }}
			</option>
		</select>
		<div class="mt-6 mb-4 text-lg font-bold">Who is making this booking?</div>
		<div class="space-y-6 ">
			<div class="space-y-6 md:items-center md:space-x-4 md:justify-between md:flex md:space-y-0">
				<div>
					<label for="firstName" class="mb-1 font-semibold">First Name</label>
					<input type="text" id="firstName" class="block w-full rounded" v-model="firstName" />
				</div>
				<div>
					<label for="lastName" class="mb-1 font-semibold">Last Name</label>
					<input type="text" id="lastName" class="block w-full rounded" v-model="lastName" />
				</div>
			</div>
			<div>
				<label for="email" class="mb-1 font-semibold">Email Address</label>
				<input type="email" id="email" class="block w-full rounded" v-model="email" />
			</div>
			<div>
				<label for="phone" class="mb-1 font-semibold">Phone Number</label>
				<input type="text" max-length="11" id="phone" class="block w-full rounded" v-model="phone" />
			</div>
		</div>
		<div class="flex justify-end w-32 mt-6 space-x-3 md:justify-start" v-if="canGoToNext">
			<MainButton @click="gotoNext()">Next</MainButton>
		</div>
		<!-- <div class="flex justify-center max-w-lg px-6 py-6 mx-auto">
			<MainButton @click="$router.push({ path: '/manage' })" outline class="mx-auto">Manage Booking</MainButton>
		</div> -->
	</div>
</template>

<script>
export default {
	layout: 'day-pass',
	data() {
		return {
			noOfGuests: 0,
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		};
	},
	computed: {
		canGoToNext() {
			return this.noOfGuests > 0 && this.firstName.length > 0 && this.lastName.length > 0 && this.email.length > 0 && this.phone.length > 0 && this.isEmailValid && typeof (this.phone) !== 'number';
		},
		isEmailValid() {
			return String(this.email)
				.toLowerCase()
				.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		},
	},
	methods: {
		gotoNext() {
			this.$toast.clear();
			if (this.noOfGuests < 1) {
				this.$toast.info('Please let us know how many guests will be coming', { duration: 5000 });
				return;
			}
			if (this.firstName.length < 1) {
				this.$toast.info('Please the first name is required', { duration: 5000 });
				return;
			}
			// if (typeof(this.phone) !== 'number') {
			// 	this.$toast.info('Your phone number should be an integer', { duration: 5000 });
			// 	return;
			// }
			if (!this.isEmailValid) {
				this.$toast.info('Your email is not valid', { duration: 5000 });
				return;
			}
			if (this.lastName.length < 1) {
				this.$toast.info('Please the last name is required', { duration: 5000 });
				return;
			}
			if (this.email.length < 1) {
				this.$toast.info('Please the email is required', { duration: 5000 });
				return;
			}
			if (this.phone.length < 1) {
				this.$toast.info('Please the phone number is required', { duration: 5000 });
				return;
			}

			this.updateStores();
			this.$store.commit('day_pass/COMPLETE_GUEST')
			this.$router.push({ path: '/day-pass-availability' });
		},
		updateStores() {
			this.$store.commit('day_pass/UPDATE_GUESTS', {
				guests_no: this.noOfGuests,
				guest_first_name: this.firstName,
				guest_last_name: this.lastName,
				guest_email: this.email,
				guest_phone: this.phone
			});
		},
		updateFromStore() {
			this.noOfGuests = this.$store.state.day_pass.guests_no;
			this.firstName = this.$store.state.day_pass.guest_first_name;
			this.lastName = this.$store.state.day_pass.guest_last_name;
			this.email = this.$store.state.day_pass.guest_email;
			this.phone = this.$store.state.day_pass.guest_phone;
		},
	},
	mounted() {
		this.updateFromStore();
		if (this.$store.state.extras.extras_booking !== 'day-pass') {
			this.$store.commit("extras/RESET_STORE");
			this.$store.commit('extras/UPDATE_EXTRAS_BOOKING_TYPE', 'day-pass')
		}
	}
};
</script>
