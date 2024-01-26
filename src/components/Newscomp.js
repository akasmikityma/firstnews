import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

class Newscomp extends Component {
  static defaultProps = {
    pageSize: 5,
    category: 'general',
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  
  capfirstletter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      // Add a category prop in the component's state
      currentCategory: '',
    };
    // document.title=`${this.capfirstletter(this.props.category)}- Nuewss`
  }

  async componentDidMount() {
    // Update the component state with the current category prop
    this.setState({ currentCategory: this.props.category });
    this.fetchNews();
  }

  componentDidUpdate(prevProps) {
    // Check if the category prop has changed, and if so, fetch new data
    if (this.props.category !== prevProps.category) {
      this.setState({ currentCategory: this.props.category, articles: [] }, () => {
        this.fetchNews();
      });
    }
  }

  async fetchNews() {
    const { currentCategory, page } = this.state;
    const { pageSize } = this.props;
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${currentCategory}&apiKey=caf5b9650b9743f5b48787805928f9a2&page=${page}&pageSize=${pageSize}`;

    this.setState({ loading: true });

    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    }
     this.props.setProgress(100);
  }

  handlePreviousClick = async () => {
    // Handle previous click
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, () => {
        this.fetchNews();
      });
    }
  };

  handleNextClick = async () => {
    // Handle next click
    if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchNews();
      });
    }
  };

  render() {
    const { loading, articles, page, totalResults } = this.state;

    return (
      <div className='container my-3' style={{margin:" 0px 0px 0px 150px"}}>
        <h2 style={{textAlign:"center",margin:"30px 150px 30px 0px", color:"red"}}>Top Headlines of {this.props.category}</h2>
        {loading && <Spinner />}
        <div className='row my-8'>
          {!loading &&
            articles.map((Element) => {
              const title = Element.title?.slice(0,45);
              const description = Element.description?.slice(0, 70);
              const imageurl = Element.urlToImage;

              return (
                <div className='col-md-4' key={Element.url}>
                  <Newsitem title={title} description={description} imageurl={imageurl} newsurl={Element.url} author={Element.author} date={Element.publishedAt} />
                </div>
              );
            })}
        </div>
        <div className='container d-flex justify-content-between my-3'>
          <button type='button' disabled={page <= 1} className='btn btn-warning' onClick={this.handlePreviousClick}>
            &larr; Previous
          </button>
          <button
            type='button'
            disabled={page >= Math.ceil(totalResults / this.props.pageSize)}
            className='btn btn-warning'
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default Newscomp;