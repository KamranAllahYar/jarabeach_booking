<template>
    <div class="flex justify-center w-full px-3 space-x-0">
        <ProgressNav first to="/day-pass" :done="$store.state.guests_done">
            1. <span class="hidden md:inline-block"> Guests</span>
        </ProgressNav>
        <ProgressNav to="/day-pass-options" :done="$store.state.availability_done">
            2. <span class="hidden md:inline-block"> Options</span>
        </ProgressNav>
        <ProgressNav to="/day-pass-availability" :done="$store.state.availability_done">
            3. <span class="hidden md:inline-block"> Availability</span>
        </ProgressNav>
        <ProgressNav to="/day-pass-extras" :done="$store.state.availability_done">
            4. <span class="hidden md:inline-block"> Extras</span>
        </ProgressNav>
        <!-- <ProgressNav to="/profile" :done="$store.state.profile_done">
            4. <span class="hidden md:inline-block"> Profile</span>
        </ProgressNav>
        <ProgressNav to="/policies" :done="$store.state.policy_done">
            5. <span class="hidden md:inline-block"> Policies</span>
        </ProgressNav> -->
        <ProgressNav last to="/day-pass-summary">
            5. <span class="hidden md:inline-block"> Payment</span>
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
