import img from "../assets/images/unauthorized.png"

const Unauthorized = () => {
    return ( 
    <div className="h-screen flex items-center justify-center">
        <img className="w-96 h-96" src={img} alt="..."/>
    </div>
     );
}
 
export default Unauthorized;