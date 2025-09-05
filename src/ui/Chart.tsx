import { useMemo } from 'react'
import { BaseChart } from './BaseChart'

export type ChartProps = {
  data: number[]
  maxDataPoints: number
  fill: string
  stroke: string
}

const Chart = (props: ChartProps) => {
const preparedData = useMemo(() =>{ 
    const points = props.data.map(point => ({ value: point*100 }))

    return [...points, ...Array.from({length: props.maxDataPoints - points.length}).map(() => ({ value: undefined }))]
}
    ,[props.data, props.maxDataPoints]
)

  return  <BaseChart data={preparedData} fill={props.fill} stroke={props.stroke} />
}

export default Chart