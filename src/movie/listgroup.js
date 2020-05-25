import React from 'react';

const FilterList = (props) => {
  return (  
    <ul className="list-group">
      <li className="list-group-item">All Genres</li>{
        props.genres.map( g => <li className="list-group-item" onClick= {()=>props.selectGenre(g)}>{ g.name }</li>)
      }
    </ul>
  );
}
 
export default FilterList;