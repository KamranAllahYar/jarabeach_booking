<template>
    <div class="relative">
        <SpecialLookout v-if="currentSpecial == 'lookout'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialMassage v-else-if="currentSpecial == 'massage'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialNewMassage v-else-if="currentSpecial == 'newmassage'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialQuadBikes v-else-if="currentSpecial == 'quadbike' || currentSpecial == 'quadbikes'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialPhotoshoot v-if="currentSpecial == 'photoshoot'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialDrinkCollection v-if="currentSpecial == 'drinks'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialMassagesMultiple v-if="currentSpecial == 'massages'" @next="gotoNext()" @prev="gotoPrev()"  />

        <SpecialCake v-else-if="currentSpecial == 'cakes'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialRoomDecoration v-else-if="currentSpecial == 'roomDecoration'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialUnforgettableExperience v-else-if="currentSpecial == 'unforgettableExperience'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialDomesticStaff v-else-if="currentSpecial == 'domesticStaff'" @next="gotoNext()" @prev="gotoPrev()" />

        <button @click="removeExtra()" class="absolute px-2 py-1 text-sm text-red-500 capitalize transition-colors rounded-sm top-2 right-2 hover:bg-red-500 hover:text-white">remove extra</button>
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
        removeExtra() {
            const confirmRemove = confirm(
                "Are you sure you want to remove this Extra?"
            );

            if (confirmRemove) {
                this.gotoNext();
                console.log(this.currentSpecial);
                this.$store.commit("extras/REMOVE_EXTRA", this.currentSpecial);
            }
        },
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
