/***************************
 * 处理cube-UI 弹框信息
 ***************************/
import Vue from 'vue'
const vm = new Vue()

export const toast = ({ type = 'txt', txt, callback, time, mask }) => {
  const toast = vm.$createToast({
    txt,
    type,
    time,
    mask,
    onTimeout: () => {
      callback && callback()
    }
  })
  toast.show()
}

export const alert = ({ title, content, callback, icon, type = 'alert', createFunc }) => {
  const alert = vm.$createDialog({
    icon,
    title,
    content,
    type,
    onConfirm: () => {
      callback && callback()
    }
  }, createFunc)
  alert.show()
}

export const confirm = ({
  title,
  content,
  confirmTxt = '是',
  cancelTxt = '否',
  confirmCallback,
  cancelCallback,
  type = 'confirm'
}) => {
  const confirm = vm.$createDialog({
    type,
    title,
    content,
    confirmBtn: {
      text: confirmTxt,
      active: true,
      disabled: false,
      href: 'javascript:;'
    },
    cancelBtn: {
      text: cancelTxt,
      active: false,
      disabled: false,
      href: 'javascript:;'
    },
    onConfirm: () => {
      confirmCallback && confirmCallback()
    },
    onCancel: () => {
      cancelCallback && cancelCallback()
    }
  })
  confirm.show()
}

export const customAlert = ({ title, content, callback }) => {
  const alert = vm.$createAlert({
    title,
    content,
    onConfirm: () => {
      callback && callback()
    }
  })
  alert.$on('confirm', () => {
    // 销毁实例
    alert.remove()
  })
}

// 主要方便签名页横向的问题
export const customToast = ({ type, txt, time, styleObj, callback }) => {
  const tips = vm.$createTips({
    type,
    txt,
    time,
    styleObj,
    onTimeout: () => {
      callback && callback()
    }
  })
  tips.show()
}
