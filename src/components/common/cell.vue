<template>
  <div>
    <div class="root box-between">
      <slot name="icon">

      </slot>
      <div>
        <h1>{{title}}</h1>
      </div>
      <div>
        <div class="back_black"/>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
          title:{
            type:String,
            default:''
          }
        },
        data() {
            return {}
        },
        methods: {

        }
    }
</script>
<style lang="less" scoped>

</style>
