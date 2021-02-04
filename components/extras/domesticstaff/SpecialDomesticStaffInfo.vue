<template>
    <div class="w-full">
        <div class="flex items-center justify-between border-b">
            <div class="w-24 h-20">
                <img src="@/assets/images/specials/domesticStaff.png" alt="" class="object-cover object-center w-full h-full">
            </div>
            <div class="flex-1 ml-3">
                <div class="text-xl font-semibold">Domestic Staff</div>
                <div class="text-xs font-light text-gray-600">Food is available from a separate menu (below) and consumed in their rooms or at the back of the property</div>
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

        <div class="m-6">
            <div class="flex flex-col w-full space-y-6 text-xl md:flex-row md:space-y-0 md:space-x-12">
                <div class="flex items-start w-full" :class="{'opacity-25': !availableStaffRooms.nanny}">
                    <input type="checkbox" v-model="type" value="nanny" id="nanny" :disabled="!availableStaffRooms.nanny" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300 text-brand-blue-400">
                    <label for="nanny" class="font-bold">Nanny
                        <div class="text-base font-light text-gray-600">
                            If not staying in a standard or family room [as a regular guest], Nannies are welcome to sleep in our dedicated staff quarters -
                            bedding and water provided - and partake in all meals and make use of Jara's facilities. A separate food menu is available.
                            Alcohol and the snack station is not included. <span class="font-bold text-black">Cost per night: {{ currency(nannyPrice) }} (inc VAT).</span>
                        </div>
                    </label>
                </div>
                <!-- <div class="flex items-start w-full" :class="{'opacity-25': !availableStaffRooms.driver}">
                    <input type="checkbox" v-model="type" value="driver" id="driver" :disabled="!availableStaffRooms.driver" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300 text-brand-blue-400">
                    <label for="driver" class="font-bold ">Driver
                        <div class="text-base font-light text-gray-600">
                            Drivers requiring accommodation are welcome to sleep in staff quarters (room access from 6pm) - bedding and water provided -
                            and are not expected to remain inside the property between 9am and 6pm. <span class="font-bold text-black">Cost per night: {{ currency(driverPrice) }} (inc TAX).</span>
                        </div>
                    </label>
                </div> -->
            </div>
            <div class="my-8" :class="{'opacity-25': type.length <= 0}">
                <div class="text-xl font-bold text-center">Menu</div>
                <div class="flex flex-col justify-between w-full my-5 space-y-3 md:space-y-0 md:space-x-3 md:flex-row">
                    <div class="w-full">
                        <div class="text-lg font-bold">Breakfast</div>
                        <div class="flex items-start my-1 md:pr-4">
                            <input type="checkbox" value="breakfast" id="breakfast" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300 text-brand-blue-400" v-model="menu">
                            <label for="breakfast" class="text-gray-600">Nigerian Breakfast (Boiled yam & Egg sauce) @ <span class="font-bold text-black">{{ currency(breakfastPrice) }}</span></label>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="ml-4 text-lg font-bold">Lunch</div>
                        <div class="flex items-start my-1 md:px-4 md:border-l md:border-r">
                            <input type="checkbox" value="lunch" id="lunch" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300 text-brand-blue-400" v-model="menu">
                            <label for="lunch" class="text-gray-600">Indomie & Egg (Wednesday’s, Friday’s & Sunday’s) Jollof Rice with Chicken & Beef Skewer @ <span class="font-bold text-black">{{ currency(lunchPrice) }}</span></label>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="text-lg font-bold">Dinner</div>
                        <div class="flex items-start my-1 md:pl-2">
                            <input type="checkbox" value="dinner" id="dinner" class="mt-1 mr-3 border rounded focus:ring-0 border-brand-blue-300 text-brand-blue-400" v-model="menu">
                            <label for="dinner" class="text-gray-600">Nigerian Special @ <span class="font-bold text-black">{{ currency(dinnerPrice) }}</span></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="flex w-full px-3 mx-auto my-8 space-x-2 md:px-0 md:w-2/3">
            <MainButton outline @click="prev()">Back</MainButton>
            <MainButton @click="next()">Next</MainButton>
        </div>
    </div>
</template>
<script>
export default {
    props: ["initial", "availableStaffRooms"],
    data() {
        return {
            type: [],
            menu: [],
        };
    },
    watch: {
        type() {
            const details = {
                type: this.type,
                menu: this.menu,
            };

            this.$emit("details", details);
        },
        menu() {
            const details = {
                type: this.type,
                menu: this.menu,
            };

            this.$emit("details", details);
        },
    },
    computed: {
        prices() {
            return this.$store.state.extras.staffPrices;
        },
        driverPrice() {
            let price = 15000;

            let p = this.prices.find((_p) => _p.name.toLowerCase() == "driver");
            if (p) {
                price = +p.price;
            }

            return price;
        },
        nannyPrice() {
            let price = 30000;

            let p = this.prices.find((_p) => _p.name.toLowerCase() == "nanny");
            if (p) {
                price = +p.price;
            }

            return price;
        },
        breakfastPrice() {
            let price = 3000;

            let p = this.prices.find((_p) => _p.name.toLowerCase() == "breakfast");
            if (p) {
                price = +p.price;
            }

            return price;
        },
        lunchPrice() {
            let price = 4000;

            let p = this.prices.find((_p) => _p.name.toLowerCase() == "lunch");
            if (p) {
                price = +p.price;
            }

            return price;
        },
        dinnerPrice() {
            let price = 5000;

            let p = this.prices.find((_p) => _p.name.toLowerCase() == "dinner");
            if (p) {
                price = +p.price;
            }

            return price;
        },
    },
    methods: {
        next() {
            this.$emit("next");
        },
        prev() {
            this.$emit("prev");
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    mounted() {
        if (this.initial) {
            this.type = this.initial.type;
            this.menu = this.initial.menu;
        }
    },
};
</script>

