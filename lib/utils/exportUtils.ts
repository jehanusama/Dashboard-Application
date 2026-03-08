import { Transaction } from "@/lib/mockData/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToPDF = (data: Transaction[]) => {
  const doc = new jsPDF();

  const tableColumn = [
    "ID",
    "Date",
    "Customer",
    "Email",
    "Amount",
    "Status",
    "Method",
  ];
  const tableRows: string[][] = [];

  data.forEach((transaction) => {
    const transactionData = [
      String(transaction.id),
      transaction.date,
      transaction.customerName,
      transaction.customerEmail,
      `$${transaction.amount.toFixed(2)}`,
      transaction.status,
      transaction.method.replace("_", " "),
    ];
    tableRows.push(transactionData);
  });

  doc.text("Transactions History Export", 14, 15);
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    theme: "grid",
    styles: { fontSize: 8 },
    headStyles: { fillColor: [99, 102, 241] }, 
  });

  doc.save(`transactions_export_${new Date().toISOString().split("T")[0]}.pdf`);
};

export const exportToExcel = (data: Transaction[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map((item) => ({
      ID: item.id,
      Date: item.date,
      Customer: item.customerName,
      Email: item.customerEmail,
      Amount: item.amount,
      Status: item.status,
      Method: item.method,
    })),
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataFile = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(
    dataFile,
    `transactions_export_${new Date().toISOString().split("T")[0]}.xlsx`,
  );
};
