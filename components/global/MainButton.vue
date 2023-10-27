<template>
  <!-- <button v-on="$listeners" :class="buttonDesign"
        class="w-full px-4 py-2 font-bold border rounded-lg focus:ring-2 ring-offset-1 ring-brand-blue-400 border-brand-blue-400 hover:border-brand-blue-500 focus:outline-none">
        <div v-if="loading" class="py-1 text-center">
            <Loading class="mx-auto" :color="!outline ? 'text-white' : ''" />
        </div>
        <slot v-else></slot>
    </button> -->
  <!-- <div class="flex gap-5 px-3"> -->
  <button
    v-if="outline"
    v-on="$listeners"
    :disabled="disabled"
    class="w-64 bg-gray-button rounded-lg py-4 font-rubik text-sm font-medium"
  >
    <div v-if="loading" class="py-1 text-center">
      <Loading class="mx-auto" :color="!outline ? 'text-white' : ''" />
    </div>
    <slot v-else></slot>
  </button>
  <button
    v-else-if="summary"
    v-on="$listeners"
    :disabled="disabled"
    class="w-full bg-gray-button rounded-lg py-4 font-rubik text-sm font-medium"
  >
    <div v-if="loading" class="py-1 text-center">
      <Loading class="mx-auto" :color="!summary ? 'text-white' : ''" />
    </div>
    <slot v-else></slot>
  </button>
  <button
    v-else-if="summarybbg"
    v-on="$listeners"
    :disabled="disabled"
    class="w-full bg-black text-white rounded-lg py-4 font-rubik text-sm font-medium"
  >
    <div v-if="loading" class="py-1 text-center">
      <Loading class="mx-auto" :color="!summarybbg ? 'text-white' : ''" />
    </div>
    <slot v-else></slot>
  </button>
  <button
    v-else
    v-on="$listeners"
    :disabled="disabled"
    class="w-64 bg-black text-white rounded-lg py-4 font-rubik text-sm font-medium"
  >
    <div v-if="loading" class="py-1 text-center">
      <Loading class="mx-auto" :color="!outline ? 'text-white' : ''" />
    </div>
    <slot v-else></slot>
  </button>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    disabled: {
      type: "boolean",
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    summary: {
      type: Boolean,
      default: false,
    },
    summarybbg: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonDesign() {
      if (this.outline) return "bg-white text-brand-blue-400 hover:text-brand-blue-500";

      return "bg-brand-blue-400 hover:bg-brand-blue-500 text-white";
    },
    disabledClass() {
      return "opacity-50 cursor-not-allowed";
    },
  },
};
</script>
