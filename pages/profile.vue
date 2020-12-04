<template>
    <div class="h-screen m-10">
        <div class="w-full">
            <div class="flex h-screen">
                <div class="w-1/6 text-center ">
                    <SideBar/>
                </div>
                <form @submit.prevent="gotoNext()" class="block w-5/6 p-20 border">
                    <div  class="w-2/3 m-auto space-y-10 h-3/4">
                        <div class="space-y-10" v-if="!signedIn">
                            <div class="flex space-x-24 full">
                                <input required type="email" id="email" placeholder="Email Address" class="w-1/2 rounded" v-model="guest.email">
                                <input required type="tel" id="tel" placeholder="Phone Number" class="w-1/2 rounded" v-model="guest.phone">
                            </div>
                            <div class="flex w-full space-x-24">
                                <input required type="text" id="fname" placeholder="First Name" class="w-1/2 rounded" v-model="guest.first_name">
                                <input required type="text" id="lname" placeholder="Last Name" class="w-1/2 rounded" v-model="guest.last_name">
                            </div>
                            <div class="flex w-full space-x-24">
                                <div class="w-1/2">
                                    <div class="mb-2 text-gray-600">Gender:</div>
                                    <input type="radio" name="gender" id="male" value="male" class="mr-2" v-model="guest.gender"><label for="male" class="mr-3">Male</label>
                                    <input type="radio" name="gender" id="female" value="female"  class="mr-2" v-model="guest.gender"><label for="female">Female</label>
                                </div>
                                <div class="w-1/2">
                                    <label for="dob" class="text-gray-600">Date of Birth</label>
                                    <input type="date" class="w-full rounded" v-model="guest.dob">
                                </div>
                            </div>
                            <input type="text" placeholder="State any dietary concerns (e.g vegetarian)" v-model="guest.concerns" class="w-full rounded">
                            <div class="flex w-full space-x-24">
                                <div class="flex items-center w-1/2 pr-3 border border-gray-500 rounded">
                                    <input required type="text" placeholder="Upload Identification" v-model="guest.identification" class="w-full border-none rounded">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="18" height="18" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" stroke-width="2" 
                                        stroke-linecap="round" stroke-linejoin="round" 
                                        class="feather feather-upload">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                                    </svg>
                                </div>
                                <select name="social" id="hear_of_us" class="w-1/2 rounded" v-model="guest.hear_of_us">
                                    <option selected value="info">How did you hear about us</option>
                                    <option value="friend">Friend</option>
                                    <option value="employee">Employee</option>
                                    <option value="social-media">Social media</option>
                                </select>
                            </div>
                        </div>
                        <div v-else>
                            <div class="flex items-center">
                                <input type="text" placeholder="mark.slade@gmail.com" class="w-1/2 mr-2 rounded">
                                <svg class="w-8 h-8 text-green-500" 
                                    fill="currentColor" viewBox="0 0 20 20" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                        clip-rule="evenodd">
                                    </path>
                                </svg>
                            </div>
                            <div class="mt-6">Hi Mark! Welcome back to Jara Beach Resorts <br>We have used your details from the last booking, however <br> if you would like to make any changes click <span class="font-semibold text-blue-400 cursor-pointer">here</span></div>
                        </div>

                        <textarea required name="full-names" id="full_names" rows="6" placeholder="Full names of everyone in your group" class="w-full rounded" v-model="guest.full_names"></textarea>
                    </div>
                    <button type="button" class="p-3 mt-10 bg-gray-200 rounded" @click="toggleSignin">Sign-in check</button>
                    
                    <button type="submit" class="p-3 mt-10 bg-gray-200 rounded cursor-pointer ">Next</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            signedIn: false,
            guest: 
                {
                    email: '',
                    phone: '',
                    gender: '',
                    dob: '',
                    first_name: '',
                    last_name: '',
                    concerns: '',
                    identification: '',
                    hear_of_us: '',
                    full_names: '',
                }
        }
    },
    methods: {
        toggleSignin() {
            this.signedIn = !this.signedIn;
        },
        clearForm() {
            this.guest.email ='';
            this.guest.phone = '';
            this.guest.gender = '';
            this.guest.dob = '';
            this.guest.first_name = '';
            this.guest.last_name = '';
            this.guest.identification = '';
            this.guest.concerns = '';
            this.guest.hear_of_us = '';
            this.guest.full_names = '';
        },

        gotoNext(){
            const form = {
                email: this.guest.email,
                phone: this.guest.phone,
                gender: this.guest.gender,
                dob: this.guest.dob,
                first_name: this.guest.first_name,
                last_name: this.guest.last_name,
                concerns: this.guest.concerns,
                identification: this.guest.identification,
                hear_of_us: this.guest.hear_of_us,
                full_names: this.guest.full_names,
            }
            this.$store.commit("UPDATE_GUEST", form);

            this.$store.dispatch("createBooking");


            this.clearForm();
            // this.$router.push({path: "/policies"})
        }
    }
}
</script>

<style>

</style>