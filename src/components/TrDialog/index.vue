<template>
  <transition name="jf-dialog-fade">
    <div :class="['jf-popup', 'jf-dialog', mask && 'jf-popup_mask']"
          v-show="visible">
      <div class="popup-mask" @touchmove.prevent></div>
      <div class="popup-wrap">
        <div class="wrap-content">
          <div class="content-main" @touchmove.prevent>
            <div class="dialog-inner">
              <div class="head">
                <p class="title">恭喜您</p>
              </div>
              <slot></slot>
            </div>
            <slot name="btns">
            <div class="clickBtn" @click="handleConfirm">
              <p>立即转仓</p>
            </div>
            <div class="closeBtn" @click="handleCancel"></div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// 对话框支持类型
const DEFALUT_DIALOG_TYPE = ['alert', 'confirm']

export default {
  props: {
    // 是否可见
    visible: {
      type: Boolean,
      default: false
    },
    // 对话框类型，仅支持两种
    type: {
      type: String,
      default: 'alert',
      validator: value => {
        return DEFALUT_DIALOG_TYPE.indexOf(value) !== -1
      }
    },
    // 是否显示遮盖
    mask: {
      type: Boolean,
      default: true
    },
    // 是否显示右上角关闭
    showClose: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    isConfirm() {
      return this.type === 'confirm'
    }
  },
  methods: {
    hide() {
      // 同步属性
      this.$emit('update:visible', false)
    },
    handleCancel(e) {
      this.hide()
      this.$emit('cancel', e)
    },
    handleConfirm(e) {
      this.hide()
      this.$emit('confirm', e)
    },
    handleClose(e) {
      this.hide()
      this.$emit('close', e)
    }
  }
}

</script>

<style lang='stylus' scoped>
@import '~assets/stylus/variable.styl'
@import '~assets/stylus/mixin.styl'

.jf-popup
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 100
  .popup-mask
    overflow hidden
    background-color #25262d
    opacity .4
    pointer-events auto
  .popup-wrap
    transform translate(100%,100%)
  .wrap-content
    position absolute
    top -50%;
    left -50%
    width auto
    max-width 100%
    transform translate(-50%,-50%)
    box-sizing border-box
  .content-main
    width 610px
    padding 0
    text-align center
    border-radius 10px
    background-color #fff
  .dialog-close
    bg-image('dialog-close')
    position absolute
    right 20px
    top 20px
    z-index 1
  .dialog-inner
    overflow hidden
    position relative
    padding-bottom 80px
    // padding 50px 30px 0
    color #333
    .head
      width 610px
      height 207px
      padding-top 10px
      bg-image('rule-bg',ture)
      background-size 100%
      .title
        height:80px;
        width: 130px;
        margin: 0 auto;
        text-align center;
        font-size:42px;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:80px;
    .title
      font-size 32px
      font-weight bold
      margin-bottom 50px
  .dialog-btns
    font-size 0
    display flex
    overflow hidden
    border-top 1PX solid #ddd
    border-bottom-left-radius 10px
    border-bottom-right-radius 10px
    .btn
      flex 1
      line-height 100px
      font-size 32px
      text-align center
      color #a5460d
      background-color #fff
      background-clip padding-box
      box-sizing border-box
      &.active
        color #993e08
        background #ffd339

.popup-mask, .popup-wrap
  position absolute
  width 100%
  height 100%

.jf-popup_mask
    pointer-events auto
    .popup-mask
      display block

.jf-dialog-fade-enter-active
  animation dialog-fadein .4s
  .content-main
    animation dialog-zoom .4s

@keyframes dialog-fadein
  0%
    opacity 0
  100%
    opacity 1
@keyframes dialog-zoom
  0%
    transform scale(0)
  50%
    transform scale(1.1)
  100%
    transform scale(1)

.clickBtn
  position absolute
  left 80px
  bottom -36px
  width:460px;
  height:90px;
  background:#FFE25C;
  border-radius:45px;
  p
    height:90px;
    font-size:32px;
    font-weight:bold;
    color:rgba(181,92,38,1);
    line-height:90px;
    text-align center
.closeBtn
  position absolute
  left 280px
  bottom -150px
  width:54px;
  height:54px;
  bg-image('close',ture)
  background-size 100%
</style>
