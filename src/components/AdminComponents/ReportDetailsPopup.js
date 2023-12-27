import { useState } from 'react';

const ReportDetailsPopup = ({ report, advert, closePopup, apiPrivate}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [advertDeleted, setadvertDeleted] = useState(advert.delete);

  const deleteAd = async () => {
    try {
        await apiPrivate.delete("advert/admin/delete/" + advert._id).then((res) => {
          if (res.status === 200) {
            setadvertDeleted(true);
          }
        })
        
    }
    catch (error) {
        console.log(error)
    }
  }

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

    return (
      <div className='fixed overflow-y-auto top-0 left-0 bg-opacity-50 bg-gray-900 w-screen h-screen'>
      <div className=" flex items-center justify-center ">
        
      <div className='flex space-x-5 bg-white p-6 mt-40 rounded-md shadow-lg max-w-md'>
        <div className="flex-col ">
          
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
            
            
            {/* Close button */}
          <button
            onClick={closePopup}
            className="mt-6 p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            Close
          </button>
  
          {/* Delete button */}
          <span>
            {
              advertDeleted === false
              ? (
                <button
              onClick={() => deleteAd()}
              className="mt-6 ml-5 p-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
              )
              : (
                 <span className="font-bold text-red-500 ml-7">Advertisement Deleted</span> 
              )
            }
            
          </span>
          </div>
          
        </div>

        <span>
            {advert.images && (
              <div>
                <h3 className="mt-6 text-lg font-semibold mb-2">Images</h3>
                {advert.images.map((image, index) => (
                <img 
                key={index} 
                src={image} 
                alt={`Image ${index}`} 
                style={{ width: '100px', height: '100x', display: 'block' }} className="mb-2 cursor-pointer hover:outline" data-carousel-item
                onClick={() => openImageModal(image)}/>
                ))}
              </div>
                      )}
                      </span>
            </div>
      </div>
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImageModal}
        >
          <img
            src={selectedImage}
            alt="Selected Image"
            className="max-h-full max-w-full cursor-pointer"
            onClick={closeImageModal}
          />
        </div>
      )}
      </div>
    );
  };
  
  // {advert.images.map((image, index) => (
  //   <img key={index} src={image} alt={`Image ${index}`} style={{ width: '100px', height: 'auto', display: 'block' }} className="mb-2" data-carousel-item/>
  // ))}
  export default ReportDetailsPopup;
  