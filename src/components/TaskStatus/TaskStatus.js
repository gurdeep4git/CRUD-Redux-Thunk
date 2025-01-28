import React from "react";
import { taskStatus } from "../../constants/task-constants";

export const TaskStatus = ({ status }) => {
  if (status === taskStatus[0].value) {
    return <span>{taskStatus[0].label}</span>;
  }

  if (status === taskStatus[1].value) {
    return <span>{taskStatus[1].label}</span>;
  }

  if (status === taskStatus[2].value) {
    return <span>{taskStatus[2].label}</span>;
  }

  return <span>{taskStatus[3].label}</span>;
};
