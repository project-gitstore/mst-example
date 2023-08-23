import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Multilevel from './pages/multilevel'
import Activity from './pages/activity'
import PromiseExample from './pages/xstate-example/promise-example'
import Drag from './pages/drag'
import UploadFile from './pages/upload-file';
import UseTransition from "./pages/usetransition";
import UseDeferredValue from "./pages/usedeferredvalue";




const Routers = () => {
  return (
    <div>
      <Routes>
          <Route element ={<Multilevel/>}  path="/"></Route>
          <Route path="/multilevel" element = {<Multilevel/>}></Route>
          <Route path="/activity" element = {<Activity/>}></Route>
          <Route path="/xstate-example/promise-example" element = {<PromiseExample/>}></Route>
          <Route path="/drag" element = {<Drag/>}></Route>
          <Route path="/upload-file" element = {<UploadFile />}></Route>
          <Route path="/usetransition" element = {<UseTransition />}></Route>
          <Route path="/usedeferredvalue" element = {<UseDeferredValue />}></Route>
      </Routes>
    </div>
  )
}
export default Routers;