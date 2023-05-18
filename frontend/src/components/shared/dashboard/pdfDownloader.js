import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Button from "../button/Button";

const GenericPdfDownloader = ({ rootElementId, downloadFileName }) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      let width = pdf.internal.pageSize.getWidth();
      let height = pdf.internal.pageSize.getHeight();

      let aspectRatio = canvas.width / canvas.height;

      let imgWidth = width;
      let imgHeight = imgWidth / aspectRatio;

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return (
    <Button type="button" variant="standard" onClick={downloadPdfDocument}>
      Download Pdf
    </Button>
  );
};

export default GenericPdfDownloader;
