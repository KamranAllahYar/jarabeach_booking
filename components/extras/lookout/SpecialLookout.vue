<template>
    <div>
        <div class="flex w-full" v-show="!showMenu">
            <div class="relative w-6/12">
                <img src="@/assets/images/specials/lookout.png" alt="" class="object-cover object-center w-full h-full">
                <NavSpecials color="bg-green-500" @next="emitNext()" />
            </div>
            <div class="w-7/12 p-6">
                <div class="font-semibold">The Lookout Experience</div>
                <p class="mt-3 font-light leading-relaxed text-gray-600">
                    The Lookout provides an experience like no other in the city. Pre-booked exclusively,
                    the lookout is only open for three sessions a day as well as for massages.
                    The lookout is available for up to four people maximum. A speaker is included so you can connect your own playlist,
                    or listen to Jara's own - curated to suit the sweet and soothing sound of the waves lapping against the beach.
                    The perfect location for that extra-special romantic occasion. We will be happy to organise extras like flowers or cake for you at an additional cost.

                </p>
                <div class="mt-6 font-semibold">What date would you like to have this</div>

                <div class="grid items-center grid-cols-2 mt-3 font-light gap-y-2">
                    <label class="flex items-center" v-for="date in dates" :key="date">
                        <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                        <div>{{ showDate(date) }}</div>
                    </label>
                </div>

                <div class="flex w-2/3 mx-auto mt-8 space-x-2">
                    <MainButton outline @click="$emit('prev')">Back</MainButton>
                    <MainButton @click="toggleMenuInfo(true)">Next</MainButton>
                </div>
            </div>
        </div>

        <SpecialLookoutMeal v-show="showMenu"
            :initial="selectedPackages"
            :options="options"
            :availableOptions="currentAvailablePackages"
            :date="selectedDate"
            @close="toggleMenuInfo(false)"
            @prev="toggleMenuInfo(false)"
            @next="next()"
            @details="updateSelection($event)" />
    </div>
</template>
<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
export default {
    data() {
        return {
            showMenu: false,
            selectedDate: null,
            selectedPackages: [],
            availablePackages: null,
        };
    },
    computed: {
        currentAvailablePackages() {
            if (this.selectedDate == null) return [];
            if (this.availablePackages == null) return [];

            return this.availablePackages[this.selectedDate];
        },
        options() {
            return this.$store.getters["extras/allLookouts"];
        },
        dates() {
            return this.$store.getters.bookingDates;
        },
    },
    watch: {
        // selectedDate(newVal, oldVal){
        // }
    },
    methods: {
        toggleMenuInfo(view) {
            this.$store.commit("extras/SET_SELECTED_LOOKOUT", {
                lookouts: this.selectedPackages,
                date: this.selectedDate,
            });
            this.showMenu = view;
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_LOOKOUT", {
                lookouts: this.selectedPackages,
                date: this.selectedDate,
            });
            this.$emit("prev");
        },
        next() {
            this.$store.commit("extras/SET_SELECTED_LOOKOUT", {
                lookouts: this.selectedPackages,
                date: this.selectedDate,
            });
            this.$emit("next");
        },
        updateSelection(packages) {
            this.selectedPackages = packages;

            this.$store.commit("extras/SET_SELECTED_LOOKOUT", {
                lookouts: this.selectedPackages,
                date: this.selectedDate,
            });
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        checkOptions() {
            this.$axios
                .post("check-lookout-booking", { dates: this.dates })
                .then((res) => {
                    console.log(res.data.data);
                    this.availablePackages = res.data.data;
                });
        },
    },
    mounted() {
        this.$store.dispatch("extras/getLookoutOptions");
        this.checkOptions();

        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.selectedLookouts) {
            this.selectedPackages = this.$store.state.extras.selectedLookouts.map(
                (x) => x
            );
        }
        if (this.$store.state.extras.dateLookout) {
            this.selectedDate = this.$store.state.extras.dateLookout;
        }
    },
};
</script>
