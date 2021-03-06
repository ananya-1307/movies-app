import React, { Component } from 'react'
//import { movies } from './GetMovies'
import axios from 'axios' //this is for API calls
export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: '',
      parr: [1],
      currPage: 1,
      movies: [],
      favourites: []
    }
  }

  async componentDidMount() {
    //side effects
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=24233b2da512a5c4f36c123217a974bf&language=en-US&page=${this.state.currPage}`)
    let data = res.data;
    //console.log(data);
    this.setState({
      movies: [...data.results]
    })

  }

  changeMovies = async () => {
    console.log("changeMovies Called");
    console.log(this.state.currPage)
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=24233b2da512a5c4f36c123217a974bf&language=en-US&page=${this.state.currPage}`)
    let data = res.data;
    //console.log(data);
    this.setState({
      movies: [...data.results]
    })
  }

  handleRight = () => {
    let temparr = []
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      temparr.push(i);
    }
    this.setState({
      parr: [...temparr],
      currPage: this.state.currPage + 1
    }, this.changeMovies) //here we only provided the definition of changeMovies we did not make a function call


  }

  handleLeft = () => {
    if (this.state.currPage != 1) {
      this.setState({
        currPage: this.state.currPage - 1
      }, this.changeMovies)
    }

  }

  handleClick = (value) => {
    if (value != this.state.currPage) {
      this.setState({
        currPage: value

      }, this.changeMovies)
    }
  }

  handleFavourites = (movie) => {
    let oldDate = JSON.parse(localStorage.getItem('movies-app') || "[]") //because data is stored as string so we havw to parse it in JSON format.
    if (this.state.favourites.includes(movie.id)) {
      oldDate = oldDate.filter((m) => m.id != movie.id)

    }
    else {
      oldDate.push(movie)
    }
    console.log(oldDate)
    localStorage.setItem("movies-app", JSON.stringify(oldDate))
    this.handleFavouritesState();
  }

  handleFavouritesState = () => {
    let oldDate = JSON.parse(localStorage.getItem('movies-app') || "[]")
    let temp = oldDate.map((movie) => movie.id) //this array will contains only ids of the movie
    this.setState({
      favourites: [...temp]
    })
  }

  render() {
    return (
      <>
        {
          this.state.movies.length == 0 ?
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div> :
            <div>
              <h3 className='text-center'><strong>Trending</strong></h3>
              <div className="movies-list">
                {
                  this.state.movies.map((movieObj) => (
                    <div className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                      <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img" />
                      {/* <div className="card-body"> */}
                      <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                      {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                      <div className="button-wrapper" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        {
                          this.state.hover == movieObj.id &&
                          <a className="btn btn-primary movies-button" onClick={() => this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove from favourites" : "Add to favourites"}</a>
                        }
                      </div>
                    </div>
                  ))
                }


              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                    {
                      this.state.parr.map((value) => (
                        <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>

                      ))
                    }
                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                  </ul>
                </nav>
              </div>
            </div>
        }
      </>
    )
  }
}
