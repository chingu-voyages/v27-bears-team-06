import React from "react";

export default function About(props){
    return (    
      <div className="mt-16 w-full flex justify-center md:justify-end">
            <div className="max-w-4xl mx-4 ">
                <div className="text-xl font-light leading-relaxed mt-6 mb-20 text-indigo-800">
                 <i className="las la-feather-alt"></i>
                  Avian detects what kind of a bird is on a uploaded image using efficient 
                  collection of training data and helping a community to learn more about bird life 
                  in their area. Let's find your bird! To start just select an image to upload.
                </div>   
            </div>     
      </div>    
  );
}