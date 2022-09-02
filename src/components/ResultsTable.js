import RecipeLink from "./RecipeLink";

function ResultsTable(props) {

    return (
        <table className="w3-table-all w3-margin-top">
            <tbody>
                <RecipeLink name="Deez" id={1} />
            </tbody>
        </table>
    );
}

export default ResultsTable;