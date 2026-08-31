// import React, { useEffect, useState } from "react";
// import BlogList from "../sections/blog/BlogList";
// const blogListAPI = "/api/v1/blogs";

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     fetch(blogListAPI)
//       .then((response) => {
//         console.log("STATUS:", response.status);
//         console.log("OK:", response.ok);

//         return response.json();
//       })
//       .then((result) => {
//         console.log("FULL RESPONSE:", result);
//         console.log("DATA:", result.data);
//         console.log("DATA LENGTH:", result.data?.length);

//         setBlogs(result.data || []);
//       })
//       .catch((error) => {
//         console.error("FETCH ERROR:", error);
//       });
//   }, []);

//   console.log("BLOGS STATE:", blogs);

//   return (
//     <section className="bg-white p-10">
//       <h1 className="mb-8 text-4xl font-bold text-black">Latest Blogs</h1>

//       <p className="mb-8 text-black">Number of blogs: {blogs.length}</p>

//       <div className="grid grid-cols-4 gap-6">
//         {blogs.map((blog) => (
//           <div
//             key={blog.id}
//             className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
//           >
//             {/* Image */}
//             <img
//               src={blog.image || "/images/MOUNT.jpg"}
//               alt={blog.title}
//               className="h-52 w-full object-cover"
//               onError={(e) => {
//                 e.currentTarget.src = "/images/MOUNT.jpg";
//               }}
//             />

//             {/* Blog Information */}
//             <div className="p-5">
//               {/* Title */}
//               <h2 className="mb-3 text-2xl font-bold text-black">
//                 {blog.title}
//               </h2>

//               {/* Slug */}
//               <p className="mb-2 text-sm text-gray-500">
//                 <span className="font-semibold text-black">Slug:</span>{" "}
//                 {blog.slug}
//               </p>

//               {/* Excerpt */}
//               <p className="mb-3 text-gray-700">
//                 <span className="font-semibold text-black">Excerpt:</span>{" "}
//                 {blog.excerpt}
//               </p>

//               {/* Description - 20 words */}
//               <p className="text-gray-600">
//                 <span className="font-semibold text-black">Description:</span>{" "}
//                 {blog.description?.split(" ").slice(0, 20).join(" ")}
//                 {blog.description?.split(" ").length > 20 && "..."}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//     </section>
//   );
// };

// export default Blogs;

import React from "react";
import BlogList from "../sections/blog/BlogList";
import MostReadBlog from "../sections/blog/MostReadBlog";


const Blogs = () => {
  return (
    <div className="">
      <BlogList variant="large"/>
      <MostReadBlog />
      

    </div>
  );
};

export default Blogs;
