<template>
    <div>
        <div class="flex w-full" v-show="!showStaff">
            <div class="relative w-6/12 ">
                <img src="@/assets/images/specials/domesticStaff.png" alt="" class="object-cover object-center w-full h-full">
                <NavSpecials :index="8" @prev="$emit('prev')"   />
            </div>
            <div class="w-7/12 p-6">
                <div class="font-semibold">Domestic Staff</div>
                <p class="mt-3 font-light leading-relaxed text-gray-600">
                    We welcome guests with nannies or drivers, subject to availability. No discounts/ offers apply to domestic staff pricing. 
                    We have (will have at the time we go live) a nannies room and a drivers room (2 max in each). Booked in advance.
                </p>
                <div class="w-1/3 mx-auto mt-8">
                    <MainButton @click="showStaff = true">Next</MainButton>
                </div>
            </div>
        </div>
        <SpecialDomesticStaffInfo  v-if="showStaff" @close="showStaff = false" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            showStaff: false,
        }
    },
    methods: {
        showClicked() {
            this.showStaff = false;
        }
    }
}
</script>