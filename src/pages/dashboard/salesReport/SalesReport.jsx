import jsPDF from "jspdf";
import "jspdf-autotable";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const SalesReport = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch orders data using React Query
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-details");
      return res?.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Filter orders with status: true
  const filteredOrders = orders.filter((order) => order.status === true);

  // Function to download the sales report as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Sales Report", 14, 20);

    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 30);

    const headers = [
      ["Item Name", "Seller Email", "Buyer Email", "Quantity", "Total Price"],
    ];

    // Table Data
    const data = filteredOrders
      .map((order) =>
        order.medicineItem.map((item) => {
          const totalPrice = item.totalPrice || 0;

          return [
            item.itemName || "N/A",
            item.email || "N/A",
            order.buyer,
            item.quantity,
            `$${totalPrice.toFixed(2)}`,
          ];
        })
      )
      .flat();

    // Add table to PDF
    doc.autoTable({
      startY: 40,
      head: headers,
      body: data,
    });

    doc.save("Sales_Report.pdf");
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>PharmaWorld | Sales Report</title>
      </Helmet>
      <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-500 font-bold mb-4">
        Sales Report
      </h1>
      <button
        onClick={downloadPDF}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Download PDF
      </button>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-sm sm:text-base">
                #
              </th>
              <th className="border border-gray-300 p-2 text-sm sm:text-base">
                Item Name
              </th>
              <th className="border border-gray-300 p-2 text-sm sm:text-base">
                Seller Email
              </th>
              <th className="border border-gray-300 p-2 text-sm sm:text-base">
                Buyer Email
              </th>
              <th className="border border-gray-300 p-2 text-sm sm:text-base">
                Quantity
              </th>
              <th className="border border-gray-300 p-2 text-sm sm:text-base">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => {
              return order.medicineItem.map((item, itemIndex) => {
                const totalPrice = item.totalPrice || 0;

                return (
                  <tr key={order._id + itemIndex} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.itemName || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {item.email || "N/A"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {order.buyer}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      ${totalPrice.toFixed(2)}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
