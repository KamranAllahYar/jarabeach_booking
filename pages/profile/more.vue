<template>
    <div>
        <h1 class="mb-6 text-2xl font-bold text-center">Please give us some information about you</h1>

        <div class="flex justify-center space-x-6">
            <div class="w-6/12">
                <div class="px-6 pt-6 text-gray-700 bg-white border rounded-lg shadow-lg">
                    <div class="border rounded-md">
                        <div class="px-3 py-4 border-b" v-for="(guest, ix) in others" :key="ix">
                            <div class="text-base font-bold capitalize">
                                {{ guest.type }} {{ guest.num }}
                            </div>
                            <div class="flex items-center">
                                <div class="mr-3">
                                    <svg class="w-5 h-5" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="guest.type == 'adult'">
                                        <path d="M13.422 14.531a6.552 6.552 0 00-11.845 0M7.5 3.281a3.282 3.282 0 01-3.281 3.281 3.281 3.281 0 106.562 0A3.281 3.281 0 017.5 3.283v0z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.148 11.892a9.11 9.11 0 002.12-.63.938.938 0 00.476-1.225l-.86-2.006a2.813 2.813 0 01-.228-1.109V5.626a5.156 5.156 0 10-10.312 0v1.298c0 .38-.077.757-.228 1.108l-.86 2.006a.937.937 0 00.477 1.225 9.11 9.11 0 002.12.63" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <svg class="w-5 h-5" viewBox="0 0 16 16" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="guest.type == 'child'">
                                        <path d="M13.75 6.583h-.01C13.5 3.55 10.706 1.55 8 1.55s-5.5 2-5.74 5.033h-.01a1.75 1.75 0 100 3.5h.01a6 6 0 0011.48 0h.01a1.75 1.75 0 100-3.5z" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M8 1.55a1.5 1.5 0 01.596 2.876 1.5 1.5 0 01-2.01-.876M9.323 11.334a2 2 0 01-2.646 0M11.5 7.333a1 1 0 01-2 0M6.5 7.333a1 1 0 01-2 0" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div class="flex-1">
                                    <input type="text" v-model="guest.first_name" placeholder="First Name" class="w-full px-0 border-0" style="box-shadow: none" />
                                </div>
                                <div class="flex-1">
                                    <input type="text" v-model="guest.last_name" placeholder="Last Name" class="w-full px-0 border-0" style="box-shadow: none" />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="flex w-full my-6 space-x-6">
                        <MainButton outline @click="gotoBack()">Back</MainButton>
                        <MainButton @click="gotoNext()">Next</MainButton>
                    </div>
                </div>
            </div>
            <div class="flex-shrink-0 w-3/12">
                <ReservationBox />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    computed: {
        others() {
            return this.$store.state.other_guests;
        },
    },
    methods: {
        gotoBack() {
            this.$router.push({ path: "/profile" });
        },
        gotoNext() {
            this.$router.push({ path: "/policies" });
        },
    },
};
</script>
