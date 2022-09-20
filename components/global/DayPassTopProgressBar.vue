<template>
    <div class="flex justify-center w-full px-3 space-x-0">
        <ProgressNav first to="/day-pass" :done="$store.state.day_pass.guests_done">
            1. <span class="hidden md:inline-block"> Guests</span>
        </ProgressNav>
        <ProgressNav to="/day-pass-availability" :done="$store.state.day_pass.availability_done">
            2. <span class="hidden md:inline-block"> Availability</span>
        </ProgressNav>
        <ProgressNav to="/day-pass-options" :done="$store.state.day_pass.options_done">
            3. <span class="hidden md:inline-block"> Options</span>
        </ProgressNav>
        <!-- <ProgressNav to="/day-pass-extras" :done="$store.state.day_pass.extras_done">
            4. <span class="hidden md:inline-block"> Extras</span>
        </ProgressNav> -->
        <ProgressNav last to="/day-pass-summary">
            4. <span class="hidden md:inline-block"> Payment</span>
        </ProgressNav>
    </div>
</template>

<script>
import ProgressNav from "./ProgressNav.vue";
export default {
    components: {
        ProgressNav,
    },
    data() {
        return {
            doneClass: "text-white bg-brand-blue-600",
            notDoneClass: "text-gray-500",
        };
    },
};
</script>
