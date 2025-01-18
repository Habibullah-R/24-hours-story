import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "remixicon/fonts/remixicon.css";

const Modal = ({
  stories,
  isModalOpen,
  setIsModalOpen,
  currentIndex,
  updateStory,
}) => {
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(currentIndex);

  const intervalRef = useRef(null);
  const swiperRef = useRef(null);

  const startProgressBar = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100; 
        }
        return prev + 1;
      });
    }, 30);
  };

  const stopProgressBar = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isModalOpen) {
      setIndex(currentIndex);
      setProgress(0);
      startProgressBar();
      updateStory(currentIndex);
    } else {
      stopProgressBar();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (progress === 100) {
      if (index < stories.length - 1) {
        setProgress(0);
        const nextIndex = index + 1;
        swiperRef.current.slideTo(nextIndex);
        setIndex(nextIndex);
        startProgressBar();
        if (stories[index].viewed !== true) {
          updateStory(index);
        }
      } else {
        setProgress(0);
        setIsModalOpen(false);
      }
    }
  }, [progress, index, stories.length, setIsModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative bg-gray-950 p-2 rounded-md h-[90%] w-[80%] max-md:h-full max-md:w-full">
        {/* Loading Bar */}
        <div className="flex gap-2">
              <div className="top-0 left-0 h-[2px] w-full bg-gray-400 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-white transition-all duration-[10ms] ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
        </div>

        <div className="relative ">
          <i
            className="ri-close-line absolute right-0 top-3 z-10 cursor-pointer ri-2x text-white"
            onClick={() => setIsModalOpen(false)}
          ></i>
        </div>

        {/* Swiper Component */}
        <Swiper
          className="custom-swiper"
          modules={[Navigation, Pagination]}
          navigation
          initialSlide={currentIndex}
          onSlideChange={(swiper) => {
            stopProgressBar();
            const currentIndex = swiper.activeIndex;
            setTimeout(() => {
              setIndex(currentIndex);
              setProgress(0);
              updateStory(currentIndex);
              startProgressBar();
            }, 0);
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {stories.map((story, idx) => (
            <SwiperSlide
              key={idx}
              className="flex h-full relative items-center justify-center"
            >
              <img
                src={story.image}
                alt={`Story ${idx + 1}`}
                className="w-full h-96 my-10 object-contain rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Modal;
