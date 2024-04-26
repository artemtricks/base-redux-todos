import React from "react";
import MainForm from "../components/Form";
import MainHeader from "../components/Header";
import TasksList from "../components/TasksList";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../redux/todoSlice";

export type Todo = { name: string; task: string; complited: false; id: number };

const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const { todo, status } = useSelector((state) => state.todo);
  console.log(todo);

  return (
    <div>
      <MainHeader />
      <MainForm />
      <TasksList todo={todo} status={status} />
    </div>
  );
};

export default Home;
