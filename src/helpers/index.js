import {STATUS_CODE, url} from '@/constants'
export const convert = () => {

}
export function errorApiHandler (error) {
  const {status, data} = error
  let title = 'Lỗi'
  let content = []
  switch (status) {
    case STATUS_CODE.HTTP_UNPROCESSABLE_ENTITY: {
      Object.keys(data).forEach(k => {
        content.push(data[k])
      })
      break
    }
    case STATUS_CODE.HTTP_UNAUTHORIZED: {
      content.push('Thông tin đăng nhập chưa chính xác')
      // global.vm.$router.push({'name': 'Login'})
      break
    }
    case 400: {
      content.push('Xảy ra lỗi!!!')
      break
    }
    case 404: {
      content.push('Opp! Không tìm thấy')
      break
    }
    default: null
  }
  if (title && content.length > 0) {
    showNotification({title, content}, 'error')
  }
}
export function successApiHandler (data) {
  showNotification({title: 'Success!!!', content: [data]})
}

export function showNotification ({title = 'Thông báo', content = []}, type = 'success') {
  let text = ''
  content.forEach(item => {
    text += item + '<br/>'
  })
  if (!text) return
  global.vm.$notify({
    group: 'notification',
    title,
    text,
    type
  })
}
export function getImageById (id) {
  return `${url}image${id}.jpg`
}
export function getASStatusTextByid (id) {
  switch (id) {
    case 0: return 'Đang làm'
    case 1: return 'Đã nộp bài'
    case 2: return 'Đã huỷ'
  }
}
