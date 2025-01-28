import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchTaskDetails, updateTask } from "../../redux/actions/tasksActions";
import { taskPriority, taskStatus } from "../../constants/task-constants";

export const TaskForm = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskDetails, loading, error } = useSelector((state) => state.tasks);
  const [taskInputs, setTaskInputs] = useState({
    id: "",
    title: "",
    assignedTo: "",
    status: "",
    priority: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskDetails(id, state));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (taskDetails != null) {
      setTaskInputs({
        ...taskDetails
      });
    }
  }, [taskDetails]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setTaskInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTask(taskInputs));
    navigate("/");
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {!loading && taskDetails && (
        <form onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={taskInputs?.title}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Assigned To</label>
                <input
                  type="text"
                  className="form-control"
                  name="assignedTo"
                  value={taskInputs?.assignedTo}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={taskInputs?.status}
                  onChange={onChangeHandler}
                >
                  {taskStatus.map((item) => (
                    <option key={item.value} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select
                  className="form-control"
                  name="priority"
                  value={taskInputs?.priority}
                  onChange={onChangeHandler}
                >
                  {taskPriority.map((item) => (
                    <option key={item.value} value={item?.value}>
                      {item?.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="startDate"
                  value={taskInputs?.startDate}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="endDate"
                  value={taskInputs?.endDate}
                  onChange={onChangeHandler}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
