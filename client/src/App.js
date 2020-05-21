import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import MovieEditList from './Component/EditList'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const [deleteList,setDeleteList] = useState([]);
  const [editList, setEditList] = useState([]);
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

   const deleteListFun = () => {
     setDeleteList(deleteList - 1);
   }
  const handlerEditList = () => {
    setEditList(editList + 1);
  }
  

  useEffect(() => {
    getMovieList();
  }, [deleteList,editList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteListFun={deleteListFun}/>
      </Route>

      <Route path='/update-movie/:id'>
        <MovieEditList handlerEditList={handlerEditList}/>
      </Route>
    </>
  );
};

export default App;
