import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoicePage = () => {
  const location = useLocation();
  const { state } = location;
  const { orderId } = location.state || {};

  // Function to download the invoice as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF(); // Create a new jsPDF instance

    // Add the "Invoice" heading at the top of the document in red color
    doc.setTextColor(255, 0, 0); // Set text color to red for the "Invoice" heading
    doc.setFontSize(22);
    doc.text("Invoice", 20, 20); // Position the heading at (20, 20)

    // Add Order ID with a custom color (blue)
    doc.setTextColor(0, 0, 255); // Set text color to blue
    doc.setFontSize(16);
    doc.text(`Order ID: ${orderId}`, 20, 30);

    // Add Total Paid with a custom color (green)
    doc.setTextColor(0, 128, 0); // Set text color to green
    doc.text(`Total Paid: $${state?.grandTotal?.toFixed(2)}`, 20, 40);

    // Add Transaction ID with a custom color (purple)
    doc.setTextColor(128, 0, 128); // Set text color to purple
    doc.text(`Transaction ID: ${state?.transactionId}`, 20, 50);

    // Add "Thank you for your purchase!" message directly after the title in the PDF
    doc.setTextColor(0, 128, 0); // Set text color to green for the message
    doc.setFontSize(14);
    doc.text("Thank you for your purchase!", 20, 60); // Position this message after the title

    // Save the PDF with the generated invoice content
    doc.save(`Invoice_${orderId}.pdf`);
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
        <p className="mt-4">Transaction ID: {state?.transactionId}</p>
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
