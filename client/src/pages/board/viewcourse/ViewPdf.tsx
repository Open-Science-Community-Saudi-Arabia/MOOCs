import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface IProps {
  pdfData: any;
  isCourseContent: boolean;
}

const ViewPdf = ({ pdfData, isCourseContent }: IProps) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };
  return (
    <div className="viewpdf">
      <p className="viewpdf__pagenumber">
        Page {pageNumber} of {numPages}
      </p>
      <Document
        className="viewpdf__document"
        file={pdfData?.file_url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
};
export default ViewPdf;
