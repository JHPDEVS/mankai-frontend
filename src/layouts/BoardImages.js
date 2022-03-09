import Swal from "sweetalert2";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function BoardImages(props){
 
    return(
        <div>
            <Carousel
                emulateTouch="true"
                swipeScrollTolerance="10"
                useKeyboardArrows="true"
                showThumbs=""
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
