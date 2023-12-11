const ReportDetailsPopup = ({ report, advert, closePopup }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-900">
        <div className="bg-white p-6 rounded-md shadow-lg max-w-md">
          
  
          {/* Report details */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Report Details</h2>
            <p>
              <span className="font-bold">Name:</span> {report.userId?.firstName} {report.userId?.lastName}
            </p>
            <p>
              <span className="font-bold">Description:</span> {report.description}
            </p>
          </div>
  
          {/* Advert details */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Advert Details</h2>
            <p>
              <span className="font-bold">Title:</span> {advert.title}
            </p>
            <p>
              <span className="font-bold">Description:</span> {advert.description}
            </p>
            <p>
              <span className="font-bold">Price:</span> {advert.price}
            </p>
            <p>
              <span className="font-bold">Condition:</span> {advert.condition}
            </p>
            <p>
              <span className="font-bold">Location:</span> {advert.location}
            </p>
            <p>
              <span className="font-bold">Timestamp:</span> {new Date(advert.timestamp).toLocaleString()}
            </p>
            <p>
              <span className="font-bold">Status:</span> {advert.status}
            </p>
            {/* Add logic to display images */}
            <span>
            {advert.images && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Images</h3>
                {advert.images.map((image, index) => (
                  <img key={index} src={image} alt={`Image ${index}`} className="mb-2" />
                ))}
              </div>
            )}
            </span>
            
            {/* Close button */}
          <button
            onClick={closePopup}
            className="mt-6 p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            Close
          </button>
  
          {/* Delete button */}
          <span>
            <button
              onClick={closePopup}
              className="mt-6 ml-5 p-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ReportDetailsPopup;
  