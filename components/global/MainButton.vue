<template>
    <button v-on="$listeners" :class="buttonDesign"
        class="w-full px-4 py-2 font-bold border rounded-lg focus:ring-2 ring-offset-1 ring-brand-blue-400 border-brand-blue-400 hover:border-brand-blue-500 focus:outline-none">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        outline: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        buttonDesign() {
            if (this.outline)
                return "bg-transparent text-brand-blue-400 hover:text-brand-blue-500";

            return "bg-brand-blue-400 hover:bg-brand-blue-500 text-white";
        },
    },
};
</script>
