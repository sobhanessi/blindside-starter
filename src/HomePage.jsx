import React from "react";
import AutoComplete from "@mui/material/Autocomplete";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import videos from "./videos";

function HomePage() {
  const [video, setVideo] = React.useState("");
  //   console.log(videos.map((video) => video.title === title));
  console.log(typeof video.src);
  return (
    <>
      <nav></nav>
      <main>
        <Container display="flex">
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
              mb: 5,
            }}
          >
            <AutoComplete
              item
              freeSolo
              disableClearable
              sx={{ width: 400 }}
              id="video-search-bar"
              onChange={(e, values) =>
                setVideo(videos.find((video) => video.title === values))
              }
              options={videos.map((video) => video.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="search videos"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
          <Card>
            <CardContent>
              <Typography>Hello world</Typography>
            </CardContent>
            {/* {video.length && ( */}
            <CardMedia
              component="video"
              image={video.src}
              autoPlay={true}
              controls
            />
            {/* <video controls>
              <source src={} type="video/mp4" />
            </video> */}
            {/* )} */}
          </Card>
        </Container>

        <div>here I must show the searched videos.</div>
        <div>here I must show the video.</div>
        <div>here I must implement the comments.</div>
        <div>related videos.</div>
      </main>
      <footer></footer>
    </>
  );
}

export default HomePage;
