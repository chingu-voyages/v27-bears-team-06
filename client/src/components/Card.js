import React from 'react'

const Card = ({openWidget, imageUrl, imageAlt, birdInfo }) => {
    return (
        <div>
            <div className="bg-gradient-to-r from-green-400 to-blue-500 py-20 px-20"> 
        <div className=" blog-wraper flex justify-between items-center">

        <div className="blog bg-white mr-5">
            {imageUrl && <img src={imageUrl} alt={imageAlt} />}  
                {/* <div class="p-5">
                <h1 class="text-2xl font-bold text-green-800 py-2">Bird Name</h1>
                <p class="bg-white text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis vitae qui distinctio ex soluta? Voluptates, ea! Esse, natus. Quas possimus laboriosam consectetur deserunt ea sapiente. Dicta ipsam atque voluptatem provident!</p>
                <a href="" class="py-2 mt-4 px-6 text-white bg-green-500 inline-block rounded">Read More</a>
                </div> */}
        </div>

        <div className="blog bg-white mr-5">
            {imageUrl && <img src={imageUrl} alt={imageAlt} />}
           <div className="p-5">
               <h1 className="text-2xl font-bold text-green-800 py-2">Lorem ipsum dolor sit amet</h1>
               <p className="bg-white text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis vitae qui distinctio ex soluta? Voluptates, ea! Esse, natus. Quas possimus laboriosam consectetur deserunt ea sapiente. Dicta ipsam atque voluptatem provident!</p>
               <a href="" className="py-2 mt-4 px-6 text-white bg-green-500 inline-block rounded">Read More</a>
            </div>
         </div>
       </div>
    </div>
</div>
    )
}
export default Card;
