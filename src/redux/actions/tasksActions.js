import axios from "axios";
import {
  FETCH_TASK_DETAILS_FAILURE,
  FETCH_TASK_DETAILS_REQUEST,
  FETCH_TASK_DETAILS_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
} from "./actionTypes";
import { taskPriority, taskStatus } from "../../constants/task-constants";

export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: FETCH_TASKS_REQUEST });
  try {
    const response = await axios.get(
      `https://67961955bedc5d43a6c443ce.mockapi.io/tasks`
    );
    const updatedResponse = response?.data?.map((item, i) => {
      return {
        ...item,
        status: Math.floor(Math.random() * taskStatus.length),
        priority: Math.floor(Math.random() * taskPriority.length),
      };
    });
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: updatedResponse });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAILURE, payload: error?.message });
  }
};

export const fetchTaskDetails = (id, state) => async (dispatch) => {
  dispatch({ type: FETCH_TASK_DETAILS_REQUEST });
  try {
    const response = await axios.get(
      `https://67961955bedc5d43a6c443ce.mockapi.io/tasks/${id}`
    );

    response.data = {
      ...response.data,
      status: state.status,
      priority: state?.priority,
    };

    dispatch({ type: FETCH_TASK_DETAILS_SUCCESS, payload: response?.data });
  } catch (error) {
    dispatch({ type: FETCH_TASK_DETAILS_FAILURE, payload: error?.message });
  }
};

export const updateTask = (task) => async (dispatch) => {
  dispatch({ type: UPDATE_TASK_REQUEST });
  try {
    const response = await axios.put(
      `https://67961955bedc5d43a6c443ce.mockapi.io/tasks/${task.id}`,
      task
    );
    dispatch({ type: UPDATE_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_TASK_FAILURE, payload: error?.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  dispatch({ type: DELETE_TASK_REQUEST });
  try {
    const response = await axios.delete(
      `https://67961955bedc5d43a6c443ce.mockapi.io/tasks/${id}`,
    );
    dispatch({ type: DELETE_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DELETE_TASK_FAILURE, payload: error?.message });
  }
};
