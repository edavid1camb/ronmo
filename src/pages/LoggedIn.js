import React from "react";
import json from "./data.json";

const Item = ({ item }) => <div>{item.name}</div>;

export const LoggedIn = () => {
  return (
    <div>
      {json.data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
