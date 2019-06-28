<template>
  <div id="app">
    <router-view/>
    <template v-if="isLoading">
      <loading />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$route.meta.title,
      titleTemplate: '%s'
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.viewLoad.isLoading
    })
  }
}
</script>

<style lang="stylus">
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
#app
  width 100%
  height 100%
  // position relative
  font-family 'MicrosoftYaHei', 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // background-color #000
</style>