import React, { useEffect } from "react";
import AutoComplete from "@mui/material/Autocomplete";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import videos from "./videos";
import { useFormik } from "formik";
import * as Yup from "yup";

const GOOGLE_CLIENT_ID =
  "1031772883847-nmdk0m6m71un6l3jrf8hig6pkj58f37n.apps.googleusercontent.com";

function HomePage() {
  const [user, setUser] = React.useState(null);
  const [video, setVideo] = React.useState([]);
  const [related, setRelated] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [showComment, setShowComment] = React.useState(true);

  const validationSchema = Yup.object({
    comment: Yup.string(),
  });

  const onChange = () => {
    let filtered = videos.filter(
      (v) =>
        JSON.stringify(v.categories) === JSON.stringify(video.categories) &&
        v.title !== video.title
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
    return comments.length > 1
      ? setComments([...comments, comment])
      : setComments([comment]);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {user ? (
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
              <Divider sx={{ mb: 8 }} />
              {Object.keys(video).length > 0 ? (
                <Card>
                  <CardContent sx={{ bgcolor: "#b2ebf2" }}>
                    <Typography
                      component="h4"
                      variant="h4"
                      sx={{ fontWeight: 700, fontSize: "2rem" }}
                    >
                      {video.title}
                    </Typography>
                  </CardContent>
                  <CardMedia component="video" image={video.src} controls />
                  <CardContent>
                    <Button variant="contained" color="error">
                      {video.creator}
                    </Button>
                    <Typography
                      gutterBototm
                      color="gray"
                      variant="body1"
                      component="div"
                      sx={{ mt: 2, mb: 3 }}
                    >
                      {video.description}
                    </Typography>

                    <Typography
                      color="black"
                      variant="body1"
                      component="div"
                      sx={{
                        mt: 2,
                        mb: 3,
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      Tags :{" "}
                      <Typography color="primary">
                        {video.categories.map((ct) => `#${ct}`)}
                      </Typography>
                    </Typography>

                    <Divider />
                    <Typography
                      component="div"
                      variant="body2"
                      gutterBottom
                      sx={{ mt: 2 }}
                    >
                      You can leave your comment by writing in the box below or
                      you can toggle it off if you wish to not to see the
                      comments!{" "}
                      <Switch
                        checked={showComment}
                        onChange={() => setShowComment(!showComment)}
                      />
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                      {video && showComment && (
                        <Grid
                          container
                          sx={{
                            jusitifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            label="Leave your comment"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            onChange={formik.handleChange}
                            name="comment"
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              ml: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            Submit
                          </Button>
                          {video && comments ? (
                            comments.map((cm) => <Typography>{cm}</Typography>)
                          ) : (
                            <Typography>
                              be the first one to write a comment.
                            </Typography>
                          )}
                        </Grid>
                      )}
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid container>
                    {videos.map((v) => (
                      <Grid
                        item
                        sm={5}
                        md={5}
                        lg={5}
                        xl={5}
                        xs={10}
                        sx={{ m: 1 }}
                      >
                        <Card
                          onClick={() => setVideo(v)}
                          sx={{ bgcolor: "#eeeeee" }}
                        >
                          <CardMedia component="video" image={v.src} />
                          <CardContent>
                            <Typography
                              component="div"
                              variant="h4"
                              gutterBottom
                              sx={{ fontWeight: 700, fontSize: "1.75rem" }}
                            >
                              {v.title}
                            </Typography>
                            <Typography
                              component="div"
                              variant="body1"
                              gutterBottom
                              sx={{ fontWeight: 700, fontSize: "1rem" }}
                            >
                              Creator : {v.creator}
                            </Typography>
                            <Typography
                              component="div"
                              variant="body2"
                              gutterBottom
                              color="gray"
                            >
                              {v.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              )}

              {Object.keys(video).length > 0 && related.length > 0 && (
                <>
                  <Typography
                    sx={{
                      display: "flex",
                      mt: 4,
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    Related Videos :{" "}
                  </Typography>
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
                    {related.map((r) => (
                      <Grid
                        item
                        sm={5}
                        sx={{ mr: 2.2, display: "flex", flexDirection: "row" }}
                      >
                        <span onClick={() => setVideo(r)}>
                          <Card>
                            <CardMedia component="video" image={r.src} />
                            <CardContent>
                              <Typography
                                component="h6"
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                                gutterBottom
                              >
                                {r.title}
                              </Typography>
                              <Typography component="div" variant="body1">
                                {r.description.slice(0, 40)}...
                                <Typography color="blue">
                                  {" "}
                                  Watch it now!
                                </Typography>
                              </Typography>
                            </CardContent>
                          </Card>
                        </span>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
              {Object.keys(video).length > 0 && related.length === 0 && (
                <Typography
                  component="h4"
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                    mb: 10,
                  }}
                >
                  Oops! Couldn't find any related video
                </Typography>
              )}
            </Container>
          </main>
        ) : (
          <Container>
            <Typography
              sx={{ display: "flex", justifyContent: "center", mt: 10 }}
            >
              Please Login Using One Of Options Below
            </Typography>
            <Stack>
              <GoogleLogin
                onSuccess={(res) => setUser(true)}
                onFailure={(res) => console.log("failure", res)}
                scope={["email"]}
              />
            </Stack>
          </Container>
        )}
      </GoogleOAuthProvider>
    </>
  );
}

export default HomePage;
