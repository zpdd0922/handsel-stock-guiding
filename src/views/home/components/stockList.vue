<template>
  <div :class="['stocklist', `stocklist-${skin}`]">
    <div class="fixBox">
      <table>
        <tr>
          <th class="title">名称代码</th>
        </tr>
        <tr v-for="(item, index) in stockList" :key="index">
          <td>
            <p class="stkName">{{ item.stkName }}</p>
            <p>
              <span class="icon-hk"></span>
              <span class="stkCode">{{ item.stkCode }}</span>
            </p>
          </td>
        </tr>
      </table>
    </div>
    <div class="swiperBox swiper-container">
      <i v-if="arrowLeft" class="cubeic-back arrow-left"></i>
      <i v-if="arrowRight" class="cubeic-arrow arrow-right"></i>
      <div class="swiper-wrapper">
        <!-- 可领数量-->
        <div class="swiper-slide colum">
          <table>
            <tr>
              <th class="title">可领数量</th>
            </tr>
            <tr v-for="(item, index) in stockList" :key="index">
              <td>
                <p class="itemNum">
                  {{ item.stkQuantityMin }}~{{ item.stkQuantityMax }}
                </p>
              </td>
            </tr>
          </table>
        </div>
        <!-- 市值 -->
        <div class="swiper-slide colum">
          <table>
            <tr>
              <th class="title">市值</th>
            </tr>
            <tr v-for="(item, index) in stockList" :key="index">
              <td>
                <p class="itemTop">{{ item.stkValueMin }}</p>
                <p class="itemBottom">~{{ item.stkValueMax }}</p>
              </td>
            </tr>
          </table>
        </div>
        <!-- 现价/成本 -->
        <div class="swiper-slide colum">
          <table>
            <tr>
              <th class="title">现价/成本</th>
            </tr>
            <tr v-for="(item, index) in stockList" :key="index">
              <td>
                <p class="itemTop">{{ item.priceNow }}</p>
                <p class="itemBottom">{{ item.cost }}</p>
              </td>
            </tr>
          </table>
        </div>
        <!-- 收益 -->
        <div class="swiper-slide colum">
          <table>
            <tr>
              <th class="title">收益</th>
            </tr>
            <tr v-for="(item, index) in stockList" :key="index">
              <td>
                <p class="itemTop">{{ item.profitMin }}</p>
                <p class="itemBottom">~{{ item.profitMax }}</p>
              </td>
            </tr>
          </table>
        </div>
        <!-- 领取条件/有效期 -->
        <div class="swiper-slide colum">
          <table>
            <tr>
              <th class="title" nowrap="nowrap">领取条件/有效期</th>
            </tr>
            <tr v-for="(item, index) in stockList" :key="index">
              <td>
                <p class="itemTop">
                  {{ item.condition }}<i class="question"></i>
                </p>
                <p class="itemBottom">{{ item.validityPeriod }}</p>
              </td>
            </tr>
          </table>
        </div>
        <!-- 按钮列表 -->
        <div class="swiper-slide colum">
          <table>
            <tr>
              <th class="title" nowrap="nowrap"></th>
            </tr>
            <tr v-for="(item, index) in stockList" :key="index">
              <td>
                <cube-button class="getbtn">{{ item.btnTxt }}</cube-button>
              </td>
            </tr>
          </table>
        </div>
        <!-- <div class="swiper-slide"></div> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import 'swiper/dist/css/swiper.min.css';
import { Swiper } from 'swiper/dist/js/swiper.esm';

export default {
  props: {
    skin: String,
  },
  data() {
    return {
      arrowLeft: false,
      arrowRight: true,
      stockList:[
        {
          stkName:'腾讯控股',
          stkCode:'00070',
          stkQuantityMin: 1,
          stkQuantityMax: 10,
          stkValueMin: 324.90,
          stkValueMax: 3249.00,
          priceNow: 324.90,
          cost: 0,
          profitMin: 324.90,
          profitMax: 3249.00,
          condition: '首次入金成功',
          validityPeriod: '2019-09-21',
          btnTxt: '立即领取'
        },
        {
          stkName:'腾讯控股',
          stkCode:'00070',
          stkQuantityMin: 1,
          stkQuantityMax: 10,
          stkValueMin: 324.90,
          stkValueMax: 3249.00,
          priceNow: 324.90,
          cost: 0,
          profitMin: 324.90,
          profitMax: 3249.00,
          condition: '首次入金成功',
          validityPeriod: '2019-09-21',
          btnTxt: '入账中'
        },
        {
          stkName:'腾讯控股',
          stkCode:'00070',
          stkQuantityMin: 1,
          stkQuantityMax: 10,
          stkValueMin: 324.90,
          stkValueMax: 3249.00,
          priceNow: 324.90,
          cost: 0,
          profitMin: 324.90,
          profitMax: 3249.00,
          condition: '首次入金成功',
          validityPeriod: '2019-09-21',
          btnTxt: '已到账'
        },
        {
          stkName:'腾讯控股',
          stkCode:'00070',
          stkQuantityMin: 1,
          stkQuantityMax: 10,
          stkValueMin: 324.90,
          stkValueMax: 3249.00,
          priceNow: 324.90,
          cost: 0,
          profitMin: 324.90,
          profitMax: 3249.00,
          condition: '首次入金成功',
          validityPeriod: '2019-09-21',
          btnTxt: '已过期'
        }
      ]
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      setTimeout( () => {
        new Swiper('.swiper-container', {
          slidesPerView: 3,
          spaceBetween: 0,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          on: {
            reachBeginning: () => {
              // 到了第一个slide,显示右箭头
              this.arrowLeft = false;
              this.arrowRight = true;
            },
            reachEnd: () =>{
              // 到了最后一个slide,显示左箭头
              this.arrowLeft = true;
              this.arrowRight = false;
            },
          },
          observer: true, // 修改swiper自己或子元素时，自动初始化swiper
          observeParents: true // 修改swiper的父元素时，自动初始化swiper
        });
      }, 100);
    },
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/mixin';
@import '~common/stylus/common/white-theme';
@import '~common/stylus/common/black-theme';

.stocklist
  background-color $white-theme-fff
  padding: 17px 0px;
  margin-bottom 20px
  .fixBox {
    display: inline-block;
    width: 164px;
    table {
      tr {
        height: 110px;
        padding-right 14px
        padding-left 24px
        border-1px('bottom', $white-theme-e5e5e5)
      }
      tr:first-child {
        height: 60px;
        padding-right 14px
        padding-left 24px
        border-1px('bottom', $white-theme-e5e5e5)
      }

      td {
        height: 110px;
        padding-right 14px
        padding-left 24px
        width auto;
        border-1px('bottom', $white-theme-e5e5e5)
      }

      th {
        height: 24px;
        font-size: 24px;
        padding-right 14px
        padding-left 24px
        color: $white-theme-999;
        line-height:60px;
        text-align center
        border-1px('bottom', $white-theme-e5e5e5)
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
    }
  }

  .swiperBox {
    display: inline-block;
    width: 576px;
    .arrow-right {
      position absolute
      right 0px
      top 15px
      color $white-theme-999
      z-index 999
    }
    .arrow-left {
      position absolute
      left -8px
      top 15px
      color $white-theme-999
      z-index 999
    }
    .colum {
      width:auto!important
    }
    table {
      width: 100%;
      tr {
        height: 110px;
        padding-right 28px
        padding-left 28px
        // border-1px('bottom', $white-theme-e5e5e5)
      }
      tr:first-child {
        padding-right 24px
        padding-left 24px
        height: 60px;
      }
      td {
        height: 110px;
        padding-right 28px
        padding-left 28px
        width auto;
        border-1px('bottom', $white-theme-e5e5e5)
      }
      th {
        height: 24px;
        padding-right 28px
        padding-left 28px
        font-size: 24px;
        color: $white-theme-999;
        line-height:60px;
        text-align right
        border-1px('bottom', $white-theme-e5e5e5)
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
        margin 20px 0 24px
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
      .getbtn {
        width:140px;
        height:54px;
        border-radius:4px;
        font-size:28px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height 28px
        text-align center
        margin-top 26px
        padding 0
      }
    }
  }


.stocklist-black
  background-color $black-theme-242426
  .fixBox {
    table {
      tr {
        border-1px('bottom', $white-theme-2e2e33)
      }
      tr:first-child {
        border-1px('bottom', $white-theme-2e2e33)
      }
      td {

        border-1px('bottom', $white-theme-2e2e33)
      }
      th {
        color: $white-theme-999;
        border-1px('bottom', $white-theme-2e2e33)
      }

      .stkName{
        color $black-theme-fff
      }
      .stkCode {
        color $black-theme-999
      }
    }
  }

  .swiperBox {
    table {
      td {
        border-1px('bottom', $white-theme-2e2e33)
      }
      th {
        color: $black-theme-999;
        border-1px('bottom', $white-theme-2e2e33)
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
      .question {
        color $black-theme-999
        bg-image('home/question-black')
      }
    }
  }
</style>
