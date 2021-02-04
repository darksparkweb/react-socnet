const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

let socket: WebSocket | null = null

type EventsNamesTypes = 'messages-received' | 'status-changed'

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('REFRESH PAGE')
}
const cleanUp = () => {
    socket?.removeEventListener('close', closeHandler)
    socket?.removeEventListener('message', messageHandler)
    socket?.removeEventListener('open', openHandler)
    socket?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    socket?.close()
    socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    socket.addEventListener('close', closeHandler)
    socket.addEventListener('message', messageHandler)
    socket.addEventListener('open', openHandler)
    socket.addEventListener('error', errorHandler)

}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        socket?.close()

    },
    subscribe(eventName: EventsNamesTypes, callBack: MessagesReceivedSubscriberType | StatusChangedSubscriberType | null) {
        // @ts-ignore
        subscribers[eventName].push(callBack)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callBack)
        }
    },
    unsubscribe(eventName: EventsNamesTypes, callBack: MessagesReceivedSubscriberType | StatusChangedSubscriberType | null) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callBack)
    },
    sendMessage(message: string) {
        socket?.send(message)
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

export type ChatMessageAPIType = {
    id?: string
    message: string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'