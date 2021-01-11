<template>
    <div class="flex justify-center w-full space-x-0">
        <ProgressNav first to="/guests" :done="$store.state.guests_done">
            1. Guests
        </ProgressNav>
        <ProgressNav to="/availability" :done="$store.state.availability_done">
            2. Availability
        </ProgressNav>
        <ProgressNav to="/extras" :done="$store.state.availability_done">
            3. Extras
        </ProgressNav>
        <ProgressNav to="/profile" :done="$store.state.profile_done">
            4. Profile
        </ProgressNav>
        <ProgressNav to="/policies" :done="$store.state.policy_done">
            5. Policies
        </ProgressNav>
        <ProgressNav last to="/summary">
            6. Payment
        </ProgressNav>
        <!-- <nuxt-link exact tag="div" to="/guests" class="px-8 py-4 border-2 cursor-pointer"
            :class="$store.state.guests_done ? doneClass : notDoneClass">
            1. Guests
        </nuxt-link>
        <nuxt-link exact tag="div" to="/availability" class="px-8 py-4 border-2 cursor-pointer"
            :class="$store.state.availability_done ? doneClass : notDoneClass">
            2. Availability
        </nuxt-link>
        <nuxt-link exact tag="div" to="/extras" class="px-8 py-4 border-2 cursor-pointer">
            3. Extras
        </nuxt-link>
        <nuxt-link exact tag="div" to="/profile" class="px-8 py-4 border-2 cursor-pointer"
            :class="$store.state.profile_done ? doneClass : notDoneClass">
            4. Profile
        </nuxt-link>
        <nuxt-link exact tag="div" to="/policies" class="px-8 py-4 border-2 cursor-pointer"
            :class="$store.state.policy_done ? doneClass : notDoneClass">
            5. Policies
        </nuxt-link>
        <nuxt-link exact tag="div" to="/summary" class="px-8 py-4 border-2 cursor-pointer" :class="notDoneClass">
            6. Payment
        </nuxt-link> -->
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
