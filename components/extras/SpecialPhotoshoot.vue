<template>
    <div class="flex flex-col w-full md:flex-row">
        <div class="relative w-full md:w-6/12 h-60 md:h-auto">
            <img src="@/assets/images/specials/photoshoot.png" alt="" class="object-cover object-center w-full h-full">
        </div>
        <div class="flex flex-col w-full p-6 md:w-7/12">
            <div class="font-semibold">Photoshoot</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                Jara has an abundance of beautiful areas perfect for personal photoshoots. Whether
                pre-wedding, anniversary or birthday, an external photographer can access Jara Beach
                Resort for two hours and receive a soft drink - for ₦20,000. Access for assistants/
                make up artists is charged ₦15,000 each thereafter. Commercial photoshoot enquiries
                are handled directly by our bookings department - more details here:
                <a target="_blank" class="text-brand-blue-500" href="https://www.jarabeachresort.com/photo-shoots">https://www.jarabeachresort.com/photo-shoots</a>
                <!--
                A photographer can access Jara Beach Resort for a maximum of four hours. Includes no food or drink.
                Assistants/ make up artists charged N15,000 each thereafter.
                Max two shoots at any given time outdoor venue - 4 hours. Photographer Only <span class="font-bold">- {{ currency(price) }}</span> -->
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this?</div>

            <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400 border-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>

            <div>
                <div class="mt-6 font-semibold">Select number of assistants/make up artists</div>
                <div class="grid w-full grid-cols-3 mt-3 gap-x-3 gap-y-3">
                    <div class="flex items-center pl-2 border rounded-md focus-within:ring">
                        <svg
                            class="w-5 h-5" fill="none" viewBox="0 0 15 15"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 7.96875c1.81218 0 3.2812-1.46907 3.2812-3.28125S9.31218 1.40625 7.5 1.40625c-1.81218 0-3.28125 1.46907-3.28125 3.28125S5.68782 7.96875 7.5 7.96875zM1.40625 14.5312c0-1.6161.64202-3.1661 1.78482-4.3089C4.33387 9.07952 5.88384 8.4375 7.5 8.4375c1.61616 0 3.1661.64202 4.3089 1.7848 1.1428 1.1428 1.7848 2.6928 1.7849 4.3089"
                                stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <select v-model="noOfArtists"
                            class="w-full border-0 rounded-md outline-none focus:outline-none"
                            style="box-shadow: none">
                            <option value="0">0</option>
                            <option v-for="num in 4" :value="num" :key="num">
                                {{ num }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="flex-1"></div>

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
            noOfArtists: 0,
            noDates: [],
        };
    },
    computed: {
        bookingDates() {
            return this.$store.getters.bookingDates;
        },
        dates() {
            return this.bookingDates.filter((date) => {
                return !this.noDates.includes(date);
            });
        },
        price() {
            let photographerPrice = 50000;

            const prices = this.$store.state.extras.photoshootPrices;
            let p = prices.find(
                (_p) => _p.name.toLowerCase() == "photographer"
            );
            if (p) {
                photographerPrice = +p.price;
            }

            return photographerPrice;
        },
    },
    methods: {
        next() {
            this.$store.commit("extras/SET_SELECTED_PHOTOSHOOT", {
                num: this.noOfArtists,
                date: this.selectedDate,
            });
            this.$emit("next");
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_PHOTOSHOOT", {
                num: this.noOfArtists,
                date: this.selectedDate,
            });
            this.$emit("prev");
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        async getNoPhotoshootDates() {
            await this.$axios
                .get("/extra-no-dates?extra=photoshoot")
                .then((res) => {
                    const noDates = res.data.data;

                    this.noDates = noDates;

                    console.log(noDates);
                });
        },
    },
    async created() {
        await this.getNoPhotoshootDates();
    },
    mounted() {
        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.selectedPhotoshoot) {
            this.noOfArtists = this.$store.state.extras.selectedPhotoshoot;
        }
        if (this.$store.state.extras.datePhotoshoot) {
            this.selectedDate = this.$store.state.extras.datePhotoshoot;
        }
    },
};
</script>
