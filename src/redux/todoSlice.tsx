import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../pages/Home";
import axios from "axios";

export interface TodoState {
  todo: [] | Todo[];
}

const initialState: any = {
  todo: [],
  error: null,
  status: null,
};

export const fetchTodos = createAsyncThunk<Todo, void>(
  "todo/fetchTodos",
  async () => {
    try {
      const response = await axios.get(
        "https://f23fd5b7a0ad1362.mokky.dev/todo"
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const removeTodos = createAsyncThunk<void, Pick<Todo, "id">>(
  "todo/removeTodos",
  async (id, { getState }) => {
    try {
      await axios.delete(`https://f23fd5b7a0ad1362.mokky.dev/todo/${id}`);
      //   const state = getState();
      //   const updateTodo = state.todo.todo.filter((item) => item.id !== id);
      //   return updateTodo;
    } catch (err) {
      console.log(err);
    }
  }
);

export const toggleTodos = createAsyncThunk<Todo[], Pick<Todo, "id">>(
  "todo/toggleTodos",
  async (id, { getState }) => {
    const state = getState();
    const todo = state.todo.todo.find((item) => item.id === id);
    try {
      const response = await axios.patch(
        `https://f23fd5b7a0ad1362.mokky.dev/todo/${id}`,
        {
          complited: !todo.complited,
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addTodos = createAsyncThunk<any, any>(
  "todo/addTodos",
  async (todo) => {
    try {
      const response = await axios.post(
        `https://f23fd5b7a0ad1362.mokky.dev/todo`,
        {
          complited: false,
          name: todo.name,
          task: todo.task,
        }
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const todoeSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    // addTodo(state, actions) {
    //   state.todo = actions.payload;
    // },
  },
  extraReducers: (builder) => {
    //fetch todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "success";
      state.todo = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });
    //removeTodo
    builder.addCase(removeTodos.fulfilled, (state, action) => {
      state.todo = state.todo.filter((item) => item.id !== action.meta.arg);
    });
    //toggleTodo
    builder.addCase(toggleTodos.fulfilled, (state, action) => {
      state.status = "success";
      state.todo = state.todo.map((item) => {
        if (item.id === action.meta.arg) {
          return { ...item, complited: !item.complited };
        }
        return item;
      });
    });
    //addTodo
    builder.addCase(addTodos.fulfilled, (state, action) => {
      state.status = "success";
      console.log(action);
      state.todo.push(action.payload);
    });
  },
});

export const { addTodo } = todoeSlice.actions;

export default todoeSlice.reducer;
