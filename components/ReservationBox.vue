<template>
    <div class="flex flex-col space-y-6">
        <div class="w-full text-gray-800 border rounded-md border-brand-blue-300 bg-brand-blue-100">
            <div class="px-3 py-3 text-xl font-bold border-b border-brand-blue-300">Your Reservation</div>

            <div class="flex justify-between px-3 my-3">
                <div>Guests</div>
                <div>
                    {{ adultNo }} Adult<span v-if="adultNo > 1">s</span>
                </div>
            </div>
            <div class="flex justify-between px-3 my-3" v-if="childNo > 0">
                <div>Children</div>
                <div>{{ childNo }} Child<span v-if="childNo > 1">ren</span></div>
            </div>
            <div class="flex justify-between px-3 my-3">
                <div>Room<span v-if="rooms.length > 1">s</span></div>
                <div>
                    <div class="mb-1 text-right" v-for="(room, ix) in rooms" :key="ix">
                        <div>{{ formatDate(room.date) }}</div>
                        <div class="text-xs text-gray-600">{{ room.name }}</div>
                    </div>

                </div>
            </div>
        </div>
        <div class="flex justify-between w-full px-3 py-3 border rounded-md border-brand-blue-300 bg-brand-blue-100">
            <div class="text-xl">Total</div>
            <div class="text-xl font-bold">{{ totalPrice }}</div>
        </div>
    </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
    computed: {
        childNo() {
            return this.$store.state.child_no;
        },
        adultNo() {
            return this.$store.state.adult_no;
        },
        rooms() {
            return this.$store.getters.bookedRooms;
        },
        totalPrice() {
            const p = this.rooms.reduce((price, room) => {
                return price + room.price;
            }, 0);

            return "₦" + p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    methods: {
        formatDate(date) {
            return format(parseISO(date), "do MMM  Y");
        },
    },
};
</script>
