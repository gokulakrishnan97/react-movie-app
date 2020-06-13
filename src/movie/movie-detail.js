import React from 'react';

const MovieDetail = (props) => {
  console.log(props);
  let { match } = props;
  let id = match.params.id;
  console.log(id);
  return ( 
    <h2>{ id }</h2>
   );
}
 
export default MovieDetail;