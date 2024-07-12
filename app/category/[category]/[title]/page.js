"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleCardDetail from "@/app/Components/SingleCardDetai";

const Page = () => {
  const router = useRouter();
  const { category, title } = useParams();
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    const clickedCardData = localStorage.getItem("clickedCard");

    if (clickedCardData) {
      const parsedData = JSON.parse(clickedCardData);
      setParsedData(parsedData);
    }
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: { xs: "25%", md: "15%", lg: "10%" } }}>
      {parsedData ? (
        <SingleCardDetail
          alt={parsedData.abstract}
          image={
            parsedData.multimedia.length > 0
              ? `https://www.nytimes.com/${parsedData.multimedia[0].url}`
              : "/News-logo.jpg"
          }
          title={parsedData.headline ? parsedData.headline.main : "Title"}
          published={parsedData.pub_date}
          body={parsedData.lead_paragraph}
          href={parsedData.web_url}
        />
      ) : (
        <Typography variant="h5" color="text.secondary" sx={{ mt: 4 }}>
          No article data available. Please go back and select an article.
        </Typography>
      )}
    </Container>
  );
};

export default Page;
