const updateQueryParam = ({ key, value, searchParams, setSearchParams }) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(key, value);
  setSearchParams(newSearchParams);
  return;
};

export default updateQueryParam;
