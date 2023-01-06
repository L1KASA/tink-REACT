import React, {useState, useRef, useCallback} from 'react';
import './movies-list.css';
import {Card} from 'antd';
import {Input} from 'antd';
import {useScrollbar} from '../../hooks/use-scrollbar';
const {Search} = Input;
const MoviesList = ({data, setMovieData, setForm, onUpdateSearch, setIsAdd}) => {
    const [term, changeTerm] = useState('');
    const onUpdateSearchThis = useCallback(
        event => {
            const term = event.target.value.toLowerCase();
            changeTerm(term);
            onUpdateSearch(term);
        },
        [onUpdateSearch],
    );
    const content = data.map((item, index) => {
        const {
            id,
            title,
            year,
            genres = 'Информация отсутствует',
            posterUrl = 'Информация отсутствует',
            actors,
            rating = 'Информация отсутствует',
            director = 'Информация отсутствует',
            plot = 'Информация отсутствует',
        } = item;
        return (
            <Card
                key={title}
                className="card"
                type="inner"
                title={title}
                hoverable
                style={{marginTop: '12px', backgroundColor: '#bcc3b5'}}
                onClick={e => {
                    setMovieData({id, title, year, genres, posterUrl, actors, director, plot, rating});
                    const card = e.target.offsetParent;
                    const allCards = card.offsetParent.querySelectorAll('.toggled');
                    for (let elements of allCards) {
                        elements.classList.toggle('toggled');
                    }
                    card.classList.toggle('toggled');
                }}
            >
                <p>
                    {year} | {genres}
                </p>
            </Card>
        );
    });
    const movieWrapper = useRef(null);
    const hasScroll = content.length > 10;
    useScrollbar(movieWrapper, hasScroll);
    return (
        <div className="movies-list-wrapper">
            <Search
                placeholder="Введите название фильма"
                allowClear
                onChange={onUpdateSearchThis}
                style={{
                    width: 300,
                    marginTop: '15px',
                }}
            />
            <div
                className="movie-items"
                style={{height: hasScroll ? '500px' : 'auto', minHeight: '500px'}}
                ref={movieWrapper}
            >
                <div>{content}</div>
            </div>
            <div className="movies-list-crumbs">
                <p>Найдено элементов: {data.length}</p>
                <button
                    type="button"
                    className="add-button"
                    onClick={() => {
                        setForm(true);
                        setIsAdd(true);
                    }}
                >
                    ДОБАВИТЬ
                </button>
            </div>
        </div>
    );
};

export default MoviesList;
