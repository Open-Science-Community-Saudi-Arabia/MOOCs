import { ReactNode } from "react";
import "./style.scss";
import { MdClose } from "react-icons/md";

interface Props {
  handleClose: () => void;
  show: boolean;
  children: ReactNode;
  width?:string
}

const Modal = ({ handleClose, show, children ,width}: Props) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className={`${width?width:"w-full md:w-[90%]"} py-4 px-2 md:p-8 modal-main relative`}>
        <button type="button" onClick={()=> handleClose()} className="absolute right-10 block hover:bg-gray bg-gray/50 text-gray-dark rounded-md p-1 ml-auto">
          <MdClose className="" size={18} />
        </button>
        {children}
       
      </section>
    </div>
  );
};

export default Modal;
