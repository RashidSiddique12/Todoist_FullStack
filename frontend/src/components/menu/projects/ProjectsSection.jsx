import { useEffect,} from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { getProject } from "../../../api";
import {
  setErrorPro,
  setLoadingPro,
  setProjectData,
  setShowProject,
} from "../../../store/slice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddProject from "./AddProject";
import LoadingEle from "../../handler/LoadingEle";
import ProjectList from "./ProjectList";
import AlertMessage from "../../handler/AlertMessage";

function ProjectsSection() {
  const dispatch = useDispatch();
  const { projectData, loading, error, show } = useSelector(
    (state) => state.project
  );

  const fetchProjectData = async () => {
    dispatch(setLoadingPro(true));
    try {
      const res = await getProject();
      dispatch(setProjectData(res.data));
    } catch (error) {
      console.log("error");
      dispatch(setErrorPro(error.message));
    } finally {
      dispatch(setLoadingPro(false));
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <div className="menuDiv">
      <div className="menuTitle">
        <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
          <h3>My Projects</h3>
        </Link>
        <div className="ProjectAction">
          <AddProject />

          <div onClick={() => dispatch(setShowProject(!show))}>
            {" "}
            {show ? <DownOutlined  style={{fontSize:"14px"}}/> : <RightOutlined style={{fontSize:"14px"}}/>}
          </div>
        </div>
      </div>
      {show ? (
        <>
          {error && (
            <AlertMessage
              error={error}
              handleCloseError={() => dispatch(setErrorPro(null))}
            />
          )}
          {loading ? <LoadingEle /> : <ProjectList data={projectData} />}
        </>
      ) : null}
    </div>
  );
}

export default ProjectsSection;
