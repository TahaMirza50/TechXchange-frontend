import { Carousel } from 'flowbite-react';
import Navbar from "../components/Navbar";
import img1 from "../assets/images/gaming-pc.png";
import img2 from "../assets/images/phone.png"
import img3 from "../assets/images/ps5.png"
import img4 from "../assets/images/GPU.png"
import { useEffect } from 'react';

const StartPage = () => {

    useEffect(() => {
        
    })

    return (
        <div className="h-screen bg-white flex flex-col">
            <Navbar />
            <p className='text-center pt-5 text-3xl text-black'>"Unlocking the value in Used Tech:Where Old Becomes Gold!"</p>
            <div className="h-full">
                <Carousel
                    leftControl={<button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>}
                    rightControl={<button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span class="sr-only">Next</span>
                        </span>
                    </button>}>
                    <div className="flex items-center justify-center w-3/4 h-5/6 columns-2 gap-10">
                        <img className='h-full w-3/5' src={img1} alt="..." />
                        <div className='w-2/5'>
                            <h1 className='font-bold text-6xl py-5'>Gaming PCs</h1>
                            <p className='text-justify'>"Embark on a new journey with our platform, where you not only sell your old gaming PC but also pass on the legacy of epic battles and countless victories. Transform your gaming setup and let someone else embark on their own gaming adventures with the perfect rig from your past. Join the community of gamers, and let the pixels of nostalgia meet the excitement of new beginnings."</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-3/4 h-5/6 columns-2 gap-20 pt-10">
                        <div className='w-2/5'>
                            <h1 className='font-bold text-6xl py-5'>Smartphones</h1>
                            <p className='text-justify'>"Smartphones, essential in today's world, seamlessly blend technology and lifestyle. These pocket-sized marvels offer instant connectivity, limitless information, and a gateway to innovation. With sleek designs, powerful processors, and versatile features, smartphones empower users to capture moments, explore the world, and stay connected—redefining convenience and shaping the way we work, communicate, and experience life."</p>
                        </div>
                        <img className='h-full w-2/5' src={img2} alt="..." />
                    </div>
                    <div className="flex items-center justify-center w-3/4 h-5/6 columns-2 gap-5">
                        <div className='w-2/5'>
                            <h1 className='font-bold text-6xl py-5'>PlayStations</h1>
                            <p className='text-justify'>"Step into the future of gaming with PlayStations - a pinnacle of entertainment and innovation. From breathtaking graphics to an extensive game library, PlayStations redefine the gaming experience. Explore new realms, engage in epic battles, and make lasting memories with the ultimate gaming console. Elevate your play, unlock endless possibilities, and immerse yourself in the world of PlayStations."</p>
                        </div>
                        <img className='h-full w-4/5' src={img3} alt="..." />
                    </div>
                    <div className="flex items-center justify-center w-3/4 h-5/6 columns-2 gap-5">
                        <div className='w-1/2'>
                            <h1 className='font-bold text-6xl py-5'>Motherboards/GPU</h1>
                            <p className='text-justify'>"Graphic cards and motherboards are the dynamic duo at the heart of every powerful computer. The graphic card takes charge of delivering stunning visuals and superior gaming graphics, while the motherboard orchestrates seamless communication between various components. Elevate your computing experience by choosing top-notch graphic cards for breathtaking visuals and reliable motherboards that serve as the backbone of your high-performance setup."</p>
                        </div>
                        <img className='h-full w-1/2' src={img4} alt="..." />
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default StartPage;