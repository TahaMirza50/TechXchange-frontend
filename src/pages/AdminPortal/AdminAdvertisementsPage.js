import { useState } from 'react';

const AdminAdvertisementsPage = () => {
    const [advertisements, setAdvertisements] = useState([
        { id: 1, title: 'Ad 1', content: 'This is the content of Ad 1', status: 'pending' },
        { id: 2, title: 'Ad 2', content: 'This is the content of Ad 2', status: 'pending' },
        { id: 3, title: 'Ad 3', content: 'This is the content of Ad 3', status: 'pending' },
      ]);
    
      const handleApprove = (id) => {
        setAdvertisements((prevAds) =>
          prevAds.map((ad) =>
            ad.id === id ? { ...ad, status: 'approved' } : ad
          )
        );
      };
    
      const handleReject = (id) => {
        setAdvertisements((prevAds) =>
          prevAds.map((ad) =>
            ad.id === id ? { ...ad, status: 'rejected' } : ad
          )
        );
      };
    
      return (
        <div className="mx-auto mt-8 max-w-7xl mx-auto my-5 pl-20 pt-20  ">
          <h1 className="text-3xl font-semibold mb-4">Ad Review</h1>
    
          {advertisements.map((ad) => (
            <div key={ad.id} className="bg-gray-100 p-6 mb-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">{ad.title}</h2>
              <p className="text-gray-600">{ad.content}</p>
              <p className={`mt-2 text-sm font-bold ${ad.status === 'pending' ? 'text-yellow-500' : ad.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                Status: {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
              </p>
              {ad.status === 'pending' && (
                <div className="flex mt-4 space-x-4">
                  <button
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 focus:outline-none"
                    onClick={() => handleApprove(ad.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none"
                    onClick={() => handleReject(ad.id)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      );
}

export default AdminAdvertisementsPage;