<template>
    <div>
        <div class="text-2xl font-medium text-center">
            What's <b>your guest</b> make-up?
        </div>

        <div class="max-w-md px-6 py-6 mx-auto mt-10 bg-white border rounded-lg">
            <div class="border rounded-lg">

                <div class="p-4">
                    <div class="mb-4 font-semibold">Select Guest make-up</div>

                    <div class="flex items-center space-x-6">
                        <div class="flex items-center pl-2 space-x-2 rounded-md focus-within:ring">
                            <svg class="w-5 h-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.422 14.531a6.552 6.552 0 00-11.845 0M7.5 3.281a3.282 3.282 0 01-3.281 3.281 3.281 3.281 0 106.562 0A3.281 3.281 0 017.5 3.283v0z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.148 11.892a9.11 9.11 0 002.12-.63.938.938 0 00.476-1.225l-.86-2.006a2.813 2.813 0 01-.228-1.109V5.626a5.156 5.156 0 10-10.312 0v1.298c0 .38-.077.757-.228 1.108l-.86 2.006a.937.937 0 00.477 1.225 9.11 9.11 0 002.12.63" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <!-- <div class="font-light">Adults</div> -->
                            <select name="adult" id="adult" v-model="noOfAdult"
                                class="border-0 rounded-md outline-none focus:outline-none"
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

                        <div class="flex items-center pl-2 space-x-2 rounded-md focus-within:ring">
                            <svg class="w-5 h-5" viewBox="0 0 16 16" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.75 6.583h-.01C13.5 3.55 10.706 1.55 8 1.55s-5.5 2-5.74 5.033h-.01a1.75 1.75 0 100 3.5h.01a6 6 0 0011.48 0h.01a1.75 1.75 0 100-3.5z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 1.55a1.5 1.5 0 01.596 2.876 1.5 1.5 0 01-2.01-.876M9.323 11.334a2 2 0 01-2.646 0M11.5 7.333a1 1 0 01-2 0M6.5 7.333a1 1 0 01-2 0" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <select v-model="noOfChildren"
                                class="border-0 rounded-md outline-none focus:outline-none"
                                style="box-shadow: none">
                                <option value="0">Children</option>
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
                    <div class="grid w-full grid-cols-3 gap-x-3 gap-y-3">
                        <div class="flex items-center pl-2 rounded-md focus-within:ring" v-for="age in noOfChildren" :key="age">
                            <svg class="w-5 h-5" viewBox="0 0 16 16" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.75 6.583h-.01C13.5 3.55 10.706 1.55 8 1.55s-5.5 2-5.74 5.033h-.01a1.75 1.75 0 100 3.5h.01a6 6 0 0011.48 0h.01a1.75 1.75 0 100-3.5z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 1.55a1.5 1.5 0 01.596 2.876 1.5 1.5 0 01-2.01-.876M9.323 11.334a2 2 0 01-2.646 0M11.5 7.333a1 1 0 01-2 0M6.5 7.333a1 1 0 01-2 0" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <select class="border-0 rounded-md outline-none focus:outline-none" style="box-shadow: none">
                                <option v-for="num in 15" :value="num" :key="num">
                                    {{ num }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>

            <div class="flex w-full mt-6 space-x-3">
                <MainButton outline>Back</MainButton>
                <MainButton>Next</MainButton>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            groupType: "individual",
            noOfChildren: 0,
            noOfAdult: 0,
            childAge: 1,
        };
    },
    methods: {
        gotoNext() {
            this.$store.commit("UPDATE_GROUP", {
                groupType: this.groupType,
                adult_no: this.noOfAdult,
                child_no: this.noOfChildren,
            });

            this.$router.push({ path: "/availability" });
        },
    },
    watch: {
        groupType(val) {
            if (val == "individual") {
                this.noOfAdult = 1;
            }
            if (val == "couple") {
                this.noOfAdult = 2;
            }
        },
    },
};
</script>

<style>
</style>
