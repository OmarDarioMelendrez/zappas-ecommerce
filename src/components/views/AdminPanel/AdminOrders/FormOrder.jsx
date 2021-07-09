import React, {useState} from 'react'
import axios from 'axios';
import styles from './styles.module.css'
 
const FormOrder = ({order,user, onSubmit}) => {

  const [state, setState] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(state === "confirmed"){
      await axios.patch(`/api/cart/${order.id}/confirmed`)
      onSubmit()
    } else if(state === "rejected" ) {
      await axios.patch(`/api/cart/${order.id}/rejected`)
      onSubmit()
    } else {
      return
    }
  }

   return (
     <div>
       <div className={styles.orderList}>
        <h4>N° Orden: {order.id}</h4>
        <h4> Usuario: {user.firstName}</h4>
        <h4> Estado : <span>{order.state}</span> </h4>
        <form onSubmit={(e)=> {handleSubmit(e)}}>
          <label htmlFor="orderState">Cambiar estado:</label>
          <select name="state" id="orderState" onChange={(e) => {setState(e.target.value)}}>
            <option value="null">selecciona estado</option>  
            <option value="confirmed">Confirmado</option>  
            <option value="rejected">Rechazado</option>  
          </select>      
          <button
            className={styles.confirmar}
            type='submit'
          > Confirmar </button>
        </form>
      </div>
     </div>
   );
 }
  
 export default FormOrder;