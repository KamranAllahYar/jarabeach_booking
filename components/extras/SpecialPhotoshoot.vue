<template>
    <div class="flex w-full">
        <div class="w-6/12 ">
            <img src="@/assets/images/specials/photoshoot.png" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Photoshoot</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, sint impedit possimus itaque facere placeat debitis.
                Totam nostrum aspernatur enim corporis alias, deserunt et quas aut error maxime ad pariatur.
                Voluptas accusamus molestias cum aperiam blanditiis. Harum eos, reprehenderit sequi quas suscipit repudiandae sunt blanditiis
                corrupti ut magni praesentium nemo omnis accusamus ex dolores. Eaque rem non eveniet provident. Non. Eaque rem non eveniet provident. Non.
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
                            <svg class="w-5 h-5" viewBox="0 0 16 16" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.75 6.583h-.01C13.5 3.55 10.706 1.55 8 1.55s-5.5 2-5.74 5.033h-.01a1.75 1.75 0 100 3.5h.01a6 6 0 0011.48 0h.01a1.75 1.75 0 100-3.5z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 1.55a1.5 1.5 0 01.596 2.876 1.5 1.5 0 01-2.01-.876M9.323 11.334a2 2 0 01-2.646 0M11.5 7.333a1 1 0 01-2 0M6.5 7.333a1 1 0 01-2 0" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
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
