<template>
    <div class="p-6">
        <h1 class="mb-6 text-3xl font-semibold">Summary</h1>
        <table class="w-full border border-collapse table-auto">
            <tbody>
                <tr class="h-12">
                    <td class="w-1/2 pl-5 font-semibold border">{{ items[0].name }}</td>
                    <td class="w-1/2 pl-5 text-xl border">N{{ items[0].amount }}</td>
                </tr>
                <tr class="h-12">
                    <td class="pl-5 font-semibold border">{{ items[1].name }}</td>
                    <td class="pl-5 text-xl border">N{{ items[1].amount }}</td>
                </tr>
                <tr class="h-12">
                    <td class="pl-5 font-semibold border">{{ items[2].name }}</td>
                    <td class="pl-5 text-xl border">N{{ items[2].amount }}</td>
                </tr>
                <tr class="h-12">
                    <td class="pl-5 font-semibold border">{{ items[3].name }}</td>
                    <td class="pl-5 text-xl border">N{{ items[3].amount }}</td>
                </tr>
                <tr class="h-12">
                    <td class="pl-5 font-semibold border">{{ items[4].name }}</td>
                    <td class="pl-5 text-xl border">N{{ items[4].amount }}</td>
                </tr>
                <tr class="h-12">
                    <td class="pl-5 font-semibold border">{{ items[5].name }}</td>
                    <td class="pl-5 text-xl border">N{{ items[5].amount }}</td>
                </tr>
            </tbody>
        </table>
        <div class="mt-10">
            <div class="flex items-center w-2/3 space-x-3">
                <input type="text" placeholder="Enter Discount Code" class="w-1/2 mr-2 rounded">
                <button class="px-3 py-1 text-white bg-blue-500 rounded">Apply</button>
            </div>
            <div class="flex items-center mt-3">
                <div class="mr-3 text-sm font-semibold text-green-400">Membership discount applied</div>
                <svg class="w-5 h-5 text-green-500"
                    fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd">
                    </path>
                </svg>
            </div>
        </div>
        <div class="flex justify-end text-sm">
            <div class="w-1/2 space-y-2">
                <div class="flex items-center w-full">
                    <div class="w-1/2">Sub-total:</div>
                    <div class="w-1/2">{{ subTotalAmount }}</div>
                </div>
                <div class="flex items-center w-full">
                    <div class="w-1/2">Discount:</div>
                    <div class="w-1/2">{{ discount }}</div>
                </div>
                <div class="flex items-center w-full text-base font-semibold">
                    <div class="w-1/2">Total:</div>
                    <div class="w-1/2">{{ totalAmount }}</div>
                </div>
            </div>
        </div>
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

