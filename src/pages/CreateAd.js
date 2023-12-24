import { useState } from 'react';
import CreateAdDetails1 from '../components/CreateAdDetails1';
import CreateAdDetails2 from '../components/CreateAdDetails2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateAd = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const categories = useSelector((state) => state.categories.value);

    const [adDetails, setAdDetails] = useState({ title: "", description: "", address: "", price: "", condition: "new", category: categories[0]._id });

    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);
    const [imageThree, setImageThree] = useState(null);
    const [imageOneUpload, setImageOneUpload] = useState(false);
    const [imageTwoUpload, setImageTwoUpload] = useState(false);
    const [imageThreeUpload, setImageThreeUpload] = useState(false);

    const onImageChange = (event, id) => {
        if (id === 1) {
            setImageOne(event.target.files[0]);
            setImageOneUpload(true)
        }
        else if (id === 2) {
            setImageTwo(event.target.files[0]);
            setImageTwoUpload(true)
        }
        else {
            setImageThree(event.target.files[0]);
            setImageThreeUpload(true)
        }
    }

    const setOnContinue = (title,address,description,price,condition,category) => {
        setAdDetails({ title, address, description, price, condition, category });
        console.log(title);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(adDetails);
        console.log(imageOne);
        console.log(imageTwo);
        console.log(imageThree);
        // navigate("/home")
    }

    const prevStep = () => {
        setPage(1);
    }

    const nextStep = () => {
        setPage(2);
    }

    return (
        <section class="bg-gray-200 dark:bg-gray-900">
            <div class="flex flex-col items-center h-screen justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white h-full my-16 rounded-lg shadow dark:border sm:max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    {page === 1
                        ? <CreateAdDetails1 categories={categories} values={adDetails} setOnContinue={setOnContinue} nextStep={nextStep} />
                        : <CreateAdDetails2 values={{ imageOne, imageTwo, imageThree, imageOneUpload, imageTwoUpload, imageThreeUpload }} onImageChange={onImageChange} prevStep={prevStep} handleSubmit={handleSubmit}/>}
                </div>
            </div>
        </section>

    );
}

export default CreateAd;
