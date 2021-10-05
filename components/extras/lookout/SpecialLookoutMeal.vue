<template>
    <div class="w-full">
        <div class="flex items-center justify-between py-3 border-b md:py-0">
            <div class="w-24 h-20">
                <img src="@/assets/images/specials/lookout.png" alt="" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex-1 ml-3">
                <div class="text-xl font-semibold">Dinning Experiences</div>
                <div class="text-xs font-light text-gray-600">
                    There are three dining package options to choose from breakfast and lunch.
                    Only 1 slot available for 2 people per meal. Must be booked in advance.
                    For more details visit the
                    <a class="underline text-brand-blue" target="_blank" href="https://www.jarabeachresort.com/experiences">website</a>.
                </div>
            </div>
            <div class="items-center hidden ml-6 mr-3 space-x-1 text-gray-600 cursor-pointer md:flex" @click="$emit('close')">
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
                    <div class="text-xl font-bold uppercase ">Lookout Breakfast</div>
                    <div class="text-xs font-light text-gray-700">(between 8:30 - 10:30am)</div>
                </div>
                <div class="px-3 my-5 space-y-6 md:border-r">
                    <div v-for="option in breakfastOptions" :key="option.id">
                        <label class="flex" :class="{'opacity-25' : !isAvailable(option.id)}">
                            <input type="checkbox" :disabled="!isAvailable(option.id)" :value="option.id" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" v-model="selectedPackages">
                            <div>{{ option.description }}: <span class="font-bold">{{ currency(option.price) }} per couple</span></div>
                        </label>
                        <div v-if="hasClashes(option.clash, option.id)" class="ml-6 text-xs text-red-500" :key="option.id+'error'">
                            {{ hasClashes(option.clash, option.id) }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full border-b md:w-1/3 md:border-b-0">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Lookout Lunch</div>
                    <div class="text-xs font-light text-gray-700">(between 1:30 - 3:30pm)</div>
                </div>
                <div class="px-2 my-5 space-y-6 md:border-r">
                    <div v-for="option in lunchOptions" :key="option.id">
                        <label class="flex" :class="{'opacity-25' : !isAvailable(option.id)}">
                            <input type="checkbox" :disabled="!isAvailable(option.id)" :value="option.id" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" v-model="selectedPackages">
                            <div>{{ option.description }}: <span class="font-bold">{{ currency(option.price) }} per couple</span></div>
                        </label>
                        <div v-if="hasClashes(option.clash, option.id)" class="ml-6 text-xs text-red-500" :key="option.id+'error'">
                            {{ hasClashes(option.clash, option.id) }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full md:w-1/3">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Beachside Dinner</div>
                    <div class="text-xs font-light text-gray-700">(from 7pm. Candles inclusive)</div>
                </div>
                <div class="px-3 my-5 space-y-6">
                    <div v-for="option in dinnerOptions" :key="option.id">
                        <label class="flex" :class="{'opacity-25' : !isAvailable(option.id)}">
                            <input type="checkbox" :disabled="!isAvailable(option.id)" :value="option.id" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" v-model="selectedPackages">
                            <div>{{ option.description }}: <span class="font-bold">{{ currency(option.price) }} per couple</span></div>
                        </label>
                        <div v-if="hasClashes(option.clash, option.id)" class="ml-6 text-xs text-red-500" :key="option.id+'error'">
                            {{ hasClashes(option.clash, option.id) }}
                        </div>
                    </div>
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
    props: ["initial", "options", "availableOptions", "date", "fisrDay"],
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
        allClashes() {
            return this.$store.getters["extras/allClashes"];
        },
    },
    methods: {
        hasClashes(clashes, id) {
            if (!this.selectedPackages.includes(id)) return false;

            const AC = this.allClashes;

            let hasClash = false;
            for (var key in AC) {
                if (key != "lookout") {
                    if (AC.hasOwnProperty(key)) {
                        const clashData = AC[key];

                        if (clashData.date == this.date) {
                            if (clashData.clash) {
                                const compClashes = clashData.clash.filter(
                                    (value) => clashes.includes(value)
                                );

                                if (compClashes.length > 0) {
                                    hasClash = key;
                                }
                            }
                        }
                    }
                }
            }

            if (hasClash) {
                return `This time slot conflicts with your ${hasClash} booking`;
            }

            return false;
        },
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
            if (this.fisrDay) {
                if (optionId == 1) return false;
                else if (optionId == 2) return false;
                else if (optionId == 3) return false;
            }

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
