import React, { createElement } from "react";

import { Layout } from "antd";
import SideMenu from "../components/menu/SideMenu";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const Home = () => {
  return (
    <Layout hasSider>
      <SideMenu />
      <Layout
        style={{
          marginLeft: 245,
          backgroundColor: "white",
        }}
      >
        <Content
          style={{
            overflow: "initial",
            backgroundColor: "white",
            // border: "1px solid black",
            minHeight: "85vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
