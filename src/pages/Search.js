import ResultsTable from '../components/ResultsTable';

function Search(props) {
    return (
        <ResultsTable recipes={props.recipes} onClick={props.onClick} />
    );
}

export default Search;