<template>
    <div>
        <div>
            <div class="text-xl font-bold text-center md:text-2xl">
                Tell Us about your visiting group
            </div>

            <div class="max-w-lg px-6 py-6 mx-auto mt-10 bg-white border rounded-lg shadow-lg">
                <div class="border rounded-lg">

                    <div class="p-4">
                        <div class="mb-4 font-semibold">Select Guest make-up</div>

                        <div class="flex flex-col md:items-center md:flex-row md:space-x-6">
                            <div class="flex items-center w-full pl-2 space-x-2 rounded-md md:w-auto focus-within:ring">
                                <svg class="flex-shrink-0 w-5 h-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.422 14.531a6.552 6.552 0 00-11.845 0M7.5 3.281a3.282 3.282 0 01-3.281 3.281 3.281 3.281 0 106.562 0A3.281 3.281 0 017.5 3.283v0z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.148 11.892a9.11 9.11 0 002.12-.63.938.938 0 00.476-1.225l-.86-2.006a2.813 2.813 0 01-.228-1.109V5.626a5.156 5.156 0 10-10.312 0v1.298c0 .38-.077.757-.228 1.108l-.86 2.006a.937.937 0 00.477 1.225 9.11 9.11 0 002.12.63" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <!-- <div class="font-light">Adults</div> -->
                                <select name="adult" id="adult" v-model="noOfAdult"
                                    class="w-full border-0 rounded-md outline-none focus:outline-none"
                                    style="box-shadow: none">
                                    <option value="0">Adults</option>
                                    <option
                                        v-for="num in 10"
                                        :value="num"
                                        :key="num">
                                        {{ num }}
                                    </option>
                                </select>
                            </div>

                            <div class="flex items-center w-full pl-2 space-x-2 rounded-md md:w-auto focus-within:ring">
                                <svg class="flex-shrink-0 w-5 h-5" viewBox="0 0 16 16" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.75 6.583h-.01C13.5 3.55 10.706 1.55 8 1.55s-5.5 2-5.74 5.033h-.01a1.75 1.75 0 100 3.5h.01a6 6 0 0011.48 0h.01a1.75 1.75 0 100-3.5z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 1.55a1.5 1.5 0 01.596 2.876 1.5 1.5 0 01-2.01-.876M9.323 11.334a2 2 0 01-2.646 0M11.5 7.333a1 1 0 01-2 0M6.5 7.333a1 1 0 01-2 0" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <select v-model="noOfChildren"
                                    class="w-full border-0 rounded-md outline-none focus:outline-none"
                                    style="box-shadow: none">
                                    <option :value="0">Children</option>
                                    <option :value="0">0</option>
                                    <option v-for="num in 5" :value="num" :key="num">
                                        {{ num }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 border-t" v-if="noOfChildren">
                        <div class="mb-4 font-semibold">
                            Specify children's age (years)
                        </div>
                        <div class="grid w-full md:grid-cols-3 gap-x-3 gap-y-3">
                            <div class="flex items-center pl-2 rounded-md focus-within:ring" v-for="(child, i) in childrenAges" :key="i">
                                <svg class="flex-shrink-0 w-5 h-5" viewBox="0 0 16 16" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.75 6.583h-.01C13.5 3.55 10.706 1.55 8 1.55s-5.5 2-5.74 5.033h-.01a1.75 1.75 0 100 3.5h.01a6 6 0 0011.48 0h.01a1.75 1.75 0 100-3.5z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 1.55a1.5 1.5 0 01.596 2.876 1.5 1.5 0 01-2.01-.876M9.323 11.334a2 2 0 01-2.646 0M11.5 7.333a1 1 0 01-2 0M6.5 7.333a1 1 0 01-2 0" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <select v-model="child.age" class="w-full border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                    <option value="0 - 2">0 - 2</option>
                                    <option value="3 - 5">3 - 5</option>
                                    <option value="6 - 17">6 - 17</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="flex w-full mt-6 space-x-3" v-if="noOfAdult > 0">
                    <!-- <MainButton outline>Back</MainButton> -->
                    <MainButton @click="gotoNext()">Next</MainButton>
                </div>
            </div>
            <div class="flex justify-center">
                <button class="mx-auto mt-5 font-semibold text-center cursor-pointer text-brand-blue" @click="$router.push({path: '/manage'})">Manage Booking</button>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            noOfChildren: 0,
            noOfAdult: 0,
            childrenAges: [],
        };
    },
    watch: {
        noOfChildren(v) {
            if (this.childrenAges.length == v) return;

            if (this.childrenAges.length > v) {
                const newC = [];
                for (let jx = 0; jx < v; jx++) {
                    newC.push(this.childrenAges[jx]);
                }

                this.childrenAges = newC;
                return;
            }

            const diff = v - this.childrenAges.length;
            for (let ix = 0; ix < diff; ix++) {
                this.childrenAges.push({ age: "0 - 1" });
            }

            this.updateStores();
        },
        childrenAges(v) {
            this.updateStores();
        },
    },
    methods: {
        gotoNext() {
            this.$toast.clear();
            if (this.noOfAdult < 1) {
                this.$toast.info(
                    "Please let us know how many adults will be coming",
                    { duration: 5000 }
                );
                return;
            }
            this.updateStores();
            this.$store.commit("COMPLETE_GUEST");
            this.$router.push({ path: "/availability" });
        },
        updateStores() {
            this.$store.commit("UPDATE_GROUP", {
                groupType: "group",
                adult_no: this.noOfAdult,
                child_no: this.noOfChildren,
                children_ages: this.childrenAges,
            });
        },
        updateFromStore() {
            this.noOfAdult = this.$store.state.adult_no;
            this.noOfChildren = this.$store.state.child_no;

            this.childrenAges = this.$store.state.children_ages.map((a) => {
                return { age: a };
            });
        },
    },
    mounted() {
        console.log("Mounting guest");
        this.updateFromStore();
    },
};
</script>
