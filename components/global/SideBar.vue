<template>
    <div>
        <div>
            <nuxt-link exact tag="div" to="/welcome" class="p-5 border-b cursor-pointer" @focus="{}">Welcome</nuxt-link>
            <nuxt-link exact tag="div" to="/group" class="p-5 border-b cursor-pointer">Group</nuxt-link>
            <nuxt-link exact tag="div" to="/availability" class="p-5 border-b cursor-pointer">Availability</nuxt-link>
            <!-- <nuxt-link exact tag="div" to="/welcome" class="p-5 border-b cursor-pointer">Add-Ons</nuxt-link> -->
            <!-- <nuxt-link exact tag="div" to="/welcome" class="p-5 border-b cursor-pointer">Specials</nuxt-link> -->
            <nuxt-link exact tag="div" to="/profile" class="p-5 border-b cursor-pointer">Profile</nuxt-link>
            <nuxt-link exact tag="div" to="/policies" class="p-5 border-b cursor-pointer">Policies</nuxt-link>
            <nuxt-link exact tag="div" to="/summary" class="p-5 border-b cursor-pointer">Summary</nuxt-link>
            <nuxt-link exact tag="div" to="/payment" class="p-5 border-b cursor-pointer">Payment</nuxt-link>
            <nuxt-link exact tag="div" to="/done" class="p-5 border-b cursor-pointer">Done</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.nuxt-link-active {
    @apply text-red-600;
    @apply font-bold;
    @apply border;
    @apply border-l-4;
    @apply border-red-600;
}
</style>
