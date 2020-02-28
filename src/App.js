import React from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import Navigation from "./components/Navigation/Navigation.js"
import Logo from "./components/Logo/Logo.js"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js"
import Rank from "./components/Rank/Rank.js"

function App() {
  return (
    <div>
      <Navigation />
      <Logo />
      <ImageLinkForm />
      <Rank />
      {/* 
      
      <FaceRecognition /> */}
    </div>
  );
}

export default App;
