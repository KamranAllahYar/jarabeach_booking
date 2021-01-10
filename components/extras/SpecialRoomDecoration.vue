<template>
    <div class="flex w-full">
        <div class="relative w-6/12">
            <img src="@/assets/images/specials/roomDecoration.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials color="bg-red-500" :index="7" @next="$emit('next')" @prev="$emit('prev')" />
        </div>

        <div class="w-7/12 p-6">
            <div class="font-semibold">Room Decoration</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                There are a number of expected extras we offer for free, including romantic room decoration, or happy birthday messages, simple decorations etc.
                This is only avaliable on date of arrival.
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>

            <div class="grid items-center grid-cols-2 mt-3 font-light gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="checkbox" value="Tues, Nov 9th 2020" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>

            <div class="space-y-4">
                <div class="mt-6 font-semibold">Select Room Decoration</div>
                <label class="flex items-center">
                    <input type="checkbox" class="w-5 h-5 mr-3 rounded focus:ring-0 text-brand-blue-400">
                    <div>Welcome note - <span class="font-bold uppercase">free</span></div>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" class="w-5 h-5 mr-3 rounded focus:ring-0 text-brand-blue-400">
                    <div>Flower Petals - <span class="font-bold uppercase">free</span></div>
                </label>
                <label class="flex items-center">
                    <input type="checkbox" class="w-5 h-5 mr-3 rounded focus:ring-0 text-brand-blue-400">
                    <div>Helium Ballon - <span class="font-bold uppercase">N25,000</span></div>
                </label>
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
