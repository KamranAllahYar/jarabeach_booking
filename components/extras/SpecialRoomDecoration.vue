<template>
    <div class="flex w-full">
        <div class="w-6/12 ">
            <img src="@/assets/images/specials/decoration.png" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Room Decoration</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, sint impedit possimus itaque facere placeat debitis.
                Totam nostrum aspernatur enim corporis alias, deserunt et quas aut error maxime ad pariatur.
                Voluptas accusamus molestias cum aperiam blanditiis. Harum eos, reprehenderit sequi quas suscipit repudiandae sunt blanditiis
                corrupti ut magni praesentium nemo omnis accusamus ex dolores. Eaque rem non eveniet provident. Non. Eaque rem non eveniet provident. Non.
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
            <div class="space-y-4">
                <div class="mt-6 font-semibold">Select Room Decoration</div>
                <div>
                    <input type="checkbox" name="welcome_note" id="welcome" class="mr-3 border border-brand-blue rounded">
                    <label for="welcome">Welcome note - <span class="font-bold uppercase">free</span></label>
                </div>
                <div>
                    <input type="checkbox" name="welcome_note" id="welcome" class="mr-3 border border-brand-blue rounded">
                    <label for="welcome">Flower Petals - <span class="font-bold uppercase">free</span></label>
                </div>
                <div>
                    <input type="checkbox" name="welcome_note" id="welcome" class="mr-3 border border-brand-blue rounded">
                    <label for="welcome">Helium Ballon - <span class="font-bold uppercase">N25,000</span></label>
                </div>
            </div>
            <div class="w-1/3 mx-auto mt-8">
                <MainButton @click="$emit('next')">Next</MainButton>
            </div>
        </div>
    </div>
</template>
