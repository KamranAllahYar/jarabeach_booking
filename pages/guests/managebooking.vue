<template>
    <div>
            <div class="text-2xl font-bold text-center">
                Manage your booking
            </div>

            <div class="max-w-md px-6 py-6 mx-auto mt-10 bg-white border rounded-lg">
                <div class="border rounded-lg">

                    <div class="p-4">
                        <div class="mb-4 font-semibold">Booking Reference</div>

                        <div class="flex items-center pl-2 space-x-2 rounded-md focus-within:ring">
                            <svg 
                                width="15" height="15" fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.1875 7.5A2.3444 2.3444 0 0114.14 5.1875a.46804.46804 0 00.2803-.15919.46741.46741 0 00.1109-.30269V3.28125a.93747.93747 0 00-.2745-.66291.93767.93767 0 00-.6629-.27459H1.40625a.93749.93749 0 00-.9375.9375v1.44563A.46813.46813 0 00.86 5.18875a2.34435 2.34435 0 011.9591 2.3125A2.34437 2.34437 0 01.86 9.81375a.46876.46876 0 00-.39125.46185v1.4432c0 .2486.09877.487.27459.6629a.93748.93748 0 00.66291.2745H13.5938c.2486 0 .487-.0987.6629-.2745a.93767.93767 0 00.2745-.6629v-1.4457a.4674.4674 0 00-.1109-.30266.46804.46804 0 00-.2803-.15919 2.34443 2.34443 0 01-1.399-.79849A2.34412 2.34412 0 0112.1875 7.5v0zM7.5 5.625h3.2812" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.60938 10.3125c.64722 0 1.17182-.52467 1.17182-1.17188 0-.6472-.5246-1.17187-1.17182-1.17187-.64721 0-1.17188.52467-1.17188 1.17187 0 .64721.52467 1.17188 1.17188 1.17188zM4.6875 4.92188a.23444.23444 0 01.14468-.21654.23441.23441 0 01.25542.05081.2344.2344 0 01.05081.25542.2344.2344 0 01-.21653.14468.23433.23433 0 01-.16573-.06865.23433.23433 0 01-.06865-.16572M4.6875 7.73437a.23443.23443 0 01.14468-.21653.23441.23441 0 01.25542.05081.2344.2344 0 01.05081.25542.2344.2344 0 01-.21653.14468.23433.23433 0 01-.16573-.06865.23433.23433 0 01-.06865-.16573zM4.6875 10.5469a.23457.23457 0 01.14468-.2166.23453.23453 0 01.25542.0508.23465.23465 0 01.06415.1201.23446.23446 0 01-.01334.1354.23482.23482 0 01-.08632.1052.23473.23473 0 01-.13021.0394.23412.23412 0 01-.16573-.0686.23447.23447 0 01-.06865-.1657z" 
                                stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div class="text-gray-500">34ERBUI1</div>
                        </div>
                    </div>
                    <div class="p-4 border-t">
                        <div class="mb-4 font-semibold">Last Name</div>

                        <div class="flex items-center pl-2 space-x-2 rounded-md focus-within:ring">
                            <svg 
                                width="15" height="15" fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4221 14.5312a6.55244 6.55244 0 00-2.4175-2.7337 6.5535 6.5535 0 00-3.50495-1.0163 6.55326 6.55326 0 00-3.50492 1.0163 6.55215 6.55215 0 00-2.41758 2.7337M7.5 3.28125A3.28189 3.28189 0 014.21875 6.5625c0 .87024.3457 1.70484.96106 2.32019A3.28121 3.28121 0 0010.7812 6.5625a3.28119 3.28119 0 01-2.32014-.96106A3.28121 3.28121 0 017.5 3.28125v0z" 
                                    stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"
                                />
                                <path d="M11.1473 11.8919a9.11006 9.11006 0 002.1193-.6294.93767.93767 0 00.4894-.5152.93758.93758 0 00-.0125-.7104l-.86-2.00628a2.8125 2.8125 0 01-.2275-1.10812V5.625A5.15617 5.15617 0 007.49976.46875 5.15627 5.15627 0 002.34351 5.625v1.2975a2.8125 2.8125 0 01-.2275 1.10812l-.86 2.00628a.9374.9374 0 00-.01252.7104.93765.93765 0 00.48939.5152 9.10925 9.10925 0 002.11938.6294" 
                                    stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <div class="text-gray-500">Genevieve</div>
                        </div>
                    </div>

                </div>

                <div class="flex w-full mt-6 space-x-3">
                    <MainButton outline @click="$router.push({path: '/guests'})">Back</MainButton>
                    <MainButton @click="gotoNext()">Find Booking</MainButton>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            // noBooking: false
        }
    }
}
</script>

<style>

</style>