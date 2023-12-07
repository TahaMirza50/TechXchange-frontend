import ImageCard from "../../components/AdminComponents/ImageCard";
import image from "../../assets/images/categories.jpg"

import { useState } from 'react';

const AdminCategoriesPage = () => {
    
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const handleInputChange = (e) => {
        setNewCategory(e.target.value);
      };
    
      const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
          setCategories([...categories, newCategory.trim()]);
          setNewCategory('');
        }
      };
    
      return (
        <div className="container mx-auto mt-8 max-w-7xl mx-auto my-5 pl-20 pt-20">
          <div className="mb-4">
            <label className="block text-m font-bold mb-2">
              Add Category:
            </label>
            <div className="flex">
              <input
                type="text"
                className="w-64 p-2 border border-gray-300 rounded-l focus:outline-none"
                value={newCategory}
                onChange={handleInputChange}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none"
                onClick={handleAddCategory}
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
                  className="flex items-center font-bold mb-3 p-2 border rounded hover:bg-gray-100"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}

export default AdminCategoriesPage;