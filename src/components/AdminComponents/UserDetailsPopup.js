const UserDetailsPopup = ({ user, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-900">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold mb-4">{user.name}</h2>
        <p className="text-gray-600">Rating: {user.rating}</p>
        {/* Add more details as needed */}
        <button
          onClick={onClose}
          className="mt-6 p-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
