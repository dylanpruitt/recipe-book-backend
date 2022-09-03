import ResultsTable from '../components/ResultsTable';

function Search(props) {
    return (
        <ResultsTable recipes={props.recipes} />
    );
}

export default Search;