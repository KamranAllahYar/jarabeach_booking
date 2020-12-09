<template>
    <div>
        <h1 class="mb-6 text-2xl text-center">Select an Extra experience to improve your stay!</h1>
        <div class="flex justify-center space-x-3">
            <div class="grid w-full grid-cols-4 gap-x-4 gap-y-4">
                <div class="flex items-center justify-center h-64 bg-red-200 cursor-pointer" v-for="name in specials" :key="name" @click="gotoNext(name)">
                    {{ name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
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
