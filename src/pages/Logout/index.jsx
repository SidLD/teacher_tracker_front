import React, { useEffect } from 'react'
import { auth } from '../../lib/services'

export const LogOut = () => {
    useEffect( () => {
        auth.clear()
        window.location.href="/"
    })
  return (
    <div></div>
  )
}
