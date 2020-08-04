import React, { useState, useEffect } from 'react';
import ReportViewer from 'react-lighthouse-viewer';
import { useGlobalState } from '../components/Global';
import { client } from '../utils/API';
import { convertURL } from '../utils/convertURL';

const Report = ({ match }) => {
  const [{ jsonReports }, dispatch] = useGlobalState();
  const [lhJson, setlhJson] = useState(null);

  useEffect(() => {
    async function getJsonReports() {
      try {
        let data = await client('api/json-reports');

        data = data.map((report) => JSON.parse(report));

        const matchedReport = data.find((report) => {
          report.requestedUrl = report.requestedUrl.slice(8);
          report.requestedUrl = report.requestedUrl.slice(0, -1);
          const convertedURL = convertURL(report.requestedUrl, '/', '_');
          return convertedURL === match.params.id;
        });
        console.log(matchedReport);
        setlhJson(matchedReport);
      } catch (err) {
        console.log(err);
      }
    }

    getJsonReports();
  }, [match.params.id]);

  return <div>{lhJson && <ReportViewer json={lhJson} />}</div>;
};

export default Report;
