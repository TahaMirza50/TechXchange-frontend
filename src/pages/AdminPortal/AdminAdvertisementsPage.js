import { useEffect, useState } from 'react';
import useApiPrivate from "../../hooks/useAPIPrivate";
import AdConfirmationPopup from '../../components/AdminComponents/AdConfirmationPopup';

const AdminAdvertisementsPage = () => {
    const [advertisements, setAdvertisements] = useState([{}]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAdId, setSelectedAdId] = useState("");
    const [buttonType, setButtonType] = useState("");
      const apiPrivate = useApiPrivate();

      

      useEffect(() => {

        const getInReviewAdverts = async () => {
          try{
            await apiPrivate.get('advert/admin/get').then(
              (res) => {
                setAdvertisements(res.data);
            }); 
          }
          catch(error) {
            console.error(error)
          }
        }

        getInReviewAdverts();
      }, [advertisements]);

      const handleButtonClicked = (id, buttonType) => {
        setSelectedAdId(id);
        setButtonType(buttonType);
      }
    
      const handleApprove = async () => {
        console.log("hello")
        try{
          
          await apiPrivate.patch('advert/admin/approve/' + selectedAdId).then(
            (res) => {
              console.log(res.data);
              setAdvertisements((prevAds) =>
          prevAds.filter((ad) =>
            ad._id !== selectedAdId 
          )
        );
        setSelectedAdId("");
          });
        }
        catch(error) {
          console.log(error);
        }
        
      };
    
      const handleReject = async () => {
        try{
          await apiPrivate.patch('advert/admin/reject/' + selectedAdId).then(
            (res) => {
              console.log(res.data);
              setAdvertisements((prevAds) =>
          prevAds.filter((ad) =>
            ad._id !== selectedAdId 
          )
        );
        setSelectedAdId("");
          });
        }
        catch(error) {
          console.log(error);
        }
        
      };

      

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };
    
      return (
        <div className="mx-auto mt-8 max-w-7xl mx-auto my-5 pl-20 pt-20">
      <h1 className="text-3xl font-semibold mb-4">Ad Review</h1>

      {selectedAdId && (<AdConfirmationPopup
          onConfirm={handleApprove}
          onReject={handleReject}  
          onCancel={() => setSelectedAdId("")}
          buttonType={buttonType}/>)}

      {advertisements.length === 0 ? (
        <p>No Advertisements</p>
      ) : (
        advertisements.map((ad, index) => (
          <div key={index} className="bg-gray-100 p-6 mb-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{ad.title}</h2>
            <p className="text-gray-600">{ad.description}</p>
            <p className="text-sm mt-2 font-bold text-yellow-500">Status: {ad.status}</p>
            <p className="text-sm mt-2">
              <span className="font-bold">Price:</span> {ad.price}
            </p>
            <p className="text-sm">
              <span className="font-bold">Condition:</span> {ad.condition}
            </p>
            <p className="text-sm">
              <span className="font-bold">Location:</span> {ad.location}
            </p>
            <p className="text-sm">
              <span className="font-bold">Timestamp:</span> {new Date(ad.timestamp).toLocaleString()}
            </p>

            {ad.images && ad.images.length > 0 && (
              <div className="mt-4">
                <p className="font-bold">Images:</p>
                <div className="flex space-x-2">
                  {ad.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Ad Image ${index}`}
                      className="w-16 h-16 object-cover rounded-md cursor-pointer"
                      onClick={() => openImageModal(image)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex mt-4 space-x-4">
              <button
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none"
                onClick={() => handleButtonClicked(ad._id, "Approve")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none"
                onClick={() => handleButtonClicked(ad._id, "Reject")}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}

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
}

export default AdminAdvertisementsPage;