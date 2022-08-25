import React from 'react';
import DirectionContainer from './components/DirectionContainer.js';
import IngredientContainer from './components/IngredientContainer.js';
import RecipeHeader from './components/RecipeHeader.js';
import './App.css';
import './w3.css';

const testIngredients = [
  { value: "Garlic" },
  { value: "Paprika" },
];

const testDirections = [
  { value: "Garlic" },
  { value: "Paprika" },
];

function App() {
  return (
    <div className="App">
      <RecipeHeader name="test" description="test" />
      <section className="w3-row-padding">
        <IngredientContainer ingredients={testIngredients} />
        <DirectionContainer directions={testDirections} />
      </section>
    </div>
  );
}

export default App;
