<template>
    <div class="flex flex-col w-full md:flex-row">
        <div class="relative w-full md:w-6/12 h-60 md:h-auto">
            <img src="@/assets/images/specials/roomDecoration.png" alt="" class="object-cover object-center w-full h-full">
        </div>

        <div class="w-full p-6 md:w-7/12">
            <div class="font-semibold">Room Decoration</div>
            <p class="mt-3 font-light leading-relaxed text-gray-600">
                There are a number of expected extras we offer for free, including romantic room decoration, or happy birthday messages, simple decorations etc.

                <br />
                <br />
                Helium Balloons or bespoke Special Decoration on request
            </p>
            <div class="mt-6 font-semibold">What date would you like to have this?</div>

            <div class="grid items-center mt-3 font-light md:grid-cols-2 gap-y-2">
                <label class="flex items-center" v-for="date in dates" :key="date">
                    <input type="radio" :value="date" v-model="selectedDate" class="mr-3 rounded-full focus-within:ring-0 text-brand-blue-400">
                    <div>{{ showDate(date) }}</div>
                </label>
            </div>
            <div class="space-y-4">
                <div class="mt-6 font-semibold">Select Room Decoration</div>
                <div v-for="deco in decorations" :key="deco.id">
                    <label class="inline-flex items-center" :key="deco.id">
                        <input type="checkbox" :value="deco" v-model="selectedDecorations" class="w-5 h-5 mr-3 rounded focus:ring-0 text-brand-blue-400">
                        <div class="inline-block">
                            {{ deco.name }} -
                            <span class="font-bold uppercase" v-if="deco.price >0">{{ currency(deco.price) }}</span>
                            <span class="font-bold uppercase" v-else>FREE</span>
                        </div>
                    </label>

                    <input type="text" :key="deco.id+'ss'" v-if="showNote(deco)" placeholder="What to write. 20 characters max" maxlength="20"
                        v-model="myWelcomeNote"
                        class="w-full py-1 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4" />

                    <input type="text" :key="deco.id+'pt'" v-if="showPetalsNote(deco)" placeholder="What to write. 10 characters max" maxlength="10"
                        v-model="myPetalsNote"
                        class="w-full py-1 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4" />

                    <select v-model="myBalloonsColor" v-if="showColorOptions(deco)" :key="deco.id+'op'" class="w-full py-1 rounded-lg focus:outline-none focus:ring focus:ring-brand-blue-300 ring-offset-4">
                        <option value="">Select Color</option>
                        <option value="Blue">Blue</option>
                        <option value="Red">Red</option>
                        <option value="Pink">Pink</option>
                    </select>
                </div>
            </div>
            <div class="flex w-full mx-auto mt-8 space-x-2 md:w-2/3">
                <MainButton outline @click="prev()">Back</MainButton>
                <MainButton @click="next()">Next</MainButton>
            </div>
        </div>
    </div>
</template>

<script>
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default {
    data() {
        return {
            selectedDate: null,
            selectedDecorations: [],
            myWelcomeNote: "",
            myPetalsNote: "",
            myBalloonsColor: "",
        };
    },
    computed: {
        decorations() {
            return this.$store.getters["extras/allDecorations"];
        },
        dates() {
            return this.$store.getters.bookingDates;
        },
        isWelcomeNoteSelected() {
            let has = false;
            this.selectedDecorations.forEach((d) => {
                if (d.name.toLowerCase() == "welcome note") {
                    has = true;
                }
            });

            return has;
        },
        isBalloonSelected() {
            let has = false;
            this.selectedDecorations.forEach((d) => {
                if (d.name.toLowerCase() == "balloons") {
                    has = true;
                }
            });

            return has;
        },
        isPetalsSelected() {
            let has = false;
            this.selectedDecorations.forEach((d) => {
                if (d.name.toLowerCase() == "flower petals") {
                    has = true;
                }
            });

            return has;
        },
        welcomeNote() {
            if (this.isWelcomeNoteSelected) {
                return this.myWelcomeNote;
            }

            return null;
        },
        petalsNote() {
            if (this.isPetalsSelected) {
                return this.myPetalsNote;
            }

            return null;
        },
        balloonsColor() {
            if (this.isBalloonSelected) {
                return this.myBalloonsColor;
            }

            return null;
        },
    },
    methods: {
        showNote(deco) {
            return (
                deco.name.toLowerCase() == "welcome note" &&
                this.isWelcomeNoteSelected
            );
        },
        showColorOptions(deco) {
            return (
                deco.name.toLowerCase() == "balloons" && this.isBalloonSelected
            );
        },
        showPetalsNote(deco) {
            return (
                deco.name.toLowerCase() == "flower petals" &&
                this.isPetalsSelected
            );
        },
        next() {
            console.log("NEXT");
            this.$store.commit("extras/SET_SELECTED_DECORATION", {
                decorations: this.selectedDecorations,
                date: this.selectedDate,
                note: this.welcomeNote,
                petalsNote: this.petalsNote,
                balloonsColor: this.balloonsColor,
            });
            this.$emit("next");
        },
        prev() {
            this.$store.commit("extras/SET_SELECTED_DECORATION", {
                note: this.welcomeNote,
                decorations: this.selectedDecorations,
                date: this.selectedDate,
            });
            this.$emit("prev");
        },
        showDate(date) {
            return format(parseISO(date), "iii, MMM. do yyyy");
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    mounted() {
        this.$store.dispatch("extras/getSpecialDecorations");

        if (this.dates.length > 0) {
            this.selectedDate = this.dates[0];
        }

        if (this.$store.state.extras.selectedDecorations) {
            this.selectedDecorations = this.$store.state.extras.selectedDecorations.map(
                (x) => x
            );
        }
        if (this.$store.state.extras.dateDecoration) {
            this.selectedDate = this.$store.state.extras.dateDecoration;
        }
        if (this.$store.state.extras.decorationWelcomeNote) {
            this.myWelcomeNote = this.$store.state.extras.decorationWelcomeNote;
        }
        if (this.$store.state.extras.decorationPetalsNote) {
            this.myPetalsNote = this.$store.state.extras.decorationPetalsNote;
        }
        if (this.$store.state.extras.decorationBalloonsColor) {
            this.myBalloonsColor = this.$store.state.extras.decorationBalloonsColor;
        }
    },
};
</script>
