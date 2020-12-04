<template>
    <div>
        <h1 class="text-3xl font-semibold">Payment</h1>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            items: [
                { name: "Stay (2-nights)", amount: 150000 },
                { name: "Birthday Cake", amount: 35000 },
                { name: "Room Decorations", amount: 15000 },
                { name: "Nanny Lodging", amount: 20000 },
                { name: "1 Bottle Champagne", amount: 75000 },
                { name: "Lookout Experience", amount: 50000 },
            ],
            discount: 50000,
            total: 0,
        };
    },
    computed: {
        subTotalAmount() {
            const accAmount = this.items.reduce(
                (acc, val) => acc + val.amount,
                0
            );
            return accAmount;
        },
        totalAmount() {
            this.total = this.subTotalAmount - this.discount;
            return this.total;
        },
    },
};
</script>

