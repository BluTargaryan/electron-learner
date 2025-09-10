import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BaseChart } from './BaseChart'
import { useStatistics } from './useStatistics'
import Chart from './Chart'

function App() {
  const staticData = useStaticData()
const statistics = useStatistics(10)
const cpuUsages = useMemo(() => statistics.map(stat => stat.cpuUsage), [statistics])
const ramUsages = useMemo(() => statistics.map(stat => stat.ramUsage), [statistics])
const storageUsages = useMemo(() => statistics.map(stat => stat.storageUsage), [statistics])
const [activeView, setActiveView] = useState<View>('CPU')

useEffect(() => {
  window.electron.subscribeChangeView((view) => setActiveView(view))
}, [])

const activeUsages = useMemo(() => {
  switch (activeView) {
    case 'CPU':
      return cpuUsages
    case 'RAM':
      return ramUsages
    case 'STORAGE':
      return storageUsages
  }
}, [activeView, cpuUsages, ramUsages, storageUsages]) 


  return (
    <>
      <Header />
        <main>
        <div>
          <SelectOption title="CPU" view="CPU" subtitle={staticData?.cpuModel || ''} data={cpuUsages} onClick={() => setActiveView('CPU')} />
          <SelectOption title="RAM" view="RAM" subtitle={staticData?.totalMemoryGB+ ' GB' || ''} data={ramUsages} onClick={() => setActiveView('RAM')} />
          <SelectOption title="STORAGE" view="STORAGE" subtitle={staticData?.totalStorage+ ' GB' || ''} data={storageUsages} onClick={() => setActiveView('STORAGE')} />
        </div>
        <div className="mainGrid">
          <Chart data={activeUsages} selectedView={activeView} maxDataPoints={10} />
        </div>
        
        </main>
    </>
  )
}

function Header() {
  return (
    <header>
      <button id='close' onClick={() => window.electron.sendFrameAction('CLOSE')}/>
      <button id='minimize' onClick={() => window.electron.sendFrameAction('MINIMIZE')}/>
      <button id='maximize' onClick={() => window.electron.sendFrameAction('MAXIMIZE')}/>
    </header>
  )
}

function SelectOption({title,view,subtitle,data, onClick}:{title:string,view:View,subtitle:string, data:number[], onClick:() => void}){
  return <button className='selectOption' onClick={onClick}>
    <div className='selectOptionTitle'>
    <div>{title}</div>
    <div>{subtitle}</div>
    </div>
    <div className='selectOptionChart'>
      <Chart data={data} selectedView={view} maxDataPoints={10} />
    </div>
  </button>
}

function useStaticData(){
  const [staticData, setStaticData] = useState<StaticData | null>(null)
  useEffect(() => {
    (async () => {
      setStaticData(await window.electron.getStaticData())
    })();
  }, [])
  return staticData
}

export default App
