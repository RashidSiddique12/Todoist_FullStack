import { useState } from "react";
import { Button, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNewProject, setIsFav, setNewProjectName } from "../../../store/slice/projectSlice";
import { AddProjectEP } from "../../../api";
import AlertMessage from "../../handler/AlertMessage";

// eslint-disable-next-line react/prop-types
function AddProject({ from = "" }) {
  const dispatch = useDispatch();
  const {newProjectName,isFavorite} = useSelector(state => state.project)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await AddProjectEP(newProjectName, isFavorite);
      console.log(res.data);
      dispatch(addNewProject(res.data));
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {error && <AlertMessage error={error} handleCloseError={()=>setError(null)}/>}
      {from === "myproject" ? (
        <Button onClick={showModal} icon={<PlusOutlined />}>
          Add Project
        </Button>
      ) : (
        <PlusOutlined onClick={showModal} />
      )}

      <Modal
        title="Add project"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        className="ProjectModal"
        okButtonProps={{ disabled: newProjectName.trim() !=="" ? false : true  }}
      >
        <hr style={{ marginBottom: "1.5rem" }} />
        <form onSubmit={handleOk} className="AddProjectForm">
          <label>Name</label> <br />
          <input
            type="text"
            value={newProjectName}
            autoFocus={true}
            onChange={(e) => dispatch(setNewProjectName(e.target.value))}
          />
          <Switch
            checked={isFavorite}
            onChange={(checked) => dispatch(setIsFav(checked))}
            style={{backgroundColor: isFavorite? " #dc4c3e" : null}}
          />{" "}
          <label>Add to favorites</label>
          <Spin spinning={loading} size="medium" />
        </form>
      </Modal>
    </div>
  );
}

export default AddProject;
