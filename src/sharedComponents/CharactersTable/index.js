import "antd/dist/antd.css";
import React, { useState } from "react";
import { Input, Button, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./styles.css";

export default function CharactersTable({ data }) {
  const tableData = [];
  data.forEach((element) => {
    tableData.push({
      key: element.mass + element.created,
      name: element.name,
      gender: element.gender,
      hair: element.hair_color,
      skin:element.skin_color,
      eye:element.eye_color,
      bday:element.birth_year
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
      title: "Hair Color",
      dataIndex: "hair",
      key: "hair"
    },
    {
      title: "Skin Color",
      dataIndex: "skin",
      key: "skin"
    },
    {
      title: "Eye Color",
      dataIndex: "eye",
      key: "eye"
    },
    {
      title: "Birthday",
      dataIndex: "bday",
      key: "bday"
    },
  ];

 const [searchText,setSearchText]=useState ('');
 const [searchedColumn,setSearchedColumn]=useState ('');

  
  

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
 const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const [loading,setLoading]=useState();
  const [selectedRowKeys, setSelectedRowKeys ] = useState();
  
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = !selectedRowKeys? false:  selectedRowKeys.length > 0;
  


  
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Suggest Movies
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
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
