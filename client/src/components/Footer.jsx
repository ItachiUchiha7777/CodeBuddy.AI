import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="custom-footer bg-light text-dark py-3 mt-auto border-top">
        <div className="container text-center">
          <p className="mb-0">
            Made with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/rohit-gusain-22560a267/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary fw-semibold text-decoration-none"
            >
              Rohit Gusain
            </a>
          </p>
        </div>
      </footer>

      {/* Embedded CSS styling */}
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
        }

        body {
          display: flex;
          flex-direction: column;
        }

        .custom-footer {
          margin-top: auto;
        }
      `}</style>
    </>
  );
};

export default Footer;
