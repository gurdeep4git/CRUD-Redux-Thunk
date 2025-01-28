import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "../../redux/actions/tasksActions";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { TaskPriority } from "../TaskPriority/TaskPriority";
import { Link } from "react-router-dom";
import { SORT_HEADER } from "../../redux/actions/actionTypes";
import { transformDate } from "../../utils/transform-date";
import Popup from "../Popup/Popup";

export const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onHeaderClick = (e) => {
    const column = e.target.attributes["data-column"].value;
    dispatch({ type: SORT_HEADER, payload: column });
  };

  const openModalHandler = (id) => {
    setOpen(true);
    setId(id);
  };

  const closeModalHandler = () => {
    setOpen(false);
    setId(null);
  };

  const onDeleteConfirmHandler = () => {
    dispatch(deleteTask(id));
    closeModalHandler();
  };

  const tableTemplate = (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th data-column="title" onClick={(e) => onHeaderClick(e)}>
            Title
          </th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task) => (
          <tr key={task?.title}>
            <td>
              <Link
                to={`/details/${task.id}`}
                state={{ status: task?.status, priority: task?.priority }}
              >
                {task?.title}
              </Link>
            </td>
            <td>{task?.assignedTo}</td>
            <td>
              <TaskStatus status={task?.status} />
            </td>
            <td>
              <TaskPriority priority={task?.priority} />
            </td>
            <td>{transformDate(task?.startDate)}</td>
            <td>{transformDate(task?.endDate)}</td>
            <td>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  to={`/edit/${task.id}`}
                  state={{ status: task?.status, priority: task?.priority }}
                >
                  <button type="button" className="btn btn-primary">
                    Edit
                  </button>
                </Link>
                <button
                  type="button"
                  onClick={() => openModalHandler(task?.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {!loading && tasks?.length && tableTemplate}
      {open && (
        <Popup
          deleteConfirm={onDeleteConfirmHandler}
          closeModal={closeModalHandler}
        />
      )}
    </>
  );
};
