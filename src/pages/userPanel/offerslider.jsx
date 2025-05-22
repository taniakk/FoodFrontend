import "./offerslider.css";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import axios from "axios";
import { Link } from "react-router-dom";

function TopOffer() {
    const [offer, setOffer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://foodbackend-hfrx.onrender.com/offerfood');
                console.log(response)
                setOffer(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="topContainer mt-5">
            <h1 className="offerHeading">🔥 Today's Top Cafeteria Deals 🔥</h1>

            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={false}
                spaceBetween={20}
                coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
                className="mySwiper"
            >
                {offer.map((item) => (
                    <SwiperSlide key={item._id}>
                        <Link to={`/single/${item._id}`} className="offerCardLink">
                            <div className="offerCard">
                                <img src={item.image} alt={item.name} className="offerImage" />
                                <div className="offerDetails">
                                    <h4 className="offerTitle">{item.name}</h4>
                                    <p className="originalPrice">₹{item.price * 2}</p>
                                    <p className="offerPrice">Now Only: ₹{item.price}</p>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default TopOffer;
