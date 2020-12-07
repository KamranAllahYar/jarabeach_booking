<template>
    <div class="flex w-full">
        <div class="w-6/12 ">
            <img src="@/assets/images/specials/lookout.png" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">The Lookout Experience</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, sint impedit possimus itaque facere placeat debitis.
                Totam nostrum aspernatur enim corporis alias, deserunt et quas aut error maxime ad pariatur.
                Voluptas accusamus molestias cum aperiam blanditiis. Harum eos, reprehenderit sequi quas suscipit repudiandae sunt blanditiis
                corrupti ut magni praesentium nemo omnis accusamus ex dolores. Eaque rem non eveniet provident. Non. Eaque rem non eveniet provident. Non.
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>
            <div class="flex items-center mt-3 space-x-5 font-light ">
                <div>
                    <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0">
                    <label for="first_date">Tues, Nov 9th 2020 </label>
                </div>
                <div>
                    <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0">
                    <label for="second_date">Wed, Nov 10th 2020 </label>
                </div>
            </div>
            <div class="w-1/3 mx-auto mt-8">
                <MainButton @click="$emit('next')">Next</MainButton>
            </div>
        </div>
    </div>
</template>
