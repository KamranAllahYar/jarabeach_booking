<template>
    <div>
        <h1 class="px-6 mb-6 text-xl font-bold text-center md:px-0 md:text-2xl">Please accept our house rules (required)</h1>

        <div class="flex flex-col justify-center space-y-6 md:space-y-0 md:space-x-6 md:flex-row">
            <div class="w-full md:w-6/12">
                <div class="px-6 pt-6 text-gray-700 bg-white border-t border-b md:border md:rounded-lg md:shadow-lg">
                    <div class="border rounded-md" v-if="currentPolicy">
                        <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
                            <div class="text-base font-bold capitalize">{{ currentPolicy.name }}</div>
                        </div>

                        <div class="px-3 py-4">
                            <pre class="w-full overflow-y-auto h-80" v-html="currentPolicy.content"></pre>
                        </div>

                        <div class="px-3 py-4">
                            <label class="inline-flex items-center font-bold cursor-pointer">
                                <input type="checkbox" v-model="agreed" class="w-6 h-6 mr-4 text-green-600 rounded-full focus:ring-1 focus:ring-green-600" />
                                I accept Jara's booking terms and conditions
                            </label>

                            <div class="mt-6">
                                I specifically confirm that I:
                                <ol class="pl-6 mt-1 list-decimal">
                                    <li>understand the use of illegal drugs is strictly prohibited</li>
                                    <li>understand my booking permits only the number of guests stated on my booking</li>
                                    <li>agree to abide by all house rules and regulations set forth to ensure the peace and enjoyment for all guests</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div class="flex w-full my-6 space-x-2">
                        <MainButton outline @click="gotoBack()">Back</MainButton>
                        <MainButton @click="gotoNext()">Next</MainButton>
                    </div>
                </div>

                <div class="flex items-center w-full my-6 space-x-2">
                    <StartOverButton class="w-full"></StartOverButton>
                </div>
            </div>
            <div class="flex-shrink-0 w-full px-6 md:px-0 md:w-3/12">
                <ReservationBox showDiscount />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            currentPolicyId: 0,
            agreed: false,
            acceptedPolicies: [],
        };
    },
    computed: {
        currentPolicy() {
            return this.policies[this.currentPolicyId];
        },
        policies() {
            return this.$store.getters.policies;
        },
    },
    methods: {
        gotoNext() {
            this.$toast.clear();

            if (!this.agreed) {
                this.$toasted.error("Please accept the policy first", {
                    duration: 6000,
                    position: "bottom-center",
                    className: "bg-yellow-500",
                });
                return;
            }

            const max = this.policies.length - 1;
            if (this.currentPolicyId < max) {
                this.currentPolicyId++;
                this.agreed = false;
                return;
            }

            this.$store.commit("COMPLETE_POLICY");

            this.$router.push({ path: "/summary" });
        },
        gotoBack() {
            this.$router.push({ path: "/profile/more" });
        },
    },
    mounted() {
        if (this.$store.state.policy_done) {
            this.agreed = true;
            this.currentPolicyId = this.policies.length - 1;
        }
    },
    middleware({ store, redirect, $toast }) {
        if (!store.state.profile_done) {
            // $toast.info("Please provide profile information first");
            redirect("/profile");
        }
    },
};
</script>

<style>
pre {
    font-family: "Maison Neue", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;

    white-space: pre-wrap; /* Since CSS 2.1 */
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
