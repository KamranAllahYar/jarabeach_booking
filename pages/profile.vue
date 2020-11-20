<template>
    <div class="h-screen m-10">
        <div class="w-full">
            <div class="flex h-screen">
                <div class="w-1/6 text-center ">
                    <SideBar/>
                </div>
                <div class="w-5/6 p-20 border">
                    <form action="" class="w-2/3 m-auto space-y-10">
                        <div class="space-y-10" v-if="!signedIn">
                            <div class="flex space-x-24 full">
                                <input type="text" placeholder="Email Address" class="w-1/2 rounded">
                                <input type="text" placeholder="Phone Number" class="w-1/2 rounded">
                            </div>
                            <div class="flex w-full space-x-24">
                                <input type="text" placeholder="First Name" class="w-1/2 rounded">
                                <input type="text" placeholder="Last Name" class="w-1/2 rounded">
                            </div>
                            <input type="text" placeholder="State any dietary concerns (e.g vegetarian)" class="w-full rounded">
                            <div class="flex w-full space-x-24">
                                <div class="flex items-center w-1/2 pr-3 border border-gray-500 rounded">
                                    <input type="text" placeholder="Upload Identification" class="w-full border-none rounded">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="18" height="18" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" stroke-width="2" 
                                        stroke-linecap="round" stroke-linejoin="round" 
                                        class="feather feather-upload">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                                    </svg>
                                </div>
                                <select name="social" id="social_link" class="w-1/2 rounded">
                                    <option value="info">How did you hear about us</option>
                                    <option value="friend">Friend</option>
                                    <option value="employee">Employee</option>
                                    <option value="social-media">Social media</option>
                                </select>
                            </div>
                        </div>
                        <div v-else>
                            <div class="flex items-center">
                                <input type="text" placeholder="hilkia@example.com" class="w-1/2 mr-2 rounded">
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

                        <textarea name="group-name" id="group_name" rows="6" placeholder="Full names of everyone in your group" class="w-full rounded"></textarea>
                    </form>
                    <button class="p-3 mt-10 bg-gray-200 rounded" @click="toggleSignin">Sign-in check</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            signedIn: false,
        }
    },
    methods: {
        toggleSignin() {
            this.signedIn = !this.signedIn;
        }
    }
}
</script>

<style>

</style>