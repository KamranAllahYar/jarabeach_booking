
<template>
    <div class="flex min-h-screen bg-white">
        <main class="flex-1 w-full pt-20 pb-48 overflow-auto beach">
            <Navbar />

            <div class="py-10 text-center">
                <!-- <img src="~/assets/logo_big.jpg" class="w-32 mx-auto md:w-40" /> -->
            </div>

            <!-- <TopProgressBar /> -->

            <div class="relative z-20 pt-10 pb-6 mx-auto max-w-7xl">
                <div>
                    <div class="text-3xl font-semibold text-center"> Booking held for the next 30 minutes!<br />Payment required to confirm your visit</div>
                    <div class="max-w-md px-6 py-6 mx-auto mt-10 bg-white border rounded-lg shadow-lg">
                        <div class="flex items-center justify-center pb-6">
                            <svg
                                width="100" height="100" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 9.375C27.5996 9.375 9.375 27.5996 9.375 50S27.5996 90.625 50 90.625 90.625 72.4004 90.625 50 72.4004 9.375 50 9.375zm21.1426 27.0098l-26.25 31.25c-.288.3429-.6463.62-1.0506.8124a3.1254 3.1254 0 01-1.2932.3028h-.0527a3.12647 3.12647 0 01-1.2712-.2707c-.4-.1784-.7582-.4388-1.0511-.7645l-11.25-12.5a3.12609 3.12609 0 01-.6537-1.0502 3.12547 3.12547 0 01-.1949-1.2217c.0171-.4161.1172-.8246.2944-1.2015s.428-.7146.7376-.9932a3.12443 3.12443 0 011.0651-.6291 3.12487 3.12487 0 011.2259-.1666 3.1267 3.1267 0 011.1944.3222c.3727.1859.7044.4445.9758.7605l8.8457 9.8281 23.9433-28.4981a3.1253 3.1253 0 012.1153-1.0708 3.12522 3.12522 0 012.2582.7223 3.12485 3.12485 0 011.1013 2.0997 3.12528 3.12528 0 01-.6896 2.2684z" fill="#5ACBC9" />
                            </svg>
                        </div>
                        <div class="">
                            Your booking <b>#{{ done.booking.ref }}</b> has been held and payment is required to confirm your visit.
                            <br />
                            To complete your booking make payment within the next 30 minutes to either of the following bank accounts:

                            <br />
                            <br />

                            <b>LITTLE COMPANY NIGERIA LIMITED</b> <br />
                            Access Bank<br />
                            <b>0813609546</b>
                            <br />
                            <br />

                            <b>LITTLE COMPANY NIGERIA LIMITED</b> <br />
                            Guaranty Trust Bank (GTB)<br />
                            <b>0504697451</b>

                            <br />
                            <br />
                            Please send your proof of payment to <b class="text-brand-blue">bookings@jarabeachresort.com</b>
                            <br />
                            <br />

                            We've also sent details to <span class="text-brand-blue">{{ done.email }}</span>
                            <br />
                            Be sure to check your spam folder if not seen in your inbox.
                            <br />
                            <br />
                            Find out all you need to know <a class="underline text-brand-blue" href="https://www.jarabeachresort.com/faq-s">here</a> ahead of your trip.

                            <!-- Your booking was successful, we’ve sent all the details you will need to
                            <span class="text-brand-blue">{{ done_email }}</span>.
                            We look forward to welcoming you
                            <span v-if="days_left<= 0">
                                tomorrow!
                            </span>
                            <span v-else-if="days_left == 1">
                                in a day!
                            </span>
                            <span v-else>
                                in {{ days_left }} days!
                            </span> -->
                        </div>
                    </div>
                    <div class="mt-5 text-sm text-center">Check us out on social media</div>
                    <div class="flex items-center justify-center mt-2 space-x-5">
                        <a title="Instagram" href="http://instagram.com/jarabeachresortng" target="_blank">
                            <img src="/insta.jpg" alt="" class="w-8 h-8 cursor-pointer">
                        </a>
                        <a title="Facebook" href="https://www.facebook.com/jarabeachresortng" target="_blank">
                            <img src="/facebook.jpg" alt="" class="w-6 h-6 cursor-pointer">
                        </a>
                        <a title="LinkedIn" href="https://www.linkedin.com/company/jara-beach-resort" target="_blank">
                            <img src="/linkedin.png" alt="" class="w-6 h-6 cursor-pointer">
                        </a>
                        <a title="Google Places" href="https://www.google.com/travel/hotels/entity/CgoI6reXtp692bsUEAE/overview?g2lb=2502405%2C2502548%2C4208993%2C4254308%2C4258168%2C4260007%2C4270442%2C4271059%2C4274032%2C4285990%2C4288513%2C4289525%2C4291318%2C4296668%2C4301054%2C4303479%2C4305595%2C4308216%2C4311406%2C4313006%2C4315873%2C4317816%2C4317915%2C4324289%2C4329288%2C4270859%2C4284970%2C4291517%2C4292955%2C4316256&hl=en&gl=ng&un=1&rp=EOq3l7aevdm7FDgCQABIAQ&ictx=1&sa=X&ved=0CAAQ5JsGahcKEwjg0-XryNDtAhUAAAAAHQAAAAAQBg&hrf=KhYKBwjkDxAMGBoSBwjkDxAMGBsYASgAggElMHgxMDM5NTM4NmVlOGU2ZDIzOjB4MTQ3NzY1ZTllNmM1ZGJlYZoBJxolMHgxMDM5NTM4NmVlOGU2ZDIzOjB4MTQ3NzY1ZTllNmM1ZGJlYQ&tcfs=EhoaGAoKMjAxOS0xMi0xOBIKMjAxOS0xMi0xOVIA&utm_campaign=sharing&utm_medium=link&utm_source=htls" target="_blank">
                            <img src="/google.png" alt="" class="w-6 h-6 cursor-pointer">
                        </a>
                        <a title="Trip Advisor" href="https://www.tripadvisor.com/Hotel_Review-g304026-d19454058-Reviews-Jara_Beach_Resort-Lagos_Lagos_State.html" target="_blank">
                            <img src="/tripadvisor.png" alt="" class="w-6 h-6 cursor-pointer">
                        </a>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>



<script>
export default {
    computed: {
        done() {
            return this.$store.state.done_data;
        },
    },
};
</script>
