import {
  CheckOutlined,
  UserOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";
import { Avatar, Input, Popover, Spin } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskEP, deleteTaskEP } from "../../api";
import { addNewTask, deleteTask } from "../../store/slice/taskSlice";
import AlertMessage from "../handler/AlertMessage"

function MoveTask({ taskId, oldProjectId }) {
  const dispatch = useDispatch();
  const { projectData } = useSelector((state) => state.project);
  const { tasksData } = useSelector((state) => state.tasks);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tasks = tasksData[oldProjectId];
  const task = tasks.filter((task) => task.id === taskId);
  // console.log("sss",task)

  const handleMoveTask = async (newProjId) => {
    // console.log("newId", newProjId)
    // console.log("contetn", task[0].content)
    // console.log("des", task[0].description)
    try {
      setLoading(true);
      await deleteTaskEP(taskId);
      const res = await addTaskEP(
        newProjId,
        task[0].content,
        task[0].description
      );
      dispatch(addNewTask({newProjId, data : res.data}));
      dispatch(deleteTask({ taskId, projectId: oldProjectId }));

      console.log("task move");
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterProjectData =
    projectData &&
    projectData.filter((project) =>
      project.name.toLowerCase().includes(inputVal.toLowerCase())
    );

  const content = (
    <div className="movetotask">
      <Input
        placeholder="Type a Project name"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <hr style={{ color: "lightgray" }} />
      <h4>
        {" "}
        <span>
          <Avatar size="small" icon={<UserOutlined />} />
        </span>
        My Projects {loading && <Spin />}
      </h4>
      {filterProjectData &&
        filterProjectData.map((project) => (
          <li key={project.id} onClick={() => handleMoveTask(project.id)}>
            <div>
              <span>#</span>
              {project.name}
            </div>
            <div>
              {project.id === oldProjectId ? (
                <CheckOutlined
                  style={{ color: "red", float: "end", margin: "0" }}
                />
              ) : null}
            </div>
          </li>
        ))}
    </div>
  );
  return (
    <div>
      {error && (
        <AlertMessage error={error} handleCloseError={() => setError(null)} />
      )}
      <Popover content={content} trigger="click">
        <div>
          <span>
            <VerticalLeftOutlined />
          </span>
          Move to
        </div>
      </Popover>
    </div>
  );
}

export default MoveTask;

// const handleMoveTask = async (newProjId) => {
//   console.log("taskId", taskId)
//   console.log("old", oldProjectId)
//   console.log("new",newProjId)
//   try {
//     const res = await moveTaskEP(taskId, newProjId);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
