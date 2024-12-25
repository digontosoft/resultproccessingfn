import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/school-logo.png";
// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    height: 64,
    width: 64,
    objectFit: "cover",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    padding: 5,
    textAlign: "center",
    fontSize: 8,
  },
  header: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  subHeaderCell: {
    textAlign: "center",
    fontSize: 7,
    padding: 3,
  },
  subHeaderColumn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#d3d3d3",
  },
  dataCell: {
    padding: 5,
    textAlign: "center",
    fontSize: 8,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    display: "flex", // Required for alignItems and justifyContent to work
  },
  schoolTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
  },
  topTable: {
    display: "table",
    width: "15%", // Ensure it spans the full width
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginTop: 10, // Add spacing from the header
  },
  topTableRow: {
    flexDirection: "row",
  },
  topTableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    padding: 8,
    fontSize: 10,
    textAlign: "center", // Center text
    backgroundColor: "#f9f9f9", // Light background for better readability
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
  },
});

const data = [
  { column1: "Name", column2: "John Doe" },
  { column1: "Age", column2: "30" },
  { column1: "Gender", column2: "Male" },
  { column1: "Occupation", column2: "Software Engineer" },
];

// JSON data for headers, subheaders, and dynamic rows
const headerData = [
  "Roll",
  "Student Name",
  "Bengali 1st Paper",
  "Bengali 2nd Paper",
  "Bengali Total",
  "English 1st Paper",
  "English 2nd Paper",
  "English Total",
  "Mathematics",
];

const subHeaderData = {
  "Bengali 1st Paper": ["Cre", "MCQ", "PRA", "To", "GP", "LG"],
  "Bengali 2nd Paper": ["Cre", "MCQ", "PRA", "To", "GP", "LG"],
  "Bengali Total": ["To", "GP", "LG"],
  "English 1st Paper": ["Cre", "MCQ", "PRA", "To", "GP", "LG"],
  "English 2nd Paper": ["Cre", "MCQ", "PRA", "To", "GP", "LG"],
  "English Total": ["To", "GP", "LG"],
  Mathematics: ["Cre", "MCQ", "PRA", "To", "GP", "LG"],
};

// Helper function to calculate totals
function calculateTotal(paperData) {
  const total = [];
  const numberOfColumns = paperData[0].length;

  for (let i = 0; i < numberOfColumns; i++) {
    total.push(paperData.reduce((sum, row) => sum + row[i], 0));
  }

  return total;
}

// Dynamic row data with calculated totals
const rowData = [
  {
    roll: "001",
    name: "Ahnaf Zahin",
    studentId: "231702",
    shift: "Morning",
    section: "A",
    "Bengali 1st Paper": [40, 35, 30, 25, 20, 15],
    "Bengali 2nd Paper": [30, 28, 25, 20, 18, 22],
    "Bengali Total": calculateTotal([
      [40, 35, 30, 25, 20, 15],
      [30, 28, 25, 20, 18, 22],
    ]),
    "English 1st Paper": [45, 40, 38, 30, 28, 25],
    "English 2nd Paper": [50, 45, 40, 35, 30, 28],
    "English Total": calculateTotal([
      [45, 40, 38, 30, 28, 25],
      [50, 45, 40, 35, 30, 28],
    ]),
    Mathematics: [60, 55, 50, 45, 40, 38],
  },

  // Add more student data as needed
];

// PDF Document
const TabulationPdf = () => (
  <Document>
    <Page size="A1" style={styles.page}>
      <View style={styles.headerSection}>
        <Image
          style={styles.image}
          src={logo} // Replace with your actual logo path
        />
        <View style={styles.schoolTitle}>
          <Text>Vidyamayee Govt. Girls High School</Text>
          <Text>Sadar, Mymensingh</Text>
          <Text>Tabulation Sheet</Text>
        </View>
        <View style={styles.topTable}>
          {/* Header Row */}
          <View style={styles.topTableRow}>
            <Text style={[styles.topTableCell, styles.headerCell]}>
              Column 1
            </Text>
            <Text style={[styles.topTableCell, styles.headerCell]}>
              Column 2
            </Text>
          </View>

          {/* Data Rows */}
          {data.map((row, index) => (
            <View key={index} style={styles.topTableRow}>
              <Text style={styles.topTableCell}>{row.column1}</Text>
              <Text style={styles.topTableCell}>{row.column2}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Main Table */}
      <View style={styles.table}>
        {/* Header Row */}
        <View style={[styles.tableRow, styles.header]}>
          {headerData.map((header, index) => {
            // Check if the header has subheaders
            if (subHeaderData[header]) {
              return (
                <View
                  key={index}
                  style={{
                    flex: 2,
                    flexDirection: "column",
                    borderWidth: 1,
                    borderColor: "#d3d3d3",
                  }}
                >
                  <Text style={[styles.tableCell]}>{header}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {/* Split subheaders into two columns */}
                    <View style={styles.subHeaderColumn}>
                      {subHeaderData[header]
                        .slice(0, subHeaderData[header].length / 2)
                        .map((subHeader, subIndex) => (
                          <Text key={subIndex} style={styles.subHeaderCell}>
                            {subHeader}
                          </Text>
                        ))}
                    </View>
                    <View style={styles.subHeaderColumn}>
                      {subHeaderData[header]
                        .slice(subHeaderData[header].length / 2)
                        .map((subHeader, subIndex) => (
                          <Text key={subIndex} style={styles.subHeaderCell}>
                            {subHeader}
                          </Text>
                        ))}
                    </View>
                  </View>
                </View>
              );
            } else {
              return (
                <Text key={index} style={[styles.tableCell, { flex: 2 }]}>
                  {header}
                </Text>
              );
            }
          })}
        </View>

        {/* Data Rows */}
        {rowData.map((row, rowIndex) => (
          <View style={[styles.tableRow]} key={rowIndex}>
            <Text style={[styles.dataCell, { flex: 2 }]}>{row.roll}</Text>
            <View style={[styles.dataCell, { flex: 2 }]}>
              <View style={{ flexDirection: "column", marginBottom: 5 }}>
                <Text style={[styles.dataCell, { border: "none" }]}>
                  {row.name}
                </Text>
                <Text style={[styles.dataCell, { border: "none" }]}>
                  ID: {row.studentId}
                </Text>
                <Text style={[styles.dataCell, { border: "none" }]}>
                  Shift: {row.shift}
                </Text>
                <Text style={[styles.dataCell, { border: "none" }]}>
                  Section: {row.section}
                </Text>
              </View>
            </View>

            {Object.keys(subHeaderData).map((key, keyIndex) => (
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#d3d3d3",
                }}
                key={keyIndex}
              >
                <View style={{ flex: 1, flexDirection: "column" }}>
                  {row[key]?.slice(0, 3).map((data, index) => (
                    <Text key={index} style={styles.dataCell}>
                      {data}
                    </Text>
                  ))}
                </View>
                <View style={{ flex: 1, flexDirection: "column" }}>
                  {row[key]?.slice(3).map((data, index) => (
                    <Text key={index} style={styles.dataCell}>
                      {data}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TabulationPdf;
