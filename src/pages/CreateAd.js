import { useState } from 'react';
import CreateAdDetails1 from '../components/CreateAdDetails1';
import CreateAdDetails2 from '../components/CreateAdDetails2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal } from 'flowbite-react';
import useApiPrivate from '../hooks/useAPIPrivate';

const CreateAd = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const categories = useSelector((state) => state.categories.value);
    const apiPrivate = useApiPrivate();

    const [adDetails, setAdDetails] = useState({ title: "", description: "", address: "", price: "", condition: "new", category: categories[0]._id });

    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);
    const [imageThree, setImageThree] = useState(null);
    const [imageOneUpload, setImageOneUpload] = useState(false);
    const [imageTwoUpload, setImageTwoUpload] = useState(false);
    const [imageThreeUpload, setImageThreeUpload] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const onImageChange = (event, id) => {
        if (id === 1) {
            setImageOne(event.target.files[0]);
            if (event.target.files[0])
                setImageOneUpload(true)
            else
                setImageOneUpload(false)
        }
        else if (id === 2) {
            setImageTwo(event.target.files[0]);
            if (event.target.files[0])
            setImageTwoUpload(true)
        else
            setImageTwoUpload(false)        }
        else {
            setImageThree(event.target.files[0]);
            if (event.target.files[0])
            setImageThreeUpload(true)
        else
            setImageThreeUpload(false)        }
    }

    const setOnContinue = (title, address, description, price, condition, category) => {
        setAdDetails({ title, address, description, price, condition, category });
        console.log(title);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageOneUpload && imageTwoUpload && imageThreeUpload) {
            try {
                setConfirm(true);
                console.log("ipload");
                const response = await apiPrivate.post("/advert/new", {
                    title: adDetails.title,
                    description: adDetails.description,
                    price: adDetails.price,
                    condition: adDetails.condition,
                    categoryId: adDetails.category,
                    location: adDetails.address,
                });
                if (response.status === 200) {
                    const formData = new FormData();
                    formData.append(`images`, imageOne);
                    formData.append(`images`, imageTwo);
                    formData.append(`images`, imageThree);
                    const response2 = await apiPrivate.patch(`/advert/new/upload/${response.data._id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                    );
                    if (response2.status === 200) {
                        setConfirm(false);
                        navigate("/home");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setOpenModal(true);
        }
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
                        : <CreateAdDetails2 values={{ imageOne, imageTwo, imageThree, imageOneUpload, imageTwoUpload, imageThreeUpload }} onImageChange={onImageChange} prevStep={prevStep} handleSubmit={handleSubmit} confirm={confirm} />}
                </div>
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header></Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Please, upload all three images.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='flex flex-col items-end'>
                        <button type="button" onClick={() => { setOpenModal(false) }} class="w-1/5 h-12 text-white bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ok</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </section>

    );
}

export default CreateAd;
