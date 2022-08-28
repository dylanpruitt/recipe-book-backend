import React from 'react';
import io from "socket.io-client";
import DirectionContainer from './components/DirectionContainer.js';
import IngredientContainer from './components/IngredientContainer.js';
import RecipeHeader from './components/RecipeHeader.js';
import './App.css';
import './w3.css';

var socket = io('http://localhost:3001');

socket.on('recipe query', function (query) {
  console.log("MSG");
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

var title       = "John";
var description = " ";

function parseRecipeData (recipe) {
  title       = recipe.name;
  description = recipe.description;
}

function App() {
  return (
    <div className="App">
      <RecipeHeader name={title} description={description} />
      <section className="w3-row-padding">
        <IngredientContainer ingredients={testIngredients} />
        <DirectionContainer directions={testDirections} />
      </section>
    </div>
  );
}

export default App;
