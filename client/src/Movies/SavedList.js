import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';

function SavedList({ list }) {
  const history = useHistory();
  const gohome = () => {
    
    history.push(`/`);
  }
  
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <button className="home-button" onClick={gohome} >
        <Link to="/">Home</Link>
      </button>
    </div>
  );
}

export default SavedList;
