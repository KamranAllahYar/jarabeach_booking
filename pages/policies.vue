<template>
    <div>
        <h1 class="mb-6 text-3xl font-semibold">Please accept our Policies</h1>

        <div class="mb-6" v-if="currentPolicy">
            <div class="text-xl font-semibold">{{ currentPolicy.name }}</div>
            <div class="leading-loose text-gray-600">
                <div class="mt-8" v-html="currentPolicy.content">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
                    cupiditate dignissimos quidem adipisci porro dolorem fugiat. Excepturi
                    nulla mollitia molestias doloribus sequi ut, dignissimos accusantium,
                    earum consequatur exercitationem, soluta eius?Asperiores explicabo,
                    saepe deserunt est exercitationem dignissimos aliquid quibusdam,
                    blanditiis rem consectetur in libero nesciunt et consequuntur
                    perspiciatis error quas iste nobis possimus aut cumque inventore id.
                    Quasi, iure accusantium?
                </div>
            </div>

            <label class="inline-flex items-center mt-12 space-x-5 cursor-pointer">
                <input type="checkbox" v-model="agreed" />
                <div>I accept these terms and conditions</div>
            </label>
        </div>

        <button @click="gotoNext()" class="p-3 mt-10 bg-gray-200 rounded">Next</button>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            currentPolicyId: 0,
            agreed: false,
            policies: [],
            acceptedPolicies: [],
        };
    },
    computed: {
        currentPolicy() {
            return this.policies[this.currentPolicyId];
        },
    },
    methods: {
        gotoNext() {
            this.$toast.clear();

            if (!this.agreed) {
                this.$toasted.info("Please accept the policy first");
                return;
            }

            const max = this.policies.length - 1;
            if (this.currentPolicyId < max) {
                this.currentPolicyId++;
                this.agreed = false;
                return;
            }

            this.$router.push({ path: "/summary" });
        },
        getPolicies() {
            this.$axios.get("/policies").then((res) => {
                console.log(res.data.data);
                this.policies = res.data.data;
            });
        },
    },
    created() {
        this.getPolicies();
    },
};
</script>

<style>
</style>
