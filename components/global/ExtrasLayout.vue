<template>
    <div>
        <SpecialLookout v-if="currentSpecial == 'lookout'" @next="gotoNext('massage')" />
        
        <!-- <SpecialLookoutMeal v-if="''" @next="gotoNext('massage')" /> -->

        <SpecialMassage v-else-if="currentSpecial == 'massage'" @next="gotoNext('quadbikes')" @prev="gotoNext('lookout')" />

        <SpecialQuadBikes v-else-if="currentSpecial == 'quadbikes'" @next="gotoNext('photoshoot')" @prev="gotoNext('massage')"/>

        <SpecialPhotoshoot v-if="currentSpecial == 'photoshoot'" @next="gotoNext('drinks')" @prev="gotoNext('quadbikes')" />

        <SpecialDrinkCollection v-if="currentSpecial == 'drinks'" @next="gotoNext('cake')" @prev="gotoNext('photoshoot')"/>

        <SpecialCake v-else-if="currentSpecial == 'cake'" @next="gotoNext('roomDecoration')" @prev="gotoNext('drinks')" />

        <SpecialRoomDecoration v-else-if="currentSpecial == 'roomDecoration'" @next="gotoNext('domesticStaff')"  @prev="gotoNext('cake')"/>

        <SpecialDomesticStaff v-else-if="currentSpecial == 'domesticStaff'"  @prev="gotoNext('roomDecoration')" />
        <!-- <SpecialDomesticStaffInfo v-else-if="currentSpecial == 'domesticStaffInfo'" /> -->
    </div>
</template>

<script>
export default {
    props: {
        currentSpecial: {
            default: "lookout",
            type: String,
        },
    },
    methods: {
        gotoNext(special) {
            this.$router.push({ path: "/extras/" + special });
        },
    },
};
</script>
