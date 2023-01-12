import * as z from 'zod'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './styles'

const createNewCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe uma tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type CreateNewCycleType = z.infer<typeof createNewCycleFormSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<CreateNewCycleType>({
    resolver: zodResolver(createNewCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: CreateNewCycleType) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const isDisabledSubmit = !task

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <S.FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <S.TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <S.MinutesAmountInput
            min={5}
            max={60}
            step={5}
            type="number"
            placeholder="00"
            id="minutesAmount"
            {...(register('minutesAmount'), { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </S.FormContainer>

        <S.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountdownContainer>

        <S.CountdownButton disabled={isDisabledSubmit} type="submit">
          <Play size={24} />
          Começar
        </S.CountdownButton>
      </form>
    </S.HomeContainer>
  )
}
