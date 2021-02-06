import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_REPOS } from "../githubApi";
import RepoList from "./RepoList";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {
  fade,
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { orange, blue, deepPurple, deepOrange } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  user: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 256,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      minHeight: 100
    }
  },
  avatar: {
    width: theme.spacing(27),
    height: theme.spacing(27),
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    },
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(5),
      height: theme.spacing(5)
    }
  },
  toolbar: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      minHeight: 100
    }
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    display: "flex"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "auto",
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(15)
    }
  }
}));

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const classes = useStyles();
  // Dark Mode
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : blue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  // Fetching Data
  const [getUsername, { loading, error, data }] = useLazyQuery(GET_REPOS);

  // Dark Theme switching login
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position='fixed'>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant='h5' noWrap>
              Search GitHub Repos
            </Typography>
            <div className={classes.search}>
              <form
                action='submit'
                onSubmit={e => {
                  e.preventDefault();
                  if (searchTerm) {
                    getUsername({ variables: { username: searchTerm } });
                  }
                }}
              >
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Enter Github Username...'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </form>
            </div>
            <div className={classes.grow} />

            <Switch checked={darkState} onChange={handleThemeChange} />
          </Toolbar>
        </AppBar>
        <Container maxWidth='md' className={classes.container}>
          {loading && <h2>Loading... </h2>}
          {data && (
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='flex-start'
              spacing={2}
            >
              <Grid item md={4} xs={12}>
                <div className={classes.user}>
                  <Avatar
                    alt={data.user.name}
                    src={data.user.avatarUrl}
                    className={classes.avatar}
                  />
                  <Typography className={classes.title} variant='h5' noWrap>
                    {data.user.name}
                  </Typography>
                </div>
              </Grid>
              <Grid item md={8} xs={12}>
                <RepoList repos={data.user.repositories.nodes}></RepoList>
              </Grid>
            </Grid>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Search;
