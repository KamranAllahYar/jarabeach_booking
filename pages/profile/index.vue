<template>
    <div>
        <h1 class="mb-6 text-2xl font-bold text-center">Please give us some information about you</h1>

        <div class="flex justify-center space-x-6">
            <div class="w-6/12">
                <div class="px-6 pt-6 text-gray-700 bg-white border rounded-lg shadow-lg">
                    <div class="border rounded-md">
                        <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
                            <div>
                                <div class="text-base font-bold">Email address</div>
                                <div class="flex items-center">
                                    <input type="email" required v-model="guest.email" placeholder="email@example.com" class="w-full px-0 border-0" style="box-shadow: none" />
                                    <Loading v-if="loading" />
                                    <svg v-if="weHaveData && !wantsToUpdate" class="inline-block w-6 h-6 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <div v-if="showFullForm">
                                <div class="text-base font-bold">Phone number</div>
                                <input type="tel" required v-model="guest.phone" placeholder="08012345678" class="w-full px-0 border-0" style="box-shadow: none" />
                            </div>
                        </div>
                        <div class="px-3 py-4 border-b" v-if="weHaveData && !wantsToUpdate">
                            <div>
                                Hi {{ guest.first_name }}, welcome back to Jara Beach Resort.
                                We have used your details from the last booking,
                                however if you would like to make any changes
                                <span @click="wantsToUpdate = true" class="font-bold cursor-pointer text-brand-blue">click here</span>.
                            </div>
                        </div>
                        <template v-if="showFullForm">
                            <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
                                <div>
                                    <div class="text-base font-bold">First Name</div>
                                    <input type="text" v-model="guest.first_name" placeholder="Jane" class="w-full px-0 border-0" style="box-shadow: none" />
                                </div>
                                <div>
                                    <div class="text-base font-bold">Last Name</div>
                                    <input type="text" v-model="guest.last_name" placeholder="Doe" class="w-full px-0 border-0" style="box-shadow: none" />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
                                <div>
                                    <div class="text-base font-bold">Gender</div>
                                    <select v-model="guest.gender" class="w-full px-0 border-0" style="box-shadow: none">
                                        <option value="">--SELECT--</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <div class="text-base font-bold">Date of Birth</div>
                                    <input type="date" v-model="guest.dob" class="w-full px-0 border-0" ref="dob" style="box-shadow: none" />
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

                                    <img v-if="guest.identification && !hasFileUpload" :src="guest.identification" class="w-3/5" />

                                    <div class="inline-flex items-center mt-2 cursor-pointer" @click="$refs.file.click()">
                                        <svg viewBox="0 0 15 15" fill="none" class="w-5 h-5 mr-2"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.75 1.875v2.5A.625.625 0 009.375 5h2.5" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M10.625 13.125h-6.25a1.25 1.25 0 01-1.25-1.25v-8.75a1.25 1.25 0 011.25-1.25H8.75L11.875 5v6.875a1.25 1.25 0 01-1.25 1.25zM7.5 6.875v3.75" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5.625 8.75L7.5 6.875 9.375 8.75" stroke="#225A89" stroke-width=".8" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <span v-if="hasFileUpload">{{file.name}}</span>
                                        <template v-else>
                                            <span v-if="guest.identification">Update file</span>
                                            <span v-else>Add file</span>
                                        </template>
                                    </div>
                                    <input type="file" class="hidden" ref="file" @input="handleFileUpload()" accept="image/x-png,image/gif,image/jpeg" />
                                </div>
                            </div>
                            <div class="px-3 py-4 border-b">
                                <div>
                                    <div class="text-base font-bold">How did you hear about us?</div>
                                    <select v-model="guest.hear_of_us" class="w-32 px-0 border-0" style="box-shadow: none">
                                        <option value="">--SELECT--</option>
                                        <option value="Social Media">Social Media</option>
                                        <option value="Friend">Friend</option>
                                        <option value="Website">Website</option>
                                        <option value="Online Search">Online Search</option>
                                        <option value="Radio">Radio</option>
                                        <option value="Television">Television</option>
                                        <option value="Word of Mouth">Word of Mouth</option>
                                    </select>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="flex justify-start my-4" v-if="showFullForm">
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" v-model="agreed" checked class="w-4 h-4 mr-4 rounded-full text-brand-blue focus:ring-1 focus:ring-green-600" />
                            Remember information for next visit
                        </label>
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
            from: {},
            loading: false,
            wantsToUpdate: false,
            initialLoad: false,
            file: null,
            // agreed: true,
            guest: {
                id: "",
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
        agreed: {
            set(v) {
                return this.$store.commit("GUEST_SAVE_DATA", v);
            },
            get() {
                return this.$store.state.saveForNextTime;
            },
        },
        weHaveData: {
            set(v) {
                return this.$store.commit("GUEST_WEHAVEDATA", v);
            },
            get() {
                return this.$store.state.weHaveData;
            },
        },
        showFullForm() {
            return true;

            if (this.wantsToUpdate) return true;

            if (this.initialLoad) return false;

            if (this.weHaveData) return false;

            return true;
        },
        hasFileUpload() {
            if (this.file) return true;

            return false;
        },
    },
    methods: {
        async gotoNext() {
            console.log("go to next");
            if (this.initialLoad && !this.wantsToUpdate) {
                this.confirmGuest();
                return;
            }

            let guestFormData = new FormData();
            if (this.hasFileUpload) {
                guestFormData.append("identification", this.file);
            }

            if (this.guest.id) {
                guestFormData.append("id", this.guest.id);
            }
            guestFormData.append("email", this.guest.email);
            guestFormData.append("phone", this.guest.phone);
            guestFormData.append("first_name", this.guest.first_name);
            guestFormData.append("last_name", this.guest.last_name);
            guestFormData.append("dob", this.guest.dob);
            guestFormData.append("gender", this.guest.gender);
            guestFormData.append("concerns", this.guest.concerns);
            guestFormData.append("hear_of_us", this.guest.hear_of_us);

            for (var pair of guestFormData.entries()) {
                console.log(pair[0] + ", " + pair[1]);
            }

            this.$store.commit("UPDATE_GUEST", {
                guest: Object.assign({}, this.guest),
                guestFormData: guestFormData,
            });

            if (this.showFullForm) {
                console.log("go and save");
                await this.saveGuest(guestFormData).then((res) => {
                    console.log(res);
                    if (res) {
                        this.$store.commit("COMPLETE_PROFILE");
                        this.$router.push({ path: "/profile/more" });
                    }
                });
            } else {
                this.$store.commit("COMPLETE_PROFILE");
                this.$router.push({ path: "/profile/more" });
            }
        },

        gotoBack() {
            // if (this.from) {
            //     this.$router.push({ path: this.from.fullPath });
            //     return;
            // }
            // this.$router.push({ path: "/extras" });

            this.$router.go(-1);
        },

        submitFile() {
            let formData = new FormData();
            formData.append("file", this.file);
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
            console.log(">>>> 1st element in files array >>>> ", this.file);
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
            } else {
                this.weHaveData = false;
                this.wantsToUpdate = true;

                this.$store.commit("UPDATE_GUEST", {
                    guest: Object.assign({}),
                });
            }

            console.log(res);
            this.loading = false;
            this.initialLoad = false;
        },

        async saveGuest(formData) {
            if (!this.isValidEmail(this.guest.email)) {
                this.$toast.show("Please enter a valid email address");
                return;
            }

            this.loading = true;
            const res = await this.$store.dispatch("saveGuest", formData);

            this.loading = false;

            return res;
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
    middleware({ store, redirect, $toast }) {
        if (!store.state.availability_done) {
            $toast.info("Please provide availability first");
            redirect("/availability");
        }
    },
};
</script>

<style>
</style>
