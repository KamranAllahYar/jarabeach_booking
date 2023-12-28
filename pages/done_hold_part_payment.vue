
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
                    <div class="text-3xl font-semibold text-center"> Your reservation will be secure up to seven days before your arrival once we receive a 70% payment confirmation. To confirm the booking, the remaining 30% balance payment will be needed seven days prior to your arrival.</div>
                    <div class="max-w-md px-6 py-6 mx-auto mt-10 bg-white border rounded-lg shadow-lg">
                        <div class="flex items-center justify-center pb-6">
                            <img src="~/assets/held.png" class='w-20 h-20' />
                        </div>
                        <div class="">
                            By proceeding you understand that Jara Beach Resort will hold your reservation <b>#{{ done.booking.ref }}</b> on receipt of your non-refundable 70% payment. 
                            The balance is expected 7 days before your visiting date. You will receive a notification 14 days prior if applicable.
                            In the event the balance payment of 30% is not received 7 days before your arrival, you understand your reservation will be cancelled, and deposit payment lost.
                            The part payment option is not applicable for bookings on or before 7 days of your visiting date.
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