import { ElMessageBox } from 'element-plus'

/**
 * 消息提示
 **/
export function alertBox(message, title = '提示', options) {
  return ElMessageBox.alert(message, title, {
    draggable: true,
    autofocus: false,
    ...options
  })
}

/**
 * 确认消息
 **/
export function confirmBox(msg, title = '提示', options) {
  return ElMessageBox.confirm(msg, title, {
    type: 'warning',
    draggable: true,
    autofocus: false,
    closeOnClickModal: false,
    ...options
  })
}
