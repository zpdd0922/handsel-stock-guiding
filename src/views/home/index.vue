<template>
  <div :class="['data-wrap', `data-wrap-${skin}`]">
    <cube-scroll :class="['bg-wrap', `bg-wrap-${skin}`]">
      <div :class="['container', `container-${skin}`]">
        <!-- 指引组件 -->
        <template v-if="isHead">
          <!-- 待领取股票市值 -->
          <Stockvalue
            :skin="skin"
            :mktValueAll="mktValueAll"
            :changeAll="changeAll"
            :changePctAll="changePctAll"
          ></Stockvalue>

          <!-- 指导框 -->
          <Heading
            :list="openStatusObj"
            :skin="skin"
            :urlObj="urlObj"
            :headingStockOa="headingStockOa"
            :headingStockDe="headingStockDe"
          ></Heading>
          <div class="waitGetStock">
            <p>待领取股票</p>
          </div>
        </template>

        <!-- 待领取股票列表 -->
        <div class="stockTable">
          <StockList
            :skin="skin"
            @getReward="getReward"
            @getRule="getRule"
            @goShare="goShare"
            :stockList="newStockList"
          ></StockList>
        </div>
      </div>
    </cube-scroll>

    <!-- 立即开户弹框 -->
    <cube-popup
      type="my-popup"
      position="center"
      :mask-closable="false"
      ref="openAccountPopup"
    >
      <div class="modelBox">
        <div class="head">
          <p class="title">恭喜您</p>
        </div>
        <div class="content">
          <p class="getStock">
            获取<span class="stkName"
              >【{{ openAccountRuleList.stkName }}】</span
            >
          </p>
          <h2 class="stkQuantity">{{ openAccountRuleList.stkQuantity }}股</h2>
          <p class="tips">开户成功即可领取</p>
        </div>
        <div class="clickBtn" @click="jumpOpenAccount">
          <p>立即开户</p>
        </div>
        <div class="closeBtn" @click="closeOpenAccountPopup"></div>
      </div>
    </cube-popup>

    <!-- 立即入金 -->
    <cube-popup
      type="my-popup"
      position="center"
      :mask-closable="false"
      ref="depositPopup"
    >
      <div class="modelBox2">
        <div class="head">
          <p class="title">恭喜您</p>
        </div>
        <div class="content">
          <p class="getStock">
            获取<span class="stkName">【{{ depositRwStkName }}】</span
            >股票奖励，
          </p>
          <p class="tips">入金满相应额度即可领取</p>
          <table>
            <tr>
              <th>首次入金满</th>
              <th>奖励股票</th>
            </tr>
            <tr v-for="(item, index) in depositRwList" :key="index">
              <td>{{ item.curreny }}{{ item.amount }}</td>
              <td>{{ item.stkQuantity }}股{{ item.stkName }}</td>
            </tr>
          </table>
        </div>
        <!-- <div class="footer">
          <cube-checkbox class="with-click" v-model="agreeChecked">
            我同意并授权玖富证券团队处理印花税事宜
          </cube-checkbox>
        </div> -->
        <div class="clickBtn" @click="jumpDeposit">
          <p>立即入金</p>
        </div>
        <div class="closeBtn" @click="closeDepositPopup"></div>
      </div>
    </cube-popup>

    <!-- 立即转仓 -->
    <cube-popup
      type="my-popup"
      position="center"
      :mask-closable="false"
      ref="transferPopup"
    >
      <div class="modelBox3">
        <div class="head">
          <p class="title">恭喜您</p>
        </div>
        <div class="content">
          <p class="getStock">
            获取<span class="stkName">【{{ transferRwStkName }}】</span
            >股票奖励，
          </p>
          <p class="tips">转仓市值满相应额度即可领取</p>
          <table>
            <tr>
              <th>首次转仓满</th>
              <th>奖励股票</th>
            </tr>
            <tr v-for="(item, index) in transferRwList" :key="index">
              <td>{{ item.curreny }}{{ item.amount }}</td>
              <td>{{ item.stkQuantity }}股{{ item.stkName }}</td>
            </tr>
          </table>

          <p class="bottomTxt">*仅限大陆CA开户用户</p>
        </div>
        <!-- <div class="footer">
          <cube-checkbox class="with-click" v-model="agreeChecked">
            我同意并授权玖富证券团队处理印花税事宜
          </cube-checkbox>
        </div> -->
        <div class="clickBtn" @click="jumpTransferStk">
          <p>立即转仓</p>
        </div>
        <div class="closeBtn" @click="closeTransferPopup"></div>
      </div>
    </cube-popup>

    <!-- 入金规则 -->
    <cube-popup
      type="my-popup"
      position="center"
      :mask-closable="false"
      ref="depositRulePopup"
    >
      <div class="modelBox4">
        <div class="content">
          <table>
            <tr>
              <th>首次入金满</th>
              <th>奖励股票</th>
            </tr>
            <tr v-for="(item, index) in depositRwList" :key="index">
              <td>{{ item.curreny }}{{ item.amount }}</td>
              <td>{{ item.stkQuantity }}股{{ item.stkName }}</td>
            </tr>
          </table>
        </div>
        <div class="clickBtn" @click="closeDepositRulePopup">
          <p>我知道了</p>
        </div>
      </div>
    </cube-popup>

    <!-- 转仓规则 -->
    <cube-popup
      type="my-popup"
      position="center"
      :mask-closable="false"
      ref="transferRulePopup"
    >
      <div class="modelBox5">
        <div class="content">
          <table>
            <tr>
              <th>首次转仓满</th>
              <th>奖励股票</th>
            </tr>
            <tr v-for="(item, index) in transferRwList" :key="index">
              <td>{{ item.curreny }}{{ item.amount }}</td>
              <td>{{ item.stkQuantity }}股{{ item.stkName }}</td>
            </tr>
          </table>

          <p class="bottomTxt">*仅限大陆CA开户用户</p>
        </div>
        <div class="clickBtn" @click="closeTransferRulePopup">
          <p>我知道了</p>
        </div>
      </div>
    </cube-popup>

    <!--领取股票奖励模态框  -->
    <template>
      <cube-dialog
        type="confirm"
        :visible="visibleYHS"
        @confirm="getStockSure()"
        @cancel="getStockCancel"
        :confirmBtn="{ disabled: !argeementStatus }"
      >
        <div slot="content" class="yhs-dialog">
          <div class="stock-name">
            <span>{{ awardObj.stkName }}</span
            >股票奖励
          </div>
          <div class="stock-bg"></div>
          <div class="time">预计T+5工作日到账</div>
          <div class="stock-info">
            【<span
              >{{ awardObj.stkName }}{{ awardObj.stkCode }}.{{
                awardObj.mktCode
              }}</span
            >】{{ awardObj.minNumber }}股
          </div>
          <div class="argeement">
            <cube-checkbox v-model="argeementStatus">
              我同意并授权玖富证券团队处理印花税事宜
            </cube-checkbox>
          </div>
        </div>
      </cube-dialog>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import handleAppOpen from '@/utils/handleAppOpen'
import { getURLParameters } from '@/utils/url'
import { formatNum, mul } from '@/utils/number'
import Heading from './components/heading.vue'
import Stockvalue from './components/stockvalue.vue'
import StockList from './components/stockList.vue'
import recordApi from '@/api/api-record'
import { giftStockShare } from '@/native-app/native-api'

export default {
  components: {
    Heading,
    Stockvalue,
    StockList
  },
  metaInfo() {
    return {
      title: this.$route.meta.title
    }
  },
  data() {
    return {
      // agreeChecked: false, // 同意声明是否勾选
      stockList: [], // 待领取股票列表
      newStockList: [],
      openStatusObj: {}, // 开户状态列表
      mktValueAll: 0, // 最大待领取股票市值
      changeAll: 0, // 涨跌额
      changePctAll: 0, // 涨跌幅
      openAccountRuleList: {}, // 开户入金奖励
      depositRwList:[], // 首次入金奖励列表
      depositRwStkName: '', // 首次入金奖励股票
      transferRwList:[], // 首次转仓奖励列表
      transferRwStkName:'', // 首次转仓奖励股票
      awardObj: {}, // 奖励
      visibleYHS: false, // dialog显示隐藏印花税
      argeementStatus: false,
      headingStockOa: {}, // 开户待领取股票对象
      headingStockDe: {}, // 入金待领取股票对象
      depositStatus: 0, // 是否入金
    }
  },
  computed: {
    urlObj() {
      return getURLParameters()
    },
    skin() {
      return this.urlObj['skin']
    },
    isHead() {
      return this.urlObj['isHead']
    },
  },
  created() {
    // 查询开户状态
    this.getOpenStatus()
    // 查询待领取股票
    this.getWaitReceiveStock()
  },
  methods: {
    // 查询开户状态
    getOpenStatus() {
      recordApi.getOpenStatus({ openType: 1 }).then(res => {
        console.log('查询开户状态res', res)
        this.openStatusObj = res
        this.depositStatus = res.depositStatus  // 是否入金
      })
    },
    // 查询待领取股票
    getWaitReceiveStock() {
      recordApi.getWaitReceiveStock().then(res => {
        console.log('待领取股票res', res)
        const stockList = res.stockList
        this.stockList = res.stockList
        this.mktValueAll = formatNum(res.mktValueAll)
        this.changeAll = formatNum(res.changeAll)
        const changePctAll = mul(res.changePctAll,100)
        this.changePctAll = formatNum(changePctAll)
        // 将数组里的某些字段数字格式化，保留两位小数
        let newStockArr = []
        for(let index in stockList){
          const {
            stkName,
            stkCode,
            mktCode,
            minNumber,
            maxNumber,
            minMktValue:minMktValue,
            maxMktValue:maxMktValue,
            price:price,
            cost:cost,
            minIncome:minIncome,
            maxIncome:maxIncome,
            busType,
            activeType,
            validityPeriod,
            rewardId,
            configItemId,
            isExpired,
            ruleList
           } = stockList[index]
          const FTminMktValue = formatNum(minMktValue)
          const FTmaxMktValue = formatNum(maxMktValue)
          const FTprice = formatNum(price)
          const FTminIncome = formatNum(minIncome)
          const FTmaxIncome = formatNum(maxIncome)
          const stockObj ={
            stkName,
            stkCode,
            mktCode,
            minNumber,
            maxNumber,
            minMktValue:FTminMktValue,
            maxMktValue:FTmaxMktValue,
            price:FTprice,
            cost,
            minIncome:FTminIncome,
            maxIncome:FTmaxIncome,
            busType,
            activeType,
            validityPeriod,
            rewardId,
            configItemId,
            isExpired,
            ruleList
          }
          newStockArr.push(stockObj)
          // 获取对应的领取奖励规则
          if(stockList[index].activeType === 1) {
            this.openAccountRuleList = stockList[index].ruleList[0]
            const RwObj = {
              stkName:stockList[index].stkName,
              minNumber:stockList[index].minNumber
            }
            this.headingStockOa = RwObj
          }
          if(stockList[index].activeType === 2) {
            this.depositRwList = stockList[index].ruleList
            this.depositRwStkName = stockList[index].ruleList[0].stkName || ''
            const RwObj = {
              stkName:stockList[index].stkName,
              minNumber:stockList[index].minNumber
            }
            this.headingStockDe = RwObj
          }
          if(stockList[index].activeType === 3) {
            this.transferRwList = stockList[index].ruleList
            this.transferRwStkName = stockList[index].ruleList[0].stkName || ''
          }
        }
        this.newStockList = newStockArr
        console.log('this.newstockList', this.newStockList)
      })
    },

    // 跳转至开户页面
    jumpOpenAccount() {
      const isNewOpen = this.urlObj['isnew']
      handleAppOpen(window.OPEN_ACCOUNT, isNewOpen)
    },
    // 跳转至入金页面
    jumpDeposit() {
      const isNewOpen = this.urlObj['isnew']
      handleAppOpen(window.GO_DEPOSIT, isNewOpen)
    },
    // 跳转至转仓页面
    jumpTransferStk() {
      const isNewOpen = this.urlObj['isnew']
      handleAppOpen(window.GO_INTO_STOCK, isNewOpen)
    },


    // 弹出【立即开户】模态框
    showOpenAccountPopup() {
      const component = this.$refs.openAccountPopup
      component.show()
    },
    // 关闭【立即开户】模态框
    closeOpenAccountPopup() {
      const component = this.$refs.openAccountPopup
      component.hide()
    },

    // 弹出【立即入金】模态框
    showDepositPopup() {
      const component = this.$refs.depositPopup
      component.show()
    },
    // 关闭【立即入金】模态框
    closeDepositPopup() {
      const component = this.$refs.depositPopup
      component.hide()
    },

    // 弹出【立即转仓】模态框
    showTransferPopup() {
      const component = this.$refs.transferPopup
      component.show()
    },
    // 关闭【立即转仓】模态框
    closeTransferPopup() {
      const component = this.$refs.transferPopup
      component.hide()
    },

    // 弹出【入金规则】模态框
    showDepositRulePopup() {
      const component = this.$refs.depositRulePopup
      component.show()
    },
    // 关闭【入金规则】模态框
    closeDepositRulePopup() {
      const component = this.$refs.depositRulePopup
      component.hide()
    },

    // 弹出【转仓规则】模态框
    showTransferRulePopup() {
      const component = this.$refs.transferRulePopup
      component.show()
    },
    // 关闭【转仓规则】模态框
    closeTransferRulePopup() {
      const component = this.$refs.transferRulePopup
      component.hide()
    },
    // 弹出赠股模态框
    showStockBox() {
      this.visibleYHS = true
    },
    // 赠股确认领取
    getStockSure() {
      const  { rewardId, configItemId } = this.awardObj
      const params = { rewardId, configItemId }

      // 领取奖励
      recordApi.postFetchRewardConfirm(params).then(res => {
        console.log('确认领取==>', res)
      })
      this.visibleYHS = false
      this.getWaitReceiveStock()
    },
    // 赠股取消模态框
    getStockCancel() {
      this.visibleYHS = false
    },
    // 点击【立即领取】
    getReward(item) {
      const activeType = item.activeType
      const busType = item.busType
      if(busType === 0 || busType === 1 || busType === 2) {
        // 开户奖励规则弹框
        if(activeType === 1) {
          this.showOpenAccountPopup()
        }
        // 入金奖励规则弹框
        if(activeType === 2) {
          this.showDepositPopup()
        }
        // 转仓奖励规则弹框
        if(activeType === 3) {
          this.showTransferPopup()
        }
      }
      if(busType === 3) {
        this.awardObj = item
        this.showStockBox()
      }
    },
    // 点击【问号】
    getRule(item) {
      const type = item.activeType
      // 入金奖励
      if(type === 2) {
        this.showDepositRulePopup()
      }
      // 转仓奖励
      if(type === 3) {
        this.showTransferRulePopup()
      }
    },
    // 点击分享
    goShare(item) {
      const {
        stkName,
        minNumber,
        minIncome
      } = item
      const params ={
        stkName,
        stkQuantity:minNumber,
        mktValue:minIncome,
        shareUrl: window.SHARE_ADDRESS
      }
      console.log('params:'+JSON.stringify(params))
      giftStockShare(params)
    }
  },

}
</script>

<style scoped lang="stylus">
@import './main'
</style>
