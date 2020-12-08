<template>
    <div class="w-full">
        <div class="flex items-center justify-between text-xs border-b">
            <div class="w-24 h-16">
                <img src="@/assets/images/specials/staff.png" alt="" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex-1 ml-5">
                <div class="text-lg font-semibold">Domestic Staff</div>
                <div class="font-light text-gray-600 fonts ">Food is available from a separate menu (below) and consumed in their rooms or at the back of the property</div>
            </div>
            <div class="flex items-center mr-5 space-x-2 text-gray-600 cursor-pointer">
                <div class="">
                    <svg 
                        class="w-6 h-6" fill="none" 
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
        <div class="m-5 text-lg">
            <div class="flex space-x-10">
                <div class="flex items-start">
                    <input type="checkbox" name="nanny" id="nanny" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300">
                    <label for="nanny" class="font-bold">Nanny
                        <div class="text-sm font-light text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores vitae doloremque sunt maxime officiis minima, natus odit numquam tenetur eos dolorum officia!</div>
                    </label>
                </div>
                <div class="flex items-start">
                    <input type="checkbox" name="nanny" id="nanny" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300">
                    <label for="nanny" class="font-bold">Driver
                        <div class="text-sm font-light text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores vitae doloremque sunt maxime officiis minima, natus odit numquam tenetur eos dolorum officia!</div>
                    </label>
                </div>
            </div>
            <div class="my-8">
                <div class="font-bold text-center">Menu</div>
                <div class="flex my-5 space-x-5 text-sm">
                    <div>
                        <div class="font-bold">Breakfast</div>
                        <div class="flex items-start pr-4 my-1 border-r">
                            <input type="checkbox" name="nanny" id="nanny" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300">
                            <label for="nanny" class="">Lorem ipsum dolor sit amet</label>
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">Lunch</div>
                        <div class="flex items-start pr-4 my-1 border-r">
                            <input type="checkbox" name="nanny" id="nanny" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300">
                            <label for="nanny" class="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</label>
                        </div>
                    </div>
                    <div class="">
                        <div class="font-bold">Dinner</div>
                        <div class="flex items-start my-1">
                            <input type="checkbox" name="nanny" id="nanny" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300">
                            <label for="nanny" class="">Lorem ipsum dolor sit amet.</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="w-1/3 py-4 mx-auto border-t">
            <MainButton><nuxt-link tag="div" to="/profile">Next</nuxt-link></MainButton>
        </div>
    </div>
</template>
<style  scoped>
.fonts {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>
