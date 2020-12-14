<template>
    <div class="flex w-full">
        <div class="relative w-6/12 ">
            <img src="@/assets/images/specials/drinks.png" alt="" class="object-cover object-center w-full h-full">
            <NavSpecials :color="'bg-green-700'" :index="5" @next="$emit('next')" @prev="$emit('prev')"   />
        </div>
        <div class="w-7/12 p-6">
            <div class="font-semibold">Premium Drink Collection</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                We have curated a small, but memorable range of champagnes, wines and spirits - 
                available to be purchased during your stay via POS or bank transfer (JARA is a completely cashless resort). 
                Items can also be  pre-ordered at the time of booking. 
                The following items represent some of the items currently available to buy. 
                We can source any bottle found in Nigeria, so if it's not listed, please do not hesitate to let us know what you'd like us to prepare for you. 
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
                <div class="mt-6 font-semibold">Select Wine or Champagne or Spirit</div>
                <div class="flex flex-wrap items-center justify-between w-full mt-3">
                    <div class="flex items-center mb-3 space-x-3 font-light" v-for="drink in drinks" :key="drink.id">
                        <div class="flex items-center pl-2 border rounded-md focus-within:ring">
                            <svg 
                                class="w-5 h-5" fill="none" viewBox="0 0 15 15" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.625 14.5312h3.75M7.5 14.5312v-3.75M8.96444 10.3375a2.6397 2.6397 0 01-1.465.4439 2.63968 2.63968 0 01-1.465-.4439 2.64065 2.64065 0 01-1.16-2.50625L5.58131.89a.46936.46936 0 01.46688-.42125h2.9025A.46935.46935 0 019.41756.89l.70684 6.94125a2.64088 2.64088 0 01-.22621 1.41686 2.6407 2.6407 0 01-.93375 1.08939v0zM5.24316 4.21875h4.5125" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.79688 5.625a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865M6.79688 8.4375a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865M8.20313 7.03125a.23443.23443 0 01.21653.14468.23442.23442 0 01-.05081.25542.2344.2344 0 01-.25542.05081.2344.2344 0 01-.14468-.21653.23433.23433 0 01.06865-.16573.23433.23433 0 01.16573-.06865" 
                                    stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <select v-model="drink.drinkType" class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                <option value="brut">Brut Champagne</option>
                                <option value="red_wine">Premium Red Wine</option>
                            </select>
                        </div>
                        <div class="flex items-center pl-2 border rounded-md focus-within:ring">
                            <select v-model="drink.drinkQty" class="text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                <option value="0">Qty</option>
                                <option v-for="num in 8" :value="num" :key="num">
                                    {{ num }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center justify-end mb-3 text-xs cursor-pointer text-brand-blue hover:text-brand-blue-300">
                        <svg 
                            class="w-4 h-4" fill="none" 
                            stroke="currentColor" viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <div @click="addDrinks">Add drink</div>
                    </div>
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
            drinks: [
                {
                    drinkType: 'brut',
                    drinkQty: 0,
                }
            ]
        }
    },
    methods: {
        addDrinks() {
            this.drinks.push({
                drinkType: 'brut',
                drinkQty: 0
            })
        }
    }
}
</script>
