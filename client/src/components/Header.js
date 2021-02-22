import React from 'react';
import Logo from './Logo/logo.png';


export default function Header(props){

    return (  
    <body class="bg-gradient-to-r from-green-400 to-blue-500 font-sans flex flex-col items-center">
      <section class="py-12 px-4 text-center">
        <div class="w-full max-w-2xl mx-auto">
        <header class=" w-full px-4 py-3">
            <div class="flex items-center justify-between">
              <img src={Logo} w-20  alt="Birdie" className="h-15 w-8"/>
            </div>
        </header>
            <h2 class="text-5xl mt-2 mb-6 leading-tight font-semibold font-heading">Recognize our feathered friends</h2>
            <h5 className="text-2xl font-sans leading-normal mt-0 mb-2 text-blue-800">
            What’s that bird?</h5>
         {/* <div>
            <a class="inline-block py-4 px-10 mr-6 leading-none text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded shadow" 
            href="#">Sign up</a>
        </div> */}
         </div>   
       </section>  
    </body>  
    
    );
}