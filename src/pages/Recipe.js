import React from 'react';
import DirectionContainer  from '.././components/DirectionContainer.js';
import IngredientContainer from '.././components/IngredientContainer.js';
import RecipeHeader        from '.././components/RecipeHeader.js';

class Recipe extends React.Component {
    render() {
        var title = this.props.title;
        var description = this.props.description;
        var ingredients = this.props.ingredients;
        var directions  = this.props.directions;
        return (
            <div className="Recipe">
                <RecipeHeader name={title} description={description} />
                <section className="w3-row-padding">
                    <IngredientContainer ingredients={ingredients} />
                    <DirectionContainer directions={directions} />
                </section>
            </div>
        );
    }
}

export default Recipe;