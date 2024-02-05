import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: [],
  favData: [],
  newProjectName: "",
  isFavorite : false,
  loading: false,
  error: null,
  show: false
};

const projectSlice = createSlice({
  name: "Projects",
  initialState,
  reducers: {
    setProjectData: (state, action) => {
      state.projectData = action.payload;
    },
    addNewProject: (state, action) => {
      state.projectData.push(action.payload);
      state.newProjectName = ""
      state.isFavorite = false;
    },
    deleteProject: (state, action) => {
      state.projectData = state.projectData.filter(
        (project) => project.id !== action.payload
      );
    },
    setEditProject: (state, action) => {
      state.projectData = state.projectData.map((project) => {
        if (project.id === action.payload.projectId) {
          return action.payload.res[0];
        } else {
          return project;
        }
      });
      state.newProjectName = ""
      state.isFavorite = false;
    },
    setFavData: (state, action) => {
      state.favData = action.payload;
    },
    setNewProjectName: (state, action) => {
      state.newProjectName = action.payload;
    },
    setIsFav :(state, action)=>{
        state.isFavorite = action.payload
    },
    setLoadingPro: (state, action) => {
      state.loading = action.payload;
    },
    setErrorPro: (state, action) => {
      state.error = action.payload;
    },
    setShowProject : (state, action)=>{
      state.show = action.payload;
    }
  },
});

export const {
  setProjectData,
  addNewProject,
  deleteProject,
  setEditProject,
  setFavData,
  setNewProjectName,
  setIsFav,
  setLoadingPro,
  setErrorPro,
  setShowProject
} = projectSlice.actions;

export default projectSlice.reducer;
