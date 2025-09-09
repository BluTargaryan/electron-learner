type Statistics = {
    cpuUsage: number
    ramUsage: number
    storageUsage: number
}

type View = 'CPU' | 'RAM' | 'STORAGE'

type FrameWindowAction = 'CLOSE' | 'MINIMIZE' | 'MAXIMIZE'

type StaticData = {
    totalStorage: number
    cpuModel: string
    totalMemoryGB: number
}

type UnsubscribeFunction = () => void

type EventPayloadMapping = {
    statistics: Statistics
    getStaticData: StaticData
    changeView: View
    sendFrameAction: FrameWindowAction
}

interface Window {
    electron: {
        subscribeStatistics: (callback: (statistics: Statistics) => void) => UnsubscribeFunction
        getStaticData: () => Promise<StaticData>
        subscribeChangeView: (callback: (view: View) => void) => UnsubscribeFunction
        sendFrameAction: (payload: FrameWindowAction) => void
    }
}