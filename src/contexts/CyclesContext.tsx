import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useReducer,
} from 'react'
import { ActionTypes, Cycle, CyclesReducer } from '../reducers/cycles'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  amountSecondsPassed: number
  activeCycleId: string | null
  activeCycle: Cycle | undefined
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesProvider({ children }: PropsWithChildren) {
  const [cyclesState, dispatch] = useReducer(CyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENCT_CYCLE_AS_FINISHED,
      payload: { activeCycleId },
    })
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({ type: ActionTypes.ADD_NEW_CYCLES, payload: { newCycle } })
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: { activeCycleId },
    })
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        createNewCycle,
        setSecondsPassed,
        amountSecondsPassed,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export const useCycles = () => useContext(CyclesContext)
