import { Alert } from "antd";
import React from "react";

function AlertMessage({error, handleCloseError}) {
  return (
    <div>
      <Alert
        message={error}
        type="error"
        showIcon
        closable
        onClose={handleCloseError}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          width: "50%",
          zIndex: 9,
        }}
      />
    </div>
  );
}

export default AlertMessage;
