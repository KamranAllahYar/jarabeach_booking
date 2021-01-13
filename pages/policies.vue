<template>
    <div>
        <h1 class="mb-6 text-2xl font-bold text-center">Please accept our policies</h1>

        <div class="flex justify-center space-x-6">
            <div class="w-6/12">
                <div class="px-6 pt-6 text-gray-700 bg-white border rounded-lg shadow-lg">
                    <div class="border rounded-md" v-if="currentPolicy">
                        <div class="grid grid-cols-2 px-3 py-4 space-x-3 border-b">
                            <div class="text-base font-bold capitalize">{{ currentPolicy.name }}</div>
                        </div>

                        <div class="px-3 py-4">
                            <div v-html="currentPolicy.content"></div>
                        </div>

                        <div class="flex justify-start px-3 py-4">
                            <label class="inline-flex items-center font-bold cursor-pointer">
                                <input type="checkbox" v-model="agreed" class="w-6 h-6 mr-4 text-green-600 rounded-full focus:ring-1 focus:ring-green-600" />
                                I will accept the terms and condition
                            </label>
                        </div>
                    </div>

                    <div class="flex w-full my-6 space-x-6">
                        <MainButton outline @click="gotoBack()">Back</MainButton>
                        <MainButton @click="gotoNext()">Next</MainButton>
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
                  className: "bg-yellow-500"
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
            $toast.info("Please provide profile information first");
            redirect("/profile");
        }
    },
};
</script>

<style>
</style>
