<template>
    <div class="max-w-lg mt-24">
        <div  class="flex items-center p-8 bg-gray-200">
            <div>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="mr-5 feather feather-info">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                </svg>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>