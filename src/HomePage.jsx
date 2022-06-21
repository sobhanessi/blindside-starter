import React, { useEffect } from "react";
import AutoComplete from "@mui/material/Autocomplete";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import videos from "./videos";
import { useFormik } from "formik";
import * as Yup from "yup";

function HomePage() {
  const [video, setVideo] = React.useState([]);
  const [related, setRelated] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [showComment, setShowComment] = React.useState(true);

  const validationSchema = Yup.object({
    comment: Yup.string(),
  });

  console.log(comments);

  const onChange = () => {
    let filtered = videos.filter(
      (v) => JSON.stringify(v.categories) === JSON.stringify(video.categories)
    );
    setRelated(filtered);
    setComments(video.comments);
  };
  useEffect(() => {
    onChange();
  }, [video]);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => setNewComments(values.comment),
  });

  const setNewComments = (comment) => {
    return comments.length
      ? setComments([...comments, comment])
      : setComments([comment]);
  };

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
          {Object.keys(video).length > 0 ? (
            <Card>
              <CardContent>
                <Typography>{video.title}</Typography>
              </CardContent>
              <CardMedia component="video" image={video.src} controls />
              <CardContent>
                <Typography gutterBottom>
                  You can leave your comment by writing in the box below or you
                  can toggle it off if you wish to not to see the comments!{" "}
                  <Switch
                    checked={showComment}
                    onChange={() => setShowComment(!showComment)}
                  />
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  {video && showComment && (
                    <>
                      <TextField
                        label="Leave your comment"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        onChange={formik.handleChange}
                        name="comment"
                      />
                      <Button type="submit">Submit</Button>
                      {video && comments ? (
                        comments.map((cm) => <Typography>{cm}</Typography>)
                      ) : (
                        <Typography>
                          be the first one to write a comment.
                        </Typography>
                      )}
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          ) : (
            <Typography>search for a video</Typography>
          )}

          <Grid
            container
            display="flex"
            sx={{
              mt: 3,
              mb: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {related ? (
              related.map((r) => (
                <Grid item sm={5} sx={{ mr: 2.2 }}>
                  <span onClick={() => setVideo(r)}>
                    <Card>
                      <CardMedia component="video" image={r.src} />
                      <CardContent>
                        <Typography>{r.title}</Typography>
                      </CardContent>
                    </Card>
                  </span>
                </Grid>
              ))
            ) : (
              <Typography>Couldn't find any related video</Typography>
            )}
          </Grid>
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
