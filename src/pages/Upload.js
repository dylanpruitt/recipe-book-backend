function Upload(props) {
    return (
        <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" onClick={console.log('a')} />
        </form>
    );
}

export default Upload;