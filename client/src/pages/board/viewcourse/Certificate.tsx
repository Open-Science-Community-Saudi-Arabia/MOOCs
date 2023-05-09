import React from "react";

interface IProps {
  pdfUrl: any;
}
const Certificate = ({ pdfUrl }: IProps) => {
  return (
    <div className="certificate">
      <img className="certificate__img" src={pdfUrl} alt="certificate" />
    </div>
  );
};

export default Certificate;
