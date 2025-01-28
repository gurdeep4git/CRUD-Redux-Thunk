import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "../../redux/actions/tasksActions";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { TaskPriority } from "../TaskPriority/TaskPriority";
import { Link } from "react-router-dom";
import { SORT_HEADER } from "../../redux/actions/actionTypes";
import { transformDate } from "../../utils/transform-date";
import Popup from "../Popup/Popup";
import sortDown from "../../assets/sort-alpha-down.svg";
import sortUp from "../../assets/sort-alpha-up.svg";

export const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onHeaderClick = (e) => {
    const column = e?.target?.attributes["data-column"]?.value;
    const payload = {
      column,
      sortType,
    };
    dispatch({ type: SORT_HEADER, payload });
    setSortType(Number(!sortType));
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
          <th className="d-flex justify-content-between" data-column="title" onClick={(e) => onHeaderClick(e)}>
            <span>Title</span>
            <span>
              {sortType === 0 ? (
                <img src={sortUp} alt="icon" />
              ) : (
                <img src={sortDown} alt="icon" />
              )}
            </span>
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
                <button style={{marginLeft:'-3px'}}
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
