import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function PageNotFound({message="something went wrong"}) {
  return (
    <div>
      <Result
        status="500"
        title="400"
        subTitle={`Sorry ! ${message}`}
        extra={
          <Link to="/home"><Button style={{ backgroundColor: "#dc4c3e", color: "white" }}>
          Back Home
        </Button></Link>
        }
      />
    </div>
  );
}

export default PageNotFound;
