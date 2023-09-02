import { useParams } from "react-router-dom";

import { useGetAlertReportByIdQuery } from "../../../../services/alertQuery";
import { TSurveyReport } from "../../../../types/alert";

import moment from "moment";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import Malolos_CDRRMO_Logo from "../../../../assets/img/Malolos_CDRRMO_Logo.png";

const styles = StyleSheet.create({
  body: {
    paddingVertical: 30,
    paddingHorizontal: 50,
    fontSize: 14,
  },
  textCenter: {
    textAlign: "center",
  },
  textBold: {
    fontWeight: "bold",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
  header: {
    fontSize: 11,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    padding: 10,
    width: "70px",
    height: "70px",
  },

  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    marginVertical: "auto",
    flexDirection: "row",
    fontWeight: "bold",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    /* marginLeft: 20, */
    marginVertical: 2,
    fontSize: 14,
  },
  page: {
    position: "absolute",
    bottom: 20,
    right: 20,
    fontSize: 10,
  },
  dateGenerated: {
    /* position: "absolute",
    bottom: 20,
    left: 20, */
    fontSize: 10,
    marginVertical: 5,
    textAlign: "right",
  },
  summary: {
    marginTop: 20,
  },
  summaryTitle: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});

const SurveyReport = () => {
  const { alertId } = useParams();
  const {
    data: alertData,
    isLoading,
    error,
  } = useGetAlertReportByIdQuery(alertId);

  const reportData = alertData as TSurveyReport | undefined;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(alertId);
    console.log(error);

    return <p>Something went wrong</p>;
  }

  return (
    <PDFViewer className="w-screen h-screen">
      <Document>
        <Page style={styles.body}>
          {/* page number */}
          <Text
            style={styles.page}
            render={({ pageNumber }) =>
              /*  `${pageNumber} / ${totalPages}` */
              `${pageNumber}`
            }
            fixed
          />

          {/* header */}
          <View style={styles.header}>
            <Image src={Malolos_CDRRMO_Logo} style={styles.logo} />

            <View>
              {/* <Text>SAGIP</Text> */}
              <Text>
                Malolos City Disaster Risk Reduction Management Office
              </Text>
              <Text>1/F New City Hall Building</Text>
              <Text>Brgy. Bulihan, Malolos City, Bulacan</Text>
            </View>
          </View>
          <View>
            <Text style={styles.title}>Wellness Check Survey Report</Text>
            {/* new line */}
            <Text>{"\n"}</Text>
            <Text>Name: {reportData?.title} </Text>{" "}
            <Text>
              Date:{" "}
              {moment(reportData?.startDate).format("MMMM DD, YYYY HH:mm A")} to{" "}
              {moment(reportData?.endDate).format("MMMM DD, YYYY HH:mm A")}
            </Text>
          </View>

          <Text>{"\n"}</Text>

          {/* date generated */}
          <Text style={styles.dateGenerated}>
            Date Generated: {moment(Date.now()).format("MMMM DD, YYYY")}
          </Text>
          {/* table  */}
          <View>
            <View style={styles.table}>
              {/* table header */}
              <View style={styles.tableHeader}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Barangay</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Unaffected</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Affected</Text>
                </View>
              </View>
              {/* table row, content */}
              {reportData &&
                reportData.unaffected &&
                reportData.affected &&
                Object.keys(reportData.unaffected).map((area: any) => (
                  <View style={styles.tableRow} key={area}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{area}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {reportData.unaffected[area]}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {reportData.affected[area]}
                      </Text>
                    </View>
                  </View>
                ))}
              {/* total */}
              {/* <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Total</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {reportData?.affectedCount && reportData.affectedCount}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {reportData?.unaffectedCount && reportData.unaffectedCount}
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
          <Text>{"\n"}</Text>
          {/* total */}
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Report Summary:</Text>
            <Text>
              Responses: {reportData?.responseCount && reportData.responseCount}
            </Text>
            {/* <Text>
              {reportData?.responseCount && reportData.responseCount}
            </Text> */}
            <Text>
              Affected: {reportData?.affectedCount && reportData.affectedCount}
            </Text>
            {/* <Text>{reportData?.affectedCount && reportData.affectedCount}</Text> */}
            <Text>
              Unaffected:{" "}
              {reportData?.unaffectedCount && reportData.unaffectedCount}
            </Text>
            {/* <Text>
              {reportData?.unaffectedCount && reportData.unaffectedCount}
            </Text> */}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default SurveyReport;
