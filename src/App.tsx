import { useEffect, useState } from 'react'
import './App.css'
import WatchList from './components/watch/WatchList'
import AddWatch from './components/watch/AddWatch'

interface IWatch {
  hour: number
  minute: number
  second: number
}

export interface IClockData {
  id?: number
  name: string
  offset: number
  watchData?: IWatch
}

function App() {
  const [clocks, setClocks] = useState<IClockData[]>([
    {
      id: 1729763962225,
      watchData: {
        hour: 0,
        minute: 0,
        second: 0,
      },
      name: 'Москва',
      offset: 3,
    },
    {
      id: 1729763967627,
      watchData: {
        hour: 0,
        minute: 0,
        second: 0,
      },
      name: 'Япония',
      offset: 9,
    },
    {
      id: 1729764034059,
      watchData: {
        hour: 0,
        minute: 0,
        second: 0,
      },
      name: 'Лондон',
      offset: 0,
    },
  ])

  const addClock = (newClock: IClockData) => {
    setClocks([...clocks, newClock])
  }

  const removeCLock = (id: number) =>
    setClocks(clocks.filter((clock) => clock.id !== id))

  useEffect(() => {
    const interval = setInterval(() => {
      setClocks(
        clocks.map((clock) => {
          const day = new Date(
            new Date().getTime() + (clock.offset - 3) * 60 * 60 * 1000
          )

          const hour = day.getHours() * 30
          const minute = day.getMinutes() * 6
          const second = day.getSeconds() * 6

          return {
            ...clock,
            watchData: {
              hour,
              minute,
              second,
            },
          }
        })
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [clocks])

  return (
    <>
      <AddWatch addClock={addClock} />
      <WatchList clocks={clocks} removeCLock={removeCLock} />
    </>
  )
}

export default App
