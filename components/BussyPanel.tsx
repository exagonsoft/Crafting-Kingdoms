import React from 'react'
import LoadingAnimation from './LoadingAnimator'

const BusyPanel = () => {
  return (
    <div className='dialog_container'>
      <div className="dialog_blur"></div>
      <div className="busy_form">
        <LoadingAnimation />
      </div>
    </div>
  )
}

export default BusyPanel
