<template>
    <div>
        <h1 class="mb-6 text-2xl text-center">Select an Extra experience to improve your stay!</h1>
        <!-- <pre>{{selected}}</pre> -->
        <div class="flex justify-center space-x-3">
            <div class="w-9/12 ">
                <div class="overflow-hidden bg-white border rounded-lg shadow-lg">
                    <ExtrasLayout :currentSpecial="special" />
                </div>
            </div>
            <div class="flex-shrink-0 w-3/12">
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
