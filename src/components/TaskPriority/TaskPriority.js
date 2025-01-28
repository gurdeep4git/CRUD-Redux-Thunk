import React from "react";

export const TaskPriority = ({ priority }) => {
  if (priority === -1) {
    return <span className="badge text-bg-warning">Low</span>;
  }

  if (priority === 0) {
    return <span className="badge text-bg-info">Medium</span>;
  }

  return <span className="badge text-bg-danger">High</span>;
};
