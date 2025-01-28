import {
  DELETE_TASK_SUCCESS,
  FETCH_TASK_DETAILS_FAILURE,
  FETCH_TASK_DETAILS_REQUEST,
  FETCH_TASK_DETAILS_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  SORT_HEADER,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "../actions/actionTypes";

const initState = {
  tasks: [],
  taskDetails: null,
  loading: false,
  error: null,
};

const tasksReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TASK_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TASK_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskDetails: action.payload,
      };
    case FETCH_TASK_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SORT_HEADER:
      const tasksCopy = [...state.tasks];
      const col = action.payload;
      tasksCopy.sort((a, b) => {
        if (a[col] < b[col]) {
          return -1;
        }
        if (a[col] > b[col]) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        tasks: tasksCopy,
      };
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TASK_SUCCESS:
      const task = action.payload;
      const updatedTasks = state.tasks.map((item) =>
        item.id === task.id ? { ...item, ...task } : item
      );
      return {
        ...state,
        loading: false,
        tasks: updatedTasks,
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TASK_SUCCESS:
      const filteredTasks = state.tasks.filter(
        (i) => i.id !== action.payload.id
      );
      return {
        ...state,
        loading: false,
        tasks: filteredTasks,
      };

    default:
      return state;
  }
};

export default tasksReducer;
