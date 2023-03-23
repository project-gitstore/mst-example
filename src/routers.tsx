import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Multilevel from './pages/multilevel'
import Activity from './pages/activity'

const Routers = () => {
  return (
    <div>
      <Routes>
          <Route element ={<Multilevel/>}  path="/"></Route>
          <Route path="/multilevel" element = {<Multilevel/>}></Route>
          <Route path="/activity" element = {<Activity/>}></Route>
      </Routes>
    </div>
  )
}
export default Routers;