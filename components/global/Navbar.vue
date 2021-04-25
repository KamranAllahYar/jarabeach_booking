<template>
    <div class="fixed top-0 z-50 flex items-center w-full h-20 font-navbar" style="background-color: #242323">
        <div class="flex items-center justify-start w-full max-w-6xl mx-auto space-x-6 font-light text-white">
            <div>
                <img style="width: 57px; height: 57px" src="~/assets/white-logo.webp" />
            </div>
            <a href="https://www.jarabeachresort.com/" class="px-2 cursor-pointer hover:opacity-50">
                HOME
            </a>
            <!-- <a href="https://www.jarabeachresort.com/" class="px-2 cursor-pointer hover:opacity-50">
                ABOUT
            </a>
            <a href="https://www.jarabeachresort.com/" class="px-2 cursor-pointer hover:opacity-50">
                EXPERIENCE
            </a>
            <a href="https://www.jarabeachresort.com/" class="px-2 cursor-pointer hover:opacity-50">
                GALLERY
            </a>
            <a href="https://www.jarabeachresort.com/" class="px-2 cursor-pointer hover:opacity-50">
                EVENT BOOKINGS
            </a>
            <div class="flex items-center justify-between space-x-4">
                <a href="https://www.jarabeachresort.com/day-pass" class="px-4 py-2 transition-colors duration-700 border border-white cursor-pointer hover:text-black hover:bg-white">
                    DAYPASS BOOKING
                </a>
                <a href="https://www.jarabeachresort.com/book" class="px-4 py-2 transition-colors duration-700 border border-white cursor-pointer hover:text-black hover:bg-white">
                    OVERNIGHT BOOKING
                </a>
            </div> -->
            <div class="flex-1"></div>
            <!-- <div class="underline cursor-pointer" v-if="canClearBooking" @click="clearBooking()">Clear current booking</div>
            <StartOverButton></StartOverButton> -->
        </div>
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
