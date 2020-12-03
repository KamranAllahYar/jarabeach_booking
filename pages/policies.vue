<template>
    <div class="p-6">
        <div>
            <div class="text-3xl font-semibold" v-if="policy">Privacy Policy</div>
            <div class="text-3xl font-semibold" v-else>Photography Policy</div>
        </div>
        <div class="leading-loose text-gray-600">
            <div class="mt-8">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
                cupiditate dignissimos quidem adipisci porro dolorem fugiat. Excepturi
                nulla mollitia molestias doloribus sequi ut, dignissimos accusantium,
                earum consequatur exercitationem, soluta eius?Asperiores explicabo,
                saepe deserunt est exercitationem dignissimos aliquid quibusdam,
                blanditiis rem consectetur in libero nesciunt et consequuntur
                perspiciatis error quas iste nobis possimus aut cumque inventore id.
                Quasi, iure accusantium?
            </div>
            <div class="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
                praesentium in dolore pariatur beatae fuga ratione dolorum tempore
                voluptates saepe aliquid, maiores a blanditiis laudantium nobis ut
                asperiores quas qui?
            </div>
        </div>
        <div class="flex items-center mt-12 space-x-5">
            <div class="flex items-center justify-center w-8 h-8 bg-blue-300">
                <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div>I accept the terms and conditions</div>
        </div>
        <button class="p-3 mt-10 bg-gray-200 rounded" @click="togglePolicies">More</button>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            policy: true,
        };
    },
    methods: {
        togglePolicies() {
            this.policy = !this.policy;
        },
    },
};
</script>

<style>
</style>
