import { HeartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditProjectEP } from "../../../api";
import { setEditProject } from "../../../store/slice/projectSlice";
import AlertMessage from "../../handler/AlertMessage";
import { Spin } from "antd";

function HandleFav({ projectId }) {
  const { projectData } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    projectData &&
      projectData.map((project) => {
        if (project.id === projectId) {
          setIsFavorite(project.is_favorite);
          setEditProjectName(project.name);
        }
      });
  }, [projectId,projectData]);

  const handlefavorite = async () => {
    const updatedFavorite = !isFavorite;
    setIsFavorite(updatedFavorite);

    try {
      setLoading(true)
      const res = await EditProjectEP(
        projectId,
        editProjectName,
        updatedFavorite
      );
      console.log(res.data);
      dispatch(setEditProject({ projectId, res : res.data}));
    } catch (error) {
      // console.log(error);
      setError(error.message)
    }finally{
      setLoading(false)
    }
  };
  return (
    <div onClick={handlefavorite}>
       {error && <AlertMessage error={error} handleCloseError={()=>setError(null)}/>}
      
      <span>
        <HeartOutlined />
      </span>
      {isFavorite && error === null ? "Remove from Favorites" : "Add to Favorites"}
      {loading && <Spin/>}
    </div>
  );
}

export default HandleFav;
