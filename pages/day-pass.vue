<template>
	<div class="">
		<div class="mb-4 text-xl font-bold">Please select the number of guests you want to book for</div>
		<select name="adult" id="adult" v-model="noOfAdult" class="border rounded-md outline-none focus:outline-none" style="box-shadow: none">
			<option value="0">Guests</option>
			<option v-for="num in 42" :value="num" :key="num">
				{{ num }}
			</option>
		</select>
		<div class="w-32 mt-6 space-x-3" v-if="noOfAdult > 0">
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
		};
	},
	computed: {},
    methods: {
        gotoNext() {
			this.$toast.clear();
			if (this.noOfAdult < 1) {
				this.$toast.info('Please let us know how many adults will be coming', { duration: 5000 });
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
    }
};
</script>
