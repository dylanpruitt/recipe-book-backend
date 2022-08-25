import React from 'react';

class DirectionContainer extends React.Component {
  render() {
    const directions = this.props.directions;
    const listItems = directions.map((item) => {
      return <p> {item.value} </p>;
    });
    return (
      <article className="w3-half">
        <h1>Directions</h1>
        {listItems}
      </article>
    );
  }
}

export default DirectionContainer;