import React from "react";

const HeaderComponent = ({ children }) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 bg-purple py-3 px-4 rounded-4">
      <h1 className="text-light fs-4">Welcome to our user management tools!👋</h1>
      {children}
    </div>
  );
};

export default HeaderComponent;
