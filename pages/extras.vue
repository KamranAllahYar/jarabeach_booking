<template>
    <div>
        <ExtrasLayout>
            <div class="flex w-full" v-if="extras == 'lookout'" v-show="!showExtras">
                <div class="w-1/2 ">
                    <img src="https://pbs.twimg.com/media/EktQi59WMAM99gg.jpg" alt="" class="object-cover object-center w-full h-full">
                </div>
                <div class="w-1/2 p-6">
                    <div class="font-semibold">The Lookout Experience</div>
                    <p class="mt-3 text-sm font-light leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, sint impedit possimus itaque facere placeat debitis. 
                        Totam nostrum aspernatur enim corporis alias, deserunt et quas aut error maxime ad pariatur.
                        Voluptas accusamus molestias cum aperiam blanditiis. Harum eos, reprehenderit sequi quas suscipit repudiandae sunt blanditiis 
                        corrupti ut magni praesentium nemo omnis accusamus ex dolores. Eaque rem non eveniet provident. Non. Eaque rem non eveniet provident. Non.
                    </p>
                    <div class="mt-6 text-sm font-semibold">What date would you like to have this</div>
                    <div class="flex items-center mt-3 space-x-5 text-sm font-light ">
                        <div >
                            <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0"  v-model="lookout_experience"><label for="first_date">Tues, Nov 9th 2020 </label>
                        </div>
                        <div>
                            <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0" v-model="lookout_experience"><label for="second_date">Wed, Nov 10th 2020 </label>
                        </div>
                    </div>
                    <div class="w-1/3 mx-auto mt-8" >
                        <MainButton @click="gotoNext('massage')">Next</MainButton>
                    </div>
                </div>
            </div>
            <div class="flex w-full" v-if="extras == 'massage'" v-show="showExtras">
                <div class="w-1/2 ">
                    <img src="https://pbs.twimg.com/media/EktQi59WMAM99gg.jpg" alt="" class="object-cover object-center w-full h-full">
                </div>
                <div class="w-1/2 p-6">
                    <div class="font-semibold">Massage</div>
                    <p class="mt-3 text-sm font-light leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, sint impedit possimus itaque facere placeat debitis. 
                        Totam nostrum aspernatur enim corporis alias, deserunt et quas aut error maxime ad pariatur.
                        Voluptas accusamus molestias cum aperiam blanditiis. Harum eos, reprehenderit sequi quas suscipit repudiandae sunt blanditiis 
                        corrupti ut magni praesentium nemo omnis accusamus ex dolores. Eaque rem non eveniet provident. Non. Eaque rem non eveniet provident. Non.
                    </p>
                    <div class="mt-6 text-sm font-semibold">What date would you like to have this</div>
                    <div class="flex items-center mt-3 space-x-5 text-sm font-light ">
                        <div >
                            <input type="radio" value="Tues, Nov 9th 2020" id="first_date" class="mr-3 focus-within:ring-0"  v-model="massage"><label for="first_date">Tues, Nov 9th 2020 </label>
                        </div>
                        <div>
                            <input type="radio" value="Wed, Nov 10th 2020" id="second_date" class="mr-3 focus-within:ring-0" v-model="massage"><label for="second_date">Wed, Nov 10th 2020 </label>
                        </div>
                    </div>
                    <div v-if="massage">
                        <div class="mt-6 text-sm font-semibold">{{massage}} At what time?</div>
                        <div class="grid grid-cols-2 gap-4 mt-3 text-sm font-light ">
                        <div >
                            <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0"  ><label for="first_date">10am - 12pm </label>
                        </div>
                        <div>
                            <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0" ><label for="second_date">12pm - 2pm</label>
                        </div>
                        <div >
                            <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0"  ><label for="first_date">2pm - 4pm</label>
                        </div>
                        <div>
                            <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0" ><label for="second_date">4pm - 6pm</label>
                        </div>
                    </div>
                    </div>
                    <div class="w-1/3 mx-auto mt-8" >
                        <MainButton @click="gotoNext('quad_bikes')">Next</MainButton>
                    </div>
                </div>
            </div>
            <div class="flex w-full" v-if="extras == 'quad_bikes'" v-show="showExtras">
                <div class="w-1/2 ">
                    <img src="https://pbs.twimg.com/media/EktQi59WMAM99gg.jpg" alt="" class="object-cover object-center w-full h-full">
                </div>
                <div class="w-1/2 p-6">
                    <div class="font-semibold">Quad Bikes</div>
                    <p class="mt-3 text-sm font-light leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, sint impedit possimus itaque facere placeat debitis. 
                        Totam nostrum aspernatur enim corporis alias, deserunt et quas aut error maxime ad pariatur.
                        Voluptas accusamus molestias cum aperiam blanditiis. Harum eos, reprehenderit sequi quas suscipit repudiandae sunt blanditiis 
                        corrupti ut magni praesentium nemo omnis accusamus ex dolores. Eaque rem non eveniet provident. Non. Eaque rem non eveniet provident. Non.
                    </p>
                    <div class="mt-6 text-sm font-semibold">What date would you like to have this</div>
                    <div class="flex items-center mt-3 space-x-5 text-sm font-light ">
                        <div >
                            <input type="radio" value="Tues, Nov 9th 2020" id="first_date" class="mr-3 focus-within:ring-0"  v-model="quad_bikes"><label for="first_date">Tues, Nov 9th 2020 </label>
                        </div>
                        <div>
                            <input type="radio" value="Wed, Nov 10th 2020" id="second_date" class="mr-3 focus-within:ring-0" v-model="quad_bikes"><label for="second_date">Wed, Nov 10th 2020 </label>
                        </div>
                    </div>
                    <div v-if="quad_bikes">
                        <div class="mt-6 text-sm font-semibold">{{quad_bikes}} At what time?</div>
                        <div class="mt-3 space-y-3 text-sm font-light ">
                            <div >
                                <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0" ><label for="first_date">Half day (12pm - 4pm) #25,000</label>
                            </div>
                            <div>
                                <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0"><label for="second_date">Half day (4pm - 8pm) #25,000</label>
                            </div>
                            <div >
                                <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0" ><label for="first_date">Full day #50,000</label>
                            </div>
                        </div>
                    </div>
                    <div class="w-1/3 mx-auto mt-8" >
                        <MainButton @click="gotoNext('photoshoot')">Next</MainButton>
                    </div>
                </div>
            </div>
        </ExtrasLayout>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            lookout_experience: '',
            massage: '',
            quad_bikes: '',
            extras: 'lookout',
            showExtras: false,
           
        }
    },
    methods: {
        gotoNext(value) { 
            this.extras = value;
            this.showExtras = true;
        }
    }
};
</script>
