<template>
    <div class="flex flex-col space-y-6">
        <div class="w-full text-gray-800 border rounded-md border-brand-blue-300 bg-brand-blue-100" v-if="showGuests">
            <div class="px-3 py-3 text-xl font-bold border-b border-brand-blue-300">Your Reservation</div>

            <div class="flex justify-between px-3 my-3">
                <div>Guests</div>
                <div>
                    {{ adultNo }} Adult<span v-if="adultNo > 1">s</span>
                </div>
            </div>
            <div class="flex justify-between px-3 my-3" v-if="childNo > 0">
                <div></div>
                <div class="text-right">
                    <!-- {{ childNo }} Child<span v-if="childNo > 1">ren</span> -->
                    <!-- <br /> -->
                    <div v-for="(qty, age) in childrenAges" :key="age">
                        {{ qty }} {{ ageToString(age, qty) }}
                    </div>
                </div>
            </div>
            <div class="flex justify-between px-3 my-3" v-if="rooms.length > 0">
                <div>
                    Room<span v-if="rooms.length > 1">s</span>
                    <br />
                    <div class="text-xs text-gray-700" v-if="roomDiscountPercent > 0">
                        {{roomDiscountPercent}}% Discount
                    </div>
                    <div class="text-xs text-gray-700" v-if="memberDiscount > 0">
                        20% Member Discount
                    </div>
                </div>
                <div>
                    <div class="mb-1 text-right" v-for="(room, ix) in rooms" :key="ix">
                        <div>{{ formatDate(room.date) }}</div>
                        <div class="text-xs text-gray-600">{{ room.name }}</div>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between px-3 my-3" v-for="extra in specials" :key="extra.id">
                <div>{{ extra.name }}</div>
                <div>
                    <span v-if="extra.type == 'cakes'">
                        <!-- {{ $store.getters['extras/cakesPrice'] }} -->
                        {{ currency($store.getters['extras/cakesPrice']) }}
                    </span>
                    <span v-else-if="extra.type == 'drinks'">
                        {{ currency($store.getters['extras/drinksPrice']) }}
                    </span>
                    <span v-else-if="extra.type == 'photoshoot'">
                        {{ currency($store.getters['extras/photoshootPrice']) }}
                    </span>
                    <span v-else-if="extra.type == 'roomDecoration'">
                        {{ currency($store.getters['extras/decorationPrice']) }}
                    </span>
                    <span v-else-if="extra.type == 'domesticStaff'">
                        {{ currency($store.getters['extras/staffPrice']) }}
                    </span>
                    <span v-else-if="extra.type == 'massage'">
                        {{ currency($store.getters['extras/massagePrice']) }}
                    </span>
                    <span v-else-if="extra.type == 'quadbike'">
                        {{ currency($store.getters['extras/quadbikePrice']) }}
                    </span>
                    <span v-else-if="extra.type == 'lookout'">
                        {{ currency($store.getters['extras/lookoutPrice']) }}
                    </span>
                    <span v-else>
                        {{ currency(0) }}
                    </span>
                </div>
            </div>
        </div>

        <div class="w-full text-gray-800 border rounded-md border-brand-blue-300 bg-brand-blue-100" v-if="showDiscount &&( discount > 0 || roomDiscountPercent > 0 )">
            <div class="flex justify-between px-3 my-3">
                <div>Sub-total</div>
                <div class="font-bold">{{ currency(subTotal) }}</div>
            </div>
            <div class="flex justify-between px-3 my-3" v-if="roomDiscountPercent > 0">
                <div>{{roomDiscountPercent}}% Room Discount</div>
                <div class="font-bold"> - {{ currency(roomDiscount) }}</div>
            </div>
            <div class="flex justify-between px-3 my-3" v-if="memberDiscount > 0">
                <div>20% Member Discount</div>
                <div class="font-bold"> - {{ currency(memberDiscount) }}</div>
            </div>
            <div class="flex justify-between px-3 my-3" v-if="discount > 0">
                <div>Discount</div>
                <div class="font-bold"> - {{ currency(discount) }}</div>
            </div>
        </div>

        <div class="flex justify-between w-full px-3 py-3 border rounded-md border-brand-blue-300 bg-brand-blue-100">
            <div class="text-xl">Total</div>
            <div class="text-xl font-bold">{{ currency(totalPrice) }}</div>
        </div>

        <div v-if="$store.state.editMode" class="w-full px-3 py-3 border rounded-md border-brand-blue-300 bg-brand-blue-100">
            <div v-if="$store.state.editBooking.previous_change" class="flex justify-between">
                <div class="text-xs">Booking Transfer Charge</div>
                <div class="text-xs font-bold">{{ currency(25000) }}</div>
            </div>
            <div class="flex justify-between">
                <div class="text-xl">Difference to Pay</div>
                <div class="text-xl font-bold">{{ currency(differenceToPay) }}</div>
            </div>
            <div class="flex justify-between mt-8 text-xs">
                <div>Previous Cost</div>
                <div class="font-bold">{{ currency(editBooking.payment.total) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
    props: {
        showGuests: {
            type: Boolean,
            default: true,
        },
        showDiscount: {
            type: Boolean,
            default: false,
        },
    },
    // data() {
    //     return {
    //         discount: 0,
    //     };
    // },
    computed: {
        editBooking() {
            return this.$store.state.editBooking;
        },
        differenceToPay() {
            return this.$store.getters.differenceToPay;
        },
        specials() {
            return this.$store.getters["extras/allSelected"];
        },
        childrenAges() {
            const children = this.$store.state.other_guests.filter(
                (g) => g.type != "adult"
            );
            let ageObj = {};

            children.forEach((child) => {
                if (!ageObj[child.age]) {
                    ageObj[child.age] = 1;
                } else {
                    ageObj[child.age]++;
                }
            });

            return ageObj;
        },
        childNo() {
            return this.$store.state.child_no;
        },
        adultNo() {
            return this.$store.state.adult_no;
        },
        rooms() {
            return this.$store.getters.bookedRooms;
        },
        roomDiscountPercent() {
            return this.$store.getters.roomDiscountPercent;
        },
        roomDiscount() {
            return this.$store.getters.roomDiscount;
        },
        memberDiscount() {
            return this.$store.getters.memberDiscount;
        },
        subTotal() {
            return this.$store.getters.subTotal;
        },
        discount() {
            return this.$store.getters.discount;
        },
        totalPrice() {
            return this.$store.getters.totalPrice;
        },
    },
    methods: {
        formatDate(date) {
            return format(parseISO(date), "do MMM  Y");
        },
        currency(num) {
            return "₦" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        ageToString(age, qty) {
            const translate = {
                "0 - 2": "Infant (0 - 2) yrs",
                "3 - 5": "Child (3 - 5) yrs",
                "6 - 17": "Teen (6 - 17) yrs",
            };

            const translatePlural = {
                "0 - 2": "Infants (0 - 2) yrs",
                "3 - 5": "Children (3 - 5) yrs",
                "6 - 17": "Teens (6 - 17) yrs",
            };

            if (qty > 1) {
                return translatePlural[age];
            }

            return translate[age];
        },
    },
};
</script>
