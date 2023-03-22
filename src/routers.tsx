import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Test from './pages/test';
import PageList from "./pages/page-list";
import Multilevel from './pages/multilevel'

const Routers = () => {
    return (
      <div>
        <Routes >
            <Route element ={<PageList/>}  path="/"></Route>
            <Route path="/test"element = {<Test/>}></Route>
            <Route path="/page-list" element = {<PageList/>}></Route>
            <Route path="/multilevel" element = {<Multilevel/>}></Route>
        </Routes>
      </div>
    )
}
export default Routers;