<template>
    <div class="flex min-h-screen bg-white">
        <main class="flex-1 w-full pb-48 overflow-auto beach">
            <div class="my-10 text-center">
                <img src="~/assets/logo_big.jpg" class="w-32 mx-auto md:w-40" />
            </div>

            <TopProgressBar />

            <div class="p-6 mx-auto mt-12 max-w-7xl">
                <h1 class="mb-6 text-xl font-bold text-center md:text-2xl">Here you can book in any extra special experiences!</h1>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                    <div v-for="(extra, i) in specials" :key="i"
                        class="w-full overflow-hidden transition-all transform border rounded-lg"
                        :class="!extra.available ? 'opacity-25' : 'cursor-pointer shadow-md hover:scale-105'"
                        @click="selectSpecial(extra)">
                        <div class="flex items-center justify-between px-3 py-4">
                            <div class="text-sm font-semibold capitalize">{{extra.name}}</div>
                            <div v-if="isSelectedSpecial(extra)">
                                <svg
                                    width="20" height="20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 .25C4.62391.25.25 4.62391.25 10c0 5.3761 4.37391 9.75 9.75 9.75 5.3761 0 9.75-4.3739 9.75-9.75 0-5.37609-4.3739-9.75-9.75-9.75zm5.0742 6.48234L8.77422 14.2323a.74795.74795 0 01-.25215.195.74963.74963 0 01-.31035.0727h-.01266a.74941.74941 0 01-.30508-.065.75065.75065 0 01-.25226-.1834l-2.7-3a.75129.75129 0 01-.15689-.2521.75025.75025 0 01.02387-.5816.74979.74979 0 01.17702-.2383.74958.74958 0 01.25564-.151.74947.74947 0 01.2942-.03999.75025.75025 0 01.28666.07729.75179.75179 0 01.23419.1825l2.12297 2.3588 5.74642-6.83954a.74986.74986 0 01.5077-.257.74973.74973 0 01.5419.17336.74993.74993 0 01.2643.50391.74964.74964 0 01-.1655.54441z" fill="#5ACBC9" />
                                </svg>
                            </div>
                        </div>
                        <div class="relative w-full h-48 overflow-hidden">
                            <img :src="require(`@/assets/images/thumbnails/${extra.type}.png`)" class="absolute object-cover object-center w-full h-full bg-cover" alt="">
                            <div class="absolute bottom-0 z-20 px-5 pb-3 font-semibold text-white">From N{{ extra.range }}</div>
                            <div class="relative z-10 h-full bg-black bg-opacity-25"></div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center w-full mx-auto mt-8 space-x-2 md:w-1/2" v-if="selected.length > 0">
                    <MainButton @click="gotoBack()" outline>Back</MainButton>
                    <MainButton @click="gotoNext()">Next</MainButton>
                </div>
                <div v-else class="flex items-center w-full mx-auto mt-8 space-x-2 md:w-1/2">
                    <MainButton @click="gotoBack()" outline>Back</MainButton>
                    <MainButton @click="skip()">Skip</MainButton>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    computed: {
        specials() {
            return this.$store.getters["extras/allSpecials"];
        },
        selected() {
            return this.$store.getters["extras/allSelected"];
        },
        dates() {
            return this.$store.getters.bookedRooms.map((room) => room.date);
        },
    },
    methods: {
        gotoBack() {
            this.$store.commit("extras/RESET_INDEX");
            this.$router.push({ path: "/availability" });
        },
        gotoNext() {
            this.$store.commit("extras/RESET_INDEX");

            const name = this.selected[0];
            this.$router.push({ path: "/extras/" + name.type });
        },
        skip() {
            this.$router.push({ path: "/profile" });
        },
        isSelectedSpecial(sp) {
            return this.selected.some((s) => s.type == sp.type);
        },
        selectSpecial(sp) {
            console.log(sp);
            if (!sp.available) {
                this.$toast.info(
                    sp.name + " is not available for the dates you selected"
                );
                return;
            }

            if (this.isSelectedSpecial(sp)) {
                this.$store.commit("extras/REMOVE_SELECTED", sp);
            } else {
                this.$store.commit("extras/ADD_SELECTED", sp);
            }
        },
    },
    mounted() {
        this.$store.dispatch("extras/updateSpecials", this.dates);
        this.$store.dispatch("extras/getSpecialDrinks");
        this.$store.dispatch("extras/getSpecialCakes");
        this.$store.dispatch("extras/getSpecialDecorations");
        this.$store.dispatch("extras/getLookoutOptions");
        this.$store.dispatch("extras/getSpecialMassages");
        this.$store.dispatch("extras/getQuadbikeOptions");
        this.$store.dispatch("extras/getMostPrices");
    },
    middleware({ store, redirect, $toast }) {
        if (!store.state.availability_done) {
            $toast.info("Please provide availability first");
            redirect("/availability");
        }
    },
};
</script>
