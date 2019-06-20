<template>
  <div :class="['data-wrap', `data-wrap-${skin}`]">
    <template v-if="noData">
      <div class="no-data">
        <div>暂无待领股票</div>
      </div>
    </template>
    <cube-scroll :class="['bg-wrap', `bg-wrap-${skin}`]" v-if="hasData">
      <div :class="['container', `container-${skin}`]">
        <!-- 指引组件 -->
        <template v-if="isHead">
          <!-- 待领取股票市值 -->
          <Stockvalue :skin="skin"></Stockvalue>

          <!-- 指导框 -->
          <Heading
            :list="openStatusObj"
            :skin="skin"
            :urlObj="urlObj"
          ></Heading>
        </template>
        <div class="waitGetStock">
          <p>待领取股票</p>
        </div>
        <!-- 待领取股票列表 -->
        <div class="stockTable">
          <StockList :skin="skin" @getReward="getReward"></StockList>
        </div>

        <!-- 入金 -->
        <div class="gold" :class="{ 'gold-mt': isHead === 1 }" v-if="noGold">
          <Table
            :list="goldList"
            :header="headerGold"
            :btnText="goldText"
            :type="goldBusType"
            :skin="skin"
          >
            <template slot="btn">
              <div
                class="btn-top"
                :class="btnClass(goldBusType)"
                @click="goldHandle"
              >
                {{ goldText }}
              </div>
            </template>
          </Table>
        </div>
        <!-- 转仓 -->
        <div class="stock" v-if="noStock">
          <Table
            :list="stockList"
            :header="headerStock"
            :btnText="stockText"
            :type="stockBusType"
            :skin="skin"
          >
            <template slot="btn">
              <div
                class="btn-top"
                :class="btnClass(stockBusType)"
                @click="stockHandle"
              >
                {{ stockText }}
              </div>
            </template>
          </Table>
        </div>
      </div>
      <cube-button @click="showOpenAccountPopup" style="height:80px"
        >测试1</cube-button
      >
      <cube-button @click="showDepositPopup" style="height:80px"
        >测试2</cube-button
      >
      <cube-button @click="showTransferPopup" style="height:80px"
        >测试3</cube-button
      >
      <cube-button @click="showDepositRulePopup" style="height:80px"
        >测试4</cube-button
      >
      <cube-button @click="showTransferRulePopup" style="height:80px"
        >测试5</cube-button
      >
      <cube-button @click="showStockBox" style="height:80px">测试6</cube-button>
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
          <p class="getStock">获取<span class="stkName">【招商银行】</span></p>
          <h2 class="stkQuantity">3股</h2>
          <p class="tips">开户成功即可领取</p>
        </div>
        <div class="footer">
          <cube-checkbox class="with-click" v-model="agreeChecked">
            我同意并授权玖富证券团队处理印花税事宜
          </cube-checkbox>
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
            获取<span class="stkName">【招商银行】</span>股票奖励，
          </p>
          <p class="tips">入金满相应额度即可领取</p>
          <table>
            <tr>
              <th>首次入金满</th>
              <th>奖励股票</th>
            </tr>
            <tr v-for="(item, index) in depositRwList" :key="index">
              <td>HK{{ item.amount }}</td>
              <td>{{ item.stkQuantity }}股{{ item.stkName }}</td>
            </tr>
          </table>
        </div>
        <div class="footer">
          <cube-checkbox class="with-click" v-model="agreeChecked">
            我同意并授权玖富证券团队处理印花税事宜
          </cube-checkbox>
        </div>
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
            获取<span class="stkName">【招商银行】</span>股票奖励，
          </p>
          <p class="tips">转仓市值满相应额度即可领取</p>
          <table>
            <tr>
              <th>首次转仓满</th>
              <th>奖励股票</th>
            </tr>
            <tr v-for="(item, index) in transferRwList" :key="index">
              <td>HK{{ item.amount }}</td>
              <td>{{ item.stkQuantity }}股{{ item.stkName }}</td>
            </tr>
          </table>

          <p class="bottomTxt">*仅限大陆CA开户用户</p>
        </div>
        <div class="footer">
          <cube-checkbox class="with-click" v-model="agreeChecked">
            我同意并授权玖富证券团队处理印花税事宜
          </cube-checkbox>
        </div>
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
              <td>HKD{{ item.amount }}</td>
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
              <td>HK{{ item.amount }}</td>
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
        @confirm="getStockSure"
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
            【<span>{{ awardObj.stkName }}{{ awardObj.assetId }}</span
            >】{{ awardObj.quantity }}股
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
import Heading from './components/heading.vue'
import Stockvalue from './components/stockvalue.vue'
import Table from './components/table.vue'
import StockList from './components/stockList.vue'
import recordApi from '@/api/api-record'

export default {
  components: {
    Heading,
    Table,
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
      agreeChecked: false, // 同意声明是否勾选
      goldList: [], // 入金列表
      stockList: [], // 转仓列表
      goldText: '', // 入金按钮文案
      stockText: '', // 转仓按钮文案
      goldBusType: 0, // 列表显示内容变更
      stockBusType: 0, // 列表显示内容变更
      openStatusObj: {}, // 开户状态列表
      firstDeposit: {}, // 首次入金奖励规则
      firstRollover: {}, // 首次转仓奖励规则
      depositRwList:[
        {
          amount:10000,
          stkQuantity: 1,
          stkName: '招商银行',
        },
        {
          amount:50001,
          stkQuantity: 2,
          stkName: '招商银行',
        },
        {
          amount:100001,
          stkQuantity: 3,
          stkName: '招商银行',
        },
        {
          amount:150001,
          stkQuantity: 4,
          stkName: '招商银行',
        },
        {
          amount:200001,
          stkQuantity: 5,
          stkName: '招商银行',
        },
      ], // 首次入金奖励列表
      transferRwList:[
        {
          amount:10000,
          stkQuantity: 1,
          stkName: '招商银行',
        },
        {
          amount:50001,
          stkQuantity: 2,
          stkName: '招商银行',
        },
        {
          amount:100001,
          stkQuantity: 3,
          stkName: '招商银行',
        },
        {
          amount:150001,
          stkQuantity: 4,
          stkName: '招商银行',
        },
        {
          amount:200001,
          stkQuantity: 5,
          stkName: '招商银行',
        },
      ], // 首次转仓奖励列表
      awardObj: {
        stkName:'招商银行',
        assetId:'001254',
        quantity: 3
      }, // 奖励
      visibleYHS: false, // dialog显示隐藏印花税
      argeementStatus: false
    }
  },
  computed: {
    headerGold() {
      return [
        { label: '首次入金', class: 'left' },
        { label: '奖励股票或免佣', class: 'right' }
      ]
    },
    headerStock() {
      return [
        { label: '首次转仓', class: 'left' },
        { label: '奖励股票或免佣', class: 'right' }
      ]
    },
    urlObj() {
      return getURLParameters()
    },
    skin() {
      return this.urlObj['skin']
    },
    isHead() {
      return this.urlObj['isHead']
    },
    // 有卡片显示
    hasData() {
      return (
        (this.goldBusType !== 2 &&
          this.goldBusType !== 5 &&
          this.goldBusType !== 6) ||
        (this.stockBusType !== 2 &&
          this.stockBusType !== 5 &&
          this.stockBusType !== 6)
      )
    },
    // 无卡片显示
    noData() {
      return (
        (this.goldBusType === 2 ||
          this.goldBusType === 5 ||
          this.goldBusType === 6) &&
        (this.stockBusType === 2 ||
          this.stockBusType === 5 ||
          this.stockBusType === 6)
      )
    },
    // 判断是否有入金奖励
    noGold() {
      return (
        this.goldBusType !== 2 &&
        this.goldBusType !== 5 &&
        this.goldBusType !== 6
      )
    },
    // 判断是否有转仓奖励
    noStock() {
      return (
        this.stockBusType !== 2 &&
        this.stockBusType !== 5 &&
        this.stockBusType !== 6
      )
    }
  },
  methods: {
    // 查询开户状态
    getOpenStatus() {
      recordApi.getOpenStatus({ openType: 1 }).then(res => {
        console.log('查询开户状态res', res)
        this.openStatusObj = res
      })
    },
    // 查询首次入金奖励
    queryGlodList() {
      recordApi.getFirstDeposit().then(res => {
        console.log('首次入金res', res)
        this.firstDeposit = res
        const { busType, rewardRuleList, waitReceiveRecordInfo } = res
        this.goldBusType = busType
        if (busType === 0) {
          this.goldList = rewardRuleList
          this.goldText = '立即入金'
        } else if (busType === 1) {
          this.goldList = rewardRuleList
          this.goldText = '已提交'
        } else if (busType === 3) {
          this.goldList.push(waitReceiveRecordInfo)
          this.goldText = '立即领取'
        } else if (busType === 4) {
          this.goldList.push(waitReceiveRecordInfo)
          this.goldText = '到账中'
        }
      })
    },
    // 查询首次转仓奖励
    queryStockList() {
      recordApi.getFirstRollover().then(res => {
        console.log('转仓入金res', res)
        this.firstRollover = res
        const { busType, rewardRuleList, waitReceiveRecordInfo } = res
        this.stockBusType = busType
        if (busType === 0) {
          this.stockList = rewardRuleList
          this.stockText = '立即转仓'
        } else if (busType === 1) {
          this.stockList = rewardRuleList
          this.stockText = '已提交'
        } else if (busType === 3) {
          this.stockList.push(waitReceiveRecordInfo)
          this.stockText = '立即领取'
        } else if (busType === 4) {
          this.stockList.push(waitReceiveRecordInfo)
          this.stockText = '到账中'
        }
      })
    },
    // 立即入金点击按钮
    goldHandle() {
      const { openStatus } = this.openStatusObj
      const { busType } = this.firstDeposit
      const isNewOpen = this.urlObj['isnew']
      if (openStatus === 0) {
        if (busType === 0 || busType === 1) {
          console.log('跳转至入金页面')
          handleAppOpen(window.GO_DEPOSIT, isNewOpen)
        } else if (busType === 3) {
          console.log('跳转至奖品中心页面')
          handleAppOpen(window.ACTIVE_CENTER_GOLD, isNewOpen)
        } else if (busType === 4) {
          console.log('按钮不可点')
        }
      } else {
        handleAppOpen(window.OPEN_ACCOUNT, isNewOpen)
        console.log('跳转至开户页面')
      }
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

    // 立即转仓点击按钮
    stockHandle() {
      const { openStatus } = this.openStatusObj
      const { busType } = this.firstRollover
      const isNewOpen = this.urlObj['isnew']
      if (openStatus === 0) {
        if (busType === 0 || busType === 1) {
          handleAppOpen(window.GO_INTO_STOCK, isNewOpen)
          console.log('跳转至转仓页面')
        } else if (busType === 3) {
          handleAppOpen(window.ACTIVE_CENTER_STOCK, isNewOpen)
          console.log('跳转至奖品中心页面')
        } else if (busType === 4) {
          console.log('按钮不可点')
        }
      } else {
        handleAppOpen(window.OPEN_ACCOUNT, isNewOpen)
        console.log('跳转至开户页面')
      }
    },
    // 按钮样式
    // 0:未入金或未转仓 1:已入金或以转仓 2:有待领取的奖励 3:已到账 4:已入持仓
    // 0:未入金或未转仓 1:已入金或以转仓 2:入金或转仓未达到奖励条件 3:有待领取的奖励 4:已到账 5:已入持仓
    btnClass(val) {
      return {
        commit: val === 0 || val === 1,
        draw: val === 3,
        disabled: val === 4
      }
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
      const  { rewardId } = this.awardObj
      const params = { rewardId }
      console.log('params股票', params)

      // 领取奖励
      recordApi.postFetchRewardConfirm(params).then(res => {
        this.queryStock(3)
        console.log('确认领取==>', res)
      })
      this.visibleYHS = false
    },
    // 赠股取消模态框
    getStockCancel() {
      this.visibleYHS = false
    },
    // 点击【立即领取】
    getReward(activeType) {
      const type = activeType
      const { openStatus } = this.openStatusObj
      console.log('开户状态：'+JSON.stringify(openStatus))
      console.log('立即领取:'+activeType)
    }
  },
  created() {
    // 查询开户状态
    this.getOpenStatus()
    this.queryGlodList()
    this.queryStockList()
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
