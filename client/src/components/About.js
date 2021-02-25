import React from "react";

export default function About(props){
    return (    
      // <main class="mt-16 w-full flex flex-col items-center">
      //       <div class="max-w-4xl mx-4 ">
      //         <h2 class="pb-1 font-bold text-2xl font-light text-true-gray-500 antialiased border-b border-indigo-300">How It Works</h2>
      //         <div class="mt-6 text-xl font-light text-true-gray-500 antialiased">
      //         <i class="las la-feather-alt"></i>
      //         Avian detects what kind of a bird is on a uploaded image using efficient 
      //         collection of training data and helping a community to learn more about bird life 
      //         in their area. Let's find your bird! To start just select an image to upload.
      //       </div>   
      //       </div>
      // </main>

<section class="py-16 px-4 text-center">
  <h2 class="text-4xl mb-12 font-semibold font-heading">How does Avian Project works?</h2>
  <div class="flex flex-nowrap  items-center justify-center -mx-8 mb-12">
    <div class="lg:w-1/3 px-8 mb-8 lg:mb-0">
      <svg class="text-indigo-600 w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
      </svg>
      <h3 class="text-2xl mt-6 mb-3 font-semibold font-heading">User Input</h3>
      <p class="text-gray-400 leading-relaxed">During the phone call we will be able to present you all details of cooperation, pricing and special offers, suited for your company.</p>
    </div>
    <div class="lg:w-1/3 px-8 mb-8 lg:mb-0">
      <svg class="text-indigo-600 w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
      </svg>
      <h3 class="text-2xl mt-6 mb-3 font-semibold font-heading">Web Service API</h3>
      <p class="text-gray-400 leading-relaxed">We can also talk during business meeting, or visit your office anytime you want! Our employees will provide proper contracts.</p>
    </div>
    <div class="lg:w-1/3 px-8 mb-8 lg:mb-0">
      <svg class="text-indigo-600 w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
      </svg>
      <h3 class="text-2xl mt-6 mb-3 font-semibold font-heading">Machine Learning API</h3>
      <p class="text-gray-400 leading-relaxed">You don’t buy a pig... or shall I say a paper in a poke. The supplies will be delivered to your company every first Monday of the month.</p>
    </div>
  </div>

</section>
  );
}