const deleteQueryParam = ({ key, searchParams, setSearchParams }) => {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.delete(key);
  setSearchParams(newSearchParams);
};

export default deleteQueryParam;
