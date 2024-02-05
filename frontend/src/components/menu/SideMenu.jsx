import Sider from "antd/es/layout/Sider";
import ProjectsSection from "./projects/ProjectsSection";
import FavoriteSection from "./favorite/FavoriteSection";
import AddTask from "./addTask/AddTask";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsLayoutSidebar } from "react-icons/bs";

function SideMenu() {
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
          // border: "1px solid black",
          // color : "rgb(77, 77, 77)"
        }}
      >
        <div className="profile">
          <div>
            {" "}
            <Avatar
              style={{
                backgroundColor: "#dc4c3e",
                
              }}
              icon={<UserOutlined />}
            /><span className="name">Rashid</span>
          </div>
          <div>
          <IoIosNotificationsOutline style={{fontSize:"1.5rem", marginTop:"4px"}}/>
          <BsLayoutSidebar style={{fontSize:"1.2rem", margin:"0 0 3px 15px"}} />
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
