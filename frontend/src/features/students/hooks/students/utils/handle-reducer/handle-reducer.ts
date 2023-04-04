import type { Student } from "features/students/types"
import { handleAction, IState } from "./types"

export const enum ACTIONS {
    SWITCH_LOADING,
    UPDATE,
    ERROR,
    ADD_STUDENT,
    DELETE_STUDENT
}

// Loading Action
interface ILoadingAction{
    type: ACTIONS.SWITCH_LOADING
}
const loading:handleAction<ILoadingAction> = (state, action)=>{
    return {...state, isLoading:!state.isLoading}
}

// Update Action
interface IUpdateAction{
    type:ACTIONS.UPDATE,
    students: Student[]
}
const update:handleAction<IUpdateAction> = (state, action)=>{
    return {...state, students:action.students}
}

// Error Action
interface IErrorAction {
    type: ACTIONS.ERROR,
    error: string,
}
const error:handleAction<IErrorAction> = (state, action) =>{
    return {...state, error: action.error}
}

// Add Action
interface IAddStudentAction {
    type: ACTIONS.ADD_STUDENT,
    student: Student
}
const addStudent:handleAction<IAddStudentAction> = (state, action) =>{
    const students = state.students
    return {...state, students:[...students, action.student]}
}

// Delete Action
interface IDeleteStudentAction{
    type: ACTIONS.DELETE_STUDENT,
    id: string,
}
const deleteStudent:handleAction<IDeleteStudentAction> = (state, action) => { 
    const students = state.students.filter(student => student.id !== action.id)
    return {...state, students}
 }


/** Store */
const STORE = {
    [ACTIONS.SWITCH_LOADING]:loading,
    [ACTIONS.UPDATE]:update,
    [ACTIONS.ERROR]:error,
    [ACTIONS.ADD_STUDENT]:addStudent,
    [ACTIONS.DELETE_STUDENT]: deleteStudent
}


/** Reducer */
type TActions = ILoadingAction | IUpdateAction | IErrorAction | IAddStudentAction | IDeleteStudentAction
export function reducer(state:IState, action:TActions):IState{
    const TYPE = action.type
    const handleAction = STORE[TYPE]

    if (handleAction === undefined) return state
    return handleAction(state, action as any)

}


