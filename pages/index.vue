<template>
    <div class="text-center">
        <div class="flex flex-col items-center justify-center w-full h-64">
            <Logo />
            <h1 class="mt-10">Enjoy Jara's overnight experience</h1>
            <h1 class="mt-10">On this trip what’s most important to you?</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    layout: "booking",
})
export default class Index extends Vue {
    message: string = "This is a message";

    testToast() {
        this.$toast.show("Hello world");
    }
}
</script>
