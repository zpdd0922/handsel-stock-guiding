<template>
  <div :class="['wrap', `wrap-${skin}`]">
    <div class="left">
      <div class="logo"></div>
      <!-- a、若开户配置赠股 -->
      <div v-if="renderStatus!=='开户预批通过'" class="title-wrap">
        <div class="title">您有3股中国平安待领取！</div>
        <div class="subhead">新人开户，立领股票</div>
      </div>
      <!-- b、若开户配置免佣 -->
      <div v-if="false" class="title-wrap">
        <div class="title">您有90天港股免佣待领取！</div>
        <div class="subhead">新人开户，立领免佣</div>
      </div>
      <!-- a、若入金配置的是赠股（多档位取最低档） -->
      <div v-if="renderStatus==='开户预批通过'" class="title-wrap">
        <div class="title">您有3股中国平安待领取</div>
        <div class="subhead">首次入金就送蓝筹股</div>
      </div>
      <!-- b、若入金配了现金红包则显示（{218}取低档，{1000}取高档） -->
      <div v-if="renderStatus==='开户预批通过'&& false" class="title-wrap">
        <div class="title">您有218元现金红包待领取！</div>
        <div class="subhead">首次入金最高送1000元</div>
      </div>
    </div>
    <div class="right" @click="openAccountHandle">
      <span class="content">{{ renderStatus }}</span>
      <i class="cubeic-arrow arrow"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import handleAppOpen from '@/utils/handleAppOpen'

export default {
  props: {
    list: Object,
    skin: String,
    urlObj: Object
  },
  data() {
    return {
      openStatus: ''
    }
  },
  computed: {
    renderStatus() {
      const { openStatus, openStatusDesc, openType } = this.list
      let tpl = ''
      switch (openStatus) {
        // 开户预批通过
        case 0:
          tpl = '开户预批通过'
          break
        // 开户中
        case 1:
          if (openType === 1) {
            tpl = '资料审核中'
          } else {
            tpl = '开户中'
          }
          break
        // 开户失败
        case 2:
          tpl = openStatusDesc || '开户失败'
          break
        // 3.基本资料错误
        // 4.影像资料错误 -- H5需要更新错误图片上传
        // BMP处理已转字段：3,4全为退回状态
        case 3:
        case 4:
          tpl = '资料被退回'
          break
        // 基本资料和影像资料错误
        case 5:
          tpl = openStatusDesc || '资料被退回'
          break
        // 未提交开户资料 --> 初始状态
        case 6:
          tpl = '立即开户'
          break
        // 开户被拒绝
        case 7:
          tpl = '开户被拒绝'
          break
        // 用户取消开户
        case 8:
          tpl = '您已取消开户'
          break
        case 9:
          tpl = '资料审核通过'
          break
        case 10:
          tpl = '开户中'
          break
        default:
          break
      }
      return tpl
    }
  },
  methods: {
    openAccountHandle() {
      const url = `${window.OPEN_ACCOUNT}?skin=${this.skin}`
      handleAppOpen(url, this.urlObj['isnew'])
    }
  },
  created() {
    console.log('皮肤', this.skin)
  }
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
  padding 30px 25px
  margin-bottom 20px
  .left
    display flex
    align-items center
    .logo
      width 80px
      height 80px
      bg-image('home/logo')
      background-repeat no-repeat
      background-size 100%
    .title-wrap
      padding-left 14px
      line-height 39px
      .title
        font-size 30px
        color $white-theme-333
        margin-bottom 14px
      .subhead
        font-size 26px
        color $black-theme-999
  .right
    font-size 26px
    .content
      color $black-theme-f95a29
      padding-right 5px
    .arrow
      color $white-theme-999
.wrap-black
  background-color $black-theme-242426
  .left
    .title-wrap
      .title
        color $black-theme-fff
</style>
