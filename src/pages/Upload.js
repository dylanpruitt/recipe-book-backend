import React from "react";

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: " ",
            description: " ",
            ingredients: ["test", "uranium-238"],
            directions: ["Heat oven to 900 *F.", "test"]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log("SUBMIT");
        console.log(this.state);
        event.preventDefault();
        this.props.socket.emit("database submission", this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text"
                        name="title"
                        value={this.state.title}
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
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Upload;