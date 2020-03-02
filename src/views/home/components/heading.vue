<template>
  <div :class="['wrap', `wrap-${skin}`]">
    <div class="left">
      <div class="logo"></div>
      <!-- 未入金 -->
      <template v-if="openAccountIsSuccess !== 0">
        <div class="title-wrap">
          <div class="title">
            {{$t('HEADING.NO_ACCOUNT.TITLE', { minNumber: headingStockOa.minNumber, stkName: headingStockOa.stkName })}}
          </div>
          <div class="subhead">{{$t('HEADING.NO_ACCOUNT.SUB_HEAD')}}</div>
        </div>
      </template>
      <!-- 已入金 -->
      <template v-if="openAccountIsSuccess === 0">
        <div class="title-wrap">
          <div class="title">
            {{$t('HEADING.NO_ACCOUNT.TITLE', { minNumber: headingStockDe.minNumber, stkName: headingStockDe.stkName })}}
          </div>
          <div class="subhead">{{$t('HEADING.ACCOUNT.SUB_HEAD')}}</div>
        </div>
      </template>
    </div>
    <template v-if="openAccountIsSuccess !== 0">
      <div class="right" @click="openAccountHandle">
        <span class="content">{{ renderStatus }}</span>
        <i class="cubeic-arrow arrow"></i>
      </div>
    </template>
    <template v-if="openAccountIsSuccess === 0">
      <div class="right" @click="DepositHandle">
        <span class="content">{{$t('HEADING.BTN')}}</span>
        <i class="cubeic-arrow arrow"></i>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import handleAppOpen from '@/utils/handleAppOpen'
import recordApi from '@/api/modules/api-record'
import i18n from '@/i18n'

export default {
  props: {
    list: Object,
    skin: String,
    urlObj: Object,
    headingStockOa: Object,
    headingStockDe: Object
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
        tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_0')
        break
        // 开户中
      case 1:
        if (openType === 1) {
          tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_1')
        } else {
          tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_1_1')
        }
        break
        // 开户失败
      case 2:
        tpl = openStatusDesc || i18n.t('HEADING.OPEN_STATUS.TYPE_2')
        break
        // 3.基本资料错误
        // 4.影像资料错误 -- H5需要更新错误图片上传
        // BMP处理已转字段：3,4全为退回状态
      case 3:
      case 4:
        tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_4')
        break
        // 基本资料和影像资料错误
      case 5:
        tpl = openStatusDesc || i18n.t('HEADING.OPEN_STATUS.TYPE_5')
        break
        // 未提交开户资料 --> 初始状态
      case 6:
        tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_6')
        break
        // 开户被拒绝
      case 7:
        tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_7')
        break
        // 用户取消开户
      case 8:
        tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_8')
        break
      case 9:
        tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_9')
        break
      case 10:
        tpl = i18n.t('HEADING.OPEN_STATUS.TYPE_10')
        break
      default:
        break
      }
      return tpl
    },
    openAccountIsSuccess() {
      const { openStatus } = this.list
      return openStatus
    }
  },
  methods: {
    openAccountHandle() {
      const url = `${window.OPEN_ACCOUNT}?skin=${this.skin}`
      handleAppOpen(url, this.urlObj['isnew'])
    },
    DepositHandle() {
      recordApi.getOpenBankType().then((res) => {
        const { bankType = 1 } = res
        if (bankType) {
          const url = `${window.GO_DEPOSIT_CN}?skin=${this.skin}`
          handleAppOpen(url, this.urlObj['isnew'])
        } else {
          const url = `${window.GO_DEPOSIT_HK}?skin=${this.skin}`
          handleAppOpen(url, this.urlObj['isnew'])
        }
      })
    }
  },
  created() {
    console.log('皮肤', this.skin)
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
  padding 30px 25px
  margin-bottom 20px
  .left
    display flex
    align-items center
    .logo
      width 80px
      height 80px
      bg-image('logo')
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
