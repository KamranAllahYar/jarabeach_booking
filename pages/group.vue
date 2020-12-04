<template>
    <div>
        <div class="text-2xl font-medium">What type of group will this be?</div>
        <div class="uppercase">
            <div class="mt-5">
                <input type="radio" name="group" id="one" value="individual" class="mr-3" v-model="groupType"><label for="one" class="mr-8">Individual</label>
                <input type="radio" name="group" id="two" value="couple" class="mr-3" v-model="groupType"><label for="two" class="mr-8">Couple</label>
                <input type="radio" name="group" id="three" value="family" class="mr-3" v-model="groupType"><label for="three" class="mr-8">Family/Groups</label>
            </div>
        </div>
        <div class="w-full mt-24">
            <div class="w-1/2 my-5">
                <div class="flex items-center">
                    <div class="w-2/6">No of Adults</div>
                    <select name="adult" id="adult" v-model="noOfAdult" :disabled="groupType != 'family'" class="text-sm">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="flex items-center mt-5" v-if="groupType == 'family'">
                    <div class="w-2/6">No of Children</div>
                    <select name="adult" id="adult" v-model="noOfChildren" class="text-sm">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- <div class="w-full mt-24">
          <div>3 Adults</div>

          <div class="w-1/2 my-5">
            <div class="flex items-center">
              <div class="w-3/6">1 Child</div>
              <div class="w-2/6 italic text-gray-600">Please specify their age</div>
              <select name="child" id="child_age" class="w-1/6 text-sm">
                <option value="12">12</option>
                <option value="11">11</option>
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>

          <div class="w-1/2 my-5">
            <div class="flex items-center">
              <div class="w-3/6">1 Toddler/Infant</div>
              <div class="w-2/6 italic text-gray-600">Please specify their age</div>
              <select name="toddler" id="toddler_age" class="w-1/6 text-sm">
                <option value="12">12</option>
                <option value="11">11</option>
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>

          <div class="w-1/2 my-5">
            <div class="flex items-center">
              <div class="w-3/6">1 Infant</div>
              <div class="w-2/6 italic text-gray-600">Please specify their age</div>
              <select name="infant" id="infant_age" class="w-1/6 text-sm">
                <option value="12">12</option>
                <option value="11">11</option>
                <option value="10">10</option>
                <option value="9">9</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>
        </div> -->

        <Notification>Some very important message you feel they need to know</Notification>
        <br>
        <span @click="gotoNext()" class="p-3 mt-10 bg-gray-200 rounded cursor-pointer ">Next</span>
    </div>
</template>

<script>
export default {
    layout: "booking",
    data() {
        return {
            groupType: "individual",
            noOfChildren: 0,
            noOfAdult: 1,
        };
    },
    methods: {
        gotoNext() {
            this.$store.commit("UPDATE_GROUP", {
                groupType: this.groupType,
                adult_no: this.noOfAdult,
                child_no: this.noOfChildren,
            });

            this.$router.push({ path: "/availability" });
        },
    },
    watch: {
        groupType(val) {
            if (val == "individual") {
                this.noOfAdult = 1;
            }
            if (val == "couple") {
                this.noOfAdult = 2;
            }
        },
    },
};
</script>

<style>
</style>
