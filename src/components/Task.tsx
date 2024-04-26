import { Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { toggleTodos, removeTodos } from "../redux/todoSlice";
import { deleteTodo } from "../redux/todoSlice";
type Props = {
  complited: boolean;
  task: string;
  name: string;

  id: number;
};

const Task: React.FC<Props> = ({ complited, task, name, id }) => {
  const dispatch = useDispatch();
  console.log(id, "ididididdidi");
  const handleDelete = () => {
    dispatch(removeTodos(id));
  };

  return (
    <li
      style={{
        display: "flex",
        width: 300,
        height: 50,
        justifyContent: "space-between",
        padding: 30,
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <Checkbox
        onChange={() => dispatch(toggleTodos(id))}
        checked={complited}
      />
      <span>{task}</span>
      <h4>{name}</h4>
      <Button onClick={handleDelete}>X</Button>
    </li>
  );
};

export default Task;
