<template>
    <div class="px-6">
        <h1 class="mb-6 text-xl font-bold text-center md:text-2xl">Select an Extra experience to improve your stay!</h1>
        <!-- <pre>{{selected}}</pre> -->
        <div class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-3 md:flex-row">
            <div class="w-full md:w-9/12">
                <div class="overflow-hidden bg-white border rounded-lg shadow-lg">
                    <ExtrasLayout :currentSpecial="special" />
                </div>
            </div>
            <div class="flex-shrink-0 w-full md:w-3/12">
                <ReservationBox />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            special: "lookout",
        };
    },
    computed: {
        selected() {
            return this.$store.getters["extras/allSelected"];
        },
    },
    mounted() {
        const special = this.$route.params.special;

        if (special) {
            this.special = special;
        }
    },
    middleware({ store, redirect, $toast }) {
        if (!store.state.availability_done) {
            $toast.info("Please provide availability first");
            redirect("/availability");
        }
    },
};
</script>
