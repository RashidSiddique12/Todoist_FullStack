import { DeleteOutlined } from "@ant-design/icons";
import { Alert, Modal } from "antd";
import { useState } from "react";
import { deleteTaskEP } from "../../api";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/slice/taskSlice";

function TaskDelete({ taskId, projectId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const res = await deleteTaskEP(taskId);
      console.log(res.data);
      if (res.data === true) {
        dispatch(deleteTask({ taskId, projectId }));
      }
      setIsModalOpen(false)
    } catch (error) {
      setError(error.message);
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
              setError(null);
            }}
            style={{
              zIndex: 2,
            }}
          />
        )}

        <p>Are you sure you want to Delete.</p>
      </Modal>
    </div>
  );
}

export default TaskDelete;
