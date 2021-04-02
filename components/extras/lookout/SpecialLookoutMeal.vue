<template>
    <div class="w-full">
        <div class="flex items-center justify-between border-b">
            <div class="w-24 h-20">
                <img src="@/assets/images/specials/lookout.png" alt="" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex-1 ml-3">
                <div class="text-xl font-semibold">Lookout Experience</div>
                <div class="text-xs font-light text-gray-600">There are three dining package options to choose from across breakfast, lunch and dinner. Only 1 slot available for 2 people per meal. Must be booked in advance.</div>
            </div>
            <div class="flex items-center ml-6 mr-3 space-x-1 text-gray-600 cursor-pointer" @click="$emit('close')">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
                <div>Close</div>
            </div>
        </div>

        <div class="flex flex-col justify-between w-full px-3 my-4 space-y-5 md:space-y-0 md:space-x-5 md:flex-row">
            <div class="w-full border-b md:w-1/3 md:border-b-0">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Breakfast</div>
                    <div class="text-xs font-light text-gray-700">(between 8:30 - 10:30am)</div>
                </div>
                <div class="px-3 my-5 space-y-6 md:border-r">
                    <label class="flex" v-for="option in breakfastOptions" :key="option.id"
                        :class="{'opacity-25' : !isAvailable(option.id)}">
                        <input type="checkbox" :disabled="!isAvailable(option.id)" :value="option.id" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" v-model="selectedPackages">
                        <div>{{ option.description }}: <span class="font-bold">{{ currency(option.price) }} per couple</span></div>
                    </label>
                </div>
            </div>

            <div class="w-full border-b md:w-1/3 md:border-b-0">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Lunch</div>
                    <div class="text-xs font-light text-gray-700">(between 1:30 - 4:00pm)</div>
                </div>
                <div class="px-2 my-5 space-y-6 md:border-r">
                    <label class="flex" v-for="option in lunchOptions" :key="option.id"
                        :class="{'opacity-25' : !isAvailable(option.id)}">
                        <input type="checkbox" :disabled="!isAvailable(option.id)" :value="option.id" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" v-model="selectedPackages">
                        <div>{{ option.description }}: <span class="font-bold">{{ currency(option.price) }} per couple</span></div>
                    </label>
                </div>
            </div>

            <div class="w-full md:w-1/3">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Dinner</div>
                    <div class="text-xs font-light text-gray-700">(from 7pm. Candles inclusive)</div>
                </div>
                <div class="px-3 my-5 space-y-6">
                    <label class="flex" v-for="option in dinnerOptions" :key="option.id"
                        :class="{'opacity-25' : !isAvailable(option.id)}">
                        <input type="checkbox" :disabled="!isAvailable(option.id)" :value="option.id" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" v-model="selectedPackages">
                        <div>{{ option.description }}: <span class="font-bold">{{ currency(option.price) }} per couple</span></div>
                    </label>
                </div>
            </div>
        </div>
        <hr>
        <div class="flex w-full px-6 mx-auto my-8 space-x-2 md:px-0 md:w-2/3">
            <MainButton outline @click="prev()">Back</MainButton>
            <MainButton @click="next()">Next</MainButton>
        </div>
    </div>
</template>
<script>
export default {
    props: ["initial", "options", "availableOptions", "date"],
    data() {
        return {
            selectedPackages: [],
        };
    },
    watch: {
        selectedPackages(v) {
            this.$emit("details", v);
        },
        date(newVal, oldVal) {
            if (oldVal != null) {
                if (!this.$store.state.editMode) {
                    this.selectedPackages = [];
                }
            }
        },
    },
    computed: {
        breakfastOptions() {
            return this.options.filter(
                (o) => o.type.toLowerCase() == "breakfast"
            );
        },
        lunchOptions() {
            return this.options.filter((o) => o.type.toLowerCase() == "lunch");
        },
        dinnerOptions() {
            return this.options.filter((o) => o.type.toLowerCase() == "dinner");
        },
    },
    methods: {
        next() {
            this.$emit("next");
        },
        prev() {
            this.$emit("prev");
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        isAvailable(optionId) {
            if (this.availableOptions) {
                return this.availableOptions.includes(optionId);
            }

            return false;
        },
    },
    mounted() {
        if (this.initial) {
            this.selectedPackages = this.initial;
        }
    },
};
</script>
