import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HomepageSlider from "../home/HomepageSlider";

const BlogList = ()=>{
  return(
    <div>
      {/* <HomepageSlider/> */}
      <div>
        <div>
          <img>Background image</img>
          <h4>-STORIES & GUIDES</h4>
          <h1>The Himalayan Journey</h1>
          <p>Expert advice,gear guides, and inspiration for your next adventure.</p>
          <input type="search bar" placeholder="Search on the basis of title"/>
        </div>
        <div>
          <h3>Categories</h3>
          <Buttons>All stories</Buttons>
          </div>
          <div>
            <span>cards</span>
            <img>Image</img>
            <p>{BlogList.category} </p>
          </div>
      </div>
    </div>

  )

};
export default BlogList;