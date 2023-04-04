import type { Student } from "features/students/types"

/**Types */
export interface IState {
    isLoading:boolean
    students:Student[]
    error:string
}

export type handleAction<A extends IAction> = (state:IState, action:A)=>IState

