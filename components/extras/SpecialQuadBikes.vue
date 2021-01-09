<template>
    <div class="flex w-full">
        <div class="relative w-6/12 ">
            <img src="@/assets/images/specials/quadbikes.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials color="bg-green-900" :index="3" @next="$emit('next')" @prev="$emit('prev')"   />
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Quad Bikes</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Quad biking - external beach provider (signed disclaimer and pre-booking required).
                There are only 2 quad bikes available so the application will need to take this into consideration when managing availability.
                The guest can also select the number of quad bikes they want (1 or 2)
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
                <div class="mt-4 font-semibold">At what time?</div>
                <div class="mt-2 space-y-3 font-light ">
                    <div>
                        <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0 border-brand-blue"><label for="first_date">Half day (12pm - 4pm) #25,000</label>
                    </div>
                    <div>
                        <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0 border-brand-blue"><label for="second_date">Half day (4pm - 8pm) #25,000</label>
                    </div>
                    <div>
                        <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0 border-brand-blue"><label for="first_date">Full day #50,000</label>
                    </div>
                </div>
            </div>
            <div class="w-1/3 mx-auto mt-8">
                <MainButton @click="$emit('next')">Next</MainButton>
            </div>
        </div>
    </div>
</template>
