<template>
    <div class="flex min-h-screen bg-white">
        <main class="flex-1 w-full pb-48 overflow-auto beach">
            <div class="my-10 text-center">
                <img src="~/assets/logo.png" class="w-40 mx-auto" />
            </div>

            <TopProgressBar />

            <div class="p-6 mx-auto mt-12 max-w-7xl">
                <h1 class="mb-6 text-2xl text-center">Here are some extra options to improve your stay!</h1>

                <div class="grid grid-cols-4 gap-6">
                    <div class="w-full border rounded shadow-lg cursor-pointer" v-for="name in specials" :key="name" @click="getSelectedSpecials(name)">
                        <div class="flex items-center justify-between p-3">
                            <div class="font-medium capitalize">{{name}}</div>
                            <div v-if="selected">
                                <svg 
                                    width="20" height="20" fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 .25C4.62391.25.25 4.62391.25 10c0 5.3761 4.37391 9.75 9.75 9.75 5.3761 0 9.75-4.3739 9.75-9.75 0-5.37609-4.3739-9.75-9.75-9.75zm5.0742 6.48234L8.77422 14.2323a.74795.74795 0 01-.25215.195.74963.74963 0 01-.31035.0727h-.01266a.74941.74941 0 01-.30508-.065.75065.75065 0 01-.25226-.1834l-2.7-3a.75129.75129 0 01-.15689-.2521.75025.75025 0 01.02387-.5816.74979.74979 0 01.17702-.2383.74958.74958 0 01.25564-.151.74947.74947 0 01.2942-.03999.75025.75025 0 01.28666.07729.75179.75179 0 01.23419.1825l2.12297 2.3588 5.74642-6.83954a.74986.74986 0 01.5077-.257.74973.74973 0 01.5419.17336.74993.74993 0 01.2643.50391.74964.74964 0 01-.1655.54441z" fill="#5ACBC9"/>
                                </svg>
                            </div>
                        </div>
                        <div class="relative w-full h-48 overflow-hidden">
                            <img :src="require(`@/assets/images/thumbnails/${name}.png`)" class="absolute object-cover object-center w-full h-full bg-cover" alt="">
                            <div class="absolute bottom-0 px-5 pb-3 font-semibold text-white">From N50,000</div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center w-1/2 mx-auto mt-8 space-x-5">
                    <MainButton outline @click="goBack">Back</MainButton>
                    <MainButton @click="gotoNext()">Next</MainButton>
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
            selected: false
        };
    },
    methods: {
        // gotoNext(name) {
        //     this.$router.push({ path: "/extras/" + name });
        // },
        goBack() {
            this.$router.push({ path: "/availability"});
        },
        getSelectedSpecials(index) {
            this.selected = !this.selected;
        }
    },
};
</script>
