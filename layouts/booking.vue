<template>
    <div class="flex min-h-screen">
        <div class="flex-shrink-0 border-r w-72">
            <SideBar />
        </div>
        <main class="flex-1 w-full overflow-auto">
            <Nuxt />
        </main>
    </div>
</template>

<script>
import SideBar from "@/components/global/SideBar";
export default {
    components: {
        SideBar,
    },
};
</script>
