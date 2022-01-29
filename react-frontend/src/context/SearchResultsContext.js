import React, { useState } from 'react';

const SearchResultsContext = React.createContext();

export default SearchResultsContext;

export const useSearchResults = () => {
  const context = React.useContext(SearchResultsContext);
  if (!context)
    throw new Error(
      `useSearchResults must be used within a SearchResultsProvider`
    );

  return context;
};

export const SearchResultsProvider = (props) => {
  const [twdResults, setTwdResults] = useState(undefined);
  const [cryptResults, setCryptResults] = useState(undefined);
  const [libraryResults, setLibraryResults] = useState(undefined);

  return (
    <SearchResultsContext.Provider
      value={{
        twdResults,
        setTwdResults,
        cryptResults,
        setCryptResults,
        libraryResults,
        setLibraryResults,
      }}
    >
      {props.children}
    </SearchResultsContext.Provider>
  );
};
