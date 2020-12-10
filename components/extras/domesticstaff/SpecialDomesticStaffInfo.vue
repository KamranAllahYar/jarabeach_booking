<template>
    <div class="w-full">
        <div class="flex items-center justify-between text-xs border-b">
            <div class="w-24 h-20">
                <img src="@/assets/images/specials/domesticStaff.png" alt="" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex-1 ml-3">
                <div class="text-lg font-semibold">Domestic Staff</div>
                <div class="font-light text-gray-600 fonts ">Food is available from a separate menu (below) and consumed in their rooms or at the back of the property</div>
            </div>
            <div class="flex items-center mr-3 space-x-2 text-gray-600 cursor-pointer" @click="$emit('close')">
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
        <div class="m-6 text-lg">
            <div class="flex w-full space-x-12">
                <div class="flex items-start w-1/2">
                    <input type="checkbox" name="nanny" id="nanny" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300">
                    <label for="nanny" class="font-bold">Nanny
                        <div class="text-sm font-light text-gray-600">
                            If not staying in a standard or family room [as a regular guest], Nannies are welcome to sleep in our dedicated staff quarters - 
                            bedding and water provided - and partake in all meals and make use of Jara's facilities. A separate food menu is available. 
                            Alcohol and  the snack station is not included. <span class="font-bold text-black">Cost per night: N30,000 (inc VAT).</span>
                        </div>
                    </label>
                </div>
                <div class="flex items-start w-1/2">
                    <input type="checkbox" name="driver" id="driver" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300">
                    <label for="driver" class="font-bold">Driver
                        <div class="text-sm font-light text-gray-600">
                            Drivers requiring accommodation are welcome to sleep in staff quarters (room access from 6pm) - bedding and water provided - 
                            and are not expected to remain inside the property between 9am and 6pm. <span class="font-bold text-black">Cost per night: N15,000 (inc TAX).</span>
                        </div>                    
                    </label>
                </div>
            </div>
            <div class="my-8">
                <div class="font-bold text-center">Menu</div>
                <div class="flex justify-between w-full my-5 space-x-3 text-sm">
                    <div class="w-1/3">
                        <div class="font-bold">Breakfast</div>
                        <div class="flex items-start pr-4 my-1">
                            <input type="checkbox" name="breakfast" id="breakfast" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300" v-model="menu">
                            <label for="breakfast" class="text-gray-600">Nigerian Breakfast (Boiled yam & Egg sauce) @ <span class="font-bold text-black">N3,000</span></label>
                        </div>
                    </div>
                    <div class="w-1/3">
                        <div class="ml-4 font-bold">Lunch</div>
                        <div class="flex items-start px-4 my-1 border-l border-r">
                            <input type="checkbox" name="lunch" id="lunch" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300" v-model="menu">
                            <label for="lunch" class="text-gray-600">Indomie & Egg (Wednesday’s, Friday’s & Sunday’s) Jollof Rice with Chicken & Beef Skewer @ <span class="font-bold text-black">N4,000</span></label>
                        </div>
                    </div>
                    <div class="w-1/3 pl-2">
                        <div class="font-bold">Dinner</div>
                        <div class="flex items-start my-1 ">
                            <input type="checkbox" name="dinner" id="dinner" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300" v-model="menu">
                            <label for="dinner" class="text-gray-600">Nigerian Special @ <span class="font-bold text-black">N5,000</span></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="w-1/3 py-4 mx-auto">
            <MainButton><nuxt-link tag="div" to="/profile">Next</nuxt-link></MainButton>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menu: ''
        }
    }
}
</script>
<style  scoped>
.fonts {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
