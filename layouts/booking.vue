<template>
    <div class="flex min-h-screen bg-white">
        <main class="flex-1 w-full pt-20 pb-48 overflow-auto beach">
            <UpdateBookingBanner v-if="$store.state.editMode" />
            <Navbar />

            <div class="py-10 text-center">
                <img src="~/assets/logo_big.jpg" class="w-32 mx-auto md:w-40" />
            </div>

            <TopProgressBar />

            <div class="relative z-20 pt-10 pb-6 mx-auto max-w-7xl">
                <Nuxt keep-alive />
            </div>

            <div class="fixed bottom-0 z-10 w-full pointer-events-none h-80 bottom-beach"></div>
        </main>

        <div v-if="$store.state.fullPageLoader" class="fixed inset-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-white">
            <Logo class="w-96" />
            <div class="mt-12">
              Loading Booking Editor...
            </div>
            <svg class="w-12 h-12 mt-2 text-brand-blue animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    </div>

</template>

<script>
import TopProgressBar from "@/components/global/TopProgressBar";
export default {
    middleware: ["clear"],
    components: {
        TopProgressBar,
    },
    created() {
        console.log("Initial loadings");
        this.$store.dispatch("loadRooms");
        this.$store.dispatch("loadPolicies");
        this.$store.dispatch("loadNoDiscountDates");

        this.$store.dispatch("extras/getSpecialDrinks");
        this.$store.dispatch("extras/getSpecialCakes");
        this.$store.dispatch("extras/getSpecialDecorations");
        this.$store.dispatch("extras/getLookoutOptions");
        this.$store.dispatch("extras/getSpecialMassages");
        this.$store.dispatch("extras/getSpecialBikes");
        this.$store.dispatch("extras/getSpecialNewmassages");
        this.$store.dispatch("extras/getQuadbikeOptions");
        this.$store.dispatch("extras/getMostPrices");
    },
};
</script>

<style>
@keyframes animatedBackground {
    from {
        background-position: 0 0;
    }
    50% {
        background-position: 200% 0;
    }
    to {
        background-position: 0 0;
    }
}

/* .beach {
    background: url("~assets/beach_top.svg");
    background-repeat: no-repeat;
    background-position: 0px 0px;
    background-repeat: repeat-x;
    animation: animatedBackground 60s linear infinite;
} */
.bottom-beach {
    background: url("~assets/beach_bottom.jpg");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: cover;
    z-index: 0;
}
</style>
