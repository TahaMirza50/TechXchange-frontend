import { useEffect, useState } from 'react';
import useApiPrivate from "../../hooks/useAPIPrivate";
import ReportDetailsPopup from "../../components/AdminComponents/ReportDetailsPopup"
import { Button } from 'flowbite-react';

const AdminReportsPage = () => {
    const [reports, setReports] = useState([{}]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedReportAdvert, setSelectedReportAdvert] = useState(null);
    
    const apiPrivate = useApiPrivate();

    

    

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

    const handleMarkReviewed = async (event, id) => {
        event.stopPropagation();
        await apiPrivate.patch("report/admin/update/" + id).then((res) => {
            if (res.status === 200) {
                setReports((prevReports) => prevReports.map((report) => report._id === id ? { ...report, inReview: false } : report))
            }
        })
    }
    
    const handleReportDelete = async (event, id) => {
        event.stopPropagation();
        await apiPrivate.delete("report/admin/delete/" + id).then((res) => {
            if (res.status === 200) {
                setReports((prevAds) => prevAds.filter((report) => report._id !== id));
            }
        })
    }

    useEffect(() => {
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

        getReports();
    }, [reports])

    return (
        <div className="container mx-auto mt-8 max-w-7xl mx-auto my-5 pl-20 pt-20">
            <h1 className="font-semibold text-3xl mb-4">
                Advertisement Reports
            </h1>
            {selectedReport && (<ReportDetailsPopup report={selectedReport} advert={selectedReportAdvert} closePopup={handleClosePopup} apiPrivate={apiPrivate}/>)}
            <ul>
                {
                    reports.length === 0 
                    ? (<p>No Reports</p>)
                    : (reports.map((report, index) => (
                        <li key={index} className="flex flex-col mb-3 p-2 border cursor-pointer rounded hover:bg-gray-100" onClick={() => handleReportClicked(report)}>
  <div className='flex-col w-full'>
    <p className="text-sm mt-2">
      <span className="font-bold">Name:</span> {report.userId?.firstName} {report.userId?.lastName}
    </p>
    <p className="text-sm mt-2">
      <span className="font-bold">Description:</span> {report.description}
    </p>
    <p className="text-sm mt-2">
      <span className="font-bold">Title:</span> {report.advertId?.title}
    </p>
    <p className="text-sm mt-2">
      {report.inReview === true
        ? (<span className="font-bold text-red-500">In Review</span>)
        : (<span className="font-bold text-green-500">Reviewed</span>)
      }
    </p>
    
    <div className='flex w-full'>
        {report.inReview && (
      <button onClick={(event) => handleMarkReviewed(event, report._id)} className="ml-auto mt-5 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
        Mark Reviewed
      </button>
    )} 
      <button onClick={(event) => handleReportDelete(event, report._id)} className="mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete Report
      </button>
    </div>
  </div>
</li>

                    )))
                }
            </ul>
        </div>
    )
}

export default AdminReportsPage;