import logo from './logo.svg';
import React,{useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { Component } from 'react'
import Navbar from './components/Navbar';
import Newscomp from './components/Newscomp';
import Newsitem from './components/Newsitem';
import { About } from './components/About';
import LoadingBar from 'react-top-loading-bar'
const  App =()=> {
  // state={
  //   progress:0
  // }
  // setProgress= (progress)=>{
  //   setState({progress:progress})
  // }
  const [progress, setProgress] = useState(0)
 
    return (
      <div>
        
        <BrowserRouter>
        
       <Navbar/>   
          <LoadingBar
        color='#f11946'
        progress={progress}
      />
       <Routes>
        <Route path='/about' element="<About/>"/>
        <Route path="/" element={<Newscomp setProgress={setProgress} pageSize={9} category="general"/>}/>
          
          <Route exact path="/sports" key="spor" element={<Newscomp setProgress={setProgress} pageSize={9} category="sports"/>} />
          <Route exact path="/business" key="busi" element={<Newscomp setProgress={setProgress} pageSize={9} category="business"/>} />
          <Route exact path="/general" key="gen" element={<Newscomp setProgress={setProgress} pageSize={9} category="general"/>} />
          <Route exact path="/entertainment" key="enter" element={<Newscomp setProgress={setProgress} pageSize={9} category="entertainment"/>} />
          <Route exact path="/health" key="heal" element={<Newscomp setProgress={setProgress} pageSize={9} category="health"/>} />
          <Route exact path="/science" key="scie" element={<Newscomp setProgress={setProgress} pageSize={9} category="science"/>} />
          <Route exact path="/technology" key="techn" element={<Newscomp setProgress={setProgress} pageSize={9} category="technology"/>} />
        {/* </Route> */}
      </Routes> 
      </BrowserRouter>                                                 
      </div>
    )
  
}
export default App;

