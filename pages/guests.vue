<template>
    <div>
        <div class="text-2xl font-medium text-center">
            What's <b>your guest</b> make-up?
        </div>
        <div class="max-w-md px-6 py-4 mx-auto mt-10 bg-white border rounded-lg">
            <div class="border rounded-lg">
                <div class="p-4">
                    <div class="mb-4 font-semibold">Select guest make-up</div>
                    <div class="w-full">
                        <div class="flex items-center space-x-4">
                            <div
                                class="flex items-center pl-2 space-x-2 rounded-md focus-within:ring">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="1"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="text-brand-blue-400">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div class="font-light">Adults</div>
                                <select
                                    name="adult"
                                    id="adult"
                                    v-model="noOfAdult"
                                    class="text-xs border-0 rounded-md outline-none focus:outline-none"
                                    style="box-shadow: none">
                                    <option
                                        v-for="num in 10"
                                        :value="num"
                                        :key="num">
                                        {{ num }}
                                    </option>
                                </select>
                            </div>

                            <div class="flex items-center space-x-2">
                                <div>
                                    <svg
                                        class="w-5 h-5 text-brand-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1"
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <div class="font-light">Children</div>
                                <select
                                    name="adult"
                                    id="children"
                                    v-model="noOfChildren"
                                    class="text-xs border-0">
                                    <option
                                        v-for="num in 5"
                                        :value="num"
                                        :key="num">
                                        {{ num }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-4 border-t" v-if="noOfChildren">
                    <div class="font-semibold">
                        Specify children's age (years)
                    </div>
                    <div class="grid w-full grid-cols-3 gap-y-3">
                        <div class="flex items-center space-x-2" v-for="age in noOfChildren" :key="age">
                            <div>
                                <svg
                                    class="w-5 h-5 text-brand-blue-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1"
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>

                            <select
                                name="adult"
                                id="children"
                                v-model="childAge"
                                class="text-xs border-0">
                                <option
                                    v-for="num in 14"
                                    :value="num"
                                    :key="num">
                                    {{ num }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Notification>Some very important message you feel they need to know</Notification>
        <br />
        <span
            @click="gotoNext()"
            class="p-3 mt-10 bg-gray-200 rounded cursor-pointer">Next</span>
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
