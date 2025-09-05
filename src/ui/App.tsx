import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BaseChart } from './BaseChart'
import { useStatistics } from './useStatistics'
import Chart from './Chart'

function App() {
  const [count, setCount] = useState(0)
const statistics = useStatistics(10)
const cpuUsages = useMemo(() => statistics.map(stat => stat.ramUsage), [statistics])


  return (
    <>
      <div>
        <div style={{ height: 120}}>
          <Chart data={cpuUsages} fill="red" stroke="blue" maxDataPoints={10} />
        </div>

        <a href="https://vite.dev" target="_blank">
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
