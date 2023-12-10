const CategoryCard = ({ category,backgroundColor }) => {
    return (
        <div>
            <a href="/home" class={`h-28 w-28 sm:w-28 ${backgroundColor} drop-shadow-md hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700`}>
                <div class="text-center rtl:text-right">
                    <div class="-mt-1 text-sm font-semibold">{category.name}{category.id}</div>
                </div>
            </a>
        </div>
    );
}

export default CategoryCard;