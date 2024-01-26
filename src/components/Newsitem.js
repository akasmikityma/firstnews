import React, { Component } from 'react'

const  Newsitem =(props)=> {
  
    let {title,description,imageurl,newsurl,author,date}= props;
    return (
      <div>
        <div className="card" style={{width:"18rem"}}>
  <img src={!imageurl?"https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5ld3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-body-secondary">By {author?author:"unknown"} on{new Date(date).toGMTString()}</small></p>
    <a href={newsurl} target='-blank' className="btn btn-primary btn-sm">Go there</a>
  </div>
</div>
      </div>
    )
  
}
export default Newsitem;