<template>
    <div class="flex min-h-screen bg-white">
        <main class="flex-1 w-full pb-48 overflow-auto beach">
            <UpdateBookingBanner v-if="$store.state.editMode" />
            <Navbar />

            <div class="py-16 text-center">
                <!-- <img src="~/assets/logo_big.jpg" class="w-32 mx-auto md:w-40" /> -->
            </div>

            <TopProgressBar />

            <div class="relative z-20 py-6 mx-auto mt-6 md:mt-12 max-w-7xl">
                <Nuxt keep-alive />
            </div>
            <div class="fixed bottom-0 z-10 w-full pointer-events-none h-80 bottom-beach"></div>
        </main>

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

        this.$store.dispatch("extras/getSpecialDrinks");
        this.$store.dispatch("extras/getSpecialCakes");
        this.$store.dispatch("extras/getSpecialDecorations");
        this.$store.dispatch("extras/getLookoutOptions");
        this.$store.dispatch("extras/getSpecialMassages");
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

.beach {
    background: url("~assets/beach_top.svg");
    background-repeat: no-repeat;
    background-position: 0px 0px;
    /* background-size: contain; */
    background-repeat: repeat-x;
    animation: animatedBackground 60s linear infinite;
}
.bottom-beach {
    background: url("~assets/beach_bottom.svg");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
    z-index: 0;
}
</style>
