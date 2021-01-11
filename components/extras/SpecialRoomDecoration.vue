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
                    <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>
            <div class="space-y-4">
                <div class="mt-6 font-semibold">Select Room Decoration</div>
                <label class="flex items-center" v-for="deco in decorations" :key="deco.id">
                    <input type="checkbox" :value="deco" v-model="selectedDecorations" class="w-5 h-5 mr-3 rounded focus:ring-0 text-brand-blue-400">
                    <div>{{ deco.name }} -
                        <span class="font-bold uppercase" v-if="deco.price >0">{{ currency(deco.price) }}</span>
                        <span class="font-bold uppercase" v-else>FREE</span>
                    </div>
                </label>
            </div>
            <div class="flex w-2/3 mx-auto mt-8 space-x-2">
                <MainButton outline @click="prev()">Back</MainButton>
                <MainButton @click="next()">Next</MainButton>
            </div>
        </div>
    </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default {
    data() {
        return {
            selectedDate: null,
            selectedDecorations: [],
        };
    },
    computed: {
        decorations() {
            return this.$store.getters["extras/allDecorations"];
        },
        dates() {
            return this.$store.getters.bookingDates;
        },
    },
    methods: {
        next() {
            console.log("NEXT");
            this.$store.commit(
                "extras/SET_SELECTED_DECORATION",
                this.selectedDecorations
            );
            this.$emit("next");
        },
        prev() {
            this.$store.commit(
                "extras/SET_SELECTED_DECORATION",
                this.selectedDecorations
            );
            this.$emit("prev");
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    mounted() {
        this.$store.dispatch("extras/getSpecialDecorations");

        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.selectedDecorations) {
            this.selectedDecorations = this.$store.state.extras.selectedDecorations.map(
                (x) => x
            );
        }
    },
};
</script>
