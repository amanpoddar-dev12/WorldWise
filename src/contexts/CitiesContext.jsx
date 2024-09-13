import { createContext, useReducer, useEffect, useContext } from "react";

const URL = `http://localhost:9000`;
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
  };

  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };
      case "cities/loaded":
        return {
          ...state,
          isLoading: false,
          cities: action.payload,
        };
      case "city/loaded":
        return {
          ...state,
          isLoading: false,
          currentCity: action.payload,
        };
      case "city/created":
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };

      case "city/deleted":
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
          currentCity: {},
        };

      case "rejected":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        throw new Error("Unknown action type");
    }
  }
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function getCityData() {
      try {
        // setLoading(true);
        dispatch({ type: "loading" });
        let res = await fetch(`${URL}/cities`);
        let citiesData = await res.json();
        console.log(citiesData); // Optional: remove or replace with a proper logging solution
        // setCities(citiesData);
        dispatch({ type: "cities/loaded", payload: citiesData });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    getCityData();
  }, []);
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });
      let res = await fetch(`${URL}/cities/${id}`);
      let citiesData = await res.json();
      console.log(citiesData); // Optional: remove or replace with a proper logging solution

      dispatch({ type: "city/loaded", payload: citiesData });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error  in getcity...",
      });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      // setLoading(true);
      let res = await fetch(`${URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let citiesData = await res.json();
      console.log(citiesData); // Optional: remove or replace with a proper logging solution

      dispatch({ type: "city/created", payload: citiesData });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating createCity...",
      });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error in delteCity...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const cities = useContext(CitiesContext);
  if (cities === undefined) return Error("Cities used in another component");
  return cities;
}

export { CitiesProvider, useCities };
