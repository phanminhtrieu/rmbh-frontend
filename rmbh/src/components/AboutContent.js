import React, { useState, useEffect } from "react";
import { Radio } from "antd";

const AboutContent = ({ selectedClass }) => {
  const [studyMixType, setStudyMixType] = useState("1");
  const [classVisibility, setClassVisibility] = useState("");

  useEffect(() => {
    if (selectedClass && selectedClass.visibility) {
      console.log("Updated classVisibility:", selectedClass.visibility);
      setClassVisibility(selectedClass.visibility); // Cập nhật khi selectedClass có giá trị
    }
  }, [selectedClass]);

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
        {selectedClass?.description || "No description."}
      </p>
      <h4 className="font-bold text-blue-600 mb-2">Setting</h4>
      <hr className="border-t border-blue-600 mb-8" />

      <div className="flex justify-around ">
        <div className="mb-4 ">
          <h5 className="font-bold text-gray-600 mb-3">
            Default study mix type:
          </h5>
          <Radio.Group onChange={handleStudyMixChange} value={studyMixType}>
            <Radio value="1">Progressive</Radio>
            <Radio value="2">Random</Radio>
          </Radio.Group>
        </div>

        <div>
          <h5 className="font-bold text-gray-600 mb-4">Class visibility:</h5>
          <Radio.Group
            onChange={handleClassVisibilityChange}
            value={classVisibility} // Giá trị của Radio.Group
          >
            <Radio value={1}>Private</Radio>
            <Radio value={2}>Public</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
