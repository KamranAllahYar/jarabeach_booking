<template>
    <div >
        <div class="flex w-full" v-show="!showMenu">
            <div class="relative w-6/12">
                <img src="@/assets/images/specials/lookout.png" alt="" class="object-cover object-center w-full h-full">
                <NavSpecials :color="'bg-green-400'" @next="emitNext()" />
            </div>
            <div class="w-7/12 p-6">
                <div class="font-semibold">The Lookout Experience</div>
                <p class="mt-3 font-light leading-relaxed text-gray-600">
                    The Lookout provides an experience like no other in the city. Pre-booked exclusively,
                    the lookout is only open for three sessions a day as well as for massages.
                    The lookout is available for up to four people maximum. A speaker is included so you can connect your own playlist,
                    or listen to Jara's own - curated to suit the sweet and soothing sound of the waves lapping against the beach.
                    The perfect location for that extra-special romantic occasion. We will be happy to organise extras like flowers or cake for you at an additional cost.

                </p>
                <div class="mt-6 font-semibold">What date would you like to have this</div>
                <div class="flex items-center mt-3 space-x-5 font-light ">
                    <div>
                        <input type="radio" name="lookout" id="first_date" class="mr-3 focus-within:ring-0 border-brand-blue">
                        <label for="first_date">Tues, Nov 9th 2020 </label>
                    </div>
                    <div>
                        <input type="radio" name="lookout" id="second_date" class="mr-3 focus-within:ring-0 border-brand-blue">
                        <label for="second_date">Wed, Nov 10th 2020 </label>
                    </div>
                </div>
                <div class="w-1/3 mx-auto mt-8">
                    <MainButton @click="showMenu = true">Next</MainButton>
                </div>
            </div>
        </div>
        <SpecialLookoutMeal v-if="showMenu" @close="showMenu = false" @next="emitNext()"  />
    </div>
</template>
<script>
export default {
    data() {
        return {
            showMenu: false,
        }
    },
    computed: {
        getSpecials() {
            return this.$store.getters.getSpecials;
        },
    },
    methods: {
        emitNext(){
            this.showMenu = false;
            this.$emit('next');
        }
    }
}
</script>
