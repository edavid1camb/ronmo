import { Box, Button, ButtonGroup, Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Select } from "../components/Select";
import json from "./data.json";

const Item = ({ item }) => (
  <Box display="flex" justifyContent="space-between">
    <div>{item.id}</div>
    <div>{item.title}</div>
  </Box>
);

const pageSize = 10;
const sortOptions = [
  { value: "ASC", label: "ascending" },
  { value: "DES", label: "descending" },
];

export const LoggedIn = () => {
  const [data, setData] = useState(json.data);
  const [page, setPage] = useState(1);
  const [pagedData, setPagedData] = useState([]);
  const [pages, setPages] = useState([]);
  const [sort, setSort] = useState("ASC");

  const fetchData = () => {
    const offset = (page - 1) * pageSize;
    const dataToSet = data.slice(offset, offset + pageSize);

    setPagedData(dataToSet);
  };

  const onIdSort = (sort) => {
    const sorted = json.data.sort((a, b) => {
      if (sort === "ASC") return a.id > b.id ? 1 : -1;

      return a.id > b.id ? -1 : 1;
    });

    setData(sorted);
    setSort(sort);
    setPage(1);
  };

  useEffect(() => {
    fetchData();
  }, [page, sort]);

  useEffect(() => {
    const availablePagesLen = Math.ceil(data.length / pageSize);
    // create array from 1 to pages length
    const availablePages = Array.from(Array(availablePagesLen).keys()).map(
      (p) => p + 1
    );
    setPages(availablePages);
  }, []);

  return (
    <Container>
      <Select
        label="id sort"
        value={sort}
        options={sortOptions}
        setValue={onIdSort}
      />

      {pagedData.map((item) => (
        <Item key={item.id} item={item} />
      ))}

      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        {pages.map((page) => (
          <Button key={page} onClick={() => setPage(page)}>
            {page}
          </Button>
        ))}
      </ButtonGroup>
    </Container>
  );
};
