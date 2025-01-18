import React, { useRef, useState, useEffect, useCallback } from "react";
import "remixicon/fonts/remixicon.css";
import Modal from "./Modal";

const Stories = () => {
  const inputImage = useRef();
  const [image, setImage] = useState("");
  const [base64, setBase64] = useState("");
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addImage = useCallback(() => {
    inputImage.current.click();
  }, []);

  const imageAdded = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImage(url);
      const reader = new FileReader();
      reader.onload = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const fetchStories = useCallback(() => {
    try {
      const allStories = JSON.parse(localStorage.getItem("images")) || [];
      const now = Date.now();
      const validStories = allStories.filter(
        (story) => now - story.id < 24 * 60 * 60 * 1000
      );
      localStorage.setItem("images", JSON.stringify(validStories));
      setStories(validStories);
    } catch (error) {
      console.log("Error while fetching stories.");
    }
  }, []);

  const updateStory = useCallback(
    (index) => {
      const existingData = JSON.parse(localStorage.getItem("images")) || [];
      existingData[index] = {
        ...existingData[index],
        viewed: true,
      };
      localStorage.setItem("images", JSON.stringify(existingData));

      setStories((prevStories) => {
        if (prevStories[index].viewed !== true) {
          const updatedStories = [...prevStories];
          updatedStories[index] = {
            ...updatedStories[index],
            viewed: true,
          };
          return updatedStories;
        }
        return prevStories; 
      });
    },
    [setStories]
  );

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (base64) {
      const data = {
        id: Date.now(),
        image: base64,
        viewed: false,
      };
      try {
        const existingData = JSON.parse(localStorage.getItem("images")) || [];
        const updatedData = [...existingData, data];
        localStorage.setItem("images", JSON.stringify(updatedData));
        setBase64("");
        fetchStories();
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, [base64, fetchStories]);

  

  const handleStoryClick = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const timeSince = (timestamp) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0){
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if(minutes > 30){
      return `${minutes} mins ago`
    } else{
      return `just now`
    }
    
  };

  return (
    <div className="max-w-5xl mx-auto px-5 mt-2">
  <div className="scrolling overflow-y-hidden flex overflow-auto w-full h-28 whitespace-nowrap gap-1 py-2">
    <div
      className="group w-16 mr-2 flex flex-shrink-0 items-center relative border-dashed justify-center cursor-pointer h-16 p-1 rounded-full border-2 border-gray-400 text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors"
      onClick={addImage}
    >
      <i className="ri-add-line ri-2x group-hover:scale-105 transition-transform"></i>
      <input
        type="file"
        name="status"
        id="status"
        accept="image/*"
        ref={inputImage}
        onChange={imageAdded}
        className="absolute top-0 left-0 w-full h-full hidden"
      />
    </div>

    {/* Stories */}
    {stories &&
      stories.length > 0 &&
      stories.map((story, index) => (
        <div
          key={story.id}
          className={`w-[70px] mx-2 items-center justify-start flex-col overflow-hidden flex flex-shrink-0 relative cursor-pointer h-24 p-[1px]`}
        >
          <img
            src={story.image}
            className={`${
              story.viewed ? "border-gray-400" : "border-green-400"
            } w-16 h-16 border-2 rounded-[50%]`}
            onClick={() => handleStoryClick(index)}
            alt=""
          />
          <p className="text-xs">{timeSince(story.id)}</p>
        </div>
      ))}
  </div>
  <Modal
    stories={stories}
    isModalOpen={isModalOpen}
    setIsModalOpen={setIsModalOpen}
    currentIndex={currentIndex}
    updateStory={(index) => updateStory(index)}
  />
</div>

  );
};

export default Stories;
