import React from "react";

interface IProps {
  handleOpenContent: () => void;
}
export default function Certificate({ handleOpenContent }: IProps) {
  return (
    <div className="certificate">
      <p className="certificate__text" onClick={() => handleOpenContent()}>
        {" "}
        Complete quiz to get a certificate
      </p>
    </div>
  );
}
