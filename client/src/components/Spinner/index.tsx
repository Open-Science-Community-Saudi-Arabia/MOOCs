import "./spinner.scss";
interface ISpinnerProps {
  height: string;
  width: string;
  color?:string
}
const index= ({ width, height,color }: ISpinnerProps)=> {
  return (
    <div aria-label="loading" className="spinner">
      <div
        style={{ width: width, height: height , borderColor: color}}
        className="spinner__animate"
      />
    </div>
  );
}

export default index;