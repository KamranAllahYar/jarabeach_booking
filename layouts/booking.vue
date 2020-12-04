<template>
    <div class="flex min-h-screen bg-brand-yellow">
        <main class="flex-1 w-full pb-48 overflow-auto beach">
            <div class="my-10 text-center">
                <img src="~/assets/logo.png" class="w-40 mx-auto" />
            </div>

            <SideBar />

            <Nuxt />
        </main>
    </div>
</template>

<script>
import SideBar from "@/components/global/SideBar";
export default {
    components: {
        SideBar,
    },
    created() {
        console.log("Initial loadings");
        this.$store.dispatch("loadRooms");
    },
};
</script>

<style>
.beach {
    background: url("~assets/beach_bottom.svg"), url("~assets/beach_top.svg");
    background-repeat: no-repeat, no-repeat;
    background-position: center bottom, center top;
    background-size: contain, contain;
}
</style>
