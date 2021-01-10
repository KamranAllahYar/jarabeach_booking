<template>
    <div class="flex w-full">
        <div class="relative w-6/12 ">
            <img src="@/assets/images/specials/quadbikes.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials color="bg-green-900" :index="3" @next="$emit('next')" @prev="$emit('prev')" />
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Quad Bikes</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Quad biking - external beach provider (signed disclaimer and pre-booking required).
                There are only 2 quad bikes available so the application will need to take this into consideration when managing availability.
                The guest can also select the number of quad bikes they want (1 or 2)
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>

            <div class="grid items-center grid-cols-2 mt-3 font-light gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="checkbox" value="Tues, Nov 9th 2020" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>

            <div>
                <div class="mt-4 font-semibold">At what time?</div>
                <div class="mt-2 space-y-3 font-light ">
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-3 rounded-full focus-within:ring-0 border-brand-blue-400 text-brand-blue-400">
                        <div>Half day (12pm - 4pm) <span class="font-bold">₦25,000</span></div>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-3 rounded-full focus-within:ring-0 border-brand-blue-400 text-brand-blue-400">
                        <div>Half day (4pm - 8pm) <span class="font-bold">₦25,000</span></div>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-3 rounded-full focus-within:ring-0 border-brand-blue-400 text-brand-blue-400">
                        <div>Full day <span class="font-bold">₦50,000</span></div>
                    </label>
                </div>
            </div>

            <div class="flex w-2/3 mx-auto mt-8 space-x-2">
                <MainButton outline @click="$emit('prev')">Back</MainButton>
                <MainButton @click="$emit('next')">Next</MainButton>
            </div>
        </div>
    </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default {
    computed: {
        dates() {
            return this.$store.getters.bookingDates;
        },
    },
    methods: {
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
    },
};
</script>
