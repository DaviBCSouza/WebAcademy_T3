import React, { useEffect, useState } from "react";
import placeholderImg from "./images/undraw_relaxing_walk.svg";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [randomDogInfo, setRandomDogInfo] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setBreeds(Object.keys(json.message));
      });
  }, []);

  useEffect(() => {
    // https://dogapi.dog/docs/api-v2
    fetch("https://dogapi.dog/api/v2/facts")
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setRandomDogInfo(json.data);
      });
  }, []);

  const searchByBreed = () => {
    setIsLoading(true);
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images`)
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setIsLoading(false);
        setDogImages(json.message);
      });
  };

  return (
    <div className="d-flex justify-content-center flex-column text-center">
      <header>
        <h1 className="mt-4 mb-5">Doggy Directory 🐶</h1>
      </header>
      <main role="main">
        <div className="d-flex justify-content-center">
          <select
            className="form-select w-25"
            aria-label="Select a breed of dog to display results"
            value={selectedBreed}
            onChange={(event) => setSelectedBreed(event.target.value)}
          >
            <option value="" disabled>
              Select a breed
            </option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-info mx-2"
            disabled={!selectedBreed}
            onClick={searchByBreed}
          >
            Search
          </button>
        </div>

        {randomDogInfo !== "" && dogImages.length === 0 && !isLoading ? (
          <div className="mt-5">
            <h5>Random Dog Info:</h5>

            <p>{randomDogInfo[0]?.attributes?.body}</p>
          </div>
        ) : null}

        {dogImages.length > 0 && !isLoading && (
          <div className="px-5 mx-5 text-end" data-testid="results-count">
            <p className="fs-5">{dogImages.length} results</p>
          </div>
        )}
        <div className="mt-5 d-flex justify-content-center flex-wrap px-5 mx-5">
          {dogImages.length === 0 && !isLoading && (
            <img
              src={placeholderImg}
              className="mx-auto d-block mt-4 w-50"
              alt=""
            />
          )}
          {isLoading && (
            <div className="d-flex align-items-center ">
              <p className="h1 me-2">Loading</p>
              <output
                className="spinner-border ms-auto text-info fs-3"
                aria-live="polite"
              ></output>
            </div>
          )}
          {dogImages.length > 0 &&
            !isLoading &&
            dogImages.map((imgSrc, index) => (
              <img
                key={`${index}-${selectedBreed}`}
                src={imgSrc}
                className="img-thumbnail w-25"
                alt={`${selectedBreed} ${index + 1} of ${dogImages.length}`}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
