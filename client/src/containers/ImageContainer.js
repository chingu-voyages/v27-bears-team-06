import React from 'react';
import Image from '../components/Image';

class ImageContainer extends React.Component{
  
  state = {
  imageUrl: undefined,
  imageAlt: undefined,
}

  onInputChange = () => {

  const { files } = document.querySelector('input[type="file"]')
    
  const formData = new FormData();
  formData.append('file', files[0]);
  formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

  const response = {
  method: 'POST',
  body: formData,
  };

  return fetch('https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload', response )
     
  .then(res => res.json())
  .then(res => {
    // console.log('Image received ', res)
    this.setState({
    imageUrl: res.secure_url,
    imageAlt: `An image of ${res.original_filename}`
    })
  })
  .catch(err => console.log(err));
}
//open the widget
//open the widget
openWidget = () => {
  window.cloudinary.createUploadWidget(
  {
    cloudName: process.env.REACT_APP_CLOUD_NAME,
    uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
  },	
  (error, { event, info }) => {
    if (event === 'success') {
      //     fetch('https://api.cloudinary.com/v1_1/${process.env.REACT_APP_API_URL}/bird', {
      //       method: 'POST',
      //       }
      //       .then(event => response.json())
      //       .then(imageML => {
      //         // console.log('Image AI received ', res)
      //         this.setState({
      //           Identification: imageML.secure_url,
      //           confidence:
      //         })
      //       })
      //       .catch(err => console.log(err));
      //     }
   
   }

    if (event === 'success') {
    this.setState({
      imageUrl: info.secure_url,
      imageAlt: `An image of ${info.original_filename}`
    })
    }
  },
  ).open();
};

render() {

  return (
    <Image 
       onInputChange= {this.onInputChange}
       openWidget = {this.openWidget}
       {...this.state}
    />
  ) 
 }
}

export default ImageContainer;
