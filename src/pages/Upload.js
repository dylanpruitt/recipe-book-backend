import React from "react";

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
                <IngredientContainer ingredients={this.state.ingredients}
                    remove={this.removeIngredient}
                    add={this.addIngredient} />
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Submit" />
                </form>
                {statusText}
            </article>

        );
    }
}

function IngredientContainer(props) {
    const items = props.ingredients.map((item, index) => {
        return <Ingredient key={index} name={item} onClick={() => props.remove(index)} />;
    });

    return (
        <section>
            <p>Ingredients:</p>
            <ul>{items}</ul>
            <button onClick={() => props.add("T")}>Add new</button>
        </section>
    );
}

function Ingredient(props) {
    return (
        <section>
            <li>{props.name}</li><button onClick={props.onClick}>X</button>
        </section>
    );
}

export default Upload;