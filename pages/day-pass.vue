<template>
	<div class="mx-auto md:w-1/2 lg:w-1/3">
		<div class="mb-4 text-lg font-bold text-center">Please select the number of guests you want to book for</div>
		<select name="adult" id="adult" v-model="noOfAdult" class="border rounded-md outline-none focus:outline-none" style="box-shadow: none">
			<option value="0">Guests</option>
			<option v-for="num in 42" :value="num" :key="num">
				{{ num }}
			</option>
		</select>
		<div class="mt-6 mb-4 text-lg font-bold">Who is making this booking?</div>
		<div class="space-y-6 ">
			<div class="items-center justify-between md:flex">
				<div>
					<label for="firstName" class="mb-1 font-semibold">First Name</label>
					<input type="text" id="firstName" class="block rounded" v-model="firstName"/>
				</div>
				<div>
					<label for="lastName" class="mb-1 font-semibold">Last Name</label>
					<input type="text" id="lastName" class="block rounded" v-model="lastName"/>
				</div>
			</div>
			<div>
				<label for="email" class="mb-1 font-semibold">Email Address</label>
				<input type="email" id="email" class="block w-full rounded" v-model="email"/>
			</div>
			<div>
				<label for="phone" class="mb-1 font-semibold">Phone Number</label>
				<input type="text" max-length="11" id="phone" class="block w-full rounded" v-model="phone"/>
			</div>
		</div>
		<div class="w-32 mt-6 space-x-3" v-if="canGoToNext">
			<!-- <MainButton outline>Back</MainButton> -->
			<MainButton @click="gotoNext()">Next</MainButton>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'day-pass',
	data() {
		return {
			noOfAdult: 0,
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		};
	},
	computed: {
		canGoToNext() {
			return this.noOfAdult > 0 && this.firstName.length > 0 && this.lastName.length > 0 && this.email.length > 0 && this.phone.length > 0 && this.isEmailValid && typeof(this.phone) !== 'number';
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
			if (this.noOfAdult < 1) {
				this.$toast.info('Please let us know how many adults will be coming', { duration: 5000 });
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

			// this.updateStores();
			// this.$store.commit('COMPLETE_GUEST');
			this.$router.push({ path: '/day-pass-options' });
		},
		updateStores() {
			this.$store.commit('UPDATE_GROUP', {
				groupType: 'group',
				adult_no: this.noOfAdult,
				child_no: this.noOfChildren,
				children_ages: this.childrenAges,
			});
		},
	},
};
</script>
