import React from 'react'
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from "./styles.module.css"
import { createReview, getReviews } from '../../redux/reviewReducer'
import { useParams } from 'react-router';
import CardReview from '../CardReview'

const Reviews = () => {

  const [reviewForm, setReviewForm] = useState({
    description: "",
    raiting: "",
  })
  
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getReviews(id))
  }, [])

  const reviews = useSelector(state => state.reviews)

  const onChangeReview = (e) => {
    const { name, value } = e.target;
    console.log(reviewForm)
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const onSumbit = (e) => {
    e.preventDefault();
    dispatch(createReview({id, reviewForm}))
  }

  

  return (
    <div className={styles.reviews}>
      <h1>REVIEWS</h1>
      <h3 className={styles.subTitle} >Write your review</h3>

      <div className={styles.writeReviews} >
        <h3>Raiting</h3>
        <form onSubmit={onSumbit}>
          <input 
            type='number'
            max='5'
            min='1'
            name='raiting'
            placeholder= '1'
            onChange={onChangeReview}
          />
          <textarea 
            type='text'
            placeholder='Escribe aqui tu review'
            name='description'
            cols='100'
            rows='5'
            onChange={onChangeReview}
          />
          <button
            type='submit'
          > Send </button>
        </form>
      </div>

       {/* EJEMPLO DE REVIEW */}
      <h3 className={styles.subTitle}>All reviews</h3>

      {reviews.reviews.map((review) => {
        return <CardReview key={review.id} review={review} />;
      })}

      {/* 
      <div className={styles.cardReviews}>
        <h3>Zappas Adidas <span>*****</span></h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo facere quod corporis iusto doloribus natus, at tempore libero iure enim sed tempora incidunt quas asperiores, molestiae ipsam nostrum unde est?</p>
      </div> */}
    </div>
  );
}
 
export default Reviews;