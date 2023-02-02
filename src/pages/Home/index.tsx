import * as z from 'zod'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import * as S from './styles'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import { useCycles } from '../../contexts/CyclesContext'

const createNewCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe uma tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type CreateNewCycleType = z.infer<typeof createNewCycleFormSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } = useCycles()

  const newCycleForm = useForm<CreateNewCycleType>({
    resolver: zodResolver(createNewCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: CreateNewCycleType) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isDisabledSubmit = !task

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <CountDown />

        {activeCycle ? (
          <S.StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
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
  )
}
