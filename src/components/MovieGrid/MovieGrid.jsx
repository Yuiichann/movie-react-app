import tmdbApi, { category, movieType, tvType } from 'api/tmdbApi';
import Button from 'components/Button/Button';
import { OutlineButton } from 'components/Button/Button';
import Input from 'components/Input/Input';
import Loading from 'components/Loading/Loading';
import MovieCard from 'components/MovieCard/MovieCard';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MovieGrid.scss';



function MovieGrid(props) {

    const [loading, setLoading] = useState(false);

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null
            const params = {}

            setLoading(false)

            if (keyword === undefined) {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoivesList(movieType.upcoming, {params})
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, {params})
                }
            }
            else {
                const params = {
                    query: keyword
                }

                response = await tmdbApi.search(props.category, {params})
            }

            setItems(response.results)
            setTotalPage(response.total_pages)
            setLoading(true)
        }

        getList();
    }, [props.category, keyword])

    const loadMore = async () => {
        let response = null
        const params = {
            page: page + 1
        }
        
        if (keyword === undefined) {
            switch(props.category) {
                case category.movie:
                    response = await tmdbApi.getMoivesList(movieType.upcoming, {params})
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, {params})
            }
        }
        else {
            const params = {
                page: page + 1,
                query: keyword
            }

            response = await tmdbApi.search(props.category, {params})
        }

        setItems([...items, ... response.results])
        setPage(page + 1)
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            {
                loading ? 
                (
                    <div className='movie-grid'>
                        {
                            items.length > 0 ? 
                                items.map((item, i) => <MovieCard category={props.category} item={item} key={i} />) 
                            : <h2 className='not-found'>Not Found ... </h2>
                        }
                    </div> 
                    
                ) : <Loading />
            }

            {
                loading &&
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton 
                            className="small"
                            onClick={loadMore}
                        >
                            Load More
                        </OutlineButton>
                    </div>
                )
                : null
            }
        </>
    );
}



const MovieSearch = props => {

    const navigate = useNavigate()

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`/${category[props.category]}/search/${keyword}`)
        }
    }, [keyword, props.category, navigate])

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();

            if (e.keyCode === 13) {
                goToSearch();
            }
        }

        document.addEventListener('keyup', enterEvent);

        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    }, [keyword, goToSearch])

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid;
