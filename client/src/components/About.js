import React from "react";

export default function About(props){
    return (    
      <main class="mt-16 w-full flex flex-col items-center">
            <div class="max-w-4xl mx-4 ">
              <h2 class="pb-1 font-bold text-2xl font-light text-true-gray-500 antialiased border-b border-indigo-300">How It Works</h2>
                <div class="mt-6 text-xl font-light text-true-gray-500 antialiased">
                 <i class="las la-feather-alt"></i>
                  Avian detects what kind of a bird is on a uploaded image using efficient 
                  collection of training data and helping a community to learn more about bird life 
                  in their area. Let's find your bird! To start just select an image to upload.
                </div>   
            </div>     
      </main>    
  );
}