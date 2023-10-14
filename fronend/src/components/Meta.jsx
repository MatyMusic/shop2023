import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title} </title>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "ברוכים הבאים לחנות יצירות האומנות שלי",
  description: "יצירות אומנות שעבדתי עליהם 15 שנים",
  keywords: "יצירה, חנות, מגוון, בקשות, תמונות",
};

export default Meta;
