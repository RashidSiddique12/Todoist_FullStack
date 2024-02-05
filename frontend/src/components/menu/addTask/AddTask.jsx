import {
  CaretDownOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Modal, Popover, Spin } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  setError,
  setLoading,
  setNewContent,
  setNewDescription,
} from "../../../store/slice/taskSlice";
import { addTaskEP } from "../../../api";
import AlertMessage from "../../handler/AlertMessage";

function AddTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { newcontent, newDescription, loading, error } = useSelector(
    (state) => state.tasks
  );

  const { projectData } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");
  const [selectedProject, setSelectedProject] = useState({ name: "inbox" });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const data = await addTaskEP(
        selectedProject.id,
        newcontent,
        newDescription
      );
      // console.log(data);
      dispatch(addNewTask({ id: data.projectId, data }));
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filterProjectData =
    projectData &&
    projectData.filter((project) =>
      project.name.toLowerCase().includes(searchVal.toLowerCase())
    );

  const content = (
    <div className="movetotask">
      <Input
        placeholder="Type a Project name"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <hr style={{ color: "lightgray" }} />
      <h4>
        {" "}
        <span>
          <Avatar size="small" icon={<UserOutlined />} />
        </span>
        My Projects
      </h4>
      {filterProjectData &&
        filterProjectData.map((project) => (
          <li key={project.id} onClick={() => setSelectedProject(project)}>
            <div>
              <span>#</span>
              {project.name}
            </div>
            <div></div>
          </li>
        ))}
    </div>
  );
  return (
    <div className="addTaskMn">
      {error && (
        <AlertMessage
          error={error}
          handleCloseError={() => dispatch(setError(null))}
        />
      )}
      <p onClick={showModal}>
        <PlusOutlined className="icon" /> Add Task
      </p>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add task"
        okButtonProps={{
          disabled: newcontent.trim() !== "" ? false : true,
        }}
      >
        <form onSubmit={handleOk} className="addTaskModal">
          {loading && (
            <Spin
              size="large"
              style={{
                position: "absolute",
                bottom: 100,
                left: 250,
                zIndex: 2,
              }}
            />
          )}
          <Input
            placeholder="Task name"
            className="bold"
            value={newcontent}
            autoFocus={true}
            onChange={(e) => dispatch(setNewContent(e.target.value))}
          />
          <Input
            placeholder="Description"
            value={newDescription}
            onChange={(e) => dispatch(setNewDescription(e.target.value))}
          />
          <hr
            style={{
              margin: "auto -1.3rem auto -1.3rem",
              color: "rgb(220, 218, 218)",
            }}
          />
          <Popover content={content} trigger="click">
            <Button>
              <span>#</span>
              {selectedProject.name}
              <span>
                <CaretDownOutlined />
              </span>
            </Button>
          </Popover>
        </form>
      </Modal>
    </div>
  );
}

export default AddTask;
