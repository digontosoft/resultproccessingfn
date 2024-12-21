import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { transcriptData } from "./transcriptData";
import axios from "axios";
import signature from "../../../assets/signature.png";
import SixToEightTranscript from "./SixToEightTranscript";

// Main Component
const Transcript = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [results, setResults] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;

  const {
    Data: { studentInfo, TotalResult, summary },
  } = JSON.parse(localStorage.getItem("result"));
  console.log({ TotalResult });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${url}/result/get_all`);
        setResults(response.data.data); // Assuming API returns data in `data.data`
        console.log("results", response.data.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [url]);

  return (
    <>
      <SixToEightTranscript />
    </>
  );
};

export default Transcript;
