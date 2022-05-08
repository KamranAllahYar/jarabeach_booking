<template>
	<div class="px-6">
		<h1 class="mb-6 text-xl font-bold text-center md:text-2xl">Select an Extra experience to make your stay even more memorable!</h1>

		<div class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-3 md:flex-row">
			<div class="w-full md:w-9/12">
				<div class="overflow-hidden bg-white border rounded-lg shadow-lg">
					<ExtrasLayout :currentSpecial="special" />
				</div>
			</div>
			<div class="flex-shrink-0 w-full md:w-3/12">
				<ReservationBox showDiscount />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'booking',
	data() {
		return {
			special: 'lookout',
		};
	},
	computed: {
		selected() {
			return this.$store.getters['extras/allSelected'];
		},
	},
	methods: {
		removeExtra() {
			console.log(this.special);
			this.$store.commit('extras/REMOVE_EXTRA', this.special);
		},
		checkAndRemove() {
			let beenRemoved = true;
			this.selected.forEach(special => {
				if (special.type == this.special) {
					beenRemoved = false;
				}
			});

			console.log('Been Removed - ' + beenRemoved);

			if (beenRemoved) {
				this.$router.push({ path: '/extras' });
			}
		},
	},
	mounted() {
		const special = this.$route.params.special;

		if (special) {
			this.special = special;
		}

		this.checkAndRemove();
	},
	updated() {
		console.log('updated');
	},
	middleware({ store, redirect, $toast }) {
		if (!store.state.availability_done) {
			redirect('/availability');
		}
	},
};
</script>
