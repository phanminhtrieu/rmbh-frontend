import React, { useState, useEffect } from "react";
import { Radio } from "antd";

const AboutContent = () => {
  const [studyMixType, setStudyMixType] = useState("progressive"); // Default option for study mix type
  const [classVisibility, setClassVisibility] = useState("public"); // Default option for class visibility
  const [description, setDescription] = useState(null); // State to hold the description from the API

  useEffect(() => {
    // Function to fetch description from the API
    const fetchDescription = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT_HERE"); // Thay thế bằng endpoint của bạn
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDescription(data.description || null); // Giả sử API trả về { description: "..." }
      } catch (error) {
        console.error("Error fetching description:", error);
        setDescription(null); // Set description to null on error
      }
    };

    fetchDescription(); // Gọi hàm fetch khi component mount
  }, []); // Chỉ chạy một lần khi component mount

  const handleStudyMixChange = (e) => {
    setStudyMixType(e.target.value);
  };

  const handleClassVisibilityChange = (e) => {
    setClassVisibility(e.target.value);
  };

  return (
    <div>
      <h4 className="font-bold text-blue-600 mb-2">Description</h4>
      <hr className="border-t border-blue-600 mb-4" />
      <p className="text-gray-500 mb-10">
        {description ? description : "No description."}
      </p>
      <h4 className="font-bold text-blue-600 mb-2">Setting</h4>
      <hr className="border-t border-blue-600 mb-8" />

      <div className="flex justify-around ">
        <div className="mb-4 ">
          <h5 className="font-bold text-gray-600 mb-3">
            Default study mix type:
          </h5>
          <Radio.Group onChange={handleStudyMixChange} value={studyMixType}>
            <Radio value="progressive">Progressive</Radio>
            <Radio value="random">Random</Radio>
          </Radio.Group>
        </div>

        <div>
          <h5 className="font-bold text-gray-600 mb-4">Class visibility:</h5>
          <Radio.Group
            onChange={handleClassVisibilityChange}
            value={classVisibility}
          >
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
