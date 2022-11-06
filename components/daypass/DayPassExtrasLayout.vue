<template>
    <div class="relative">
        <SpecialLookout v-if="currentSpecial == 'lookout'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialMassage v-else-if="currentSpecial == 'massage'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialNewMassage v-else-if="currentSpecial == 'newmassage'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialQuadBikes v-else-if="currentSpecial == 'quadbike' || currentSpecial == 'quadbikes'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialBikes v-else-if="currentSpecial == 'bikes'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialPhotoshoot v-if="currentSpecial == 'photoshoot'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialDrinkCollection v-if="currentSpecial == 'drinks'" @next="gotoNext()" @prev="gotoPrev()" />

        <SpecialMassagesMultiple v-if="currentSpecial == 'massages'" @next="gotoNext()" @prev="gotoPrev()"  />

        <SpecialCake v-else-if="currentSpecial == 'cakes'" @next="gotoNext()" @prev="gotoPrev()" />

        <!-- <SpecialRoomDecoration v-else-if="currentSpecial == 'roomDecoration'" @next="gotoNext()" @prev="gotoPrev()" /> -->

        <SpecialUnforgettableExperience v-else-if="currentSpecial == 'unforgettableExperience'" @next="gotoNext()" @prev="gotoPrev()" />

        <!-- <SpecialDomesticStaff v-else-if="currentSpecial == 'domesticStaff'" @next="gotoNext()" @prev="gotoPrev()" /> -->

        <button @click="removeExtra()" class="absolute px-2 py-1 text-sm text-red-500 capitalize transition-colors rounded-sm top-2 right-2 hover:bg-red-500 hover:text-white">remove extra</button>
    </div>
</template>

<script>
import SpecialMassage from '@/components/daypass/extras/SpecialMassage.vue'
import SpecialBikes from '@/components/daypass/extras/SpecialBikes.vue'
import SpecialQuadBikes from '@/components/daypass/extras/SpecialQuadBikes.vue'
import SpecialPhotoshoot from '@/components/daypass/extras/SpecialPhotoshoot.vue'
import SpecialMassagesMultiple from '@/components/daypass/extras/SpecialMassagesMultiple.vue'
import SpecialDrinkCollection from '@/components/daypass/extras/SpecialDrinkCollection.vue'
import SpecialCake from '@/components/daypass/extras/SpecialCake.vue'
import SpecialUnforgettableExperience from '@/components/daypass/extras/SpecialUnforgettableExperience.vue'
export default {
    props: {
        currentSpecial: {
            default: "lookout",
            type: String,
        },
    },
    components:{
        SpecialMassage,
        SpecialBikes,
        SpecialQuadBikes,
        SpecialPhotoshoot,
        SpecialMassagesMultiple,
        SpecialDrinkCollection,
        SpecialCake,
        SpecialUnforgettableExperience
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
                this.$store.commit("extras/REMOVE_EXTRA", this.currentSpecial);
            }
        },
        gotoNext() {
            if (this.index == this.selected.length - 1) {
                this.$store.commit("day_pass/COMPLETE_EXTRAS");
                this.$router.push({ path: "/day-pass-payment" });
                return;
            }

            this.$store.commit("extras/INC_INDEX");
            const special = this.selected[this.index];
            this.$router.push({ path: "/day-pass-extras/" + special.type });
        },
        gotoPrev(n) {
            if (this.index == 0) {
                this.$router.push({ path: "/day-pass-extras" });
                return;
            }

            this.$store.commit("extras/DEC_INDEX");

            const special = this.selected[this.index];

            this.$router.push({ path: "/day-pass-extras/" + special.type });
        },
    },
};
</script>
