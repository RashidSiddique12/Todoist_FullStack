import { Popover } from "antd";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import HandleFav from "../favorite/HandleFav";


function ProjectAction({ projectId }) {
  const content = (
    <div className="projectaction">
      <li>
        <EditProject projectId={projectId} />
      </li>
      <li>
        <HandleFav projectId={projectId} />
      </li>
      <li>
        <DeleteProject projectId={projectId} />
      </li>
    </div>
  );
  return (
    <div>
      <Popover
        placement="topLeft"
        content={content}
        title="Action"
        trigger="click"
      >
        <button>...</button>
      </Popover>
    </div>
  );
}

export default ProjectAction;
