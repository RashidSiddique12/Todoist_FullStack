import { Popover } from "antd";
import TaskDelete from "./TaskDelete";
import MoveTask from "./MoveTask";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

function TaskActions({taskId, projectId}) {
  const content = (
    <div className="projectaction">
      <li><MoveTask taskId={taskId} oldProjectId={projectId}/></li> 
      <li> <TaskDelete taskId={taskId} projectId={projectId}/></li>
      <li></li>
    </div>
  );
  return (
    <div>
      <Popover content={content} title="Action" trigger="click">
        <button>
          {/* <EllipsisOutlined /> */}
          <PiDotsThreeOutlineThin style={{cursor:"pointer"}} />
        </button>
      </Popover>
    </div>
  );
}

export default TaskActions;
