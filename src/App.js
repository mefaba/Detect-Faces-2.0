import React, {useState} from 'react';

/* import logo from './logo.svg'; */
import './App.css';
import Navigation from "./components/Navigation/Navigation.js"
/* import Logo from "./components/Logo/Logo.js" */
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js"
import Rank from "./components/Rank/Rank.js"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js"
import Signin from "./components/Signin/Signin.js"
import Register from "./components/Register/Register.js"
/* import Particles from 'react-particles-js'; */
/* import Clarifai from "clarifai" */
//default Image, https://w.wallhaven.cc/full/nz/wallhaven-nzwezj.jpg

  
function App() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin")
  const [isSignedIn,setIsSignedIn] = useState(false)
  const [user, setUser] = useState({
                                id: "",
                                name: "",
                                email: "",
                                entries: 0,
                                joined: ""
                            })


  function loadUser(data){
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }
  function clearState(){
    setInput("")
    setImage("")
    setBox({})
    setRoute("signin")
    setIsSignedIn(false)
    setUser({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: ""
  })
  }

  function onRouteChange(targetRoute){
    if(targetRoute==="signout"){
      clearState()
    }else if(targetRoute==="home"){
      setIsSignedIn(true)
    }
    setRoute(targetRoute)
  }

  function onInputChange(event) {
    console.log(event.target.value)
    setInput(event.target.value)
  }

  function calculateFaceLocation(data_response){
    const clarifaiFace = data_response.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById("inputimage");
    const width = image.width
    const height = image.height
    /* console.log(width,height) */
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  function displayFaceBox(box){
    /* console.log(box) */
    setBox(box)
  }

  function onImageSubmit(event){
    setImage(input)
      fetch(`http://localhost:5000/imageURL`,{
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            input: input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch(`http://localhost:5000/image`,{
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: user.id,
            })
          })
          .then(response => response.json())
          .then(count =>{
            setUser(user => ({...user,entries: count}))
          })
          
        }
        displayFaceBox(calculateFaceLocation(response))
        /* setState(state => ({ ...state, left: e.pageX, top: e.pageY })); */
        }
      )
      .catch(err => console.log(err))
  
  }

  return (
    <div className="App">
      {/* <Particles params={partiparam} className ="particles"/> */}
      <Navigation onRouteChange ={onRouteChange} isSignedIn={isSignedIn}/>
      {route==="home" 
      ? <div>
          {/* <Logo /> */}
          <Rank name = {user.name} entries = {user.entries}/>
          <ImageLinkForm 
            onInputChange = {onInputChange} 
            onImageSubmit ={onImageSubmit}/>
          <FaceRecognition image={image} box ={box}/>
        </div>
      : (route==="signin"
        ?<Signin onRouteChange = {onRouteChange} loadUser ={loadUser} /> 
        :<Register onRouteChange = {onRouteChange} loadUser ={loadUser}/>
        )
    }
    </div>
    
  );
}

export default App;


/* const partiparam = 
  {
    "particles": {
      "number": {
        "value": 96,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
} */