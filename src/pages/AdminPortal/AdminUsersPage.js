import { useEffect, useState } from 'react';
import profileImage from '../../assets/images/adminProfileimage.png'
import useApiPrivate from "../../hooks/useAPIPrivate";

const AdminUsersPage = () => {

  const apiPrivate = useApiPrivate();

  const [users,setUsers] = useState([{}]);
  const [selectedValue, setSelectedValue] = useState("0");

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

      const handleDropdownChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
      };

    
      return (
        <div className="max-w-7xl mx-auto my-5 pl-20 pt-20">
          <h1 className="text-3xl font-semibold mb-4">Users</h1>

          <div className="mb-4 pt-5 font-medium">
            <label htmlFor="selectedValue" className="mr-2">
              Rating:
            </label>
            <select
              id="selectedValue"
              value={selectedValue}
              onChange={handleDropdownChange}
              className="p-2 border rounded mr-2"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            and less
          </div>
    
          {
            users.length === 0 
            ? (<p>No Users</p>) 
            : (<ul>
              {
              users.map((user, index) => (
                <li
                  key={index}
                  className="flex items-center mb-2 p-2 border rounded hover:bg-gray-100"
                >
                  <img src={profileImage} className="h-8" alt="Profile" />
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>)
          }
    
          
        </div>
      );
}

export default AdminUsersPage;
