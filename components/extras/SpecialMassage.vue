<template>
    <div class="flex w-full">
        <div class="relative w-6/12 ">
            <img src="@/assets/images/specials/massage.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials color="bg-yellow-900" :index="2" @next="$emit('next')" @prev="$emit('prev')" />
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Massage</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                A soothing massage at Jara Beach Resort – picture yourself lying in the shade of a coconut palm that sways gently in the breeze,
                or shaded by Jara's exclusive Lookout, your cares being eased away by one of our expert masseuses.
            </p>
            <p class="mt-2 font-light leading-relaxed text-gray-600">
                No matter the occasion, make it even more memorable with a romantic couples massage.
                Romantic Outdoor Massage (one masseuse): 2 Hours (minimum) <span class="font-bold"> = N30,000</span>
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>

            <div class="grid items-center grid-cols-2 mt-3 font-light gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="checkbox" value="Tues, Nov 9th 2020" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>

            <div>
                <div class="mt-6 font-semibold">At what time?</div>
                <div class="grid grid-cols-2 gap-3 mt-2 font-light ">
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                        <div>10am - 12pm </div>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                        <div>12pm - 2pm</div>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                        <div>2pm - 4pm</div>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                        <div>4pm - 6pm</div>
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
