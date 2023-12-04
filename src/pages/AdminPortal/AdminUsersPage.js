

const AdminUsersPage = () => {
    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            {/* Add content for Users page */}
            {/* For example, add a form to search for users by rating */}
            <form>
                <label className="block mb-2">Search Users by Rating:</label>
                <input type="number" min="1" max="5" placeholder="Enter rating" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
            </form>
        </div>
    );
}

export default AdminUsersPage;
