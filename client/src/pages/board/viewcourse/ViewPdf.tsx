import  { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface IProps {
  pdfData: any;
  isCourseContent: boolean;
}

const ViewPdf = ({ pdfData, isCourseContent }: IProps) => {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const url =
    "https://res.cloudinary.com/dipyrsqvy/image/upload/v1678891984/course_6411dbb7d07a77d6c06a44f3/coursesection_6411dbc4d07a77d6c06a44f7/textmaterial_6411dbebd07a77d6c06a4519_RICHIE%20MOLUNO%20___%20RESUME%20%283%29.pdf.pdf";
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const onDocumentLoadSuccess = ({ numPages }: any) => {

    setNumPages(numPages);
  };
  return (
    <div  className="viewpdf">
      <p className="viewpdf__pagenumber">
        Page {pageNumber} of {numPages}
      </p>
      <Document className="viewpdf__document" file={pdfData?.file_url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
};
export default ViewPdf;
