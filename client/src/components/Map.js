import React,{ useState, useEffect } from 'react';
import axios from "axios";

const gitHubUrl = "https://api.github.com/users/deekshasharma";

function Map() {
    const [userData, setUserData] = useState({});
  
    useEffect(() => {
        getGiHubUserWithAxios();
      }, []);
  
    const getGiHubUserWithAxios = async () => {
        const response = await axios.get(gitHubUrl);
        setUserData(response.data);
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <h2>GitHub User Data</h2>
        </header>
        <div className="user-container">
          <h5 className="info-item">{userData.name}</h5>
          <h5 className="info-item">{userData.location}</h5>
          <h5 className="info-item">{userData.blog}</h5>
          <h5 className="info-item">{userData.company}</h5>
        </div>
      </div>
    );
  }
  
  export default Map;