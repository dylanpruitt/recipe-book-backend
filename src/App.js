import React from 'react';
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Recipe from './pages/Recipe';
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import './App.css';
import './w3.css';

var socket = io('http://localhost:3001');

socket.on('recipe query', function (query) {
  console.log(query.results[0]);
  parseRecipeData(query.results[0]);
});

var testIngredients = [
  { value: "Garlic" },
  { value: "Paprika" },
];

var testDirections = [
  { value: "Garlic" },
  { value: "Paprika" },
];

var recipeID = 1;
var title = "John";
var description = "";

function parseRecipeData(recipe) {
  title = recipe.name;
  description = recipe.description;

  testIngredients = recipe.ingredients.map((item) => {
    return { value: item };
  });
  testDirections = recipe.directions.map((item) => {
    return { value: item };
  });
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Recipe title={title} description={description} ingredients={testIngredients} directions={testDirections} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;