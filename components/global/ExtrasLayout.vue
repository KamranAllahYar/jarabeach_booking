<template>
    <div>
        <SpecialLookout v-if="currentSpecial == 'lookout'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialMassage v-else-if="currentSpecial == 'massage'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialQuadBikes v-else-if="currentSpecial == 'quadbike' || currentSpecial == 'quadbikes'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialPhotoshoot v-if="currentSpecial == 'photoshoot'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialDrinkCollection v-if="currentSpecial == 'drinks'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialCake v-else-if="currentSpecial == 'cakes'" @next="gotoNext()" @prev="gotoPrev()" />

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
    computed: {
        selected() {
            return this.$store.getters["extras/allSelected"];
        },
        index() {
            return this.$store.state.extras.selectedIndex;
        },
    },
    methods: {
        gotoNext() {
            console.log(this.index);
            if (this.index == this.selected.length - 1) {
                this.$router.push({ path: "/profile" });
                return;
            }

            this.$store.commit("extras/INC_INDEX");
            const special = this.selected[this.index];
            this.$router.push({ path: "/extras/" + special.type });
        },
        gotoPrev(n) {
            if (this.index == 0) {
                this.$router.push({ path: "/extras" });
                return;
            }

            this.$store.commit("extras/DEC_INDEX");

            const special = this.selected[this.index];

            this.$router.push({ path: "/extras/" + special.type });
        },
    },
};
</script>
