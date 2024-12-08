import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/school-logo.png";

// Sample Data
const data = [
  { title: "Subject 1", value: "Grade A" },
  { title: "Subject 2", value: "Grade B" },
  // Add more rows as needed
];

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 64,
    width: 64,
    objectFit: "cover",
  },
  title: {
    textAlign: "center",
  },
  schoolName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tabulation: {
    marginTop: 10,
    padding: 10,
    border: 1,
    borderColor: "#ccc",
    fontSize: 14,
    textTransform: "uppercase",
    textAlign: "center",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    padding: 8,
    fontSize: 12,
    textAlign: "left",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
  },
  lastCell: {
    borderRightWidth: 0,
  },
});

// PDF Document
const TabulationHeader = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={[styles.section, styles.header]}>
        <Image
          style={styles.image}
          src={logo} // Replace with your actual logo path
        />
        <View style={styles.title}>
          <Text style={styles.schoolName}>
            Vidyamayee Govt. Girls High School
          </Text>
          <Text style={styles.location}>Sadar, Mymensingh</Text>
          <Text style={styles.tabulation}>Tabulation Sheet</Text>
        </View>
        <View style={styles.image} />
      </View>

      {/* Table */}
      <View style={styles.table}>
        {data.map((row, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.cell}>{row.title}</Text>
            <Text style={[styles.cell, styles.lastCell]}>{row.value}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TabulationHeader;
