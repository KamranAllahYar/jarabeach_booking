<template>
    <div>
        <SpecialLookout v-if="extras == 'lookout'" @next="gotoNext('massage')" />
        <SpecialMassage v-else-if="extras == 'massage'" @next="gotoNext('quad_bikes')" />
        <SpecialQuadBikes v-else-if="extras == 'quad_bikes'" @next="gotoNext('lookout')" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            extras: "lookout",
        };
    },
    methods: {
        gotoNext(value) {
            this.extras = value;
        },
    },
};
</script>
