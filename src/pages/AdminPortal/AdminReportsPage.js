import { useEffect, useState } from 'react';
import useApiPrivate from "../../hooks/useAPIPrivate";
import ReportDetailsPopup from "../../components/AdminComponents/ReportDetailsPopup"

const AdminReportsPage = () => {
    const [reports, setReports] = useState([{}]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedReportAdvert, setSelectedReportAdvert] = useState(null);
    const apiPrivate = useApiPrivate();

    const getReports = async () => {

        try{
            await apiPrivate.get("report/admin/get").then((res) => {
                if (res.status === 200) {
                    setReports(res.data);
                }
            });
        }
        catch(error){
            console.log(error);
        }

        
    }

    const handleClosePopup = () => {
        setSelectedReport(null);
        setSelectedReportAdvert(null);
    }

    const handleReportClicked = async (report) => {
        console.log("hello");
        await apiPrivate.get("advert/admin/get/" + report.advertId?._id).then((res) => {
            if (res.status === 200) {
                setSelectedReportAdvert(res.data);
                setSelectedReport(report);
            }
        })
        
    }

    useEffect(() => {
        getReports();
    }, [reports])

    return (
        <div className="container mx-auto mt-8 max-w-7xl mx-auto my-5 pl-20 pt-20">
            <h1 className="font-semibold text-3xl mb-4">
                Advertisement Reports
            </h1>
            {selectedReport && (<ReportDetailsPopup report={selectedReport} advert={selectedReportAdvert} closePopup={handleClosePopup}/>)}
            <ul>
                {
                    reports.length === 0 
                    ? (<p>No Reports</p>)
                    : (reports.map((report, index) => (
                        <li key={index} className="flex flex-col mb-3 p-2 border cursor-pointer rounded hover:bg-gray-100" onClick={() => handleReportClicked(report)}>
                            <p className="text-sm mt-2">
                                <span className="font-bold">Name:</span> {report.userId?.firstName} {report.userId?.lastName}
                            </p>
                            <p className="text-sm mt-2">
                                <span className="font-bold">Description:</span> {report.description}
                            </p>
                            <p className="text-sm mt-2">
                                <span className="font-bold">Title:</span> {report.advertId?.title}
                            </p>
                        </li>
                    )))
                }
            </ul>
        </div>
    )
}

export default AdminReportsPage;