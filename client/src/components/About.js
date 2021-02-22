import React from "react";

export default function About(props){
    return (    
      <main class="mt-16 w-full flex flex-col items-center">
            <div class="max-w-4xl mx-4 ">
              <h2 class="pb-1 font-bold text-2xl  font-sans text-indigo-700 border-b border-indigo-300">How It Works</h2>
              <p class="text-2xl mt-4 font-sanstext-gray-600">
              Birdie detects what kind of a bird is on a uploaded image using efficient 
              collection of training data and helping a community to learn more about bird life 
              in their area.
              </p>
            </div>   
      </main>
  );
}