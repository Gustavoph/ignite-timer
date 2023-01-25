import * as z from 'zod'
import { Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form'
import { createContext, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './styles'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'

const createNewCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe uma tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type CreateNewCycleType = z.infer<typeof createNewCycleFormSchema>

interface Cycle {
  id: string
  task: string
  startDate: Date
  minutesAmount: number
  interruptedDate?: Date
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        if (cycle.id === String(activeCycle)) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const newCycleForm = useForm<CreateNewCycleType>({
    resolver: zodResolver(createNewCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: CreateNewCycleType) {
    console.log(data)
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setActiveCycleId(newCycle.id)
    setCycles((state) => [...state, newCycle])
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles((cycles) =>
      cycles.map((cycle) => {
        if (cycle.id === String(activeCycle)) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  const task = watch('task')
  const isDisabledSubmit = !task

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    >
      <S.HomeContainer>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          {activeCycle ? (
            <S.StopCountDownButton type="button" onClick={handleInterruptCycle}>
              <Play size={24} />
              Parar
            </S.StopCountDownButton>
          ) : (
            <S.StartCountdownButton disabled={isDisabledSubmit} type="submit">
              <Play size={24} />
              Começar
            </S.StartCountdownButton>
          )}
        </form>
      </S.HomeContainer>
    </CyclesContext.Provider>
  )
}
