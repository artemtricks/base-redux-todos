import React from "react";
import { Form, Input, Button } from "antd";
import { UseDispatch, useDispatch } from "react-redux";
import { addTodos } from "../redux/todoSlice";

type Todo = {
  name: string;
  task: string;
  complited: boolean;
  id: number;
};

const MainForm: React.FC = () => {
  const [formValue, setFormValue] = React.useState<Todo | {}>({});
  const dispatch = useDispatch();

  const handleTodo = () => {
    dispatch(addTodos(formValue));
    setFormValue({});
  };
  return (
    <div style={{ display: "flex", padding: 30, flexDirection: "column" }}>
      <Form>
        <Input
          placeholder="Введите дело"
          onChange={(e) =>
            setFormValue({
              ...formValue,
              task: e.target.value,
            })
          }
          value={formValue.task}
        />
        <Input
          placeholder="Введите имя"
          name="name"
          onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
          value={formValue.name}
        />

        <div style={{ display: "flex" }}></div>
        <Button onClick={handleTodo}>Отправить информацию</Button>
      </Form>
    </div>
  );
};

export default MainForm;
