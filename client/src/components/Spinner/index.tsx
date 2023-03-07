import "./spinner.scss";
interface ISpinnerProps {
  height: string;
  width: string;
  color?:boolean
}
function Spinner({ width, height,color }: ISpinnerProps) {
  return (
    <div aria-label="loading" className="spinner">
      <div
        style={{ width: width, height: height , borderColor: color?"#009985":" #ffffff"}}
        className="spinner__animate"
      />
    </div>
  );
}

export default Spinner;
