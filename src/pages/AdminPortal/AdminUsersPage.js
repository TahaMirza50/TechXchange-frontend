import { useEffect, useState } from 'react';
import profileImage from '../../assets/images/adminProfileimage.png'
import UserDetailsPopup from '../../components/AdminComponents/UserDetailsPopup';
import useApiPrivate from "../../hooks/useAPIPrivate";

const AdminUsersPage = () => {

  const apiPrivate = useApiPrivate();

  const [users,setUsers] = useState([{}]);
  const [selectedValue, setSelectedValue] = useState("0");
  //const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = async () => {
    const rating = Number(selectedValue)
    try{
      
      await apiPrivate.get('admin/users/getusers/' + rating).then(
        (res) => {
          console.log(res);
          console.log(res.data);
          setUsers(res.data);
      }
      );
    }
    catch(error){
      console.log(error)
    }
  }

    useEffect(() => {
      

      getUsers();
    }, [selectedValue])

    // const userList = [
    //     { id: 1, name: 'John Doe', rating: 5 },
    //     { id: 2, name: 'Jane Doe', rating: 0 },
    //     { id: 3, name: 'Bob Smith', rating: 2 },
    //     { id: 4, name: 'John Doe', rating: 5 },
    //     { id: 5, name: 'Jane Doe', rating: 0 },
    //     { id: 6, name: 'Bob Smith', rating: 2 },
    //     { id: 7, name: 'John Doe', rating: 5 },
    //     { id: 8, name: 'Jane Doe', rating: 0 },
    //   ];
    
      

      const handleDropdownChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
      };

      // const handleUserClick = (user) => {
      //   setSelectedUser(user);
      // };
    
      // const handleCloseModal = () => {
      //   setSelectedUser(null);
      // };
    
      // const filteredUsers = userList.filter((user) => {
      //   // if(selectedValue === "All") {
      //   //     return true;
      //   // }
    
      //   return user["rating"] === Number(selectedValue);
      // });
    
      return (
        <div className="max-w-7xl mx-auto my-5 pl-20 pt-20">
          <h1 className="text-3xl font-semibold mb-4">Users</h1>

          {/* {selectedUser && (
        <UserDetailsPopup user={selectedUser} onClose={handleCloseModal} />
      )} */}
          <div className="mb-4 pt-5">
            <label htmlFor="selectedValue" className="mr-2 font-medium">
              Rating:
            </label>
            <select
              id="selectedValue"
              value={selectedValue}
              onChange={handleDropdownChange}
              className="p-2 border rounded"
            >
              {/* <option value="All">All</option> */}
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
    
          {
            users.length === 0 
            ? (<p>No Users</p>) 
            : (<ul>
              {
              users.map((user, index) => (
                <li
                  key={index}
                  className="flex cursor-pointer items-center mb-2 p-2 border rounded hover:bg-gray-100"
                  //onClick={() => handleUserClick(user)}
                >
                  <img src={profileImage} className="h-8" alt="Profile" />
                  {/* {user.firstName} - Rating: {user.rating} */}
                  {user._id}
                </li>
              ))}
            </ul>)
          }
    
          
        </div>
      );
}

export default AdminUsersPage;
