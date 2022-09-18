import React, {useContext, useEffect,useState} from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php' 

const AppProvider = ({ children }) => {

  const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if(favorites) {
      favorites = JSON.parse(localStorage.getItem('favorites'))
    } else {
      favorites = []
    }
    return favorites
  }
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

  const selectMeal = (idMeal) => {
    let meal;
    if(favorites) {
      meal = favorites.find((meal)=> meal.idMeal === idMeal);
    } 
    if(meal===undefined) {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  }

  
  const addToFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal)
    if(alreadyFavorite) return
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }
  
  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  }
  
  const fetchMeals = async(url) => {
    setLoading(true)
      try{
        const { data } = await axios(url);
        if(data.meals)
        {
          setMeals(data.meals);
        }
        else{
          setMeals([]);
        }
      } catch (error) {
        console.log(error.response);
      }
    setLoading(false)
  }

  const closeModal = () => {
    setShowModal(false)
  }
  
  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  },[searchTerm])
  
  return (
    <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites}}>
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext);
}
export { AppContext, AppProvider }