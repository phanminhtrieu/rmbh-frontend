import React from "react";
import { Layout } from "antd";
import AboutContent from "./AboutContent";
import DeckContent from "./DeckContent";
import LearnersContent from "./LearnerContent";

const BodyContent = ({ selectedClass, selectedMenu }) => {
  const renderContent = () => {
    console.log(selectedClass, "selected class tại body content");

    switch (selectedMenu) {
      case "About":
        return selectedClass ? (
          <AboutContent selectedClass={selectedClass} />
        ) : (
          <div>Loading class information...</div> // hoặc có thể là null
        );
      case "Deck":
        return <DeckContent />;
      case "Learners":
        return <LearnersContent />;
      default:
        return null;
    }
  };

  return (
    <Layout.Content className="m-8 rounded-lg bg-gray-100 min-h-[360px]">
      {renderContent()}
    </Layout.Content>
  );
};

export default BodyContent;
