import React from "react";
import { Layout } from "antd";
import AboutContent from "./AboutContent";
import DeckContent from "./DeckContent";
import LearnersContent from "./LearnerContent";

const BodyContent = ({ selectedMenu }) => {
  const renderContent = () => {
    switch (selectedMenu) {
      case "About":
        return <AboutContent />;
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
