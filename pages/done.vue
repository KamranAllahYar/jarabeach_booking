<template>
    <div class="p-6 text-center ">
        <div class="text-3xl font-semibold">Congratulations</div>
        <div class="flex items-center justify-center my-5">
            <svg class="w-48 h-48 text-green-500"
                fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd">
                </path>
            </svg>
        </div>
        <div class="w-1/2 mx-auto text-lg">Your booking was successful, we’ve sent all the details you will need to <span class="text-green-500">mark.slade@gmail.com</span> . We look forward to seeing you </div>
        <div class="mt-10 text-xl">Check us out on social media</div>
        <div class="flex items-center justify-center mt-2 space-x-5">
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" alt="" class="w-12 h-12">
            <img src="https://i.pinimg.com/originals/76/00/8b/76008bb9685d410d47fe1fa01dc54f15.jpg" alt="" class="w-12 h-12">
            <img src="https://icon-library.com/images/facebook-logo-icon/facebook-logo-icon-5.jpg" alt="" class="w-10 h-10">
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
