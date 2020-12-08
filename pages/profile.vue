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
                                <div class="flex items-center">
                                    <input type="email" required v-model="guest.email" placeholder="email@example.com" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                                    <Loading v-if="loading" />
                                    <svg v-if="weHaveData && !wantsToUpdate" class="inline-block w-6 h-6 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div v-if="showFullForm">
                                <div class="text-base font-bold">Phone number</div>
                                <input type="tel" v-model="guest.phone" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                            </div>
                        </div>
                        <div class="px-3 py-4 border-b" v-if="weHaveData && !wantsToUpdate">
                            <div>
                                Hi {{ guest.first_name }}, welcome back to Jara Beach Resorts.
                                We have used your details from the last booking,
                                however if you would like to make any changes
                                <span @click="wantsToUpdate = true" class="font-bold cursor-pointer text-brand-blue">click here</span>.
                            </div>
                        </div>
                        <template v-if="showFullForm">
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
                            <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
                                <div>
                                    <div class="text-base font-bold">Gender</div>
                                    <input type="text" v-model="guest.gender" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                                </div>
                                <div>
                                    <div class="text-base font-bold">Date of Birth</div>
                                    <input type="date" v-model="guest.dob" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                                </div>
                            </div>
                            <div class="px-3 py-4 border-b">
                                <div>
                                    <textarea type="text" v-model="guest.concerns"
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
                                    <input type="text" v-model="guest.hear_of_us" class="w-full px-0 border-0 border-b border-transparent focus:border-gray-200 " style="box-shadow: none" />
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="flex w-full my-6 space-x-6">
                        <MainButton outline @click="gotoBack()">Back</MainButton>
                        <MainButton :loading="initialLoad && loading" @click="gotoNext()">Next</MainButton>
                    </div>
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
    data() {
        return {
            loading: false,
            // weHaveData: false,
            wantsToUpdate: false,
            initialLoad: true,
            guest: {
                email: "",
                phone: "",
                first_name: "",
                last_name: "",
                dob: "",
                gender: "",
                concerns: "",
                identification: "",
                hear_of_us: "",
            },
        };
    },
    computed: {
        weHaveData: {
            set(v) {
                return this.$store.commit("GUEST_WEHAVEDATA", v);
            },
            get() {
                return this.$store.state.weHaveData;
            },
        },
        showFullForm() {
            if (this.wantsToUpdate) return true;

            if (this.initialLoad) return false;

            if (this.weHaveData) return false;

            return true;
        },
    },
    methods: {
        toggleSignin() {
            this.signedIn = !this.signedIn;
        },

        gotoNext() {
            console.log("go to next");
            if (this.initialLoad && !this.wantsToUpdate) {
                this.confirmGuest();
                return;
            }

            this.$store.commit("UPDATE_GUEST", {
                guest: Object.assign({}, this.guest),
            });

            this.$store.commit("COMPLETE_PROFILE");

            this.$router.push({ path: "/policies" });
        },

        gotoBack() {
            this.$router.push({ path: "/availability" });
        },

        async confirmGuest() {
            if (!this.isValidEmail(this.guest.email)) {
                this.$toast.show("Please enter a valid email address");
                return;
            }

            this.loading = true;
            const res = await this.$store.dispatch(
                "confirmGuest",
                this.guest.email
            );

            if (res.success) {
                this.weHaveData = true;
                const guest = res.data;

                this.guest = guest;
                this.$store.commit("UPDATE_GUEST", {
                    guest: Object.assign({}, guest),
                });
                this.$toast.success(res.message);
            }

            console.log(res);
            this.loading = false;
            this.initialLoad = false;
        },

        isValidEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
    },
    created() {
        console.log("CREATED PROFILE");
        if (this.$store.state.guest) {
            this.guest = Object.assign({}, this.$store.state.guest);
        }
    },
};
</script>

<style>
</style>
