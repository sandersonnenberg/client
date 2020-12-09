import "antd/dist/antd.css";
import React, { useState } from "react";
import { Input, Button, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { StarTwoTone, StarFilled, SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./styles.css";
import { useHistory } from 'react-router-dom';

export default function CharactersTable({ data }) {
  const history = useHistory();
  const tableData = [];
  const [selectedRowKeys, setSelectedRowKeys] = useState();

  data.forEach((element) => {
    tableData.push({
      key: element.url.replace("http://swapi.dev/api/", "").replaceAll("\/", "-"),
      name: element.name,
      gender: element.gender,
      url: element.url
    });
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input

          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',

    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
          text
        ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name')
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

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');



//handle on click and route to the next page
  const moveToNextScreen = () => {
    history.push(`/movies:${selectedRowKeys.join(",")}`);
  };
  
  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const [loading] = useState();

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = !selectedRowKeys ? false : selectedRowKeys.length > 0;

  return (
    <div className="table-container">
      <div style={{ marginBottom: 16, display: 'flex' }}>
        <Button
          type="primary"
          className="suggest-movies-btn"
          onClick={moveToNextScreen}
          disabled={!hasSelected}
          loading={loading}
        >
          {hasSelected ? <StarFilled className={hasSelected ? 'yellow-star' : ''} /> : <StarTwoTone />} Suggest Movies
        </Button>
        <span style={{ margin: "auto 0px auto 8px" }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} characters` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        pagination={false}
        className="star-wars-table"
        dataSource={tableData}
      />
    </div>
  );
}

CharactersTable.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
};
