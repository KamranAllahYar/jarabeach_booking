<template>
  <div>
    <!-- <ExtrasSpecialOverNight v-if="hasBookingSelected" /> -->
    <div class="px-3">
      <div class="text-3xl font-semibold text-rubik">Guest(s) Details</div>

      <div class="mt-3 mb-8 text-rubik text-gray-text">
        Please give us some information about you
      </div>
      <div class="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-6">
        <div class="w-full md:w-8/12">
          <form @submit.prevent class="pt-6 text-gray-700 bg-transparent">
            <div class="">
              <div class="px-3 py-4 border-b" v-if="weHaveData && !wantsToUpdate">
                <div>
                  Hi {{ guest.first_name }}, welcome back to Jara Beach Resort. We have
                  used your details from the last booking, however if you would like to
                  make any changes
                  <span
                    @click="wantsToUpdate = true"
                    class="font-bold cursor-pointer text-brand-blue"
                    >click here</span
                  >
                </div>
              </div>
              <template v-if="showFullForm">
                <div class="grid px-3 py-4 md:grid-cols-2 gap-5">
                  <div>
                    <!-- <div class="text-base font-bold">First Name</div> -->
                    <input
                      required
                      type="text"
                      name="first_name"
                      v-model="guest.first_name"
                      class="w-full px-2 border-transparent bg-white border border-borderColor-light rounded-xlg p-3"
                      placeholder="First Name"
                      style="box-shadow: none"
                    />
                  </div>
                  <div>
                    <!-- <div class="text-base font-bold">Last Name</div> -->
                    <input
                      required
                      type="text"
                      name="last_name"
                      v-model="guest.last_name"
                      class="w-full px-2 border-transparent bg-white border border-borderColor-light rounded-xlg p-3"
                      placeholder="Last Name"
                      style="box-shadow: none"
                    />
                  </div>
                  <div>
                    <!-- <div class="text-base font-bold">Email address</div> -->
                    <div class="flex items-center">
                      <input
                        type="email"
                        required
                        v-model="guest.email"
                        class="w-full px-2 border-transparent bg-white border border-borderColor-light rounded-xlg p-3"
                        placeholder="Email address"
                        style="box-shadow: none"
                      />
                      <Loading v-if="loading" />
                      <svg
                        v-if="weHaveData && !wantsToUpdate"
                        class="inline-block w-6 h-6 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <!-- <div class="flex items-center">
                      <input
                        type="email"
                        required
                        v-model="guest.email_confirm"
                        class="w-full px-2 border-transparent bg-white border border-borderColor-light rounded-xlg p-3"
                        placeholder="Email"
                        style="box-shadow: none"
                      />
                    </div> -->
                  </div>
                  <div v-if="showFullForm">
                    <!-- <div class="text-base font-bold">Phone number</div> -->
                    <input
                      type="number"
                      required
                      v-model="guest.phone"
                      class="w-full px-2 border-transparent bg-white border border-borderColor-light rounded-xlg p-3"
                      placeholder="Phone number"
                      style="box-shadow: none"
                    />
                  </div>
                </div>
                <div class="grid px-3 gap-5 md:grid-cols-2">
                  <div>
                    <!-- <div class="text-base font-bold">Gender</div> -->
                    <select
                      required
                      v-model="guest.gender"
                      class="w-full px-2 border-transparent bg-white border border-borderColor-light rounded-xlg p-3"
                      style="box-shadow: none"
                      placeholder="test"
                    >
                      <!-- <option value="" hidden selected>Gender</option> -->
                      <option value="" disabled hidden>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <!-- <div class="text-base font-bold">Date of Birth</div> -->
                    <input
                      type="text"
                      required
                      v-model="guest.dob"
                      onfocus="(this.type='date')"
                      :max="last18Year + '-01-01'"
                      class="w-full px-2 border-transparent bg-white border border-borderColor-light rounded-xlg p-3"
                      placeholder="Date of Birth"
                      ref="dob"
                      style="box-shadow: none"
                    />
                  </div>
                </div>
                <div class="px-3 py-4 border-b">
                  <div>
                    <textarea
                      placeholder="State any dietary or setup requirements (i.e baby bathtub or children’s cot)"
                      v-model="guest.concerns"
                      class="w-full px-2 border-transparent bg-white border border-borderColor-light rounded-xlg p-3"
                    ></textarea>
                  </div>
                </div>
                <div class="px-3 py-4 border-b">
                  <div>
                    <div class="mb-2 text-lg font-normal">
                      Upload Image [face] identification (i.e. passport, national ID,
                      driver's license) - Max: 1 MB
                    </div>

                    <template v-if="guest.identification && !hasFileUpload">
                      <div v-if="isPdf(guest.identification)" class="my-3">
                        <div
                          class="inline-block px-3 py-3 rounded-lg cursor-pointer hover:bg-blue-100"
                          @click="lightboxIndex = 0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-12 h-12"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M128 0c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V128L352 0H128z"
                              fill="#e2e5e7"
                            />
                            <path
                              d="M384 128h96L352 0v96c0 17.6 14.4 32 32 32z"
                              fill="#b0b7bd"
                            />
                            <path fill="#cad1d8" d="M480 224l-96-96h96z" />
                            <path
                              d="M416 416c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v160z"
                              fill="#f15642"
                            />
                            <g fill="#fff">
                              <path
                                d="M101.744 303.152c0-4.224 3.328-8.832 8.688-8.832h29.552c16.64 0 31.616 11.136 31.616 32.48 0 20.224-14.976 31.488-31.616 31.488h-21.36v16.896c0 5.632-3.584 8.816-8.192 8.816-4.224 0-8.688-3.184-8.688-8.816v-72.032zm16.88 7.28v31.872h21.36c8.576 0 15.36-7.568 15.36-15.504 0-8.944-6.784-16.368-15.36-16.368h-21.36zM196.656 384c-4.224 0-8.832-2.304-8.832-7.92v-72.672c0-4.592 4.608-7.936 8.832-7.936h29.296c58.464 0 57.184 88.528 1.152 88.528h-30.448zm8.064-72.912V368.4h21.232c34.544 0 36.08-57.312 0-57.312H204.72zM303.872 312.112v20.336h32.624c4.608 0 9.216 4.608 9.216 9.072 0 4.224-4.608 7.68-9.216 7.68h-32.624v26.864c0 4.48-3.184 7.92-7.664 7.92-5.632 0-9.072-3.44-9.072-7.92v-72.672c0-4.592 3.456-7.936 9.072-7.936h44.912c5.632 0 8.96 3.344 8.96 7.936 0 4.096-3.328 8.704-8.96 8.704h-37.248v.016z"
                              />
                            </g>
                            <path
                              d="M400 432H96v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z"
                              fill="#cad1d8"
                            />
                          </svg>
                          Identification
                        </div>
                      </div>
                      <img
                        v-else
                        :src="guest.identification"
                        class="w-3/5"
                        @click="lightboxIndex = 0"
                      />
                    </template>
                    <CoolLightBox
                      :items="itemsForLightBox"
                      :index="lightboxIndex"
                      @close="lightboxIndex = null"
                    >
                    </CoolLightBox>

                    <div
                      class="inline-flex items-center justify-between mt-2 cursor-pointer border border-borderColor-light rounded-xlg md:w-1/2 w-full p-3"
                      @click="$refs.file.click()"
                    >
                      <span v-if="hasFileUpload">{{ file.name }}</span>
                      <template v-else>
                        <span v-if="guest.identification">Update file</span>
                        <span v-else>Upload File</span>
                      </template>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.75 12.75V8.25L5.25 9.75"
                          stroke="#909090"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.75 8.25L8.25 9.75"
                          stroke="#909090"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.5 7.5V11.25C16.5 15 15 16.5 11.25 16.5H6.75C3 16.5 1.5 15 1.5 11.25V6.75C1.5 3 3 1.5 6.75 1.5H10.5"
                          stroke="#909090"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.5 7.5H13.5C11.25 7.5 10.5 6.75 10.5 4.5V1.5L16.5 7.5Z"
                          stroke="#909090"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="file"
                      class="hidden"
                      ref="file"
                      @input="handleFileUpload()"
                      accept="image/x-png,image/gif,image/jpeg,application/pdf"
                    />
                  </div>
                  <div>
                    <!-- <div class="text-base font-bold">How did you hear about us?</div> -->
                    <select
                      v-model="guest.hear_of_us"
                      class="px-3 border-transparent md:w-1/2 w-full mt-5 bg-white border border-borderColor-light rounded-xlg p-3"
                      style="box-shadow: none"
                    >
                      <option value="" selected>How did you hear about us?</option>
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
                <!-- <div class="px-3 py-4 border-b"></div> -->
              </template>
            </div>

            <div class="flex justify-start my-4 px-3" v-if="showFullForm">
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="guest.agreed_mailinglist"
                  checked
                  class="w-4 h-4 mr-4 rounded-full text-black focus:ring-1 focus:ring-green-600"
                />
                Sign up for our mailing list
              </label>
            </div>

            <div class="flex justify-start my-4 px-3" v-if="showFullForm">
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="agreed"
                  checked
                  class="w-4 h-4 mr-4 rounded-full text-black focus:ring-1 focus:ring-green-600"
                />
                Keep information for next visit
              </label>
            </div>
            <div class="flex gap-5">
              <button
                @click="clearBooking"
                class="w-64 bg-gray-button rounded-lg py-4 font-rubik text-sm font-medium"
              >
                Restart Booking
              </button>
              <button
                @click="gotoNext()"
                class="w-64 bg-black text-white rounded-lg py-4 font-rubik text-sm font-medium"
              >
                Continue
              </button>
            </div>

            <div class="flex w-full my-6 space-x-2">
              <MainButton type="button" outline @click="gotoBack()">Back</MainButton>
              <!-- <MainButton :loading="loading" @click="gotoNext()">Next</MainButton> -->
            </div>
          </form>

          <!-- <div class="flex items-center w-full my-6 space-x-2">
            <StartOverButton class="w-full"></StartOverButton>
          </div> -->
        </div>
        <div class="flex-shrink-0 w-full px-3 md:px-0 md:w-4/12">
          <ReservationBox showDiscount />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import ExtrasSpecialOverNight from "~/components/ExtrasSpecialOverNight.vue";
export default {
  components: {
    CoolLightBox,
    ExtrasSpecialOverNight,
  },
  layout: "booking",
  data() {
    return {
      from: {},
      loading: false,
      wantsToUpdate: false,
      initialLoad: false,
      file: null,
      // agreed: true,
      lightboxIndex: null,
      guest: {
        id: "",
        email: "",
        email_confirm: "",
        phone: "",
        first_name: "",
        last_name: "",
        dob: "Date of Birth",
        gender: "",
        concerns: "",
        identification: "",
        hear_of_us: "",
        agreed_mailinglist: true,
        is_member: false,
      },
    };
  },
  computed: {
    hasBookingSelected() {
      return this.$store.getters["extras/extrasBookingSelected"];
    },
    itemsForLightBox() {
      return [this.guest.identification];
    },
    last18Year() {
      const today = new Date();
      const currentYear = today.getFullYear();

      //   console.log(currentYear - 18);

      return currentYear - 18;
    },
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
    clearBooking() {
      if (
        window.confirm(
          "Are you sure you want to clear this booking? You will loose all the progress so far!"
        )
      ) {
        let redirectUrl = this.isDayPassBooking ? "/day-pass" : "/guests";
        this.$store.commit("RESET_STORE");
        this.$store.commit("extras/RESET_STORE");
        this.$store.commit("day_pass/RESET_STORE");
        this.$router.push(redirectUrl);
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    },
    getPlaceholder() {
      return `State any dietary, or setup requirements (i.e. baby bathtub or children's cot).`;
    },
    isPdf(identification) {
      if (!identification) return false;
      var fileExt = identification.split(".").pop();

      if (fileExt.toLowerCase() == "pdf") return true;

      return false;
    },
    async gotoNext() {
      //console.log("go to next");
      if (this.initialLoad && !this.wantsToUpdate) {
        //console.log("sd");
        this.confirmGuest();
        return;
      }
      //console.log("sss");

      let guestFormData = new FormData();
      if (this.hasFileUpload) {
        guestFormData.append("identification", this.file);
      } else {
        if (!this.guest.identification) {
          this.$toast.info("Please you must include a means of identification");
          return;
        }
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
      guestFormData.append("concerns", this.guest.concerns ? this.guest.concerns : " ");
      guestFormData.append("hear_of_us", this.guest.hear_of_us);
      guestFormData.append("agreed_mailinglist", this.guest.agreed_mailinglist);

      // for (var pair of guestFormData.entries()) {
      //     //console.log(pair[0] + ", " + pair[1]);
      // }

      this.$store.commit("UPDATE_GUEST", {
        guest: Object.assign({}, this.guest),
        guestFormData: guestFormData,
      });

      if (this.showFullForm) {
        //console.log("go and save");
        try {
          await this.saveGuest(guestFormData);
        } catch (e) {
          //console.log("Catch me here");
          //console.log(e);
          this.loading = false;
          this.$toast.error(e.message ?? e);
          return;
        }

        this.$store.commit("COMPLETE_PROFILE");
        this.$router.push({ path: "/profile/more" });
      } else {
        this.$store.commit("COMPLETE_PROFILE");
        this.$router.push({ path: "/profile/more" });
      }

      this.loading = false;
    },

    gotoBack() {
      // this.$router.go(-1);
      this.$router.push({ path: "/availability" });
    },

    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      //console.log(">>>> 1st element in files array >>>> ", this.file);
      const kbSize = parseFloat(this.file.size / 1024).toFixed(2);
      //console.log(kbSize);

      if (kbSize > 990) {
        //console.log("Too big");
        this.$toast.error("You cannot upload files larger than 1 MB");
        this.file = null;
        this.$refs.file.value = "";
      }
    },

    async confirmGuest() {
      if (!this.isValidEmail(this.guest.email)) {
        this.$toast.show("Please enter a valid email address");
        return;
      }

      //   if (this.guest.email != this.guest.email_confirm) {
      //     this.$toast.show("Please confirm that your email address is correct");
      //     return;
      //   }

      //console.log("confirming guest");

      this.loading = true;
      const res = await this.$store.dispatch("confirmGuest", this.guest.email);

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

      // //console.log(res);
      this.loading = false;
      this.initialLoad = false;
    },

    async saveGuest(formData) {
      if (!this.isValidEmail(this.guest.email)) {
        this.$toast.show("Please enter a valid email address");
        return;
      }

      //   if (this.guest.email != this.guest.email_confirm) {
      //     // this.$toast.show(
      //     //     "Please confirm that your email address is correct"
      //     // );
      //     throw new Error("Please confirm that your email address is correct");
      //   }

      this.loading = true;
      try {
        const res = await this.$store.dispatch("saveGuest", formData);
        this.loading = false;
        return res;
      } catch (e) {
        //console.log(e);
        this.loading = false;
        // this.$toast.error("Something went wrong, please try again");
        // this.$toast.error(e);
        throw new Error(e);
      }

      this.loading = false;
    },

    isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
  created() {
    // console.log("CREATED PROFILE", this.$store.getters);
    if (this.$store.state.guest) {
      // this.guest = Object.assign({}, this.$store.state.guest);
      //   if (this.guest.email) {
      //     this.guest.email_confirm = this.guest.email;
      //   }
    }
  },
  middleware({ store, redirect, $toast }) {
    if (!store.state.availability_done) {
      // $toast.info("Please provide availability first");
      redirect("/availability");
    }
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
