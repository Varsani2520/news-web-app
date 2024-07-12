'use client'
import React, { useEffect, useState } from "react";
import { Container, Skeleton, Box, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import slugify from "slugify";
import { getQuery } from "../service/getQuery";
import Card2 from "./Card2";
import Card3 from "./Card3";
import styles from '../styles/style.css';

const HomeLayout = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHeadlines() {
      try {
        const articles = await getQuery({ q: "headline" });
        setData(articles);
        setLoading(false);
      } catch (error) {
        console.error("Error loading headlines:", error);
      }
    }
    fetchHeadlines();
  }, []);

  const handleCardClick = (article) => {
    localStorage.setItem("selectedCardData", JSON.stringify(article));
  };

  return (
    <Container maxWidth="xl" sx={{ background: "#eceff2", marginTop: '6%' }}>
      {loading ? (
        <Skeleton height={500} width={"100%"} />
      ) : (

        <Grid container spacing={2}>
          <Grid item xs={12} md={2.5}>
            {data.slice(0, 2).map((article, index) => (
              <Card2
              height={"150"}
                key={index}
                image={article.multimedia.length > 0 ? `https://www.nytimes.com/${article.multimedia[0].url}` : "/News-logo.jpg"}
                title={article.headline.main}
                description={article.snippet}
              />
            ))}

          </Grid>
          <Grid item xs={12} md={5}>
            <Swiper
              className={`w-full h-4`}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              slidesPerView={'auto'}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
            >
              {data.map((article, title) => (
                <SwiperSlide key={title} className={styles.swiperSlide}>
                  <Link
                    href={`/top-headlines/${slugify(article.headline.main)}`}
                    passHref
                  >
                    <div
                      onClick={() => handleCardClick(article)}
                      className={styles.imageBox}
                    >
                      <img
                        src={
                          article.multimedia.length > 0
                            ? `https://www.nytimes.com/${article.multimedia[0].url}`
                            : "/News-logo.jpg"
                        }
                        alt={article.headline.main}
                        className={styles.image}
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid item xs={12} md={4.5}>
            {data.slice(3, 7).map((article, id) => (

              <Card3 key={id}
                image={article.multimedia.length > 0 ? `https://www.nytimes.com/${article.multimedia[0].url}` : "/News-logo.jpg"}
                title={article.headline.main}
                description={article.snippet}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default HomeLayout;
