<template>
  <div :class="['wrap', `wrap-${skin}`]">
    <div class="table">
      <div class="thead thead-color">
        <div v-for="(item, index) in header" :key="index" :class="item.class">
          {{ item.label }}
        </div>
      </div>
      <div class="tbody body-color">
        <div class="left text-padding">
          <ul v-for="(item, index) in list" :key="index">
            <li v-if="type === 3 || type === 4">
              {{$t('TABLE.LEFT')}}{{ item.curreny }}{{ item.totalCost }}
            </li>
            <li v-if="type === 0 || type === 1 || type === 2">
              {{ `${item.curreny}${item.startAmount}~${item.endAmount}` }}
            </li>
          </ul>
        </div>
        <cube-scroll
          ref="scroll"
          :data="list"
          direction="horizontal"
          class="horizontal-scroll-list-wrap"
        >
          <div class="right text-padding">
            <ul
              v-for="(item, index) in list"
              :key="index + item.commissionDays"
            >
              <li v-if="item.commissionDays">
                {{$t('TABLE.RIGHT.COMMISSON_DAYS', { stkQuantity: item.stkQuantity, stkName: item.stkName, commissionDays: item.commissionDays })}}
              </li>
              <li v-else>{{$t('TABLE.RIGHT.EL', { stkQuantity: item.stkQuantity, stkName: item.stkName })}}</li>
            </ul>
          </div>
        </cube-scroll>
      </div>
    </div>
    <slot name="btn"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    list: Array,
    header: Array,
    type: Number,
    skin: String
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="stylus">
@import '~assets/stylus/base/white-theme'
@import '~assets/stylus/base/black-theme'
@import '~assets/stylus/mixin'

.wrap
  .table
    font-size 28px
    // padding-left 24px
    .thead
      display flex
      height: 57px
      align-items center
      margin-bottom 15px
      padding-left 24px
      .left
        width 350px
      .right
        white-space: nowrap
    .thead-color
      color $white-theme-333
      border-1px('bottom', $white-theme-e5e5e5)
    .tbody
      display flex
      padding-left 24px
      .left
        width 350px
      .right
        padding-right 10px
        white-space: nowrap
    .body-color
      color $white-theme-999
  .text-padding
    ul
      line-height 60px
  .commit
    padding 27px 0
    text-align center
    font-size 30px
    color $white-theme-f95a29
  .draw
    font-size 30px
    padding 27px 0
    text-align center
    background-color $white-theme-f95a29
    color $white-theme-fff
  .disabled
    font-size 30px
    padding 27px 0
    text-align center
    color $white-theme-999
  .btn-top
    border-1px('top', $white-theme-e5e5e5)
.wrap-black
  .table
    .thead-color
      color $black-theme-fff
      border-1px('bottom', $white-theme-2e2e33)

    .body-color
      color $black-theme-999
  .btn-top
    border-1px('top', $white-theme-2e2e33)

.tbody >>>
.horizontal-scroll-list-wrap
  // border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  .cube-scroll-content
    display: inline-block
  .list-wrapper
    padding: 0 10px
    line-height: 60px
    white-space: nowrap
  .list-item
    display: inline-block
</style>
