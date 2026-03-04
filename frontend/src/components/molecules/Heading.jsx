import React, {useState, useEffect} from 'react'

import slider from '../../json/slider.json'

const Heading = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isHover) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev+1) % slider.length);
    }, 2500);

    return () => clearInterval(interval);
  },[isHover]);

  const currentImage = slider[currentImageIndex];
  
  return (
    <>
        <div className="w-full mb-15">
          <div 
          className="relative"
          onClick={() => setCurrentImageIndex(prev => (prev+1) %slider.length )}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
            <img 
            src={currentImage.imgSrc} 
            alt={currentImage.title} 
            className="w-full h-100 object-cover  rounded-b-4xl" />
            
            <div className="absolute inset-0 bg-stone-900/75 flex flex-col justify-center rounded-b-4xl items-center cursor-pointer text-white gap-1">
              <p className="text-3xl font-bold">{currentImage.title}</p>
              <p className="w-1/2 text-center text-base">{currentImage.desk}</p>
            </div>

            <div className={`absolute bottom-10 right-20 rounded-lg ${!isHover && 'hidden'} 
            bg-rose-500/50 justify-center`}>
              <p className='p-2 text-cyan-50 text-xs'>Click to Next</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default Heading