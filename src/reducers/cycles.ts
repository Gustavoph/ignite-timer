/* eslint-disable no-unused-vars */
export interface Cycle {
  id: string
  task: string
  startDate: Date
  minutesAmount: number
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export enum ActionTypes {
  ADD_NEW_CYCLES = 'ADD_NEW_CYCLES',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENCT_CYCLE_AS_FINISHED = 'MARK_CURRENCT_CYCLE_AS_FINISHED',
}

export function CyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLES:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    case ActionTypes.MARK_CURRENCT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}
