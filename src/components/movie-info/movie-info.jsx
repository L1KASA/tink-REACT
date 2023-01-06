import React, {useCallback} from 'react';
import './movie-info.css';

const MovieInfo = ({props, setForm, setEditId}) => {
    const memoizedCallback = useCallback(() => {
        setForm(true);
        setEditId(props.id);
    }, [props.id, setEditId, setForm])
    if (!props) return null;
    const {posterUrl, genres, title, director, year, actors, plot, id, rating} = props;
    if (!genres) return null;
    const actorsArray = actors.split(',');
    return (
        <div className="movie-info">
            <div className="crumbs">
                <p>ИД: {id}</p>
                <button
                    type="button"
                    className="edit-button"
                    onClick={memoizedCallback}
                >
                    ИЗМЕНИТЬ
                </button>
            </div>
            <div className="top">
                <div className="picture">
                    <img
                        src={posterUrl}
                        alt="oops"
                        width="300px"
                        height="350px"
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null;
                            currentTarget.src = 'https://http.cat/404';
                        }}
                    ></img>
                </div>
                <div className="top-info">
                    <div className="top-left-info">
                        <h1>{title}</h1>
                        <p className="special">{director}</p>
                        <p>
                            <span className="special">Год:</span> {year}
                        </p>
                        <p>
                            <span className="special">Жанры:</span> {genres}
                        </p>
                    </div>
                    <div className="top-right-info">
                        <h3>В главных ролях:</h3>
                        <ul>
                            {actorsArray.map((item, index) => {
                                return <li key={item}>{item}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bottom-info">
                <h3>Описание:</h3>
                <p>{plot}</p>
                <h3>Рейтинг:</h3>
                <p>{rating}</p>
            </div>
        </div>
    );
};

export default MovieInfo;
