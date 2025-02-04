import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-purple py-4 text-center">
      <p className="text-white mb-0 d-flex align-items-center justify-content-center gap-2">
        Made by{" "}
        <a href="https://abirwan.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none fw-bold border-bottom border-2">
          Abi Rahmawan 
        </a>
        😃
      </p>
    </footer>
  );
};

export default FooterComponent;
