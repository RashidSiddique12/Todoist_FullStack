import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addTaskEP, getTasksEP } from "../../api";
import {
  addNewTask,
  displayTasks,
  setNewContent,
  setNewDescription,
} from "../../store/slice/taskSlice";
import { useLocation } from "react-router-dom";
import { Button, Input, Spin } from "antd";
import {
  MenuOutlined,
  MessageOutlined,
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import TaskList from "./TaskList";
import { Header } from "antd/es/layout/layout";
import ProjectAction from "../menu/projects/ProjectAction";
import EmptyProjectPage from "../handler/EmptyProjectPage";
import PageNotFound from "../handler/PageNotFound";
import AlertMessage from "../handler/AlertMessage";
function ProjectContent() {
  const location = useLocation();
  const ProjectName = location.state?.ProjectName || "Task";
  // console.log(ProjectName);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { tasksData, newcontent, newDescription } = useSelector(
    (state) => state.tasks
  );
  const tasks = tasksData[id];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addTaskLoading, setAddTaskLoading] = useState(false);
  const [addTaskError, setAddTaskError] = useState(null);

  const [isopenBox, setOpenBox] = useState(false);

  const fetchProjectTask = async () => {
    try {
      setIsLoading(true);
      const res = await getTasksEP(id);
      // console.log(res.data);
      dispatch(displayTasks({ id, data :res.data }));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectTask();
  }, [id]);

  const handleAddTask = async (e) => {
    // console.log("dee");
    e.preventDefault();
    try {
      setAddTaskLoading(true);
      const res = await addTaskEP(id, newcontent, newDescription);
      // console.log(res.data);
      dispatch(addNewTask({ id, data: res.data }));
    } catch (error) {
      console.log(error);
      setAddTaskError(error.message);
    } finally {
      setAddTaskLoading(false);
    }
  };
  return (
    <>
      <Header
        className="projectHeader"
        style={{
          background: "white",
        }}
      >
        <Link to="/home"><h3>My Projects /</h3></Link>
        <div className="action">
          <div>
            <UserAddOutlined /> Share
          </div>
          <div>
            <MenuOutlined /> Views
          </div>
          <div>
            <MessageOutlined />
          </div>
          <ProjectAction projectId={id} />
        </div>
      </Header>
      {error ? (
        <PageNotFound />
      ) : (
        <div className="bodySection">
          <h1>{ProjectName}</h1>
          {isLoading ? (
            <Spin tip="Loading" size="large" style={{ height: "50vh" }}>
              <div className="content" />
            </Spin>
          ) : (
            <>
              <div>
                {tasks && tasks.length > 0
                  ? tasks.map((task) => (
                      <div key={task.id}>
                        <li className="taskList">
                          <TaskList task={task} projectId={id} />
                        </li>
                        <hr />
                      </div>
                    ))
                  : null}
              </div>
              {isopenBox ? (
                <div className="addTaskBox">
                  {addTaskError && (
                    <AlertMessage
                      error={addTaskError}
                      handleCloseError={() => setAddTaskError(null)}
                    />
                  )}
                  <form onSubmit={handleAddTask}>
                    <Input
                      placeholder="Task name"
                      className="bold"
                      value={newcontent}
                      onChange={(e) => dispatch(setNewContent(e.target.value))}
                    />
                    <Input
                      placeholder="Description"
                      value={newDescription}
                      onChange={(e) =>
                        dispatch(setNewDescription(e.target.value))
                      }
                    />
                    <hr />
                    <div className="addTaskAction">
                      <Button
                        className="cancle"
                        onClick={() => setOpenBox(false)}
                      >
                        Cancle
                      </Button>
                      <Button
                       htmlType="submit"
                        className="add"
                        disabled={newcontent.trim() ===""? true : false}
                        
                      >
                        Add Task {addTaskLoading && <Spin />}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <li
                  className="taskList addTask"
                  onClick={() => setOpenBox(true)}
                >
                  {" "}
                  <PlusOutlined className="icon" /> Add Task
                </li>
              )}
            </>
          )}
          {tasks && tasks.length === 0 ? <EmptyProjectPage /> : null}
        </div>
      )}
    </>
  );
}

export default ProjectContent;
