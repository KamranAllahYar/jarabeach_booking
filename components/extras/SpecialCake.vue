<template>
    <div class="flex w-full">
        <div class="relative w-6/12 ">
            <img src="@/assets/images/specials/cake.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials :index="6" @next="$emit('next')" @prev="$emit('prev')" />
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Cakes</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Make your visit extra-special with a celebration cake. You can specify size, layer, number, color and flavour of cake and we will get it done for you.
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>
            <div class="flex items-center mt-3 space-x-5 font-light ">
                <div>
                    <input type="radio" value="Tues, Nov 9th 2020" id="first_date" class="mr-3 focus-within:ring-0 border-brand-blue">
                    <label for="first_date">Tues, Nov 9th 2020 </label>
                </div>
                <div>
                    <input type="radio" value="Wed, Nov 10th 2020" id="second_date" class="mr-3 focus-within:ring-0 border-brand-blue">
                    <label for="second_date">Wed, Nov 10th 2020 </label>
                </div>
            </div>
            <div>
                <div class="mt-6 font-semibold">Create your cake</div>
                <div class="mt-3 font-light">
                    <div class="flex items-center w-full my-5 space-x-5">
                        <div class="flex items-center w-1/3 pl-2 border rounded-md focus-within:ring">
                            <svg
                                class="w-5 h-5 text-brand-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z">
                                </path>
                            </svg>
                            <select class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.size">
                                <option value="size">Size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                        <div class="flex items-center w-1/3 pl-2 border rounded-md focus-within:ring">
                            <select class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.layers">
                                <option value="0">Layers</option>
                                <option v-for="num in 5" :value="num" :key="num">
                                    {{ num }}
                                </option>
                            </select>
                        </div>
                        <div class="flex items-center w-1/3 pl-2 border rounded-md focus-within:ring">
                            <select class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.numbers">
                                <option value="0">Numbers</option>
                                <option v-for="num in 5" :value="num" :key="num">
                                    {{ num }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center w-full my-5 space-x-5">
                        <div class="flex items-center w-1/2 pl-2 border rounded-md focus-within:ring">
                            <svg class="w-5 h-5" viewBox="0 0 15 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M.92 14.531h13.125M12.17 6.094H2.795a.937.937 0 00-.938.937v4.688c0 .518.42.937.938.937h9.375c.518 0 .937-.42.937-.937V7.03a.937.937 0 00-.937-.937zM7.482 4.688v1.406M8.42 1.875a.937.937 0 11-1.875 0c0-.518.937-1.406.937-1.406s.938.888.938 1.406zM11.232 4.688v1.406M12.17 1.875a.937.937 0 11-1.875 0c0-.518.937-1.406.937-1.406s.938.888.938 1.406zM3.732 4.688v1.406M4.67 1.875a.937.937 0 11-1.875 0c0-.518.937-1.406.937-1.406s.938.888.938 1.406z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1.857 8.203A1.639 1.639 0 004.67 9.35a1.631 1.631 0 002.578-.313 1.628 1.628 0 002.812 0 1.637 1.637 0 003.047-.833" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <select class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.flavours">
                                <option value="flavour">Flavours</option>
                                <option value="red">Banana</option>
                                <option value="red">Vanilla</option>
                                <option value="red">Carrot</option>
                                <option value="red">chocolate</option>
                            </select>
                        </div>
                        <div class="flex items-center w-1/2 pl-2 border rounded-md focus-within:ring">
                            <svg
                                class="w-5 h-5 text-brand-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z">
                                </path>
                            </svg>
                            <select class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.colors">
                                <option value="color">Colors</option>
                                <option value="red">red</option>
                                <option value="red">white</option>
                                <option value="red">cream</option>
                                <option value="red">pink</option>
                            </select>
                        </div>
                    </div>
                    <textarea name="message" id="cake_msg" rows="1" class="w-full border-gray-200 rounded focus:ring focus:ring-brand-blue-300 focus:border-0" placeholder="Message on the cake" v-model="cake.message"></textarea>
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
            cake: {
                size: "size",
                layers: 0,
                numbers: 0,
                flavours: "flavour",
                colors: "color",
                message: "",
            },
        };
    },
};
</script>
