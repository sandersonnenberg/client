import "antd/dist/antd.css";
import React from "react";
import {  Table } from "antd";
import PropTypes from "prop-types";
import "./styles.css";

export default function MoviesTable({ data }) {
  const tableData = [];
  debugger;
  data.forEach((element) => {
    tableData.push({
      key: element.url.replace("http://swapi.dev/api/", "").replaceAll("\/", "-"),
      name: element.name,
      gender: element.gender,
      url: element.url
    });
  });

 
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url"
    }
  ];



  return (
    <div className="table-container">

      <Table
        columns={columns}
        className="star-wars-movies-table"
        dataSource={tableData}
      />
    </div>
  );
}

MoviesTable.propTypes = {
  data: PropTypes.array.isRequired,
};
