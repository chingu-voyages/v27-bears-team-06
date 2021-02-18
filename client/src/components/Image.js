import React from 'react';
import Bird from  './Bird.png';


const Image = ({onInputChange, imageUrl, imageAlt})=> {

return (

<div>
    <main className="App">
      <section className="left-side">
        <form>
           <div className="form-group">
             <input type="file"/>
           </div>
            <button type="button" className="btn" onClick={onInputChange}>Submit</button>
               <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">

                  {/* <svg class= "group-hover:text-light-blue-600"  xmlns="http://www.w3.org/2000/svg" width="50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
</svg> */}
<button type="button" className="btn widget-btn" onClick={this.openWidget}>Upload Via Widget</button>
            </button>
        </form>
       </section>
          <section className="right-side">
            {/* <h1>Bird Image</h1> */}
           <img style={{ height: 300, width: 300 }} alt='bird' src={Bird}/>
           {imageUrl && (
            <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
           )}
          </section>
    </main>
   </div> 
  )
}

export default Image;
