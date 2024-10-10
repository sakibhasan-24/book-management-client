import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
    color: "#4A4A4A",
  },
  section: {
    marginBottom: 15,
  },
  table: {
    width: "100%",
    marginBottom: 20,
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
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
    color: "#4A4A4A",
    flex: 1,
  },
  tableCell: {
    paddingRight: 15,
    flex: 1,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
    color: "#2C3E50",
  },
  footer: {
    textAlign: "center",
    fontSize: 10,
    color: "#666",
    marginTop: 40,
  },
  status: {
    padding: 10,
    borderRadius: 8,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#fff", // Text color for better contrast
  },
  paid: {
    backgroundColor: "#28a745", // Green for paid status
  },
  notPaid: {
    backgroundColor: "#dc3545", // Red for not paid status
  },
  link: {
    fontSize: 12,
    color: "#007bff",
    textDecoration: "underline",
  },
});

export default function PdfReport({ invoiceData, url }) {
  const getPaidStyle = (isPaid) => {
    return isPaid
      ? [styles.status, styles.paid]
      : [styles.status, styles.notPaid];
  };

  return (
    <Document>
      <Page style={styles.page}>
        {/* Company Logo and Header */}
        <View style={styles.header}>
          <Text>Invoice: Order {invoiceData?._id}</Text>
          <Text style={styles.link} onPress={() => window.open(url, "_blank")}>
            View Details: {url}
          </Text>
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
        <View style={styles.status}>
          <Text>Delivery Status: {invoiceData.deliveryStatus}</Text>
        </View>

        {/* Paid Status */}
        <View style={getPaidStyle(invoiceData.isPaid)}>
          <Text>Paid Status: {invoiceData.isPaid ? "Paid" : "Not Paid"}</Text>
        </View>
        {invoiceData.isPaid && (
          <Text>
            Paid Date: {new Date(invoiceData?.paidAt).toLocaleDateString()}
          </Text>
        )}
        {invoiceData.isPaid && (
          <Text>Transaction ID: {invoiceData.transactionId}</Text>
        )}

        {/* Total */}
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
