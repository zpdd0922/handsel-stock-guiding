<template>
  <div :class="['stocklist', `stocklist-${skin}`]">
    <ul class="titleHeader">
      <li class="title">{{$t('STOCK_LIST.TITLE_HEADER.TITLE1')}}</li>
      <li class="title">{{$t('STOCK_LIST.TITLE_HEADER.TITLE2')}}</li>
      <li class="title">{{$t('STOCK_LIST.TITLE_HEADER.TITLE3')}}</li>
      <li class="title">{{$t('STOCK_LIST.TITLE_HEADER.TITLE4')}}</li>
      <li class="title">{{$t('STOCK_LIST.TITLE_HEADER.TITLE5')}}</li>
    </ul>
    <div class="contentList" v-for="(item, index) in stockList" :key="index">
      <ul class="stockContent">
        <!-- 名称代码 -->
        <li class="stockItem">
          <p class="stkName">{{ item.stkName }}</p>
          <p>
            <span class="icon-hk"></span>
            <span class="stkCode">{{ item.stkCode }}</span>
          </p>
        </li>
        <!-- 可领数量 -->
        <li class="stockItem">
          <p v-if="!item.maxNumber" class="itemNum">
            <span>{{ item.minNumber }}</span>
          </p>
          <p v-else class="itemNum">
            <span>{{ item.minNumber }}</span>
            <span>~{{ item.maxNumber }}</span>
          </p>
        </li>
        <!-- 市值 -->
        <li
          v-if="!item.maxMktValue || item.maxMktValue === '0.00'"
          class="stockItem"
        >
          <p class="itemNum">
            <span>{{ item.minMktValue }}</span>
          </p>
        </li>
        <li v-else class="stockItem">
          <p class="itemTop">{{ item.minMktValue }}</p>
          <p class="itemBottom">~{{ item.maxMktValue }}</p>
        </li>
        <!-- 现金成本 -->
        <li class="stockItem">
          <p class="itemTop">{{ item.price }}</p>
          <p class="itemBottom">{{ item.cost }}</p>
        </li>
        <!-- 收益 -->
        <li
          v-if="!item.maxIncome || item.maxIncome === '0.00'"
          class="stockItem"
        >
          <p class="itemNum profitColor">
            <span>{{ item.minIncome }}</span>
          </p>
        </li>
        <li v-else class="stockItem">
          <p class="itemTop profitColor">{{ item.minIncome }}</p>
          <p class="itemBottom profitColor">~{{ item.maxIncome }}</p>
        </li>
      </ul>
      <!-- 领取条件 -->
      <ul class="lineBox">
        <li class="leftPart">
          <p v-if="item.displayValidity === 1" class="title">{{$t('STOCK_LIST.LEFT_PART.DISPLAY_VALIDITY_1')}}</p>
          <p v-if="item.displayValidity === 0" class="title">{{$t('STOCK_LIST.LEFT_PART.DISPLAY_VALIDITY_0')}}</p>
          <p>
            <span v-if="item.activeType === 1" class="txtLeft"
              >{{$t('STOCK_LIST.LEFT_PART.ACTIVE_TYPE_1')}}</span
            >
            <span v-if="item.activeType === 2" class="txtLeft"
              >{{$t('STOCK_LIST.LEFT_PART.ACTIVE_TYPE_2')}}<i
                class="question"
                @click="handleClickQuestion(item)"
              ></i>
            </span>
            <span v-if="item.activeType === 3" class="txtLeft"
              >{{$t('STOCK_LIST.LEFT_PART.ACTIVE_TYPE_3')}}<i
                class="question"
                @click="handleClickQuestion(item)"
              ></i>
            </span>
            <span v-if="item.displayValidity === 1" class="txtRight">{{ item.validityPeriod }}</span>
          </p>
        </li>
        <!-- 按钮状态判断 -->
        <li class="rightPart">
          <!-- 首先判断是否已过期 -->
          <template v-if="item.isExpired === 1">
            <cube-button
              v-if="item.isExpired === 1"
              class="getbtn"
              disabled="disabled"
              >{{$t('STOCK_LIST.RIGHT_PART.DISABLED')}}</cube-button
            >
          </template>
          <!-- 然后判断按钮状态 -->
          <template v-else>
            <div v-if="item.busType === 4" class="btnBox">
              <cube-button class="getbtn" disabled="disabled"
                >{{$t('STOCK_LIST.RIGHT_PART.BUS_TYPE_4')}}</cube-button
              >
              <cube-button class="sharebtn" @click="handleClickShare(item)"
                >{{$t('STOCK_LIST.RIGHT_PART.SHARE')}}</cube-button
              >
            </div>
            <div v-if="item.busType === 5" class="btnBox">
              <cube-button class="getbtn" disabled="disabled"
                >{{$t('STOCK_LIST.RIGHT_PART.BUS_TYPE_5')}}</cube-button
              >
              <cube-button class="sharebtn" @click="handleClickShare(item)"
                >{{$t('STOCK_LIST.RIGHT_PART.SHARE')}}</cube-button
              >
            </div>
            <div v-if="item.busType < 4" class="btnBox">
              <cube-button class="getbtn" @click="handleClick(item)"
                >{{$t('STOCK_LIST.RIGHT_PART.GT_BUS_TYPE_4')}}</cube-button
              >
            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import { formatNum } from '@/utils/number'

export default {
  props: {
    skin: String,
    stockList: Array
  },
  methods: {
    handleClick(item) {
      this.$emit('getReward', item)
    },
    handleClickQuestion(item) {
      this.$emit('getRule', item)
    },
    handleClickShare(item) {
      this.$emit('goShare', item)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/base/white-theme'
@import '~assets/stylus/base/black-theme'
@import '~assets/stylus/mixin'

.stocklist
  background-color $white-theme-fff
  // padding: 0 0 17px;
  margin-bottom 20px
  .titleHeader{
    height: 60px;
    display: flex;
    background-color $white-theme-fff
    border-name(1px, $white-theme-e5e5e5, solid, bottom)
    .title {
      box-sizing border-box
      width 20%
      height:60px;
      font-size:24px;
      font-weight:400;
      color:$white-theme-999;
      line-height:60px;
      padding: 0 16px 0 4px
      text-align right
      border-name(1px, $white-theme-e5e5e5, solid, left)
      // border-1px('left', $white-theme-e5e5e5)
    }
    .title:first-child {
      width 22%
      text-align left
      border-left none
      padding: 0 20px 0 20px
    }
    .title:nth-child(2) {
      width 18%
    }
    .title:last-child {
      padding: 0 30px 0 0px
    }
  }

  .stockContent {
    display flex
    .stockItem{
      box-sizing border-box
      width 20%
      height 110px
      padding: 0 16px 0 4px
      text-align right
      overflow-x hidden
      border-name(1px, $white-theme-e5e5e5, solid, left)
      border-name(1px, $white-theme-e5e5e5, solid, bottom)
    }
    .stockItem:first-child {
      width 22%
      text-align left
      border-left none
      padding: 0 20px 0 20px
    }
    .stockItem:nth-child(2) {
      width 18%
    }
    .stockItem:last-child {
      padding: 0 30px 0 20px
    }
    .stkName{
      font-size 28px
      margin-top 20px
      margin-bottom 13px
    }
    .icon-hk{
      display inline-block
      width 34px
      height 23px
      bg-image('HK')
      margin-right 10px
      background-repeat no-repeat
      background-size 100%
    }

    .stkCode {
      font-size 22px
      color $white-theme-999
    }

    .itemNum {
      height: 60px;
      font-size: 24px;
      color: $white-theme-333;
      line-height:100px;
      text-align right
    }
    .itemTop {
      height: 24px;
      font-size: 24px;
      color: $white-theme-333;
      line-height:24px;
      margin 24px 0 14px
      text-align right
    }
    .itemBottom {
      height: 24px;
      font-size: 24px;
      color: $white-theme-333;
      line-height:24px;
      text-align right
    }
    .question {
      color $white-theme-333
      width 21px
      height 21px
      bg-image('question-white')
      display: inline-block
      background-size 100%
      margin-left 6px
      vertical-align middle
    }
    .profitColor {
      color: #EB333B!important;
    }
  }

  .lineBox {
    height: 110px;
    padding: 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-1px('bottom', $white-theme-e5e5e5)
    border-name(1px, $white-theme-e5e5e5, solid, bottom)
    .leftPart {
      .title {
        font-size:24px;
        font-weight:400;
        color: $white-theme-999;
        line-height:38px;
      }
      .txtLeft {
        height: 24px;
        font-size: 24px;
        color: $white-theme-333;
        line-height:24px;
        margin 20px 0 24px
        text-align right
        vertical-align middle
      }
      .txtRight {
        height: 24px;
        font-size: 24px;
        color: $white-theme-333;
        line-height:24px;
        text-align right
        vertical-align middle
        margin-left 20px
      }
    }
    .btnBox{
      width 100%
      height 100%
    }
    .getbtn {
      display inline-block
      width:140px;
      height:54px;
      border-radius:4px;
      font-size:28px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height 28px
      text-align center
      padding 0
    }
    .sharebtn {
      display inline-block
      margin-left 20px
      width:140px;
      height:54px;
      border-radius:4px;
      font-size:28px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height 28px
      text-align center
      padding 0
    }
    .question {
      display inline-block
      color $white-theme-333
      width 21px
      height 21px
      bg-image('question-white')
      display: inline-block
      background-size 100%
      margin-left 6px
      vertical-align middle
      margin-bottom 4px
    }
  }

.stocklist-black
  background-color $black-theme-242426
  .titleHeader{
    background-color $black-theme-2a2a2d
    border-name(1px, $white-theme-2e2e33, solid, bottom)
    // border-1px('bottom', $white-theme-2e2e33)
    .title {
      color:$black-theme-999;
      border-name(1px, $white-theme-2e2e33, solid, left)
      // border-1px('left', $white-theme-2e2e33)
    }
  }

  .stockContent {
    .stockItem{
      border-name(1px, $white-theme-2e2e33, solid, left)
      border-name(1px, $white-theme-2e2e33, solid, bottom)
    }
    .stkName {
      color $black-theme-fff
    }
    .stkCode {
      color $black-theme-999
    }
    .itemNum {
      color: $black-theme-fff;
    }
    .itemTop {
      color: $black-theme-fff;
    }
    .itemBottom {
      color: $black-theme-fff;
    }

  }

  .lineBox {
    // border-1px('bottom', $white-theme-2e2e33)
    border-name(1px, $white-theme-2e2e33, solid, bottom)
    .leftPart {
      .title {
        color: $black-theme-999;
      }
      .txtLeft {
        color: $black-theme-fff;
      }
      .txtRight {
        color: $black-theme-fff;
      }
    }
    .rightPart {
      .btnBox >>> .cube-btn {
        background-color #fc724c
      }
    }
    .question {
      color $black-theme-999
      bg-image('question-black')
    }
  }
</style>
