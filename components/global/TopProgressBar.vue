<template>
    <div class="flex justify-center w-full space-x-2">
        <nuxt-link exact tag="div" to="/guests" class="px-8 py-4 border-2 cursor-pointer"
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
        <nuxt-link exact tag="div" to="/profile" class="px-8 py-4 border-2 cursor-pointer">
            4. Profile
        </nuxt-link>
        <nuxt-link exact tag="div" to="/policies" class="px-8 py-4 border-2 cursor-pointer"
            :class="$store.state.policy_done ? doneClass : notDoneClass">
            5. Policies
        </nuxt-link>
        <nuxt-link exact tag="div" to="/summary" class="px-8 py-4 border-2 cursor-pointer">
            6. Payment
        </nuxt-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            doneClass: "text-white bg-brand-blue-600",
            notDoneClass: "text-gray-500",
        };
    },
};
</script>

<style>
.nuxt-link-active {
    @apply text-brand-blue;
    @apply font-bold;
    @apply border;
    @apply border-brand-blue-300;
    @apply bg-brand-blue-100;
}
</style>
