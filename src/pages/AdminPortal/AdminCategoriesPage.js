import { useEffect, useState } from 'react';
import useApiPrivate from "../../hooks/useAPIPrivate";

const AdminCategoriesPage = () => {
    
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([{}]);

    const apiPrivate = useApiPrivate();

    const handleInputChange = (e) => {
        setNewCategory(e.target.value);
      };
    
      const handleAddCategory = async () => {
        try{
          if (newCategory.trim() !== '') {
            await apiPrivate.post('/category/admin/create', {name: newCategory.trim()}).then((res) => {
              if (res.status === 201) {
                setCategories([...categories, newCategory.trim()]);
                setNewCategory('');
              }
              else if (res.status === 400) {
                console.log(res.data.message)
              }
            })
          }
        }
        catch(error) {
          console.log(error)
        }
        
      };

      const getCategories = async () => {
        try{
          await apiPrivate.get('/category/admin/all').then((res) => {
            setCategories(res.data)
          })
        }
        catch(error){
          console.log(error)
        }
      }

      useEffect(() => {
        getCategories()
      }, [categories])
    
      return (
        <div className="container mx-auto mt-8 max-w-7xl mx-auto my-5 pl-20 pt-20">
          <div className="mb-4">
            <label className="block text-m font-bold mb-2">
              Add Category:
            </label>
            <div className="flex">
              <input
                type="text"
                className="w-64 p-2 border border-gray-300 rounded focus:outline-none"
                value={newCategory}
                onChange={handleInputChange}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none ml-3"
                onClick={() => handleAddCategory()}
              >
                Add
              </button>
            </div>
          </div>
    
          <div>
            <h2 className="text-m font-bold mb-2">Categories:</h2>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="block font-bold p-2 border mb-3 rounded bg-gray-100 hover:bg-gray-200"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}

export default AdminCategoriesPage;