import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

class Pagination extends React.Component{

  state = {
    pagination: {
      activePage: 0,
      itemCountPerPage: [],
      perPage: 0,
      totalItemCount: 0,
      redirect: '/'
    }
  }

  handleActivePage = (activePage) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        activePage
      }
    })
  }

  filltemCountPerPage = () => {
    const { pagination } = this.state

    let itemCountPerPage = []
    for (let i = 0; i < pagination.totalItemCount / pagination.perPage; i++) {
      itemCountPerPage.push(i + 1)
    }

    this.setState({
      pagination: {
        ...this.state.pagination,
        itemCountPerPage
      }
    })
  }

  componentDidMount = async () => {
    const { activePage, perPage, totalItemCount, redirect } = this.props
    await this.setState({
      pagination: {
        activePage,
        itemCountPerPage: [],
        perPage,
        totalItemCount,
        redirect
      }
    })
    this.filltemCountPerPage()
  }

  render() {
    const { classes } = this.props
    const { pagination } = this.state
    return (  
      <Grid container className={classes.paginationRoot} justify="center" alignItems="center"> 
        {this.state.pagination.itemCountPerPage.map((d) => (
           d - pagination.activePage <= 2 && d - pagination.activePage >= -2 ? (
            <Link key={d} to={d === 1 ? `${pagination.redirect}` : `${pagination.redirect}page/${d}`} className={classes.paginationLink}>
              <Grid item>
                <Grid container style={pagination.activePage === d ? {backgroundColor: "#2f1b6b"}: {}} onClick={() => this.handleActivePage(d)} className={classes.paginationNumber} justify="center" alignItems="center">
                  <Grid item>
                    <p className={classes.text}>{d}</p>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
           ) : null
        ))}
      </Grid>
    )
  }
}

const styles = {
  paginationRoot: {
    flexGrow: 1
  },
  dot: {
    height: "2px",
    width: "2px",
    backgroundColor: "black",
    borderRadius: "50px",
    margin: "2px"
  },
  paginationNumber: {
    height: "35px",
    width: "35px",
    backgroundColor: "#6749c1",
    boxShadow: "0 0px 2px #6749c1",
    borderRadius: "5px",
    margin: "2px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#2f1b6b",
    }
  },
  paginationLink: {
    textDecoration: "none",
    color: "#1b1b1b"
  },
  text: {
    color: "white"
  }
}

export default withStyles(styles)(Pagination);
