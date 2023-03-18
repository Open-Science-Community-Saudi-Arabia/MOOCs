

interface IProps {
  handleOpenContent: () => void;
}
const Certificate= ({ handleOpenContent }: IProps) =>{
  return (
    <div className="certificate">
      <p className="certificate__text" onClick={() => handleOpenContent()}>
        {" "}
        Complete quiz to get a certificate
      </p>
    </div>
  );
}

export default Certificate