<template>
    <div class="flex min-h-screen bg-white">
        <main class="flex-1 w-full pb-48 overflow-auto beach">
            <div class="my-10 text-center">
                <img src="~/assets/logo.png" class="w-40 mx-auto" />
            </div>

            <TopProgressBar />

            <div class="p-6 mx-auto mt-12 max-w-7xl">
                <h1 class="mb-6 text-2xl text-center">Select an Extra experience to improve your stay!</h1>

                <div class="grid grid-cols-4 gap-6">
                    <div class="w-full border rounded cursor-pointer" v-for="name in specials" :key="name" @click="gotoNext(name)">
                        <div class="px-3 py-3 font-bold capitalize">{{name}}</div>
                        <div class="relative w-full h-48 overflow-hidden">
                            <img :src="require(`@/assets/images/thumbnails/${name}.png`)" class="absolute object-cover object-center w-full h-full bg-cover" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    // layout: "booking",
    data() {
        return {
            specials: [
                "lookout",
                "massage",
                "quadbikes",
                "photoshoot",
                "drinks",
                "cake",
                "roomDecoration",
                "domesticStaff",
            ],
        };
    },
    methods: {
        gotoNext(name) {
            this.$router.push({ path: "/extras/" + name });
        },
    },
};
</script>
