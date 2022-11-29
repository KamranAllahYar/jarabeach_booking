<template>
    <div class="text-center">
        <div class="flex flex-col items-center justify-center w-full px-0 px-6 mt-10 space-y-6 md:flex-row md:space-x-10 md:space-y-0 md:">
            <div class="duration-150 ease-linear transform cursor-pointer md:w-1/3 hover:scale-110">
                <img src="@/assets/overnight.jpeg" class="object-contain"  @click="goToOvernight"/>
            </div>
            <div class="duration-150 ease-linear transform cursor-pointer md:w-1/3 hover:scale-110">
                <img src="@/assets/daypass.jpeg" class="object-contain" @click="goToDaypass"/>
            </div>
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
    goToOvernight() {
        this.$router.push({ path: "/guests"});
    }
    goToDaypass(){
        this.$router.push({ path: "/day-pass"});
    }

    mounted() {
        if (this.$route.query.type === 'daypass') {
            this.$router.push({ path: "/day-pass"});
            return;
        }
        if (this.$route.query.type === 'overnight') {
            this.$router.push({ path: "/guests"});
            return;
        }
    }
    
}
</script>
