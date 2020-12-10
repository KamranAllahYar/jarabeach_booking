<template>
    <div class="w-full">
        <div class="flex items-center justify-between text-xs border-b">
            <div class="w-24 h-16">
                <img src="@/assets/images/specials/domesticStaff.png" alt="" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex-1 ml-3">
                <div class="text-lg font-semibold">Lookout Experience</div>
                <div class="font-light text-gray-600">Food is available from a separate menu (below) and consumed in their rooms or at the back of the property</div>
            </div>
            <div class="flex items-center mr-3 space-x-1 text-gray-600 cursor-pointer" @click="$emit('close')">
                <div class="">
                    <svg 
                        class="w-5 h-5" fill="none" 
                        stroke="currentColor" viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path 
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="1" 
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path>
                    </svg>
                </div>
                <div class="">Close</div>
            </div>
        </div>
        <div class="flex justify-between mx-8 my-4 space-x-5">
            <div>
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Breakfast</div>
                    <div class="text-xs font-light text-gray-700">(between 8:30- 10:30am)</div>
                </div>
                <div class="my-5 space-y-4">
                    <div>
                        <input type="radio" name="breakfast" id="breakfast_shell" class="mr-2 focus:ring-0 border-brand-blue-300" v-model="breakfast">
                        <label for="breakfast_shell" class="">Shell Package</label>
                    </div>
                    <div>
                        <input type="radio" name="breakfast" id="breakfast_seahorse" class="mr-2 focus:ring-0 border-brand-blue-300" v-model="breakfast">
                        <label for="breakfast_seahorse" class="">Seahorse Package</label>
                    </div>
                    <div>
                        <input type="radio" name="breakfast" id="breakfast_star" class="mr-2 focus:ring-0 border-brand-blue-300" v-model="breakfast">
                        <label for="breakfast_star" class="">Starfish Package</label>
                    </div>

                </div>
            </div>
            
            <div class="">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Lunch</div>
                    <div class="text-xs font-light text-gray-700">(between 1:30 - 4:00pm)</div>
                </div>
                <div class="px-16 my-5 space-y-4 border-l border-r">
                    <div>
                        <input type="radio" name="lunch" id="lunch_shell" class="mr-2 border-brand-blue-300 focus:ring-0" v-model="lunch">
                        <label for="lunch" class="">Shell Package</label>
                    </div>
                    <div>
                        <input type="radio" name="lunch" id="lunch_seahorse" class="mr-2 border-brand-blue-300 focus:ring-0" v-model="lunch">
                        <label for="lunch" class="">Seahorse Package</label>
                    </div>
                    <div>
                        <input type="radio" name="lunch" id="lunch_star" class="mr-2 border-brand-blue-300 focus:ring-0" v-model="lunch">
                        <label for="lunch" class="">Starfish Package</label>
                    </div>
                </div>
            </div>
            
            <div class="">
                <div class="text-center">
                    <div class="text-xl font-bold uppercase ">Dinner</div>
                    <div class="text-xs font-light text-gray-700">(from 7pm. Candles inclusive)</div>
                </div>
                <div class="pr-4 my-5 space-y-4">
                    <div>
                        <input type="radio" name="dinner" id="dinner_shell" class="mr-2 border-brand-blue-300 focus:ring-0" v-model="dinner">
                        <label for="dinner" class="">Shell Package</label>
                    </div>
                    <div>
                        <input type="radio" name="dinner" id="dinner_seahorse" class="mr-2 border-brand-blue-300 focus:ring-0" v-model="dinner">
                        <label for="dinner" class="">Seahorse Package</label>
                    </div>
                    <div>
                        <input type="radio" name="dinner" id="dinner_starfish" class="mr-2 border-brand-blue-300 focus:ring-0" v-model="dinner">
                        <label for="dinner" class="">Starfish Package</label>
                    </div>
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
    props:['cancelClicked'],
    data() {
        return {
            breakfast: '',
            lunch: '',
            dinner: '',
        }
    },
}
</script>
<style  scoped>
.fonts {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
