import "./spinner.scss";
interface ISpinnerProps {
  height: string;
  width: string;
}
function Spinner({ width, height }: ISpinnerProps) {
  return (
    <div aria-label="loading" className="spinner">
      <div
        style={{ width: width, height: height }}
        className="spinner__animate"
      />
    </div>
  );
}

export default Spinner;
