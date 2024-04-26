import React from "react";
import { Todo } from "../pages/Home";
import Task from "./Task";
import { useSelector } from "react-redux";

const TasksList = ({ todo, status }) => {
  if (status === "loading") {
    return <h3>Please wait...</h3>;
  }
  return (
    <ul>
      {todo &&
        todo.length > 0 &&
        todo.map((item: Todo) => {
          return (
            <Task
              task={item.task}
              complited={item.complited}
              name={item.name}
              key={item.id}
              id={item.id}
            />
          );
        })}
    </ul>
  );
};

export default TasksList;
