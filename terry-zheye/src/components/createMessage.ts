import { createApp } from 'vue'
import Message from './Message.vue'

export type messageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: messageType, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })

  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
