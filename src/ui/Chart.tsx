import { useMemo } from 'react'
import { BaseChart } from './BaseChart'

export type ChartProps = {
  data: number[]
  maxDataPoints: number
  selectedView: "CPU" | "RAM" | "STORAGE"
}

export const COLOR_MAP = {
  CPU: {
    fill: '#076c82',
    stroke: '#5DD4EE',  
  },
  RAM: {
    fill: '#5F3C07',
    stroke: '#E99311',
  },
  STORAGE: {
    fill: '#0B5B22',
    stroke: '#1ACF4D',
  }
}

const Chart = (props: ChartProps) => {
  const color  = useMemo(() => COLOR_MAP[props.selectedView], [props.selectedView])
const preparedData = useMemo(() =>{ 
    const points = props.data.map(point => ({ value: point*100 }))

    return [...points, ...Array.from({length: props.maxDataPoints - points.length}).map(() => ({ value: undefined }))]
}
    ,[props.data, props.maxDataPoints]
)

  return  <BaseChart data={preparedData} fill={color.fill} stroke={color.stroke} />
}

export default Chart