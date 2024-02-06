import Sider from "antd/es/layout/Sider";
import ProjectsSection from "./projects/ProjectsSection";
import FavoriteSection from "./favorite/FavoriteSection";
import AddTask from "./addTask/AddTask";
import { Avatar, Popover } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsLayoutSidebar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/");

  }
  const content = (
    <div className="projectaction">
      <li onClick={handleLogout}><span><LogoutOutlined /></span>LogOut</li>
    </div>
  );
  return (
    <div>
      <Sider
        width="250"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#f6efee",
        }}
      >
        <div className="profile">
          <Popover content={localStorage.getItem("username")?content: null} title={localStorage.getItem('username')} trigger="click">
            <div>
              {" "}
              <Avatar
                style={{
                  backgroundColor: "#dc4c3e",
                }}
                icon={<UserOutlined />}
              />
              <span className="name">{localStorage.getItem("username")}</span>
            </div>
          </Popover>
          <div>
            <IoIosNotificationsOutline
              style={{ fontSize: "1.5rem", marginTop: "4px" }}
            />
            <BsLayoutSidebar
              style={{ fontSize: "1.2rem", margin: "0 0 3px 15px" }}
            />
          </div>
        </div>
        <AddTask />
        <ProjectsSection />
        <FavoriteSection />
      </Sider>
    </div>
  );
}

export default SideMenu;
