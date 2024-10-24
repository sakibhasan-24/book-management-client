import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#f9f9f9", // Light background for the entire page
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    color: "#2b2b2b",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555555",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007BFF", // Blue background for header
    borderBottomWidth: 2,
    borderColor: "#d1d1d1",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#d1d1d1",
  },
  tableCell: {
    padding: 10,
    borderStyle: "solid",
    borderColor: "#d1d1d1",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 12,
    color: "#333333",
    textAlign: "center", // Center align all cells
    width: "20%", // Equal width for all columns, adjust as needed
  },
  headerCell: {
    fontWeight: "bold",
    color: "#ffffff", // White text color for header cells
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    textAlign: "right",
    fontWeight: "bold",
    color: "#333333",
  },
});

// Create the PDF Document component
export default function RentBooksPdf({ rentBooks }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Rented Books Report</Text>
        <Text style={styles.subtitle}>
          {`Generated on ${new Date().toLocaleDateString()}`}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, styles.headerCell]}>#</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>
              Book Title
            </Text>
            <Text style={[styles.tableCell, styles.headerCell]}>Rented By</Text>
            <Text style={[styles.tableCell, styles.headerCell]}>
              Book Owner
            </Text>
            <Text style={[styles.tableCell, styles.headerCell]}>
              Return Date
            </Text>
          </View>

          {/* Table Body */}
          {rentBooks.map((book, index) => (
            <View key={book._id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{book.title}</Text>
              <Text style={styles.tableCell}>{book.user?.userName}</Text>
              <Text style={styles.tableCell}>{book?.bookOwner?.userName}</Text>
              <Text style={styles.tableCell}>
                {new Date(book.returnDate).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>
          Total Rented Books: {rentBooks.length}
        </Text>
      </Page>
    </Document>
  );
}
