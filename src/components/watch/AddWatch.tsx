import { FC } from 'react'
import { IClockData } from '../../App'

interface AddWatchProps {
  addClock: (newClock: IClockData) => void
}

const AddWatch: FC<AddWatchProps> = ({ addClock }) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    const formEntries = Object.fromEntries(formData.entries())

    const newClock = {
      ...formEntries,
      offset: parseFloat(formEntries.offset as string),
    } as unknown as IClockData

    addClock({
      id: Date.now(),
      watchData: { hour: 0, minute: 0, second: 0 },
      ...newClock,
    })

    target.reset()
  }

  return (
    <form
      className="flex gap-4 mb-8 w-full max-w-xl"
      method="POST"
      onSubmit={(event) => onSubmitHandler(event)}
    >
      <input
        className="input input-bordered w-full max-w-lg"
        type="text"
        placeholder="Название"
        name="name"
        required
      />
      <input
        className="input input-bordered w-full max-w-lg"
        type="number"
        placeholder="Временная зона, Мск (+3)"
        name="offset"
        min={-12}
        max={14}
        step={0.5}
        required
      />
      <button className="btn btn-primary" type="submit">
        Добавить
      </button>
    </form>
  )
}

export default AddWatch
