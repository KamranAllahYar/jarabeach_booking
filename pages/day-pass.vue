<template>
    <div>Day Pass is available {{routeName}}</div>
</template>

<script>
export default {
	layout: 'day-pass',
    computed: {
        routeName() {
            return this.$route.name;
        }
    }

}
</script>