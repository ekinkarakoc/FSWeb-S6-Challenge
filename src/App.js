import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Karakterler from "./components/Karakterler";
import Pagination from "./components/Pagination";

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");

  const changeHandler = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/")
      .then((res) => {
        console.log(res.data);
        const searchResults = res.data.results.filter((item) => {
          return (
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.hair_color.toLowerCase().includes(search.toLowerCase())
          );
        });
        setCharacters(searchResults);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [search]);

  // Fetch characters from the API in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  return (
    <div className="App">
      <Header search={search} changeHandler={changeHandler} />
      <Karakterler characters={characters} />
      <Pagination />
    </div>
  );
};

export default App;
