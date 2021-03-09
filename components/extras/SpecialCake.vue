<template>
    <div class="flex flex-col w-full md:flex-row">
        <div class="relative w-full md:w-6/12 h-60 md:h-auto">
            <img src="@/assets/images/specials/cake.png" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="w-full p-6 md:w-7/12">
            <div class="font-semibold">Cakes</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Make your visit extra-special with a celebration cake. You can specify type, layer, number, color and flavour of cake and we will get it done for you.
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this</div>

            <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>

            <div>
                <div class="mt-6 font-semibold">Create your cake</div>
                <div class="mt-3 font-light">
                    <div class="flex flex-col items-center w-full my-5 space-y-4 md:space-y-0 md:flex-row md:space-x-5">
                        <div class="flex items-center w-full pl-2 border rounded-md md:w-1/3 focus-within:ring">
                            <svg class="w-5 h-5" viewBox="0 0 15 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M.92 14.531h13.125M12.17 6.094H2.795a.937.937 0 00-.938.937v4.688c0 .518.42.937.938.937h9.375c.518 0 .937-.42.937-.937V7.03a.937.937 0 00-.937-.937zM7.482 4.688v1.406M8.42 1.875a.937.937 0 11-1.875 0c0-.518.937-1.406.937-1.406s.938.888.938 1.406zM11.232 4.688v1.406M12.17 1.875a.937.937 0 11-1.875 0c0-.518.937-1.406.937-1.406s.938.888.938 1.406zM3.732 4.688v1.406M4.67 1.875a.937.937 0 11-1.875 0c0-.518.937-1.406.937-1.406s.938.888.938 1.406z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1.857 8.203A1.639 1.639 0 004.67 9.35a1.631 1.631 0 002.578-.313 1.628 1.628 0 002.812 0 1.637 1.637 0 003.047-.833" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <select class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.type">
                                <option value="">Size</option>
                                <option value="6inch">6 inches</option>
                                <option value="8inch">8 inches</option>
                                <!-- <option value="cupcakes">Cupcakes</option> -->
                            </select>
                        </div>
                        <!-- <div class="flex items-center w-full pl-2 border rounded-md md:w-1/3 focus-within:ring" v-if="cake.type != 'cupcakes'">
                            <select class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.layers">
                                <option :value="0">Layers</option>
                                <option v-for="num in 2" :value="num" :key="num">
                                    {{ num }}
                                </option>
                            </select>
                        </div> -->
                        <div class="flex items-center w-full pl-2 border rounded-md md:w-1/3 focus-within:ring">
                            <select class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.quantity">
                                <option :value="0">Quantity</option>
                                <option v-for="num in quantityOption" :value="num" :key="num">
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
                            <select class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.flavour">
                                <option value="">Flavour</option>
                                <option value="Vanilla">Vanilla</option>
                                <option value="Chocolate">Chocolate</option>
                                <option value="Red Velvet">Red Velvet</option>
                                <option value="Lemon">Lemon</option>
                                <option value="Coconut">Coconut</option>
                                <option value="Fruit Cake">Fruit Cake</option>
                            </select>
                        </div>
                        <div class="flex items-center w-1/2 pl-2 border rounded-md focus-within:ring">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 15 15"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0144 9.76502c.1875 2.40998 3.7588.74998 3.4763 1.58748-1.5781 4.6756-7.90501 3.5531-10.60376.7281-1.25186-1.276-1.952-2.99299-1.94943-4.78058.00257-1.78759.70765-3.50254 1.96318-4.775 2.6425-2.6425 7.12001-2.83437 9.55501-.01375 4.77 5.525-2.60626 5.10313-2.4413 7.25375z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.49297 9.26816c.52467 0 .95-.42533.95-.95s-.42533-.95-.95-.95-.95.42533-.95.95.42533.95.95.95zM6.84453 12.2896c.52467 0 .95-.4253.95-.95 0-.5246-.42533-.95-.95-.95s-.95.4254-.95.95c0 .5247.42533.95.95.95zM9.11602 4.64512c.52467 0 .94998-.42533.94998-.95s-.42531-.95-.94998-.95-.95.42533-.95.95.42533.95.95.95zM5.08867 5.65293c.52467 0 .95-.42533.95-.95s-.42533-.95-.95-.95-.95.42533-.95.95.42533.95.95.95z"
                                    stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <select class="w-full text-sm border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none" v-model="cake.toppings">
                                <option value="">Toppings</option>
                                <option value="Coconut">Coconut</option>
                                <option value="Berries">Berries</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Chocolates">Chocolates</option>
                                <option value="Candies">Candies</option>
                                <option value="Cookies">Cookies</option>
                            </select>
                        </div>
                    </div>
                    <textarea name="message" id="cake_msg" rows="1" maxlength="20" class="w-full border-gray-200 rounded focus:ring focus:ring-brand-blue-300 focus:border-0" placeholder="Message on the cake. Max 20 characters" v-model="cake.message"></textarea>
                </div>
            </div>
            <div class="flex w-full mx-auto mt-8 space-x-2 md:w-2/3">
                <MainButton outline @click="prev()">Back</MainButton>
                <MainButton @click="next()">Next</MainButton>
            </div>
        </div>
    </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default {
    data() {
        return {
            selectedDate: null,
            cake: {
                type: "",
                layers: 0,
                quantity: 0,
                flavour: "",
                toppings: "",
                message: "",
            },
        };
    },
    watch: {
        "cake.type"(newVal, oldVal) {
            console.log("new: " + newVal + " - old: " + oldVal);
            if (newVal == "cupcakes" && oldVal != "cupcakes") {
                this.cake.quantity = 0;
                return;
            }

            if (
                (newVal == "large" || newVal == "small") &&
                oldVal == "cupcakes"
            ) {
                this.cake.quantity = 0;
            }
        },
    },
    computed: {
        dates() {
            return this.$store.getters.bookingDates;
        },
        quantityOption() {
            if (this.cake.type == "cupcakes") {
                return [6, 12];
            }

            return [1, 2];
        },
    },
    methods: {
        showMessage(name) {
            this.$toast.error(`The ${name} field is required`);
        },
        next() {
            if (!this.cake.type) {
                this.showMessage("size");
                return;
            }
            if (!this.cake.quantity) {
                this.showMessage("quantity");
                return;
            }
            if (!this.cake.flavour) {
                this.showMessage("flavour");
                return;
            }

            this.$store.commit("extras/SET_SELECTED_CAKE", {
                cake: this.cake,
                date: this.selectedDate,
            });
            this.$emit("next");
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_CAKE", {
                cake: this.cake,
                date: this.selectedDate,
            });
            this.$emit("prev");
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
    },
    mounted() {
        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.selectedCake.type) {
            this.cake = Object.assign(
                {},
                this.$store.state.extras.selectedCake
            );
        }
        if (this.$store.state.extras.dateCake) {
            this.selectedDate = this.$store.state.extras.dateCake;
        }
    },
};
</script>
