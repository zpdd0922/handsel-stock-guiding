<template>
  <div :class="['data-wrap', `data-wrap-${skin}`]">
    <cube-scroll v-if="stockList.length>0" :class="['bg-wrap', `bg-wrap-${skin}`]">
      <div :class="['container', `container-${skin}`]">
        <!-- 指引组件 -->
        <template>
          <!-- 待领取股票市值 -->
          <Stockvalue
            :skin="skin"
            :mktValueAll="mktValueAll"
            :changeAll="changeAll"
            :changePctAll="changePctAll"
          ></Stockvalue>

          <!-- 指导框 -->
          <Heading
            v-if="depositStatus===0"
            :list="openStatusObj"
            :skin="skin"
            :urlObj="urlObj"
            :headingStockOa="headingStockOa"
            :headingStockDe="headingStockDe"
          ></Heading>
          <div class="waitGetStock">
            <p>{{$t('WAIT_GET_STOCK')}}</p>
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
    <!-- 待领取股票列表为空时，显示暂无赠股记录 -->
    <div v-if="stockList.length===0 && isRequestOk" :class="['empty-wrap', `empty-wrap-${skin}`]">
      <!-- 1.大陆用户显示“暂无赠股记录”和下方邀好友的banner-->
      <template v-if="!isHK">
        <div class="no-record-wrap">
          <div class="empty"></div>
          <p>{{$t('EMPTY.NO_RECORD')}}</p>
        </div>
        <div class="actvity-wrap">
          <div class="titleBox">
            <h4>{{$t('EMPTY.TITLE_BOX')}}</h4>
          </div>
          <div class="banner-bg">
            <div class="leftPart">
              <div class="title">{{$t('EMPTY.LEFT_TITLE')}}</div>
              <p class="desc1" v-html="$t('EMPTY.LEFT_DESC1')"></p>
              <p class="desc2">{{$t('EMPTY.LEFT_DESE2')}}</p>
            </div>
            <div class="rightPart">
              <div class="invite-btn" @click="jumpOfficalActivity">
                <p class="txt" v-html="$t('EMPTY.RIGHT_TXT')"></p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 2、香港地区只显示上方文案“暂无赠股记录”-->
      <template v-else>
        <div class="no-record-wrap">
          <div class="empty"></div>
          <p>{{$t('EMPTY.NO_RECORD_HK')}}</p>
        </div>
      </template>
    </div>

    <!-- 立即开户弹框 -->
    <cube-popup
      type="my-popup"
      position="center"
      :mask-closable="false"
      ref="openAccountPopup"
    >
      <div class="modelBox">
        <div class="head">
          <p class="title">{{$t('OPEN_ACCOUNT_POPUP.TITLE')}}</p>
        </div>
        <div class="content">
          <p class="getStock" v-html="$t('OPEN_ACCOUNT_POPUP.GET_STOCK', { stkName: openAccountRuleList.stkName })"></p>
          <h2 class="stkQuantity" v-html="$t('OPEN_ACCOUNT_POPUP.STK_QUANTITY', { stkQuantity: openAccountRuleList.stkQuantity })"></h2>
          <p class="tips">{{$t('OPEN_ACCOUNT_POPUP.TIPS')}}</p>
          <p class="tips-hk">{{$t('OPEN_ACCOUNT_POPUP.TIPS_HK')}}</p>
        </div>
        <div class="clickBtn" @click="jumpOpenAccount">
          <p>{{$t('OPEN_ACCOUNT_POPUP.BTN')}}</p>
        </div>
        <div class="closeBtn" @click="closeOpenAccountPopup"></div>
      </div>
    </cube-popup>

  <!-- 香港卡入金未满一万 -->
    <cube-popup
      type="my-popup"
      position="center"
      :mask-closable="false"
      ref="depositHKNoPopup"
    >
      <div class="modelBox">
        <div class="content">
          <p class="hk-icon"></p>
          <p class="hk-tips">{{$t('MODEL_BOX.HK_TIPS')}}</p>
        </div>
        <div class="clickBtn" @click="jumpDeposit">
          <p>{{$t('MODEL_BOX.BTN')}}</p>
        </div>
        <div class="closeBtn" @click="closeDepositHKNoPopup"></div>
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
              <th>{{$t('DEPOSIT_RULE.CONTENT1')}}</th>
              <th>{{$t('DEPOSIT_RULE.CONTENT2')}}</th>
            </tr>
            <tr v-for="(item, index) in depositRwList" :key="index">
              <td>{{ item.curreny }}{{ item.amount }}</td>
              <td>{{ item.stkQuantity }}{{$t('DEPOSIT_RULE.G')}}{{ item.stkName }}</td>
            </tr>
          </table>
        </div>
        <div class="clickBtn" @click="closeDepositRulePopup">
          <p>{{$t('DEPOSIT_RULE.BTN')}}</p>
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
              <th>{{$t('TRANSFER_RULT.CONTENT1')}}</th>
              <th>{{$t('TRANSFER_RULT.CONTENT2')}}</th>
            </tr>
            <tr v-for="(item, index) in transferRwList" :key="index">
              <td>{{ item.curreny }}{{ item.amount }}</td>
              <td>{{ item.stkQuantity }}{{$t('TRANSFER_RULT.G')}}{{ item.stkName }}</td>
            </tr>
          </table>

          <p class="bottomTxt">{{$t('TRANSFER_RULT.TXT')}}</p>
        </div>
        <div class="clickBtn" @click="closeTransferRulePopup">
          <p>{{$t('TRANSFER_RULT.BTN')}}</p>
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
            >{{$t('YSH_DIALOG.STOCK')}}
          </div>
          <div class="stock-bg"></div>
          <div class="time">{{$t('YSH_DIALOG.TIME')}}</div>
          <div class="stock-info">
            【<span
              >{{ awardObj.stkName }}{{ awardObj.stkCode }}.{{
                awardObj.mktCode
              }}</span
            >】{{ awardObj.minNumber }}{{$t('YSH_DIALOG.G')}}
          </div>
          <div class="argeement">
            <cube-checkbox v-model="argeementStatus">
              {{$t('YSH_DIALOG.ARGEEMENT')}}
            </cube-checkbox>
          </div>
        </div>
      </cube-dialog>
    </template>
    <!-- 新版去入金弹框 -->
    <template>
      <jf-dialog
        :visible="modalBox2"
        class="depositModule2"
        @confirm="jumpDeposit"
        @cancel="closeDepositPopup"
        >
        <div class="scroll-rule-list">
          <cube-scroll ref="scrollRule2">
            <ul class="list-wrap">
            <div class="content">
              <p class="getStock" v-html="$t('SCROLL_RULE.GET_STOCK', { depositRwStkName })"></p>
              <p class="tips">{{$t('SCROLL_RULE.TIPS')}}</p>
              <table>
                <tr>
                  <th>{{$t('SCROLL_RULE.TR1')}}</th>
                  <th>{{$t('SCROLL_RULE.TR2')}}</th>
                </tr>
                <tr v-for="(item, index) in depositRwList" :key="index">
                  <td>{{ item.curreny }}{{ item.amount }}</td>
                  <td>{{ item.stkQuantity }}{{$t('SCROLL_RULE.G')}}{{ item.stkName }}</td>
                </tr>
              </table>
            </div>
            </ul>
          </cube-scroll>
        </div>
      </jf-dialog>
    </template>

    <!--新版去转仓弹框  -->
    <template>
      <tr-dialog
        :visible="modalBox3"
        class="depositModule3"
        @confirm="jumpTransferStk"
        @cancel="closeTransferPopup"
        >
        <div class="scroll-rule-list">
          <cube-scroll ref="scrollRule3">
            <ul class="list-wrap">
              <div class="content">
                <p class="getStock" v-html="$t('SCROLL_RULE3.GET_STOCK', { transferRwStkName })"></p>
                <p class="tips">{{$t('SCROLL_RULE3.TIPS')}}</p>
                <table>
                  <tr>
                    <th>{{$t('SCROLL_RULE3.TR1')}}</th>
                    <th>{{$t('SCROLL_RULE3.TR2')}}</th>
                  </tr>
                  <tr v-for="(item, index) in transferRwList" :key="index">
                    <td>{{ item.curreny }}{{ item.amount }}</td>
                    <td>{{ item.stkQuantity }}{{$t('SCROLL_RULE3.G')}}{{ item.stkName }}</td>
                  </tr>
                </table>
                <p class="bottomTxt">{{$t('SCROLL_RULE3.TXT')}}</p>
              </div>
            </ul>
          </cube-scroll>
        </div>
      </tr-dialog>
    </template>

  </div>
</template>

<script type="text/ecmascript-6">
import handleAppOpen from '@/utils/handleAppOpen'
import { getURLParameters } from '@/utils/url'
import UserAge from '@/utils/uaparser'
import { compareVersion } from '@/utils/compareVersion'
import { formatNum, mul } from '@/utils/number'
import Heading from './components/heading.vue'
import Stockvalue from './components/stockvalue.vue'
import StockList from './components/stockList.vue'
import recordApi from '@/api/modules/api-record'
import { giftStockShare, getMobileInfo, getUserInfoAPP } from '@/native-app/native-api'
import { alert, toast } from '@/utils/tips'
import { mapGetters } from 'vuex'
import getIPaddress from '@/mixins/getIpAddress'
import dayjs from 'dayjs'
import i18n from '@/i18n'

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
      depositRwList: [], // 首次入金奖励列表
      depositRwStkName: '', // 首次入金奖励股票
      transferRwList: [], // 首次转仓奖励列表
      transferRwStkName: '', // 首次转仓奖励股票
      awardObj: {}, // 奖励
      visibleYHS: false, // dialog显示隐藏印花税
      argeementStatus: false,
      headingStockOa: {}, // 开户待领取股票对象
      headingStockDe: {}, // 入金待领取股票对象
      depositStatus: 0, // 是否入金
      openAccountStatus: 0, // 是否开户
      modalBox2: false, // 入金规则弹框是否展示
      modalBox3: false, // 转仓规则弹框是否展示
      UserCode: 1, // 用户犇犇号
      accountLevel: 0, // 是否为标准状态 [0-未知 1-预批账户 2-非标准账户 3-标准账户]
      isHK: false, // 判断是否为香港IP地址
      isRequestOk: false,
      openType: '' // 获取开户方式[0-香港卡开户 1-CA开户]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    urlObj() {
      return getURLParameters()
    },
    skin() {
      const theme = this.userInfo.skin
      if (theme) {
        return theme.toLowerCase()
      }
      return this.urlObj['skin']
    },
    isHead() {
      return this.urlObj['isHead']
    },
    // 判断当前路由环境
    origin() {
      return UserAge.isApp() ? 'app' : 'h5'
    }
  },
  created() {
    // 查询待领取股票
    this.getWaitReceiveStock()
    this.checkIpAddress()
    // 查询开户状态
    this.getOpenStatus()
    this.getDepositStatus()
  },
  methods: {
    // 查询开户状态
    getOpenStatus() {
      recordApi.getOpenStatus({ openType: 1 }).then(res => {
        this.openStatusObj = res
      })
    },
    // 查询IP地址,判断是否为香港ip
    checkIpAddress() {
      getIPaddress()
        .then(res => {
          const { isHK } = res
          this.isHK = isHK
        })
    },
    // 跳转到官网好友邀请活动
    jumpOfficalActivity() {
      window.location.href = window.OFFICIAL_URL
    },
    // 查询待领取股票
    getWaitReceiveStock() {
      recordApi.getWaitReceiveStock().then(res => {
        const stockList = res.stockList
        this.stockList = res.stockList
        this.isRequestOk = true
        this.mktValueAll = formatNum(res.mktValueAll)
        this.changeAll = formatNum(res.changeAll)
        const changePctAll = mul(res.changePctAll, 100)
        this.changePctAll = formatNum(changePctAll)
        // 将数组里的某些字段数字格式化，保留两位小数
        let newStockArr = []
        for (let index in stockList) {
          const {
            stkName,
            stkCode,
            mktCode,
            minNumber,
            maxNumber,
            minMktValue,
            maxMktValue,
            price,
            cost,
            minIncome,
            maxIncome,
            busType,
            activeType,
            validityPeriod,
            rewardId,
            configItemId,
            isExpired,
            ruleList,
            displayValidity
          } = stockList[index]
          const FTminMktValue = formatNum(minMktValue)
          const FTmaxMktValue = formatNum(maxMktValue)
          const FTprice = formatNum(price)
          const FTminIncome = formatNum(minIncome)
          const FTmaxIncome = formatNum(maxIncome)
          const stockObj = {
            stkName,
            stkCode,
            mktCode,
            minNumber,
            maxNumber,
            minMktValue: FTminMktValue,
            maxMktValue: FTmaxMktValue,
            price: FTprice,
            cost,
            minIncome: FTminIncome,
            maxIncome: FTmaxIncome,
            busType,
            activeType,
            validityPeriod: dayjs(validityPeriod).subtract(1, 'day').format('YYYY-MM-DD'),
            rewardId,
            configItemId,
            isExpired,
            ruleList,
            displayValidity
          }
          newStockArr.push(stockObj)
          // 获取对应的领取奖励规则
          // 开户奖励
          if (stockList[index].activeType === 1) {
            this.openAccountRuleList = stockList[index].ruleList[0]
            const RwObj = {
              stkName: stockList[index].stkName,
              minNumber: stockList[index].minNumber
            }
            this.headingStockOa = RwObj
          }
          // 入金奖励
          if (stockList[index].activeType === 2) {
            this.depositRwList = stockList[index].ruleList
            this.depositRwStkName = stockList[index].ruleList[0].stkName || ''
            const RwObj = {
              stkName: stockList[index].stkName,
              minNumber: stockList[index].minNumber
            }
            this.headingStockDe = RwObj
          }
          // 转仓奖励
          if (stockList[index].activeType === 3) {
            this.transferRwList = stockList[index].ruleList
            this.transferRwStkName = stockList[index].ruleList[0].stkName || ''
          }
        }
        this.newStockList = newStockArr
      })
    },

    // 跳转至开户页面
    jumpOpenAccount() {
      const isNewOpen = this.urlObj['isnew']
      handleAppOpen(window.OPEN_ACCOUNT, isNewOpen)
    },
    // 跳转至入金页面
    jumpDeposit() {
      const openAccountStatus = this.openAccountStatus
      const isNewOpen = this.urlObj['isnew']
      if (openAccountStatus === 1) {
        recordApi.getOpenBankType().then((res) => {
          const { bankType = 1 } = res
          if (bankType) {
            handleAppOpen(window.GO_DEPOSIT_CN, isNewOpen)
          } else {
            handleAppOpen(window.GO_DEPOSIT_HK, isNewOpen)
          }
        })
      } else {
        handleAppOpen(window.OPEN_ACCOUNT, isNewOpen)
      }
    },
    // 跳转至转仓页面
    jumpTransferStk() {
      const openAccountStatus = this.openAccountStatus
      const isNewOpen = this.urlObj['isnew']
      if (openAccountStatus === 1) {
        handleAppOpen(window.GO_INTO_STOCK, isNewOpen)
      } else {
        handleAppOpen(window.OPEN_ACCOUNT, isNewOpen)
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

    // 香港卡开户入金未满一万弹出【立即入金】模态框
    showDepositHKNoPopup() {
      const component = this.$refs.depositHKNoPopup
      component.show()
    },

    closeDepositHKNoPopup() {
      const component = this.$refs.depositHKNoPopup
      component.hide()
    },

    // 弹出【立即入金】模态框
    showDepositPopup() {
      this.modalBox2 = true
      this.$nextTick(() => {
        this.$refs.scrollRule2.refresh()
      })
    },
    // 关闭【立即入金】模态框
    closeDepositPopup() {
      this.modalBox2 = false
      // component.hide()
    },

    // 弹出【立即转仓】模态框
    showTransferPopup() {
      this.modalBox3 = true
      this.$nextTick(() => {
        this.$refs.scrollRule3.refresh()
      })
    },
    // 关闭【立即转仓】模态框
    closeTransferPopup() {
      this.modalBox3 = false
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
      const { rewardId, configItemId } = this.awardObj
      const params = { rewardId, configItemId }

      // 领取奖励
      recordApi.postFetchRewardConfirm(params).then(res => {
        this.getWaitReceiveStock()
      })
      this.visibleYHS = false
    },
    // 赠股取消模态框
    getStockCancel() {
      this.visibleYHS = false
    },
    // 点击【立即领取】
    async getReward(item) {
      const activeType = item.activeType // 奖励股票来源类型： 1 开户赠送类型；2入金赠送类型； 3 转仓赠送类型
      const busType = item.busType
      // 0:未入金或未转仓或未开户 1:已入金或已转仓或已开户 2:入金或转仓未达到奖励条件 3:有待领取的奖励 4:已到账 5:已入持仓 6:已拒绝
      // 1.开户赠送股票领取判断
      if (activeType === 1) {
        // 是否开户，未开户，引导开户
        if (busType === 0) {
          this.showOpenAccountPopup()
        } else {
          const result = await recordApi.getOpenBankType()
          const { bankType } = result
          if (bankType === 0 && this.depositStatus) {
            // 判断系统奖励是否发送，发送则展示领取弹框，没发送则toas提示系统正在发放中
            if (busType === 3) {
              this.awardObj = item
              this.showStockBox()
            } else {
              toast({ txt: i18n.t('AWARD_TIPS') })
            }
          } else if (bankType === 0 && !this.depositStatus) {
            this.showDepositHKNoPopup()
          } else {
            // 判断系统奖励是否发送，发送则展示领取弹框，没发送则toas提示系统正在发放中
            if (busType === 3) {
              this.awardObj = item
              this.showStockBox()
            } else {
              toast({ txt: i18n.t('AWARD_TIPS') })
            }
          }
        }
      }
      // 2.入金赠送股票领取判断
      if (activeType === 2) {
        // 判断是否入金，如果未入金/或已入金未到达奖励条件的，展示入金引导框
        if (busType === 0 || busType === 2) {
          this.showDepositPopup()
        } else {
          // 如果已入金，判断系统奖励是否发送，发送则展示领取弹框，没发送则toas提示系统正在发放中
          if (busType === 3) {
            this.awardObj = item
            this.showStockBox()
          } else {
            toast({ txt: i18n.t('AWARD_TIPS') })
          }
        }
      }

      // 3.转仓赠送股票领取判断
      if (activeType === 3) {
        // 判断是否转仓，如果未转仓/或已转仓未到达奖励条件的，展示转仓引导框
        if (busType === 0 || busType === 2) {
          this.showTransferPopup()
        } else {
          // 如果已转仓，判断系统奖励是否发送，发送则展示领取弹框，没发送则toas提示系统正在发放中
          if (busType === 3) {
            this.awardObj = item
            this.showStockBox()
          } else {
            toast({ txt: i18n.t('AWARD_TIPS') })
          }
        }
      }
    },
    // 点击【问号】
    getRule(item) {
      const type = item.activeType
      // 入金奖励
      if (type === 2) {
        this.showDepositRulePopup()
      }
      // 转仓奖励
      if (type === 3) {
        this.showTransferRulePopup()
      }
    },
    // 点击分享
    goShare(item) {
      if (UserAge.isApp()) {
        // APP环境直接获取用户信息
        getUserInfoAPP({
          success: res => {
            const result = JSON.parse(res.data)
            this.UserCode = result.UserCode
            const UserCode = this.UserCode
            const url = `${window.SHARE_ADDRESS}&invUserId=${UserCode}`
            const {
              stkName,
              minNumber,
              minIncome
            } = item
            const params = {
              stkName,
              stkQuantity: minNumber,
              mktValue: minIncome,
              shareUrl: url
            }
            let versionIOS = -1
            let versionAndroid = -1
            getMobileInfo({
              success: function (res) {
                const result = JSON.parse(res.data)
                versionIOS = compareVersion(result.appVersion, window.IOS_VERSION)
                versionAndroid = compareVersion(result.appVersion, window.ANDROID_VERSION)
                if ((UserAge.isIOS() && versionIOS >= 0) || (UserAge.isAndroid() && versionAndroid >= 0)) {
                  // 大于最新版本才可以做分享动作
                  giftStockShare(params)
                } else {
                  // 小于这个版本则做alert提示
                  alert({ title: i18n.t('UPDATE.TITLE'), content: i18n.t('UPDATE.CONTENT') })
                }
              }
            })
          }
        })
      }
    },
    getDepositStatus() {
      recordApi.findCrmUserStatus().then(res => {
        this.depositStatus = res.depositStatus // 是否入金
        this.openAccountStatus = res.openAccountStatus // 是否开户
        this.accountLevel = res.accountLevel // 是否开户
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import './main'
</style>
