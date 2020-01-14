<template>
  <div :class="['wrap', `wrap-${skin}`]">
    <div class="left">
      <div class="title">最大待领取股票市值（港币）</div>
      <div class="value">{{ mktValueAll }}</div>
    </div>
    <div class="right">
      <div class="profit">今日盈亏</div>
      <div v-if="changeAll > 0" class="number">+{{ changeAll }}</div>
      <div v-if="changeAll === 0" class="number">{{ changeAll }}</div>
      <div v-if="changeAll < 0" class="number">{{ changeAll }}</div>
      <div v-if="changePctAll > 0" class="percent">+{{ changePctAll }}%</div>
      <div v-if="changePctAll === 0" class="percent">{{ changePctAll }}%</div>
      <div v-if="changePctAll < 0" class="percent">{{ changePctAll }}%</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { formatNum } from '@/utils/number'
export default {
  props: {
    skin: String,
    mktValueAll: [String, Number],
    changeAll: [String, Number],
    changePctAll: [String, Number]
  }
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/base/white-theme'
@import '~assets/stylus/base/black-theme'
@import '~assets/stylus/mixin'

.wrap
  display flex
  align-items center
  justify-content space-between
  background-color $white-theme-fff
  padding 40px 25px
  margin-bottom 20px
  .left
    .title
      font-size 24px
      color $white-theme-333
      margin-bottom 20px
    .value
      font-size 66px
      color $white-theme-333
      font-weight 600
  .right
    font-size 24px
    text-align right
    .profit
      color $white-theme-333
      margin-bottom 20px
    .number
      color $white-theme-f95a29
      margin-bottom 13px
    .percent
      color $white-theme-f95a29
.wrap-black
  background-color $black-theme-242426
  .left
    .title
      color $black-theme-fff
    .value
      color $black-theme-fff
  .right
    font-size 24px
    .profit
      color $black-theme-fff
    .number
      color #e5425e
    .percent
      color #e5425e
</style>
