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
                        <input type="checkbox" value="Tues, Nov 9th 2020" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                        <div>{{ showDate(date) }}</div>
                    </label>
                </div>

                <div class="flex w-2/3 mx-auto mt-8 space-x-2">
                    <MainButton outline @click="$emit('prev')">Back</MainButton>
                    <MainButton @click="showMenu = true">Next</MainButton>
                </div>
            </div>
        </div>
        <SpecialLookoutMeal v-if="showMenu" @close="showMenu = false" @next="emitNext()" />
    </div>
</template>
<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
export default {
    data() {
        return {
            showMenu: false,
        };
    },
    computed: {
        dates() {
            return this.$store.getters.bookingDates;
        },
    },
    methods: {
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        emitNext() {
            this.showMenu = false;
            this.$emit("next");
        },
    },
};
</script>
