import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2C3E50",
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1px solid #ddd",
  },
  table: {
    width: "100%",
    marginBottom: 20,
    borderBottom: "1px solid #ddd",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    paddingBottom: 8,
    paddingTop: 8,
  },
  tableCellHeader: {
    fontWeight: "bold",
    paddingRight: 15,
    color: "#2C3E50",
    flex: 1,
  },
  tableCell: {
    paddingRight: 15,
    flex: 1,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 20,
    color: "#2C3E50",
    borderTop: "1px solid #ddd",
    paddingTop: 10,
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#999",
    marginTop: 40,
  },
  status: {
    padding: 12,
    borderRadius: 8,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  paid: {
    backgroundColor: "#28a745",
  },
  notPaid: {
    backgroundColor: "#dc3545",
  },
  link: {
    fontSize: 12,
    color: "#007bff",
    textDecoration: "underline",
    marginTop: 5,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
  },
});

// Function to get styles based on delivery status
const getStatusStyle = (status) => {
  switch (status) {
    case "Not Delivered":
      return { backgroundColor: "#dc3545", color: "#fff" }; // Red
    case "Delivery Man Collect From Store":
      return { backgroundColor: "#ffc107", color: "#000" }; // Yellow
    case "On the Way":
      return { backgroundColor: "#17a2b8", color: "#fff" }; // Blue
    case "Delivered":
      return { backgroundColor: "#28a745", color: "#fff" }; // Green
    default:
      return { backgroundColor: "#6c757d", color: "#fff" }; // Grey for unknown
  }
};

// Main component
export default function PdfReport({ invoiceData, url }) {
  const getPaidStyle = (isPaid) => {
    return isPaid
      ? [styles.status, styles.paid]
      : [styles.status, styles.notPaid];
  };

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header with invoice info */}
        <View style={styles.header}>
          <Text>Invoice: Order {invoiceData?._id}</Text>
          {url && (
            <Text
              style={styles.link}
              onPress={() => window.open(url, "_blank")}
            >
              View Details: {url}
            </Text>
          )}
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text>Customer Email: {invoiceData.deliveryAddress?.email}</Text>
          <Text>Phone: {invoiceData.deliveryAddress?.phone}</Text>
          <Text>Address: {invoiceData.deliveryAddress?.address}</Text>
        </View>

        {/* Order Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Item</Text>
            <Text style={styles.tableCellHeader}>Order Type</Text>
            <Text style={styles.tableCellHeader}>Price</Text>
          </View>
          {invoiceData &&
            invoiceData.orderItems?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.title}</Text>
                <Text style={styles.tableCell}>{item.orderType}</Text>
                <Text style={styles.tableCell}>BDT {item.price}</Text>
              </View>
            ))}
        </View>

        {/* Delivery Status */}
        <View
          style={[styles.status, getStatusStyle(invoiceData.deliveryStatus)]}
        >
          <Text style={styles.statusText}>
            Delivery Status: {invoiceData.deliveryStatus}
          </Text>
        </View>

        {/* Paid Status */}
        <View style={getPaidStyle(invoiceData.isPaid)}>
          <Text style={styles.statusText}>
            Paid Status: {invoiceData.isPaid ? "Paid" : "Not Paid"}
          </Text>
        </View>
        {invoiceData.isPaid && (
          <Text>
            Paid Date: {new Date(invoiceData?.paidAt).toLocaleDateString()}
          </Text>
        )}
        {invoiceData.isPaid && (
          <Text>Transaction ID: {invoiceData.transactionId}</Text>
        )}

        {/* Total Price */}
        <Text style={styles.total}>Total: BDT {invoiceData.totalPrice}</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>{new Date().toLocaleString()}</Text>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
}
