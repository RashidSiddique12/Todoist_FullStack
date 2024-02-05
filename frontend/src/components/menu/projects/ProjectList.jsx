import React from "react";
import { Link } from "react-router-dom";
import ProjectAction from "./ProjectAction";

function ProjectList({ data }) {
  return (
    <div>
      {data &&
        data.map((project) => (
          <div key={project.id}>
            <li>
              <Link
                to={`/project/${project.id}`}
                state={{ ProjectName: project.name }}
                key={project.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div>
                  <span>#</span>
                  {project.name}
                </div>
              </Link>
              <div>
                <ProjectAction projectId={project.id} />
              </div>
            </li>
          </div>
        ))}
    </div>
  );
}

export default ProjectList;
