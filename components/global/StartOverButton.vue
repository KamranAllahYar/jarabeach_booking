<template>
    <div>
        <MainButton class="whitespace-nowrap" @click="clearBooking()" outline>Start Over</MainButton>
    </div>
</template>

<script>
export default {
    computed: {
        canClearBooking() {
            return this.$store.state.guests_done;
        },
    },
    methods: {
        clearBooking() {
            if (
                window.confirm(
                    "Are you sure you want to clear this booking? You will loose all the progress so far!"
                )
            ) {
                this.$store.commit("RESET_STORE");
                this.$store.commit("extras/RESET_STORE");
                this.$router.push("/");
            }
        },
    },
};
</script>
