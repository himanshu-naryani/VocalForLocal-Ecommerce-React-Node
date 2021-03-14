import {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'  
import Image from 'react-bootstrap/Image'
export default function ImageCarousel({images , productId}) {
    const [index, setIndex] = useState(0);
    const sampleImage = "https://react.semantic-ui.com/images/wireframe/image-square.png"

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
   
    let carousalImages=[]
    if(images)
      carousalImages = images.map((image)=>{
     return   (<Carousel.Item key = {productId+images}  >
        <Image style={{height: '250px' , width:"400px"}}   src={image||sampleImage}  />
      </Carousel.Item>)
    })
    return (
    
      <Carousel key = {productId} activeIndex={index} onSelect={handleSelect}>
          {carousalImages}
      </Carousel>
    );
  }