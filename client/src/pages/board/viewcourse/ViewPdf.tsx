import { Trans } from "@lingui/macro";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface IProps {
  pdfUrl: any;
}

const ViewPdf = ({ pdfUrl }: IProps) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };

  return (
    <div className="viewpdf">
      <p className="viewpdf__pagenumber">
       <Trans> Page {pageNumber} of {numPages}</Trans>
      </p>
      <Document
        className="viewpdf__document"
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
};
export default ViewPdf;
