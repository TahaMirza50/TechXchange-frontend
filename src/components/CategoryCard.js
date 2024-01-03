import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, backgroundColor }) => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/results', { state: { categoryId: category._id } })} className={`h-28 w-28 sm:w-28 ${backgroundColor} shadow-2xl  hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700`}>
                <div className="-mt-1 text-center text-sm font-semibold">{category.name}</div>
            </button>
        </div>
    );
}

export default CategoryCard;