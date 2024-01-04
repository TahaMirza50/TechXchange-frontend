import { Carousel } from "flowbite-react";

const CreateAdDetails2 = ({ values, prevStep, onImageChange, handleSubmit, confirm }) => {

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    return (
        <div class="p-6 space-y-4 md:space-y-6 h-full sm:p-8 flex flex-col">
            <div className="flex flex-row items-center justify-between">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create new advert.
                </h1>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{`< 2 / 2 >`}</p>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" class="space-y-4 md:space-y-6 flex-grow justify-between flex flex-col" action="#">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="w-3/4">
                            <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your product images</label>
                        </div>
                        <div className="w-3/4">
                            <input onChange={(e) => onImageChange(e, 1)} type="file" name="image1" accept="image/jpeg, image/jpg, image/png" id="image1" class="bg-gray-50 border mb-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
                            {values.imageOne && <p>{values.imageOne.name}</p>}
                        </div>
                        <div className="w-3/4">
                            <input onChange={(e) => onImageChange(e, 2)} type="file" name="image2" accept="image/jpeg, image/jpg, image/png" id="image2" class="bg-gray-50 border mb-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
                            {values.imageTwo && <p>{values.imageTwo.name}</p>}
                        </div>
                        <div className="w-3/4">
                            <input onChange={(e) => onImageChange(e, 3)} type="file" name="image3" accept="image/jpeg, image/jpg, image/png" id="image3" class="bg-gray-50 border mb-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
                            {values.imageThree && <p>{values.imageThree.name}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-gray-600 rounded-lg">
                        <div className="h-full">
                            <Carousel>
                                {values.imageOneUpload
                                    ? <img src={URL.createObjectURL(values.imageOne)} className="max-w-fit max-h-full" alt="..." />
                                    : <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                                }
                                {values.imageTwoUpload
                                    ? <img src={URL.createObjectURL(values.imageTwo)} className="max-w-fit max-h-full" alt="..." />
                                    : <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                                }
                                {values.imageThreeUpload
                                    ? <img src={URL.createObjectURL(values.imageThree)} className="max-w-fit max-h-full" alt="..." />
                                    : <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-5">
                    {confirm && <p>Uploading advert.</p>}
                    <button disabled={confirm} type="submit" class="w-1/5 h-12 text-white bg-blue-900 hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirm</button>
                    <button disabled={confirm} type="button" onClick={Previous} class="w-1/5 h-12 text-white bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Previous</button>
                </div>
            </form >
        </div >
    );
}

export default CreateAdDetails2;