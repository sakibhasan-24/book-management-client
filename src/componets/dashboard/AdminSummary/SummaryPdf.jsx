// SummaryPDF.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register custom fonts if needed (optional)
Font.register({
  family: "Helvetica",
  src: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontSize: 12,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "20px 0",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
  },
  tableCellLast: {
    borderRightWidth: 0, // Remove right border for last cell
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#555",
  },
});

const SummaryPdf = ({ summary }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Admin Summary Invoice</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Description
            </Text>
            <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
              Value
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Orders</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.totalOrders}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Current Month Orders</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.currentMonthOrders}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Last Month Orders</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.lastMonthOrders}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Users</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.totalUsers}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Current Month Users</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.currentMonthUsers}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Last Month Users</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.lastMonthUsers}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Delivery Personnel</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.totalDeliveryMen}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Blocked Users</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.blockedUserCount}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Books</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              {summary.totalBooks}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Monthly Profit</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              ${summary.adminProfit}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Expenses</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              ${summary.totalExpenses}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Earnings</Text>
            <Text style={[styles.tableCell, styles.tableCellLast]}>
              ${summary.totalEarnings}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default SummaryPdf;
