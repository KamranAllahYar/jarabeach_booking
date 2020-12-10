<template>
    <div class="flex w-full">
        <div class="relative w-6/12 ">
            <img src="@/assets/images/specials/photoshoot.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials :index="4" @next="$emit('next')" @prev="$emit('prev')"   />
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Photoshoot</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                A photographer can access Jara Beach Resort for a maximum of four hours. Includes no food or drink. 
                Assistants/ make up artists charged N15,000 each thereafter. 
                Max two shoots at any given time outdoor venue - 4 hours. Photographer Only <span class="font-bold">- N50,000</span>
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>
            <div class="flex items-center mt-3 space-x-5 font-light ">
                <div>
                    <input type="radio" value="Tues, Nov 9th 2020" id="first_date" class="mr-3 focus-within:ring-0">
                    <label for="first_date">Tues, Nov 9th 2020 </label>
                </div>
                <div>
                    <input type="radio" value="Wed, Nov 10th 2020" id="second_date" class="mr-3 focus-within:ring-0">
                    <label for="second_date">Wed, Nov 10th 2020 </label>
                </div>
            </div>
            <div>
                <div class="mt-6 font-semibold">Select number of assistants/make up artists</div>
                <div class="grid w-full grid-cols-3 mt-3 gap-x-3 gap-y-3">
                        <div class="flex items-center pl-2 border rounded-md focus-within:ring">
                            <svg 
                                class="w-5 h-5" fill="none" viewBox="0 0 15 15" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 7.96875c1.81218 0 3.2812-1.46907 3.2812-3.28125S9.31218 1.40625 7.5 1.40625c-1.81218 0-3.28125 1.46907-3.28125 3.28125S5.68782 7.96875 7.5 7.96875zM1.40625 14.5312c0-1.6161.64202-3.1661 1.78482-4.3089C4.33387 9.07952 5.88384 8.4375 7.5 8.4375c1.61616 0 3.1661.64202 4.3089 1.7848 1.1428 1.1428 1.7848 2.6928 1.7849 4.3089" 
                                    stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <select v-model="noOfArtists"
                                class="border-0 rounded-md outline-none focus:outline-none"
                                style="box-shadow: none">
                                <option v-for="num in 5" :value="num" :key="num">
                                    {{ num }}
                                </option>
                            </select>
                        </div>
                    </div>
                
            </div>
            <div class="w-1/3 mx-auto mt-8">
                <MainButton @click="$emit('next')">Next</MainButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            noOfArtists: ''
        }
    }
}
</script>
