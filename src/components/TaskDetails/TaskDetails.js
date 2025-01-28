import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { fetchTaskDetails } from "../../redux/actions/tasksActions";
import { TaskStatus } from "../TaskStatus/TaskStatus";
import { TaskPriority } from "../TaskPriority/TaskPriority";
import { transformDate } from "../../utils/transform-date";

export const TaskDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { state } = useLocation();
  const { taskDetails, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskDetails(id, state));
  }, [dispatch]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {!loading && taskDetails && (
        <div>
          <p>
            <b>Title:</b>
            <span>{taskDetails?.title}</span>
          </p>
          <p>
            <b>Assigned To:</b>
            <span>{taskDetails?.assignedTo}</span>
          </p>
          <p>
            <b>Status:</b>
            <span>
              <TaskStatus status={taskDetails?.status} />
            </span>
          </p>
          <p>
            <b>Priority:</b>
            <span>
              <TaskPriority priority={taskDetails?.priority} />
            </span>
          </p>
          <p>
            <b>Start Date:</b>
            <span>{transformDate(taskDetails?.startDate)}</span>
          </p>
          <p>
            <b>End Date:</b>
            <span>{transformDate(taskDetails?.endDate)}</span>
          </p>
        </div>
      )}
    </>
  );
};
