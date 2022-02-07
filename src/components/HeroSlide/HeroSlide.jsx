import React, { useEffect, useRef, useState } from 'react';
import './HeroSlide.scss';
import tmdbApi, { category, movieType } from 'api/tmdbApi';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import apiConfig from 'api/apiConfig';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { OutlineButton } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { ModalContent } from 'components/Modal/Modal';


function HeroSlide(props) {

    SwiperCore.use([Autoplay]);

    const page = +props.page;

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: page};
            try {
                const response = await tmdbApi.getMoivesList(movieType.popular, {params})
                setMovieItems(response.results.slice(0, 4))
            } catch {
                console.log('Error !!!!');
            }
        }
        getMovies();
    }, [])


    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 1000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({isActive}) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item} />)
            }
        </div>
    );
}

function HeroSlideItem(props) {

    const navigate = useNavigate();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path :item.poster_path)

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id)

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;

            modal.querySelector('.modal__content > iframe ').setAttribute('src', videoSrc)
        }
        else {
            modal.querySelector('.modal__content').innerHTML = 'No Trailer...'
        }

        modal.classList.toggle('active')
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button
                            onClick={() => navigate(`/movie/${item.id}`)}
                        >
                            Watch now
                        </Button>
                        <OutlineButton
                            onClick={setModalActive}
                        >
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>

                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} />
                </div>
            </div>
        </div>
    )
} 

function TrailerModal(props) {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '')

    return (
        <Modal active={false} id={`modal_${item.id}`} onClose={onClose}>
            <ModalContent onClose={onClose}>
                <iframe 
                    ref={iframeRef} 
                    allowFullScreen 
                    frameBorder="0"
                    width="100%" 
                    className='modal__trailer' 
                    title="Trailer"
                >
                </iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;