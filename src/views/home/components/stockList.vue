<template>
  <div :class="['stocklist', `stocklist-${skin}`]">
    <ul class="titleHeader">
      <li class="title">名称代码</li>
      <li class="title">可领数量</li>
      <li class="title">市值</li>
      <li class="title">现金/成本</li>
      <li class="title">收益</li>
    </ul>
    <div class="contentList" v-for="(item, index) in stockList" :key="index">
      <ul class="stockContent">
        <li class="stockItem">
          <p class="stkName">{{ item.stkName }}</p>
          <p>
            <span class="icon-hk"></span>
            <span class="stkCode">{{ item.stkCode }}</span>
          </p>
        </li>
        <li class="stockItem">
          <p class="itemNum">
            <span>{{ item.minNumber }}</span>
            <span>~{{ item.maxNumber }}</span>
          </p>
        </li>
        <li class="stockItem">
          <p class="itemTop">{{ item.minMktValue }}</p>
          <p class="itemBottom">~{{ item.maxMktValue }}</p>
        </li>
        <li class="stockItem">
          <p class="itemTop">{{ item.price }}</p>
          <p class="itemBottom">{{ item.cost }}</p>
        </li>
        <li class="stockItem">
          <p class="itemTop">{{ item.minIncome }}</p>
          <p class="itemBottom">~{{ item.maxIncome }}</p>
        </li>
      </ul>
      <ul class="lineBox">
        <li class="leftPart">
          <p class="title">领取条件/有效期</p>
          <p>
            <span v-if="item.activeType === 1" class="txtLeft">首次开户成功</span>
            <span v-if="item.activeType === 2" class="txtLeft">首次入金成功<i class="question"></i> </span>
            <span v-if="item.activeType === 5" class="txtLeft">首次转仓成功<i class="question"></i> </span>
            <span class="txtRight">{{item.validityPeriod}}</span>
          </p>
        </li>
        <!-- 按钮状态判断 -->
        <li class="rightPart">
          <cube-button v-if="item.busType === 1" class="getbtn" @click="handleClick(item.activeType)">立即领取</cube-button>
          <cube-button v-if="item.busType === 4" class="getbtn" disabled="disabled">入账中</cube-button>
          <cube-button v-if="item.busType === 5" class="getbtn" disabled="disabled">已到账</cube-button>
          <cube-button v-if="item.busType === 6" class="getbtn" disabled="disabled">已过期</cube-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


export default {
  props: {
    skin: String,
  },
  data() {
    return {
      stockList:[
        {
          stkName:'腾讯控股',  // 股票名称
          stkCode:'00070',    // 股票代码
          minNumber: 1,  // 最小领取数量
          maxNumber: 10,  // 最大领取数量
          minMktValue: 324.90,  // 最小市值
          maxMktValue: 3249.00, // 最大市值
          price: 324.90,     // 现价
          cost: 0,              // 成本
          minIncome: 324.90,    // 最小收益
          maxIncome: 3249.00,   // 最大收益
          activeType: 1,        // 奖励类型 1.开户 2.入金 5转仓
          validityPeriod: '2019-09-21',
          busType: 1           //  奖励状态：立即领取，4：入账中，5：已到账，已过期？
        },
        {
          stkName:'腾讯控股',  // 股票名称
          stkCode:'00070',    // 股票代码
          minNumber: 1,  // 最小领取数量
          maxNumber: 10,  // 最大领取数量
          minMktValue: 324.90,  // 最小市值
          maxMktValue: 3249.00, // 最大市值
          price: 324.90,     // 现价
          cost: 0,              // 成本
          minIncome: 324.90,    // 最小收益
          maxIncome: 3249.00,   // 最大收益
          activeType: 2,        // 奖励类型 1.开户 2.入金 5转仓
          validityPeriod: '2019-09-21',
          busType: 4           //  奖励状态：立即领取，4：入账中，5：已到账，已过期？
        },
        {
          stkName:'腾讯控股',  // 股票名称
          stkCode:'00070',    // 股票代码
          minNumber: 1,  // 最小领取数量
          maxNumber: 10,  // 最大领取数量
          minMktValue: 324.90,  // 最小市值
          maxMktValue: 3249.00, // 最大市值
          price: 324.90,     // 现价
          cost: 0,              // 成本
          minIncome: 324.90,    // 最小收益
          maxIncome: 3249.00,   // 最大收益
          activeType: 5,        // 奖励类型 1.开户 2.入金 5转仓
          validityPeriod: '2019-09-21',
          busType: 5           //  奖励状态：立即领取，4：入账中，5：已到账，已过期？
        },
      ]
    }
  },
  mounted() {

  },
  methods: {
    handleClick(activeType){
      this.$emit('getReward',activeType);
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/mixin';
@import '~common/stylus/common/white-theme';
@import '~common/stylus/common/black-theme';

.stocklist
  background-color $white-theme-fff
  padding: 0 0 17px;
  margin-bottom 20px
  .titleHeader{
    height: 60px;
    display: flex;
    background-color $white-theme-fff
    border-1px('bottom', $white-theme-e5e5e5)
    .title {
      width 20%
      height:60px;
      font-size:24px;
      font-weight:400;
      color:$white-theme-999;
      line-height:60px;
      padding: 0 20px 0 0
      text-align right
      border-1px('left', $white-theme-e5e5e5)
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
      padding: 0 30px 0 20px
    }
  }

  .stockContent {
    display flex
    .stockItem{
      width 20%
      height 110px
      padding: 0 20px 0 20px
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
      font-size 30px
      margin-top 20px
      margin-bottom 13px
    }
    .icon-hk{
      display inline-block
      width 34px
      height 23px
      bg-image('home/HK')
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
      bg-image('home/question-white')
      display: inline-block
      background-size 100%
      margin-left 6px
      vertical-align middle
    }
  }

  .lineBox {
    height: 110px;
    padding: 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-1px('bottom', $white-theme-e5e5e5)
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
    .getbtn {
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
      bg-image('home/question-white')
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
    border-1px('bottom', $white-theme-2e2e33)
    .title {
      color:$white-theme-999;
      border-1px('left', $white-theme-2e2e33)
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
    border-1px('bottom', $white-theme-2e2e33)
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
    .question {
      color $black-theme-999
      bg-image('home/question-black')
    }
  }
</style>
