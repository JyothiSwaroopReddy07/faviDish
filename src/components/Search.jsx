import { useState } from 'react'
import { useGlobalContext } from '../context'
import {SiCodechef} from 'react-icons/si'

const Search = () => {
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text){
      setSearchTerm(text);
      setText('');
    }
  }
  const handleSuprise = (e) => {
    fetchRandomMeal();
    
  }
  return (
    <header className="search-container">
      <span className="title"><SiCodechef className="iconic"/>FaviDish</span>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search for a Dish" className="form-input" onChange={handleChange} value={text}/>
        <button type="submit" className="btn">Search</button>
        <button type="button" className="btn btn-hipster" onClick={handleSuprise}>Suggest me a dish</button>
      </form>
    </header>
  )
}

export default Search