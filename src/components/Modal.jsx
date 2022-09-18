import {useGlobalContext} from '../context'
import {useState, useEffect } from 'react'

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();
  const { strMealThumb: image, strMeal: title, strInstructions: text, strSource: source } = selectedMeal
  
  return (
    
    <aside className="modal-overlay">
      <div className="modal-container">
          <img src={image} className="img modal-img"/>
          <div className="modal-content">
            <div className="arrange">
              <h4>{title}</h4>
              <div>
                <a href={source} target="_blank">Original Source</a>
                <button className="btn btn-hipster close-btn" onClick={closeModal}>Close</button>
              </div>
            </div>
            <p>Cooking Instructions</p>
            <p>{text}</p>
          </div>
      </div>
    </aside>
  )
}
export default Modal