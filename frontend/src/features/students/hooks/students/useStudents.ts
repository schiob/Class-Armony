import { useEffect, useReducer, useCallback } from "react";
import { StudentPayload } from "../../types";

import { ACTIONS, reducer } from "./utils/handle-reducer";
import type { IState } from "./utils/handle-reducer/types";

const STUDENTS_ENDPOINT = "http://localhost:8080/students/";
const DEFAULT_VALUE:IState = {
  isLoading:true,
  students:[],
  error:""
}

export function useStudents() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_VALUE)
  
  const getStudents = useCallback(
    async () => {
      dispatch({type:ACTIONS.SWITCH_LOADING})
   
      const response = await fetch(STUDENTS_ENDPOINT);
      const list = await response.json();
      const students = list.students ?? []
      
      dispatch({type:ACTIONS.UPDATE, students})
      dispatch({type:ACTIONS.SWITCH_LOADING})
    },[]
  )

  const addStudent = useCallback(
    async (studentP: StudentPayload) => {
      dispatch({type:ACTIONS.SWITCH_LOADING})
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentP),
      };
  
      const response = await fetch(
        STUDENTS_ENDPOINT,
        requestOptions
      );
      const data = await response.json();
  
      dispatch({type:ACTIONS.ADD_STUDENT, student:data})
      dispatch({type:ACTIONS.SWITCH_LOADING})
    },[]
  )  

  const deleteStudent = useCallback(
    async (studentID: string) => {
      dispatch({type:ACTIONS.SWITCH_LOADING})
  
      const requestOptions = {
        method: "DELETE",
      };
  
      const response = await fetch(
        STUDENTS_ENDPOINT.concat(studentID),
        requestOptions
      );
      
      const responseStatus = response.status;
      console.log(responseStatus);
  
      dispatch({type:ACTIONS.DELETE_STUDENT, id:studentID})
      dispatch({type:ACTIONS.SWITCH_LOADING})
    },[]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {getStudents()}, []);

  return { ...state, addStudent, deleteStudent };
}
