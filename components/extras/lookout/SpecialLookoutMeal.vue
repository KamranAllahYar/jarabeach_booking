<template>
    <div class="w-full">
        <div class="flex items-center justify-between border-b">
            <div class="w-24 h-20">
                <img src="@/assets/images/specials/lookout.png" alt="" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex-1 ml-3">
                <div class="text-xl font-semibold">Lookout Experience</div>
                <div class="text-xs font-light text-gray-600">9 total (3 for breakfast, lunch and dinner). Only 1 slot available for 2 people per meal. Must be booked in advance.</div>
            </div>
            <div class="flex items-center mr-3 space-x-1 text-gray-600 cursor-pointer" @click="$emit('close')">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
                <div>Close</div>
            </div>
        </div>
        <div class="flex justify-between w-full px-3 my-4 space-x-5">
            <div class="w-1/3">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Breakfast</div>
                    <div class="text-xs font-light text-gray-700">(between 8:30- 10:30am)</div>
                </div>
                <div class="px-3 my-5 space-y-6 border-r">
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" :value="1" v-model="selectedPackages">
                        <div>Shell Package (includes non-alcoholic sparkling wine): <span class="font-bold">N15,000 per couple</span></div>
                    </label>
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" :value="2" v-model="selectedPackages">
                        <div>Seahorse Package (includes sparkling wine/ Prosecco): <span class="font-bold">N20,000 per couple</span></div>
                    </label>
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full focus:ring-0 text-brand-blue-400 border-brand-blue-400" :value="3" v-model="selectedPackages">
                        <div>Starfish Package (includes brut champagne): <span class="font-bold">N45,000 per couple</span></div>
                    </label>
                </div>
            </div>

            <div class="w-1/3">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Lunch</div>
                    <div class="text-xs font-light text-gray-700">(between 1:30 - 4:00pm)</div>
                </div>
                <div class="px-2 my-5 space-y-6 border-r">
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full border-brand-blue-400 focus:ring-0 text-brand-blue-400" :value="4" v-model="selectedPackages">
                        <div>Shell Package (includes non-alcoholic sparkling wine): <span class="font-bold">N15,000 per couple</span></div>
                    </label>
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full border-brand-blue-400 focus:ring-0 text-brand-blue-400" :value="5" v-model="selectedPackages">
                        <div>Seahorse Package (includes sparkling wine/ Prosecco): <span class="font-bold">N20,000 per couple</span></div>
                    </label>
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full border-brand-blue-400 focus:ring-0 text-brand-blue-400" :value="6" v-model="selectedPackages">
                        <div>Starfish Package (includes brut champagne): <span class="font-bold">N45,000 per couple</span></div>
                    </label>
                </div>
            </div>

            <div class="w-1/3 ">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Dinner</div>
                    <div class="text-xs font-light text-gray-700">(from 7pm. Candles inclusive)</div>
                </div>
                <div class="px-3 my-5 space-y-6">
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full border-brand-blue-400 text-brand-blue-400 focus:ring-0" :value="7" v-model="selectedPackages">
                        <div>Shell Package (includes non-alcoholic sparkling wine): <span class="font-bold">N15,000 per couple</span></div>
                    </label>
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full border-brand-blue-400 text-brand-blue-400 focus:ring-0" :value="8" v-model="selectedPackages">
                        <div>Seahorse Package (includes sparkling wine/ Prosecco): <span class="font-bold">N20,000 per couple</span></div>
                    </label>
                    <label class="flex">
                        <input type="checkbox" class="mt-1 mr-2 rounded-full border-brand-blue-400 text-brand-blue-400 focus:ring-0" :value="9" v-model="selectedPackages">
                        <div>Starfish Package (includes brut champagne): <span class="font-bold">N45,000 per couple</span></div>
                    </label>
                </div>
            </div>
        </div>
        <hr>
        <div class="w-1/3 py-4 mx-auto">
            <MainButton @click="$emit('next')">Next</MainButton>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedPackages: [],
        };
    },
};
</script>
