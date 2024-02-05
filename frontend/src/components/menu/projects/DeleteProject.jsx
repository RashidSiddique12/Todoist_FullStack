import { DeleteOutlined } from "@ant-design/icons";
import { Alert, Modal, Spin } from "antd";
import { useState } from "react";
import { deleteProjectEP } from "../../../api";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../store/slice/projectSlice";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../../handler/AlertMessage";

function DeleteProject({ projectId }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      const res = await deleteProjectEP(projectId);
      // console.log(res.data)
      if (res.data) {
        dispatch(deleteProject(projectId));
        navigate("/");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
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
          <DeleteOutlined />
        </span>
        Delete
      </div>
      <Modal
        title="Delete?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="delete"
      >
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => {
              setError(null), setIsModalOpen(false);
            }}
            style={{
              zIndex: 9,
            }}
          />
        )}
        <p>
          This will permanently delete and all its tasks. This can’t be undone.
        </p>
        {loading && <Spin />}
      </Modal>
    </div>
  );
}

export default DeleteProject;
