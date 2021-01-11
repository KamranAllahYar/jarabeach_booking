<template>
    <div class="flex min-h-screen bg-white">
        <main class="flex-1 w-full pb-48 overflow-auto beach">
            <div class="my-10 text-center">
                <img src="~/assets/logo_big.jpg" class="w-40 mx-auto" />
            </div>

            <TopProgressBar />

            <div class="static z-20 p-6 mx-auto mt-12 max-w-7xl">
                <Nuxt keep-alive />
            </div>
            <div class="fixed bottom-0 z-10 w-full pointer-events-none h-80 bottom-beach"></div>
        </main>

    </div>
</template>

<script>
import TopProgressBar from "@/components/global/TopProgressBar";
export default {
    components: {
        TopProgressBar,
    },
    created() {
        console.log("Initial loadings");
        this.$store.dispatch("loadRooms");
        this.$store.dispatch("loadPolicies");
    },
};
</script>

<style>
.beach {
    background: url("~assets/beach_top.svg");
    background-repeat: no-repeat;
    background-position: center top;
    background-size: contain;
}
.bottom-beach {
    background: url("~assets/beach_bottom.svg");
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
    z-index: 0;
}
</style>
