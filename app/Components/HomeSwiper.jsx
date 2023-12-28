"use client";
import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { Container, Skeleton } from "@mui/material";
import { getHeadlines } from "../service/getHeadlines";
const HomeSwiper = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function homeSwiper() {
    try {
      const result = await getHeadlines
        ();
      setData(result.articles);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    homeSwiper();
  }, []);
  return (
    <div>
      <div>
        <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
          {loading ? (
            <Skeleton height={500} width={'100%'} />
          ) : (

            <Swiper
              className="w-full mt-10 justify-center "
              modules={[Navigation, Scrollbar, A11y, Autoplay]}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
            >
              {data.map((article, index) => (
                <SwiperSlide key={index}>
                  {/* Render your content for each article here */}
                  <div>
                    <img
                      src={article.urlToImage} //
                      alt={article.title}
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </Container>
      </div>
    </div>
  );
};

export default HomeSwiper;
