<template>
  <div :class="['wrap', `wrap-${skin}`]">
    <div class="left">
      <div class="title">待领取股票市值（港币）</div>
      <div class="value">503.21</div>
    </div>
    <div class="right">
      <div class="profit">今日盈亏</div>
      <div class="number">+1.00</div>
      <div class="percent">+0.27%</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


export default {
  props: {
    skin: String,
  },
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/mixin';
@import '~common/stylus/common/white-theme';
@import '~common/stylus/common/black-theme';

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
      color $black-theme-f95a29
    .percent
      color $black-theme-f95a29
</style>
