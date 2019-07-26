import axios from '../axios'
import paramsData from '../params/params-wrap'

export default {
  // 待领取股票接口查询
  getWaitReceiveStock: data =>
    axios.post('/reward_center_api/wait_receive_stock', paramsData.WRAP(data)),

  /**
   * 获取开户状态
   * @method POST/JSON open_api/processstep
   * @param openType      int 开户类型
   ** openType
   * 1: 只查询线上开户情况
   * 2: 线上线下开户状态均查询
   * @return JSON { code: integer, message: string, result }
   * 0 开户成功
   * 1 开户中(线上已提交资料 || 线上已经预约)
   * 2 开户失败（线下相关）
   * 3 基本资料错误（线上相关）
   * 4 图片资料错误（线上相关）
   * 5 基本资料以及图片资料错误（线上相关）
   * 6 未提交资料 （单独处理）
   * 7 开户被拒绝
   * 8 用户取消开户
   */
  getOpenStatus: data =>
    axios.post('open_api/processstep', paramsData.WRAP(data)),

  // 查询用户状态
  /**
   * @returns result<Object>
   * depositStatus:      入金状态， 1 已入金； 0 未入金
   * openAccountStatus:    开户状态，1 已开户； 0 未开户
   * tradeAccount:     交易账号
   * tradeStatus:      交易状态 1 已交易； 0 未交易
   * transferStatus:    转仓状态，1 已转仓； 0 未转仓
   * userRegStatus:     开户状态，1 已注册； 0 未注册
   * withdrawalStatus:   出金状态， 1 已出金； 0 未出金
   * accountLevel:    [0-未知 1-预批账户 2-非标准账户 3-标准账户]
   * */
  findCrmUserStatus: data =>
    axios.post('/open_api/findCrmUserStatus', paramsData.COMMON(data)),

  /**
   * 获取开户方式 - 进入对应入金地址
   *
   * @return JSON { code: integer, message: string, result: { bankType } }
   * bankType ==> 银行账户类型 [0-香港银行卡 1-大陆银行卡]
   */
  getOpenBankType: data =>
    axios.post('/open_api/get_open_bank_type', paramsData.COMMON(data)),

  // 确认领取奖励
  postFetchRewardConfirm: data =>
    axios.post(
      '/reward_center_api/fetch_reward_confirm',
      paramsData.COMMON(data)
    )
}
