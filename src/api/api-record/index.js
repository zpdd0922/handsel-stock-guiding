import axios from '../axios/index'
import paramsData from '../params/params-wrap'

export default {
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
  /**
   * 首次入金奖励规则
   * busType
   * 0 未入金或未转仓
   * 1 已入金或以转仓
   * 2 入金或转仓未达到奖励条件
   * 3 有待领取的奖励
   * 4 已到账
   * 5 已入持仓
   * 6 已拒绝
   */
  getFirstDeposit: data =>
    axios.post('reward_center_api/first_deposit_rule', paramsData.COMMON(data)),

  /**
   * 首次转仓奖励规则
   * busType
   * 0 未入金或未转仓
   * 1 已入金或以转仓
   * 2 入金或转仓未达到奖励条件
   * 3 有待领取的奖励
   * 4 已到账
   * 5 已入持仓
   * 6 已拒绝
   */
  getFirstRollover: data =>
    axios.post(
      'reward_center_api/first_rollover_rule',
      paramsData.COMMON(data)
    ),

  /**
   * 赠股记录
   */
  getFindHandselStock: data =>
    axios.post('reward_center_api/find_handsel_stock', paramsData.COMMON(data))
}
