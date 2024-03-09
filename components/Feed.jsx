"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };

    fetchPost();
  }, []);
  //New Changes
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a userName"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <div className="mt-16 prompt_layout">
          {searchedResults.map((searchedResult) => (
            <PromptCard
              key={searchedResult._id}
              post={searchedResult}
              handleTagClick={handleTagClick}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 prompt_layout">
          {allPosts.map((post) => (
            <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Feed;
