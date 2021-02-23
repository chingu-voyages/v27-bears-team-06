import React from 'react';

export default function image ({onInputChange,openWidget,imageUrl,imageAlt}) {
    
    return (
        <main  className="App">
          <section className="left-side">
          <form>
            <div className="form-group">
              <input type="file"/>
            </div>
            <button type="button" className="btn" onClick={onInputChange}>Submit</button>		  
            <button type="button" className="btn widget-btn" onClick={openWidget}>Upload Via Widget</button>
          </form>       
             <div>
          </div>
          </section>
          <section className="right-side">
          <p>The resulting image will be displayed here</p>
              {imageUrl && (
              <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
          )}  
          </section>
       </main>	         
    )
}
