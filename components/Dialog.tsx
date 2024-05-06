import React from 'react'

const Dialog = ({icon = null, title, message, onClose = null, onAccept}) => {
  return (
    <div className='dialog_container'>
      <div className="dialog_blur"></div>
      <div className="dialog_form">
        <img src={icon ? icon : '/images/logo.png'} alt="Crafting Kingdoms" className="dialog_form_icon" />
        <h2 style={{display: 'flex', margin:0}}>{title}</h2>
        <span style={{fontSize:"1.5rem"}}>{message}</span>
        <div className="dialog_form_buttons_container">
          {onClose && <button onClick={onClose} className='dialog_form_buttom'>Cancel</button>}
          <button onClick={onAccept} className='dialog_form_buttom'>Accept</button>
        </div>
      </div>
    </div>
  )
}

export default Dialog
