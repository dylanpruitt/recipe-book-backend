import ResultsTable from '../components/ResultsTable';
import InputFilter from '../components/InputFilter';
import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filter: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(filter) {
        this.setState({ filter: filter });
    }

    render() {
        const filter = this.state.filter;
        return (
            <section className="w3-padding">
                <InputFilter filter={filter} handleChange={this.handleChange} />
                <ResultsTable recipes={this.props.recipes} onClick={this.props.onClick} filter={filter} />
            </section>
        );
    }
}

export default Search;