import Swal from "sweetalert2";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";


function BoardImages(props){
    const sideData = useSelector(state=>state.Reducers.sideData)
    const [item,setItem] = useState(0);
    const imageRef = useRef(null)

    useEffect(()=>{
        imageRef.current.moveTo(0)
        console.log("s")
    
    },[sideData])



    return(
        <div>
            <button>adawdawd</button>
            <Carousel
                emulateTouch="true"
                swipeScrollTolerance="10"
                useKeyboardArrows="true"
                showThumbs=""
                infiniteLoop="true"
                selectedItem={item}
                ref = {imageRef}
            >
                {props.imageList.map((url,idx)=>{
                    return(
                        <div key={idx}>
                            <img className="mx-auto" src={url} alt='nope' />
                        </div>
                    )
                })}
            </Carousel>
       </div>
    );

}export default BoardImages;
