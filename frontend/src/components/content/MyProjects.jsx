import {
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Input, Spin } from "antd";
import React, { useState } from "react";
import ProjectList from "../menu/projects/ProjectList";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectAction from "../menu/projects/ProjectAction";
import AddProject from "../menu/projects/AddProject";
import { Header } from "antd/es/layout/layout";
import PageNotFound from "../handler/PageNotFound";
function MyProjects() {
  const { projectData, loading, error } = useSelector((state) => state.project);
  // const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("");

  const filterProjects = projectData.filter((project) =>
    project.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <>
      {" "}
      <Header
        style={{
          padding: 0,
          background: "white",
          marginBottom: 0,
        }}
      >
        <span className="myProjectHeader">
          <SettingOutlined
            style={{ fontSize: "1.2rem", marginRight: "0.5rem" }}
          />
          Settings
        </span>
      </Header>
      <div className="bodySection">
        <h1>My Projects</h1>
        <p>Free Plan</p>
        <Input
          size="large"
          placeholder="Search Projects"
          prefix={<SearchOutlined />}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <div className="addDiv">
          {" "}
          <AddProject from={"myproject"} />
        </div>
        {!loading ? (
          error ? (
            <PageNotFound />
          ) : (
            <>
              <h3>{filterProjects && filterProjects.length} projects</h3>
              <div>
                {filterProjects &&
                  filterProjects.map((project) => (
                    <div key={project.id}>
                      {" "}
                      <li className="ProjectList">
                        <Link
                          to={`/home/project/${project.id}`}
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
            </>
          )
        ) : (
          <Spin tip="Loading" size="large" style={{ height: "40vh" }}>
            <div className="content" />
          </Spin>
        )}
      </div>
    </>
  );
}

export default MyProjects;
