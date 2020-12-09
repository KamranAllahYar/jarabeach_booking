<template>
    <div class="absolute bottom-0 z-10 flex items-center justify-between w-full p-5 text-white bg-yellow-900">
        <div class="flex items-center justify-center w-6 h-6 border rounded-full cursor-pointer">
            <svg 
                class="w-3 h-3" fill="none" 
                stroke="currentColor" viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </div>
        <div class=""> 1 of {{ specials.length }}</div>
        <div class="flex items-center justify-center w-6 h-6 border rounded-full cursor-pointer">
            <svg 
                class="w-3 h-3" fill="none" 
                stroke="currentColor" viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            specials: [
                "lookout",
                "massage",
                "quadbikes",
                "photoshoot",
                "drinks",
                "cake",
                "roomDecoration",
                "domesticStaff",
            ],
        };
    },
};
</script>

<style>

</style>