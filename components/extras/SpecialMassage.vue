<template>
    <div class="flex w-full">
        <div class="relative w-6/12 ">
            <img src="@/assets/images/specials/massage.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials :color="bg-yellow-900" :index="2" @next="$emit('next')" @prev="$emit('prev')" />
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Massage</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                A soothing massage at Jara Beach Resort – picture yourself lying in the shade of a coconut palm that sways gently in the breeze, 
                or shaded by Jara's exclusive Lookout, your cares being eased away by one of our expert masseuses.
            </p>
            <p class="mt-2 font-light leading-relaxed text-gray-600">
                No matter the occasion, make it even more memorable with a romantic couples massage. 
                Romantic Outdoor Massage (one masseuse): 2 Hours (minimum) <span class="font-bold"> = N30,000</span>
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>
            <div class="flex items-center mt-2 space-x-5 font-light ">
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
                <div class="mt-6 font-semibold">At what time?</div>
                <div class="grid grid-cols-2 gap-3 mt-2 font-light ">
                    <div>
                        <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0 border-brand-blue"><label for="first_date">10am - 12pm </label>
                    </div>
                    <div>
                        <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0 border-brand-blue"><label for="second_date">12pm - 2pm</label>
                    </div>
                    <div>
                        <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0 border-brand-blue"><label for="first_date">2pm - 4pm</label>
                    </div>
                    <div>
                        <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0 border-brand-blue"><label for="second_date">4pm - 6pm</label>
                    </div>
                </div>
            </div>
            <div class="w-1/3 mx-auto mt-8">
                <MainButton @click="$emit('next')">Next</MainButton>
            </div>
        </div>
    </div>
</template>
