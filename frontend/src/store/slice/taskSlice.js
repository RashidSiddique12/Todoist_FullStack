import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasksData: {},
  loading: null,
  error: null,
  newcontent: "",
  newDescription: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    displayTasks: (state, action) => {
      const { id, data } = action.payload;
      state.tasksData[id] = data;
    },
    addNewTask: (state, action) => {
      const { id, data } = action.payload;
      // console.log(id, data)
      // console.log("sdd", state.tasksData[id])
      state.tasksData[id]?.push(data);
      state.newcontent = "";
      state.newDescription = "";
    },
    deleteTask: (state, action) => {
      const { taskId, projectId } = action.payload;
      state.tasksData[projectId] = state.tasksData[projectId].filter(
        (task) => task.id !== taskId
      );
    },
    updateTask: (state, action) => {
      const { taskId, projectId, res } = action.payload;
      state.tasksData[projectId] = state.tasksData[projectId].map((task) => {
        if (task.id === taskId) {
          return res;
        }
        return task;
      });
    },
    setNewContent: (state, action) => {
      state.newcontent = action.payload;
    },
    setNewDescription: (state, action) => {
      state.newDescription = action.payload;
    },
    setLoading: (state, action)=>{
      state.loading = action.payload
    },
    setError : (state, action)=>{
      state.error = action.payload
    }
  },
});

export default taskSlice.reducer;
export const {
  displayTasks,
  addNewTask,
  setNewContent,
  setNewDescription,
  deleteTask,
  updateTask,
  closeTask,
  setLoading,
  setError
} = taskSlice.actions;
