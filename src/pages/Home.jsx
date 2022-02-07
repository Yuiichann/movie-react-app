import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { OutlineButton } from 'components/Button/Button';
import { category, movieType, tvType } from 'api/tmdbApi';
import Loading from 'components/Loading/Loading';
// import HeroSlide from 'components/HeroSlide/HeroSlide';

const HeroSlide = React.lazy(() => import('components/HeroSlide/HeroSlide'))
const MovieList = React.lazy(() => import('components/MovieList/MovieList'))

Home.propTypes = {

};

function Home(props) {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <HeroSlide page="1" />

                <div className="container">
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Trending Movies</h2>
                            <Link to="/movie">
                                <OutlineButton className="small">View More</OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.movie} type={movieType.popular} />
                    </div>

                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Top Rated Movies</h2>
                            <Link to="/movie">
                                <OutlineButton className="small">View More</OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.movie} type={movieType.top_rated} />
                    </div>

                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Trending TV</h2>
                            <Link to="/tv">
                                <OutlineButton className="small">View More</OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={tvType.popular} />
                    </div>

                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Top Rated TV</h2>
                            <Link to="/tv">
                                <OutlineButton className="small">View More</OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={tvType.top_rated} />
                    </div>
                </div>
            </Suspense>
        </>
    );
}

export default Home;