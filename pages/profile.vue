<template>
    <div>
        <h1 class="mb-6 text-2xl text-center">What’s are your profile details?</h1>

        <div class="flex justify-center space-x-6">
            <div class="w-6/12">
                <div class="px-6 pt-6 text-gray-700 bg-white border rounded-lg shadow-lg">
                    <div class="border rounded-md">
                        <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
                            <div>
                                <div class="text-base font-bold">Email address</div>
                                <input type="email" v-model="guest.email" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                            </div>
                            <div>
                                <div class="text-base font-bold">Phone number</div>
                                <input type="tel" v-model="guest.phone" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                            </div>
                        </div>
                        <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
                            <div>
                                <div class="text-base font-bold">First Name</div>
                                <input type="text" v-model="guest.first_name" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                            </div>
                            <div>
                                <div class="text-base font-bold">Last Name</div>
                                <input type="text" v-model="guest.last_name" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                            </div>
                        </div>
                        <div class="px-3 py-4 border-b">
                            <div>
                                <textarea type="text" v-model="guest.dietary_concerns"
                                    class="w-full px-2 border-b border-gray-200 rounded-md" placeholder="State any dietary concerns (e.g Vegeterian)"></textarea>
                            </div>
                        </div>
                        <div class="px-3 py-4 border-b">
                            <div>
                                <div class="text-base font-bold">Upload Identification</div>
                                <input type="text" v-model="guest.identification" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                            </div>
                        </div>
                        <div class="px-3 py-4 border-b">
                            <div>
                                <div class="text-base font-bold">How did you hear about us?</div>
                                <input type="text" v-model="guest.social_link" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                            </div>
                        </div>
                    </div>

                    <div class="flex w-full my-6 space-x-6">
                        <MainButton outline>Back</MainButton>
                        <MainButton>Next</MainButton>
                    </div>
                </div>
            </div>
            <div class="w-3/12">
                <ReservationBox />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            signedIn: false,
            guest: {
                email: "",
                phone: "",
                first_name: "",
                last_name: "",
                dietary_concerns: "",
                identification: "",
                social_link: "",
            },
        };
    },
    methods: {
        toggleSignin() {
            this.signedIn = !this.signedIn;
        },
        clearForm() {
            this.guest.email = "";
            this.guest.phone = "";
            this.guest.first_name = "";
            this.guest.last_name = "";
            this.guest.identification = "";
            this.guest.social_link = "";
        },

        gotoNext() {
            const form = {
                email: this.guest.email,
                phone: this.guest.phone,
                gender: this.guest.gender,
                dob: this.guest.dob,
                first_name: this.guest.first_name,
                last_name: this.guest.last_name,
                concerns: this.guest.concerns,
                identification: this.guest.identification,
                social_link: this.guest.social_link,
            };
            this.$store.commit("UPDATE_GUEST", form);
            this.clearForm;
            this.$router.push({ path: "/policies" });
        },
    },
};
</script>

<style>
</style>
