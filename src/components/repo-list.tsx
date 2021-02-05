import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {List, ListItem, Link, ListItemText} from '@material-ui/core'
import './repo-list.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function RepoList({repos}: any) {
  const classes = useStyles();
  console.log(repos)
  return (
    
    <List className={classes.root}>
    {
      repos.map((repo: any)=> {
        let date = new Date(repo.updatedAt)
        return (
          <ListItem divider={true}>
            <Link underline="none" href={repo.url} target="_blank">
              <ListItemText primary={repo.name} secondary={`Updated on : ${date.toDateString()}`} />
            </Link>
          </ListItem>)

      })} 
  </List>
  )
}

export default RepoList