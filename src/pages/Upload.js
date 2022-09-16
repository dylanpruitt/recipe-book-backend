import React from "react";
import DirectionList from "../components/DirectionList"
import IngredientList from "../components/IngredientList"

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " ",
            description: " ",
            ingredients: ["test", "uranium-238"],
            directions: ["Heat oven to 900 *F.", "test"]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeDirection = this.removeDirection.bind(this);
        this.addDirection = this.addDirection.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.update('PENDING');

        if (this.stateIsValid()) {
            console.log(this.state);

            this.props.socket.emit("database submission", this.state);
        } else {
            this.props.update('ERROR');
        }

    }

    stateIsValid() {
        var name = this.state.name;
        var desc = this.state.description;
        var ingredients = this.state.ingredients;
        var directions = this.state.directions;

        var nameValid = false, descValid = false, ingredientsValid = false, directionsValid = false;

        if (typeof name === "string" && name.trim().length > 0) { nameValid = true; }
        if (typeof desc === "string" && desc.trim().length > 0) { descValid = true; }
        if (ingredients.length > 0) { ingredientsValid = true; }
        if (directions.length > 0) { directionsValid = true; }

        return nameValid && descValid && ingredientsValid && directionsValid;
    }

    removeIngredient(i) {
        var temp = this.state.ingredients.slice();
        temp.splice(i, 1);
        this.setState({ ingredients: temp });
    }

    addIngredient(item) {
        var temp = this.state.ingredients.slice();
        temp.push(item);
        this.setState({ ingredients: temp });
    }

    removeDirection(i) {
        var temp = this.state.directions.slice();
        temp.splice(i, 1);
        this.setState({ directions: temp });
    }

    addDirection(item) {
        var temp = this.state.directions.slice();
        temp.push(item);
        this.setState({ directions: temp });
    }

    render() {
        const status = this.props.status;
        var statusText = null;

        if (status === 'SUCCESS') {
            statusText = <p className="w3-panel w3-green">Upload successful.</p>;
        } else if (status === 'ERROR') {
            statusText = <p className="w3-panel w3-red">Error uploading.</p>;
        } else if (status === 'PENDING') {
            statusText = <p className="w3-panel w3-blue">Submitting...</p>;
        }

        return (
            <article>
                <header className="w3-container w3-amber">
                    <h2>Upload recipes</h2>
                </header>
                <label>
                    Name:
                    <input type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={this.state.description}
                        onChange={this.handleInputChange} />
                </label>
                <IngredientList ingredients={this.state.ingredients}
                    remove={this.removeIngredient}
                    add={this.addIngredient} />
                <DirectionList directions={this.state.directions}
                    remove={this.removeDirection}
                    add={this.addDirection} />
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Submit" />
                </form>
                {statusText}
            </article>

        );
    }
}

export default Upload;