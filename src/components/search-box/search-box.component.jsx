import './search-box.css';

export const SearchBox = ({ label, filterContacts }) => {
  return(
    <div className="search-box">
      <label htmlFor="SearchBox">{label}: </label>
      <input
        type="search"
        id="SearchBox"
        className="search-box__input"
        onChange={filterContacts}
      />
    </div>
  )
}