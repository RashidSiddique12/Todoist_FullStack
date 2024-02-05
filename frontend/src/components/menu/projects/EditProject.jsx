import { EditOutlined } from "@ant-design/icons";
import { Alert, Modal, Spin, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditProjectEP } from "../../../api";
import {
  setEditProject,
  setIsFav,
  setNewProjectName,
} from "../../../store/slice/projectSlice";
import AlertMessage from "../../handler/AlertMessage";

function EditProject({ projectId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { projectData, newProjectName, isFavorite } = useSelector(
    (state) => state.project
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("run")
    projectData &&
      projectData.map((project) => {
        if (project.id === projectId) {
          dispatch(setIsFav(project.isFavorite));
          dispatch(setNewProjectName(project.name));
        }
      });
  }, [projectId, isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const res = await EditProjectEP(projectId, newProjectName, isFavorite);
      console.log(res.data)
      dispatch(setEditProject({ projectId, res : res.data}));
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div onClick={showModal}>
        <span>
          <EditOutlined style={{cursor:"pointer"}} />
        </span>
        Edit
      </div>
      <Modal
        title="Edit Project"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Edit"
      >
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => {setError(null), setIsModalOpen(false)}}
            style={{
              zIndex: 9,
            }}
          />
        )}
        <hr style={{ marginBottom: "1.5rem" }} />
        <form onSubmit={handleOk} className="AddProjectForm">
          <label>Name</label> <br />
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => dispatch(setNewProjectName(e.target.value))}
          />
          <Switch
            checked={isFavorite}
            onChange={(checked) => dispatch(setIsFav(checked))}
            style={{backgroundColor: isFavorite? " #dc4c3e" : null}}
          />{" "}
          <label>Add to favorites</label>
        </form>
        {loading && <Spin />}
      </Modal>
    </div>
  );
}

export default EditProject;
