import React from 'react';
import Logo from './Logo/logo.png';


export default function Header(props){

    return (  

    <header class="bg-gradient-to-r from-green-400 to-blue-500 font-semibold text-gray-900 flex flex-col items-center">
    <div class=" md:flex justify-center py-16  ">
        <div class=" p-2 my-auto">
            <img class=" sm:flex mx-auto w-24  "
                src={ Logo } />        
        </div>
        <div class="p-2 my-auto ">
          <div class="text-black text-3xl text-center my-8">
          <div class=" my-2 text-4xl leading-none"> Let's recognize our feathered friends </div>
          </div>  
            <p class=" my-4 text-indigo-700 font-bold text-3xl text-center"> What’s that bird? </p>
          </div>

    </div>
</header>

    );
}