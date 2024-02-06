import axios from "axios";

export const signUpEP = (username, email, password) => {
  return axios.post(
    "/rest/v2/user/signup",
    {
      username,
      email,
      password,
    }
    // ,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  // .then((res) => {
  //   token = res.data.token;
  //   return res;
  // })
  // .catch(() => {
  //   console.log("Error");
  // });
};

export const logInEP = (email, password) => {
  return axios.post("/rest/v2/user/login", {
    email,
    password,
  });
};

export const getProject = () => {
  const token = localStorage.getItem("token") || "";
  return axios.get("/rest/v2/project", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const AddProjectEP = (newProjectName, isFavorite) => {
  const token = localStorage.getItem("token") || "";
  return axios.post(
    "/rest/v2/project",
    {
      name: newProjectName,
      is_favorite: isFavorite,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteProjectEP = (projectId) => {
  const token = localStorage.getItem("token") || "";
  return axios.delete(`/rest/v2/project/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const EditProjectEP = (projectId, editProjectName, isFavorite) => {
  const token = localStorage.getItem("token") || "";
  return axios.put(
    `/rest/v2/project/${projectId}`,
    {
      name: editProjectName,
      is_favorite: isFavorite,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getTasksEP = (projectId) => {
  const token = localStorage.getItem("token") || "";
  return axios.get(`/rest/v2/task?project_id=${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addTaskEP = (projectId, content, description) => {
  const token = localStorage.getItem("token") || "";
  return axios.post(
    `/rest/v2/task?project_id=${projectId}`,
    {
      content: content,
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteTaskEP = (taskId) => {
  const token = localStorage.getItem("token") || "";
  return axios.delete(`/rest/v2/task/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editTaskEP = (taskId, content, description) => {
  const token = localStorage.getItem("token") || "";
  return axios.put(
    `/rest/v2/task/${taskId}`,
    {
      content: content,
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const closeTaskEP = (taskId) => {
  const token = localStorage.getItem("token") || "";
  return axios.put(`/rest/v2/task/${taskId}/close`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
