import {useGlobalContext} from '../context'
import {AiOutlineFire} from 'react-icons/ai'
const Meals = () => {

  const { loading , meals, selectMeal, addToFavorites }  = useGlobalContext();
  if(loading){
    return <section className="section">
            <h4>Loading...</h4>
        </section>
  }
  if(meals.length === 0){
    return <section className="section">
              <h4>No items found.Try Something different!!!</h4>
            </section>
  }
  return (
    <section className="section-center">
      {
        meals.map((singleMeal) => {
          const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
          return <article key={idMeal} className="single-meal">
                    <img src={image} style={{width: '100%'}} className="img" onClick={() => selectMeal(idMeal)}/>
                    <footer>
                      <h5>{title}</h5>
                      <button className='like-btn' onClick={()=> addToFavorites(idMeal)} ><AiOutlineFire/></button>
                    </footer>
              </article>
        })
      }
    </section>
  )
}
export default Meals