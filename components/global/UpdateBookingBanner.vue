<template>
    <div class="fixed top-0 w-full py-2 text-center bg-green-200">
        You are currently editting a booking <b>#{{ $store.state.editBooking.ref }}</b>

        <button class="ml-6 text-red-700" @click="cancelEdit()">CANCEL</button>
    </div>
</template>

<script>
export default {
    methods: {
        cancelEdit() {
            this.$router.push({ path: "/guests" });
            this.$store.commit("CANCEL_EDIT");
            this.$store.commit("RESET_STORE");
            this.$store.commit("extras/RESET_STORE");
        },
    },
};
</script>
