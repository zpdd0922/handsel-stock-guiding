<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  metaInfo() {
    return {
      title: '赠股活动',
      titleTemplate: '%s'
    }
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
#app
  width 100%
  height 100%
  // position relative
  font-family 'MicrosoftYaHei', 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // background-color #000
</style>
