<template>
    <div>
      <pre>
        Index: {{ index }}

      </pre>
        <SpecialLookout v-if="currentSpecial == 'lookout'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialMassage v-else-if="currentSpecial == 'massage'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialQuadBikes v-else-if="currentSpecial == 'quadbikes'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialPhotoshoot v-if="currentSpecial == 'photoshoot'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialDrinkCollection v-if="currentSpecial == 'drinks'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialCake v-else-if="currentSpecial == 'cake'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialRoomDecoration v-else-if="currentSpecial == 'roomDecoration'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialDomesticStaff v-else-if="currentSpecial == 'domesticStaff'" @next="gotoNext()" @prev="gotoPrev()" />
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
    data() {
        return {
            index: 0,
            specials: [
                "lookout",
                "cake",
                "quadbikes",
                // "photoshoot",
                // "drinks",
                // "cake",
                // "roomDecoration",
                // "domesticStaff",
            ],
        };
    },
    methods: {
        gotoNext(n) {
            this.index++;

            const special = this.specials[this.index];

            this.$router.push({ path: "/extras/" + special });
        },
        gotoPrev(n) {
            this.index--;

            const special = this.specials[this.index];

            this.$router.push({ path: "/extras/" + special });
        },
    },
};
</script>
