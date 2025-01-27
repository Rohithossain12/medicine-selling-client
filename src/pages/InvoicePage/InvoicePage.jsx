import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoicePage = () => {
  const location = useLocation();
  const { state } = location;
  const {  grandTotal } = location.state || {};

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setTextColor(255, 0, 0);
    doc.setFontSize(22);
    doc.text("Invoice", 20, 20);

    doc.setTextColor(0, 128, 0);
    doc.text(`Total Paid: $${grandTotal?.toFixed(2)}`, 20, 40);

    doc.setTextColor(0, 128, 0);
    doc.setFontSize(14);
    doc.text("Thank you for your purchase!", 20, 60);

    doc.save(`Invoice.pdf`);
  };

  return (
    <div className="p-8">
      <Helmet>
        <title>PharmaWorld | Invoice</title>
      </Helmet>
      <div id="invoice-content">
        {/* Only content will be displayed (title "Invoice" is excluded here) */}
        <p className="text-xl">Thank you for your purchase!</p>
        <p className="mt-4">Total Paid: ${state?.grandTotal?.toFixed(2)}</p>
      </div>
      <button
        onClick={downloadPDF}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default InvoicePage;
