import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axios from 'axios';


function MovieEditList ({ handleEditCount }){
    const [ newValue, setNewValue ] = useState(null)
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const id = match.params.id;
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            res.data = {
                ...res.data,
                stars: res.data.stars.toString()
            }
            setNewValue(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [match.params.id]);

    const goBack = () => {
        const id = match.params.id;
        history.push(`/movies/${id}`);
    }

    const handleChange = e => {
        setNewValue({
            ...newValue,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
         newValue.metascore = newValue.metascore * 1;
         //  newValue.stars.split is not a function but if i refresh it
         newValue.stars = newValue.stars.split(',');

        const id = match.params.id;
        axios.put(`http://localhost:5000/api/movies/${id}`, newValue)
        .then(() => {
            handleEditCount();
            history.push(`/movies/${id}`);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <div className='form-wrapper'>
            
            {newValue && (
                <form onSubmit={handleSubmit}>

                    <label>Title</label>
                    <div className="EditInput">
                        <input
                            name='title'
                            value={newValue.title}
                            onChange={handleChange}
                        />
                    </div>

                    <label>Director</label>
                    <div className="EditInput">
                        <input
                            name='director'
                            value={newValue.director}
                            onChange={handleChange}
                        />
                    </div>

                    <label>Metascore</label>
                    <div className="EditInput">
                        <input
                            name='metascore'
                            value={newValue.metascore}
                            onChange={handleChange}
                        />
                    </div>

                    <label>Stars</label>
                    <div className="EditInput">
                        <input
                            name='stars'
                            value={newValue.stars}
                            onChange={handleChange}
                        />
                    </div>

                    <input type='submit' value='Submit Changes' className='form-submit'/>
                    <button className='back-button' onClick={goBack}>Go Back</button>
                </form>
            )}
        </div>
    );
}

export default MovieEditList ;