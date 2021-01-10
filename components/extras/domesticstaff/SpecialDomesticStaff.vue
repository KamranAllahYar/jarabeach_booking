<template>
    <div>
        <div class="flex w-full" v-show="!showStaff">
            <div class="relative w-6/12 ">
                <img src="@/assets/images/specials/domesticStaff.png" alt="" class="object-cover object-center w-full h-full">
                <NavSpecials :index="8" @prev="$emit('prev')" />
            </div>
            <div class="flex flex-col w-7/12 p-6">
                <div class="font-semibold">Domestic Staff</div>

                <p class="mt-3 font-light leading-relaxed text-gray-600">
                    We welcome guests with nannies or drivers, subject to availability. No discounts/ offers apply to domestic staff pricing.
                    We have (will have at the time we go live) a nannies room and a drivers room (2 max in each). Booked in advance.
                </p>

                <div>
                    <div class="mt-4 font-semibold">Select dates for domestic staff</div>
                    <div class="mt-2 space-y-3 font-light ">
                        <label class="flex items-center" v-for="date in dates" :key="date">
                            <input type="checkbox" value="Tues, Nov 9th 2020" class="w-5 h-5 mr-3 rounded focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                            <div>{{ showDate(date) }}</div>
                        </label>
                    </div>
                </div>

                <div class="flex-1"></div>

                <div class="flex w-2/3 mx-auto mt-8 space-x-2">
                    <MainButton outline @click="$emit('prev')">Back</MainButton>
                    <MainButton @click="showStaff = true">Next</MainButton>
                </div>
            </div>
        </div>

        <SpecialDomesticStaffInfo v-if="showStaff" @close="showStaff = false" />
    </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default {
    data() {
        return {
            showStaff: false,
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
    },
};
</script>
