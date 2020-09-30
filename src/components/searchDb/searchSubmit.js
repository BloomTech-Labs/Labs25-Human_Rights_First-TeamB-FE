/// Imports ////
import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Collapsible from 'react-collapsible';
import Moment from 'react-moment';

function useHook(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://labs25-hrf-teamb-api.herokuapp.com/api`
        );
        const json = await response.json();
        setResults(
          json.map(item => {
            return item;
          })
        );
      } finally {
        setLoading(false);
      }
    }
    if (query !== '') {
      fetchData();
    }
  }, [query]);
  return [results, loading];
}

export default function AsyncHooks() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, loading] = useHook(query);
  const [middle, setMiddle] = useState('');

  // Middle is used to as middle layer between main state and query state.
  // This is used to prevent the component from automatically updating onChange.
  // We only want state to update under the hood, and render new components onSubmit.

  const filteredResults = results.filter(
    item =>
      item.Event.title.toLowerCase().includes(search.toLowerCase()) ||
      item.Event.state.toLowerCase().includes(search.toLowerCase()) ||
      item.Event.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-div">
      <div className="form-div">
        <form
          onSubmit={e => {
            e.preventDefault();
            // had to come up with a little hack so that state doesn't update component when changing search input
            setQuery(search); // Query the first search
            setQuery(middle); // Query the middle state
            setSearch(middle); // set our search state/main state to reflect the middle state.
            // store the input in a 'middle' state that doesn't directly update component. Update component onSubmit.
          }}
        >
          <h2>Search Events</h2>
          <input
            className="search-form"
            value={middle}
            onChange={
              e => {
                setMiddle(e.target.value);
              } // set our middle layer of state
            }
            placeholder="i.e. New York..."
          />
          <button className="search-button" type="submit">
            {' > '}
          </button>
        </form>
      </div>
      <div className="searchResults">
        {loading ? (
          <div className="Loader">
            <Loader
              type="TailSpin"
              color="#bc541e"
              height={75}
              width={75}
              timeout={3000} //3 secs
            />
          </div>
        ) : (
          filteredResults.map(entry => (
            <>
              <Collapsible
                trigger={entry.Event.title}
                triggerSibling={() => (
                  <>
                    <div className="sibling">
                      {entry.Event.city}, {entry.Event.state}.{' '}
                      <Moment format="dddd-DD-MMMM-YYYY">
                        {entry.Event.date}
                      </Moment>
                    </div>
                  </>
                )}
                lazyRender={true}
                transitionTime={100}
                overflowWhenOpen={'hidden'}
              >
                {entry.Event.links.map(element => (
                  <a href={element} className="search-links" target="_blank">
                    {' '}
                    &#8226; {element} <br />{' '}
                  </a>
                ))}
              </Collapsible>
            </>
          ))
        )}
      </div>
    </div>
  );
}
