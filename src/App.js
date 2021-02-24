import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as ReactBootStrap from "react-bootstrap";



const App = () => {
  const projects = [
    {project: "a", technology:"Wind", usage:"100"},
    {project: "b", technology:"Solar", usage:"50"},
    {project: "c", technology:"Wind", usage:"40"},
    {project: "d", technology:"Solar", usage:"25"},
    {project: "e", technology:"Geothermal", usage:"5"},
  ]

  const renderProject = (project, index) => {
    return(
      <tr key={index}>
        <td>{project.project} </td>
        <td>{project.technology} </td>
        <td>{project.usage} </td>
      </tr>
    )
  }
  return (
    <div className="App">
      <ReactBootStrap.Table striped bordered hover>
  <thead>
    <tr>
      <th>Project Name</th>
      <th>Technology</th>
      <th>Usage</th>
    </tr>
  </thead>
  <tbody>
    {projects.map(renderProject)}
  </tbody>
</ReactBootStrap.Table>
    </div>
  )
}


export default App;
