<template>
    <div>
        <h1 class="mb-6 text-2xl text-center">Select an Extra experience to improve your stay!</h1>
        <div class="flex justify-center space-x-6">
            <div class="w-9/12">
                <div class="bg-white border rounded-lg shadow-lg">
                    <ExtrasLayout />
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
};
</script>
