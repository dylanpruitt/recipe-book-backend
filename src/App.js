import React from 'react';
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Recipe from './pages/Recipe';
import Layout from './pages/Layout';
import Search from './pages/Search';
import Upload from './pages/Upload';
import NoPage from './pages/NoPage';
import './App.css';
import './w3.css';

var socket;
var recipes = [];

function parseRecipeData(recipe) {
  let parsedObj = {
    title: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    directions: recipe.diretions,
  };

  parsedObj.ingredients = recipe.ingredients.map((item) => {
    return { value: item };
  });
  parsedObj.directions = recipe.directions.map((item) => {
    return { value: item };
  });

  return parsedObj;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedRecipes: [
        {
          title: "test",
          description: "test",
          ingredients: [],
          directions: []
        }
      ]
    };
  }

  componentDidMount() {
    const thisScope = this;
    socket = io('http://localhost:3001');

    socket.on('recipe query', function (query) {
      recipes = query.results.map(i => parseRecipeData(i));
      console.log("Updated recipes");
      thisScope.setState({ loadedRecipes: recipes });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Recipe recipes={this.state.loadedRecipes} />} />
            <Route path="/Search" element={<Search recipes={this.state.loadedRecipes} />} />
            <Route path="/Upload" element={<Upload socket={socket} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;