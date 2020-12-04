<template>
    <div class="flex justify-center w-full space-x-2">
        <nuxt-link exact tag="div" to="/group" class="px-8 py-4 text-gray-500 border-2 cursor-pointer">Group</nuxt-link>
        <nuxt-link exact tag="div" to="/availability" class="px-8 py-4 text-gray-500 border-2 cursor-pointer">Availability</nuxt-link>
        <nuxt-link exact tag="div" to="/profile" class="px-8 py-4 text-gray-500 border-2 cursor-pointer">Profile</nuxt-link>
        <nuxt-link exact tag="div" to="/policies" class="px-8 py-4 text-gray-500 border-2 cursor-pointer">Policies</nuxt-link>
        <nuxt-link exact tag="div" to="/summary" class="px-8 py-4 text-gray-500 border-2 cursor-pointer">Summary</nuxt-link>
        <nuxt-link exact tag="div" to="/payment" class="px-8 py-4 text-gray-500 border-2 cursor-pointer">Payment</nuxt-link>
    </div>
</template>

<script>
export default {};
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
