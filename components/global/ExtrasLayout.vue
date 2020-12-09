<template>
    <div>
        <SpecialLookout v-if="currentSpecial == 'lookout'" @next="gotoNext('lookoutMeal')" />
        <SpecialLookoutMeal v-if="currentSpecial == 'lookoutMeal'" @next="gotoNext('massage')" />

        <SpecialMassage v-else-if="currentSpecial == 'massage'" @next="gotoNext('quadbikes')" />

        <SpecialQuadBikes v-else-if="currentSpecial == 'quadbikes'" @next="gotoNext('photoshoot')" />

        <SpecialPhotoshoot v-if="currentSpecial == 'photoshoot'" @next="gotoNext('drinks')" />

        <SpecialDrinkCollection v-if="currentSpecial == 'drinks'" @next="gotoNext('cake')" />

        <SpecialCake v-else-if="currentSpecial == 'cake'" @next="gotoNext('roomDecoration')" />

        <SpecialRoomDecoration v-else-if="currentSpecial == 'roomDecoration'" @next="gotoNext('domesticStaff')" />

        <SpecialDomesticStaff v-else-if="currentSpecial == 'domesticStaff'" @next="gotoNext('domesticStaffInfo')" />
        <SpecialDomesticStaffInfo v-else-if="currentSpecial == 'domesticStaffInfo'" />
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
