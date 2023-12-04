const ImageCard = (props) => {
    const route = props.route;
    const image = props.image;
    const title = props.title;

    return(
        <figure class="relative max-w-sm cursor-pointer group overflow-hidden border-2 border-gray-500 rounded-2xl h-80 w-full">
            <a href={route}>
                <img class="rounded-2xl transition-transform duration-300 transform group-hover:scale-105 h-80  w-full" src={image} alt="image description"/>
            </a>
            <figcaption class="absolute text-3xl bottom-6 left-0 right-0 flex items-center justify-center text-black font-bold transition-all duration-300  opacity-70 group-hover:opacity-100 bg-gray-400 ">
                <p>{title}</p>
            </figcaption>
        </figure>
    
    );
}

export default ImageCard;