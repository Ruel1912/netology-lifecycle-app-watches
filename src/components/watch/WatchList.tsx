import { FC } from 'react'
import './watch.css'
import { IClockData } from '../../App'
import { MdClose } from 'react-icons/md'

interface WatchListProps {
  removeCLock: (id: number) => void
  clocks: IClockData[]
}

const WatchList: FC<WatchListProps> = ({ clocks=[], removeCLock }) => {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      {clocks.map(
        (clock) =>
          clock.watchData && (
            <div key={clock.id}>
              <div className="flex gap-4 justify-center mb-4 ml-4">
                <h2 className="text-3xl font-bold text-center capitalize">{clock.name}</h2>
                <button
                  className="btn btn-circle w-8 h-8 min-h-0 mt-1"
                  onClick={() => clock.id && removeCLock(clock.id)}
                >
                  <MdClose />
                </button>
              </div>
              <div className="clock">
                <div
                  style={{
                    transform: `rotateZ(${
                      clock.watchData.hour + clock.watchData.minute / 12
                    }deg)`,
                  }}
                  className="hour"
                ></div>
                <div
                  style={{ transform: `rotateZ(${clock.watchData.minute}deg)` }}
                  className="min"
                ></div>
                <div
                  style={{ transform: `rotateZ(${clock.watchData.second}deg)` }}
                  className="sec"
                ></div>
              </div>
            </div>
          )
      )}
    </div>
  )
}

export default WatchList
