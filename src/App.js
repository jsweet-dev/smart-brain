import React, { useEffect, useState, useRef} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FacialRecognition from './components/FacialRecognition/FacialRecognition';
import Register from './components/Register/Register';

let sbApiURL
if (process.env.NODE_ENV === 'production') {
  sbApiURL = "https://sbjsapi.herokuapp.com";
} else {
  sbApiURL = 'http://localhost:3003';
}

const initialState = {
  input: '', 
  imageUrl: '', 
  faceData: [], 
  route: 'signin', 
  isSignedIn: false, 
  profile: {
    id: 0,
    name: "",
    email: "",
    entries: 0,
    joined: ""
  },
  isProcessing: false
}

function App() {
  const [{  input, 
            imageUrl, 
            faceData, 
            route, 
            isSignedIn, 
            profile,
            isProcessing }
          , setState] = useState(initialState);

  const onRouteChange = (route) => {
    if(route === 'signout'){
      setState({...initialState});
      route = 'signin';
    } else if (route === 'home'){
      setState(prevState => ({...prevState, 'isSignedIn': true}));
    }
    setState(prevState => ({...prevState, 'route': route}));
  }

  const profileRef = useRef(profile);

  useEffect(() => {
    profileRef.current = profile
  }, [profile]);

  const onInputChange = (event) => {
    setState(prevState => ({...prevState, 'input': event.target.value}));
  }

  const loadProfile = (profile) => {
    setState(prevState => ({...prevState, 'profile': {...profile}}));
  }

  useEffect(() => {
    setState(prevState => ({...prevState, 'isProcessing': true}));
    if(imageUrl.length > 0){
      fetch(sbApiURL + "/imagepost", {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          image: imageUrl
        })
      })
      .then(response => response.json())
      .then(result => {
        if(result.outputs.length > 0){
          fetch(sbApiURL + "/imagecount", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: profileRef.current.id
            })
          })
          .then(response => {
            if(response.ok){
              return response.json()
            } else {
              throw Error("Could not update user");
            }
          })
          .then(data => {
            if(data){
              loadProfile({
                ...profileRef.current,
                entries: data
              })
        
            }
          }).catch(error => console.debug("error updating image entries count"))
          setState(prevState => ({...prevState, 'faceData':result.outputs[0].data.regions, 'isProcessing': false} ));
        }
      })
      .catch(error => {
        console.debug('error', error);
        setState(prevState => ({...prevState, 'isProcessing': false}));
      }); 
    } else {
      setState(prevState => ({...prevState, 'isProcessing': false}));
    }


  }, [imageUrl])

  const onButtonSubmit = () => {
    setState(prevState => ({...prevState, 'imageUrl': input}));
  }

  return (
    <div className="App">
      <ParticlesBg num={200} color='#CCCCCC' type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      { 
        route === 'home' 
        ? <div>
            <Logo />
            <Rank userName={profile.name} entries={profile.entries} />
            <ImageLinkForm onInputChange = {onInputChange } onButtonSubmit={onButtonSubmit} isProcessing={isProcessing}/> 
            <FacialRecognition imgUrl= { imageUrl } faceData={faceData}/>
          </div>
        : route === 'signin'
        ? <Signin loadProfile={loadProfile} onRouteChange={onRouteChange} sbApiURL={sbApiURL}></Signin>
        : <Register loadProfile={loadProfile} onRouteChange={onRouteChange} sbApiURL={sbApiURL}></Register>
      }
    </div>
  );
}

export default App;
