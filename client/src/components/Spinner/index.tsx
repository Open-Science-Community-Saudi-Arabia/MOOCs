import React from "react";
import "./spinner.scss";
interface ISpinnerProps {
  loading?: boolean;
}
function Spinner({ loading }: ISpinnerProps) {
  return (
    <div className="loader-container">
      {loading ? (
        <>
          <div className="loader" />
          <p className="loading-content"> Loading dashboard</p>
        </>
      ) : (
        <div className="btn-spinner" />
      )}
    </div>
  );
}

export default Spinner;
