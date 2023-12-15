import { useState } from "react";
import { useSelector } from "react-redux";

const CreateAdDetails1 = ({ categories, values, setOnContinue, nextStep }) => {

    const [title, setTitle] = useState(values.title);
    const [price, setPrice] = useState(values.price);
    const [description, setDescription] = useState(values.description);
    const [address, setAddress] = useState(values.address);
    const [condition, setCondition] = useState(values.condition);
    const [category, setCategory] = useState(values.category);

    const Continue = e => {
        e.preventDefault();
        setOnContinue(title, address, description, price, condition, category);
        nextStep();
    }

    return (

        <div class="p-6 space-y-4 md:space-y-6 h-full sm:p-8 flex flex-col">
            <div className="flex flex-row items-center justify-between">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create new advert.
                </h1>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{`< 1 / 2 >`}</p>
            </div>
            <form onSubmit={Continue} class="space-y-4 md:space-y-6 flex-grow justify-between flex flex-col" action="#">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="w-2/3">
                            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your product title</label>
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" maxLength={40} name="title" id="title" placeholder="Catchy Title" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                        </div>
                        <div className="w-11/12">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your product description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} maxLength={500} type="text" name="description" id="description" placeholder="Describe your product." class="bg-gray-50 border resize-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                        </div>
                        <div className="w-11/12">
                            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your address</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} name="address" id="address" placeholder="Street Address, City, State, ZIP Code" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="w-1/2">
                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your product price (Rs.)</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} name="price" id="price" placeholder="000,000,000" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                        </div>
                        <div className="w-1/2">
                            <label for="condition" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your product condition</label>
                            <select value={condition} onChange={(e) => setCondition(e.target.value)} name="condition" id="condition" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required>
                                <option value="new">new</option>
                                <option value="used">used</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label for="categories" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your product category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} name="categories" id="categories" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required>
                                {categories.map(category => <option value={category._id}>{category.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end">
                    <button type="submit" class="w-1/5 h-12 text-white bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Next</button>
                </div>
            </form>
        </div>
    );
}
export default CreateAdDetails1;

