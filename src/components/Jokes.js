import React, { useEffect, useState } from "react";

const RANDOM_JOKES_API = "https://api.chucknorris.io/jokes/random";
const GET_CATEGORIES = "https://api.chucknorris.io/jokes/categories";
const SEL_CATEGORY = "https://api.chucknorris.io/jokes/random?";

const Jokes = () => {
  const [jokes, setJokes] = useState("");
  const [cat, setCat] = useState("");
  const [selectedCat, setSelectedCat] = useState("animal");
  const [categoryJokes, setCategoryJokes] = useState("");

  const getJokes = async () => {
    const response = await fetch(RANDOM_JOKES_API);
    const result = await response.json();
    console.log("result is", result);
    setJokes(result.value);
  };

  const getCategories = async () => {
    const response = await fetch(GET_CATEGORIES);
    const result = await response.json();
    console.log("cat is", result);
    setCat(result);
  };

  const getSelectedCategoryJokes = async () => {
    const response = await fetch(`${SEL_CATEGORY}/category=${selectedCat}`);
    const result = await response.json();
    console.log("cat jokes", result);
    setCategoryJokes(result.value);
  };

  const onClickJokesBtn = () => {
    getJokes();
  };
  const onCategoryChangeHandler = (e) => {
    console.log(e.target.value);
    setSelectedCat(e.target.value);
    getSelectedCategoryJokes();
  };

  useEffect(() => {
    getJokes();
    getCategories();
  }, []);

  return (
    <>
      <div className="jokes">
        {jokes && (
          <h3
            className="jokes-main"
            dangerouslySetInnerHTML={{ __html: jokes }}
          />
        )}
        <button className="btn" onClick={onClickJokesBtn}>
          Generate Jokes
        </button>
        <label for="category">Choose a category</label>
        <select
          className="select-cat"
          name="category"
          onChange={onCategoryChangeHandler}
        >
          {cat &&
            cat.map((categ) => {
              return <option name={categ}>{categ}</option>;
            })}
        </select>
        {categoryJokes && <p className="jokes-sub">{categoryJokes}</p>}
      </div>
    </>
  );
};

export default Jokes;
