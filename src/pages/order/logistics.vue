<template>

</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        },
        beforeMount() {
          KDNWidget.run({
            serviceType: "A",
            expCode: this.$route.params.code,
            expNo: this.$route.params.logistics_no,
          })
        }
    }
</script>
<style lang="less" scoped>

</style>
