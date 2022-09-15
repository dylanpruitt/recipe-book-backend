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

        this.props.update();
        this.props.socket.emit("database submission", this.state);
    }

    render() {
        const status = this.props.status;
        var   statusText = <p></p>;

        if (status === 'SUCCESS') {
            statusText = <p>SUCCESS!!</p>;
        } else if (status === 'ERROR') {
            statusText = <p>Error</p>;
        } else if (status === 'PENDING') {
            statusText = <p>Submitting...</p>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
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
                <input type="submit" value="Submit" />
                {statusText}
            </form>
        );
    }
}

export default Upload;