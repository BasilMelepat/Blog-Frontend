import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Config/axiosConfig";
import BlogCard from "../components/BlogCard";
import { Pagination } from "antd";


const Home = () => {
  const [apidata, setapidata] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(1);
  const limit = 2;

  useEffect(() => {
    BlogApi();
  }, [currentPage]);

  useEffect(() => {
    if (apidata?.total) {
      setTotalPages(apidata?.total / limit);
    }
  }, [apidata]);

  const BlogApi = () => {
    axiosInstance({
      url: `/Blog/createdBlog?limit=${limit}&&skip=${currentPage}`,
      method: "GET",
    }).then((res) => {
      setapidata(res.data);
      // setTotalCount(res.data.TotalCount[0].TotalCount);
    });
  };

  const handlePageChange = (page, pageSize) => {
    setcurrentPage(page);
    setPageNumbers(pageSize);
    console.log(pageSize, "pageSizepageSizepageSizepageSize");
  };
  return (
    <section className="flex items-center flex-col">
      <div className="mt-20 p-2 flex flex-wrap gap-5">
        {apidata?.blogs?.map((item) => (
          <BlogCard item={item} key={item._id} />
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={pageNumbers}
        // pageSizeOptions={[2, 3, 4]}
        total={totalPages}
        onChange={handlePageChange}
        className="mt-5"
      />
    </section>
  );
};

export default Home;
