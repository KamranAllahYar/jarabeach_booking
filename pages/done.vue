<template>
    <div>
        <div class="text-3xl font-semibold text-center">Congratulations</div>
        <div class="max-w-md px-6 py-6 mx-auto mt-10 bg-white border rounded-lg shadow-lg">
            <div class="flex items-center justify-center pb-6">
                <svg 
                    width="100" height="100" fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 9.375C27.5996 9.375 9.375 27.5996 9.375 50S27.5996 90.625 50 90.625 90.625 72.4004 90.625 50 72.4004 9.375 50 9.375zm21.1426 27.0098l-26.25 31.25c-.288.3429-.6463.62-1.0506.8124a3.1254 3.1254 0 01-1.2932.3028h-.0527a3.12647 3.12647 0 01-1.2712-.2707c-.4-.1784-.7582-.4388-1.0511-.7645l-11.25-12.5a3.12609 3.12609 0 01-.6537-1.0502 3.12547 3.12547 0 01-.1949-1.2217c.0171-.4161.1172-.8246.2944-1.2015s.428-.7146.7376-.9932a3.12443 3.12443 0 011.0651-.6291 3.12487 3.12487 0 011.2259-.1666 3.1267 3.1267 0 011.1944.3222c.3727.1859.7044.4445.9758.7605l8.8457 9.8281 23.9433-28.4981a3.1253 3.1253 0 012.1153-1.0708 3.12522 3.12522 0 012.2582.7223 3.12485 3.12485 0 011.1013 2.0997 3.12528 3.12528 0 01-.6896 2.2684z" fill="#5ACBC9"/>
                </svg>
            </div>
            <div class="">Your booking was successful, we’ve sent all the details you will need to <span class="text-brand-blue">veronicagen@gmail.com</span> . We look forward to seeing you </div>
        </div>
        <div class="mt-5 text-sm text-center">Check us out on social media</div>
        <div class="flex items-center justify-center mt-2 space-x-5">
           <a href=""><img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" alt="" class="w-8 h-8 cursor-pointer"></a> 
           <a href=""><img src="https://i.pinimg.com/originals/76/00/8b/76008bb9685d410d47fe1fa01dc54f15.jpg" alt="" class="w-8 h-8 cursor-pointer"></a> 
           <a href=""><img src="https://icon-library.com/images/facebook-logo-icon/facebook-logo-icon-5.jpg" alt="" class="w-6 h-6 cursor-pointer"></a> 
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            choice: "",
        };
    },
};
</script>
