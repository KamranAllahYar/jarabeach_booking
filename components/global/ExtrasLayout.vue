<template>
    <div>
        <SpecialLookout v-if="currentSpecial == 'lookout'" @next="gotoNext('massage')" />
        <SpecialMassage v-else-if="currentSpecial == 'massage'" @next="gotoNext('quadbikes')" />
        <SpecialQuadBikes v-else-if="currentSpecial == 'quadbikes'" @next="gotoNext('lookout')" />
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
