import { Container } from "@mui/material";
import HomeSwiper from "./Components/HomeSwiper";
import HomeCard1 from "./Components/HomeCard1";
import Divider1 from "./Components/Divider1";
import HomeCard2 from "./Components/HomeCard2";
import HomeCard3 from "./Components/HomeCard3";

export default function Home() {
  const categories = [
    "business",
    "sports",
    "technology",
    "entertainment",
    "general",
    "science",
    "health",
  ];

  return (
    <div sx={{mt:'50%'}}>

    <Container maxWidth="xl">
      <HomeSwiper />
      <Divider1 text="Top Headlines" />
      <HomeCard1 />
      <Divider1 text="Categories Section" />
      <HomeCard2 categories={categories} />
      <Divider1 text="Trending Stories" />
      <HomeCard3 />
    </Container>
    </div>
  );
}
