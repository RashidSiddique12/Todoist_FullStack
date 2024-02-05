import React from "react";
import "./style.css";

function EmptyProjectPage() {
  return (
    <div className="EmptyBox">
      <img
        src="https://todoist.b-cdn.net/assets/images/33fe5f2817362251f0375b57d481e7d5.png"
        alt=""
      />
      <h3>Start small (or dream big)...</h3>
      <p>
        Track tasks, follow progress, and discuss <br /> details in one central,
        shared project.
      </p>
    </div>
  );
}

export default EmptyProjectPage;
