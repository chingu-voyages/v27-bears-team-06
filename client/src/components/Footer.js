import React from "react";

export default function Footer(props) {
  return (
    <>
      <footer className="relative bg-teal-400 pt-8 pb-6">
    
         
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-lg text-blue-600 font-semibold py-1">
                Copyright © {new Date().getFullYear()}{" "}Avian Project{" "}
                <a
                  href="https://chingu.io/"
                  className="text-lg text-blue-600 hover:text-blue-500"
                >
                  Chingu 
                </a>
              </div>
            </div>
          </div>    
      </footer>
    </>
  );
}