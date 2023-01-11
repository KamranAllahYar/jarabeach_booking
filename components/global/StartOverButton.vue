<template>
    <div class="mx-auto" style="max-width: 160px">
        <MainButton class="whitespace-nowrap" @click="clearBooking()" outline>Restart Booking</MainButton>
    </div>
</template>

<script>
export default {
    computed: {
        canClearBooking() {
            return this.$store.state.guests_done;
        },
    },
    props: {
        isDayPassBooking: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clearBooking() {
            if (
                window.confirm(
                    "Are you sure you want to clear this booking? You will loose all the progress so far!"
                )
            ) {
                let redirectUrl = this.isDayPassBooking ? '/day-pass' : '/guests'
                this.$store.commit("RESET_STORE");
                this.$store.commit("extras/RESET_STORE");
                this.$store.commit("day_pass/RESET_STORE");
                this.$router.push(redirectUrl);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        },
    },
};
</script>
