import {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'  
import Image from 'react-bootstrap/Image'
export default function ImageCarousel({images}) {
    const [index, setIndex] = useState(0);
    
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const carousalImages = images.map((image)=>{
     return   (<Carousel.Item key={image}  >
        <Image src={image} alt="Image Product" style={{'height':"250px" ,'width':'100%' }} />
      </Carousel.Item>)
    })
    return (
    
      <Carousel activeIndex={index} onSelect={handleSelect}>
          {carousalImages}
      </Carousel>
    );
  }