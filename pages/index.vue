<template>
    <div class="text-center">
        <div class="flex flex-col items-center justify-center h-64 max-w-md mx-auto">
            <Logo />
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

    mounted() {
        // if(this.$route.query.type === 'day_pass'){
        //     this.$router.push("/day-pass");
        //     return;
        // }
        // this.$router.push("/guests");
    }

    // middleware({ redirect }: any) {
    //     redirect("/guests");
    // }
}
</script>
