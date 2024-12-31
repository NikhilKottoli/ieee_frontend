import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Your Blog. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="hover:text-gray-400">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms-of-service" className="hover:text-gray-400">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
