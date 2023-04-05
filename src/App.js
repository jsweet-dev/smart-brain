import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FacialRecognition from './components/FacialRecognition/FacialRecognition';
import Register from './components/Register/Register';

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
  }
}

function App() {
  const [{  input, 
            imageUrl, 
            faceData, 
            route, 
            isSignedIn, 
            profile }
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

  const onInputChange = (event) => {
    setState(prevState => ({...prevState, 'input': event.target.value}));
  }

  const loadProfile = (profile) => {
    setState(prevState => ({...prevState, 'profile': {...profile}}));
  }

  const onButtonSubmit = () => {
    setState(prevState => ({...prevState, 'imageUrl': input}));

    fetch("https://sbjsapi.herokuapp.com/imagepost", {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        image: imageUrl
      })
    })
    .then(response => response.json())
    .then(result => {
      if(result.outputs.length > 0){
        fetch("https://sbjsapi.herokuapp.com/imagecount", {
          method: "PUT",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: profile.id
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
              ...profile,
              entries: data
            })
      
          }
        }).catch(error => console.debug("error updating image entries count"))
        setState(prevState => ({...prevState, 'faceData':result.outputs[0].data.regions} ));
      }
    })
    .catch(error => console.debug('error', error));
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
            <ImageLinkForm onInputChange = {onInputChange } onButtonSubmit={onButtonSubmit}/> 
            <FacialRecognition imgUrl= { imageUrl } faceData={faceData}/>
          </div>
        : route === 'signin'
        ? <Signin loadProfile={loadProfile} onRouteChange={onRouteChange}></Signin>
        : <Register loadProfile={loadProfile} onRouteChange={onRouteChange}></Register>
      }
    </div>
  );
}

export default App;
