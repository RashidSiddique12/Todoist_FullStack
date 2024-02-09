import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import TaskActions from "./TaskActions";
import { Button, Input, Spin } from "antd";
import { closeTaskEP, editTaskEP } from "../../api";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../store/slice/taskSlice";
import AlertMessage from "../handler/AlertMessage";
import { notification } from "antd";

function TaskList({ task, projectId }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState(task.content);
  const [editDes, setEditDes] = useState(task.description);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleEditTask = async (e) => {
    e.preventDefault();
    // console.log("dede")
    setLoading(true);
    try {
      const res = await editTaskEP(task.id, editTask, editDes);
      console.log(res.data[0]);
      dispatch(updateTask({ taskId: task.id, projectId, res: res.data[0] }));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsEdit(false);
      setLoading(false);
    }
  };
  //
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, duration = 6) => {
    console.log("first");
    api.info({
      message: `${task.content} task is completed`,
      placement,
      duration
    });
    // console.log("second")
  };

  const handleTaskDone = async () => {
    setLoading(true);
    openNotification('bottomLeft');
    try {
      const res = await closeTaskEP(task.id);
      // console.log(res.data);
      if (res.data === true) {
        dispatch(deleteTask({ taskId: task.id, projectId }));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      {contextHolder}
      {!isEdit ? (
        <>
          <div>
            {error && (
              <AlertMessage error={error} handleCloseError={handleCloseError} />
            )}
            <p>
              {loading && <Spin style={{ zIndex: 22 }} />}
              <button className="taskdoneIcon" onClick={handleTaskDone}>
                <CheckOutlined style={{ marginLeft: "-4px" }} />
              </button>
              {task.content}
            </p>
            <p className="taskDes">{task.description}</p>
          </div>
          <div className="taskAction">
            <button onClick={() => setIsEdit(true)}>
              <EditOutlined style={{ cursor: "pointer" }} />
            </button>
            <TaskActions taskId={task.id} projectId={projectId} />
          </div>
        </>
      ) : (
        <div className="addTaskBox EditTask">
          <form onSubmit={handleEditTask}>
            <Input
              placeholder="Task name"
              className="bold"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
            />
            <Input
              placeholder="Description"
              value={editDes}
              onChange={(e) => setEditDes(e.target.value)}
            />
            <hr />
            <div className="addTaskAction">
              <Button className="cancle" onClick={() => setIsEdit(false)}>
                Cancle
              </Button>
              <Button htmlType="submit" className="add">
                Save {loading && <Spin />}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default TaskList;
