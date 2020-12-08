<template>
    <div>
        <h1 class="mb-6 text-2xl text-center">What’s are your profile details?</h1>

        <div class="flex justify-center space-x-6">
            <div class="w-6/12">
                <div class="px-6 pt-6 text-gray-700 bg-white border rounded-lg shadow-lg">
                    <div class="border rounded-md">
                        <div class="flex flex-col divide-y">
                            <div class="flex items-center justify-between px-3 py-4" v-for="(room, i) in rooms" :key="i">
                                <div class="text-base">
                                    <div>{{room.date}}</div>
                                    <div class="text-sm">{{room.name}}</div>
                                </div>
                                <div class="text-lg font-bold text-right">
                                    <div>{{ currency(room.price) }}</div>
                                    <div class="text-xs font-light text-red-500 cursor-pointer hover:underline" @click="removeRoom(room)">Remove</div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between px-3 py-4">
                                <div>Cake</div>
                                <div class="text-lg font-bold">{{ currency(400) }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 mb-12 border border-gray-100 rounded-md bg-gray-50 ring-gray-200 focus-within:ring ring-offset-2">
                        <form @submit.prevent class="flex justify-between p-2 ">
                            <input class="w-full ml-2 bg-transparent outline-none" placeholder="Enter Discount code" />
                            <button type="submit" class="px-10 py-1 text-white rounded-md focus:outline-none focus:ring bg-brand-blue-400">Apply</button>
                        </form>
                    </div>

                    <div class="flex w-full my-6 space-x-6">
                        <MainButton outline @click="gotoBack()">Back</MainButton>
                        <MainButton @click="completeBooking()">
                            <div class="flex justify-center">
                                <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                                </svg>
                                Pay
                            </div>
                        </MainButton>
                    </div>
                </div>
            </div>
            <div class="flex-shrink-0 w-3/12">
                <ReservationBox showDiscount :showGuests="false" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    computed: {
        rooms() {
            return this.$store.getters.bookedRooms;
        },
    },
    methods: {
        async completeBooking() {
            this.loading = true;
            const res = await this.$store.dispatch("createBooking");
            this.loading = false;

            if (res) {
                this.$router.push("/done");
                // this.$store.commit("RESET_STORE");
            }
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        gotoBack() {
            this.$router.push("/policies");
        },
        removeRoom(room) {
            console.log(room);
            this.$store.commit("REMOVE_ROOM", room);
        },
    },
};
</script>

