import React from 'react'
import supabase from '../config/supabaseClient'

export default function TempComponent() {
  console.log(supabase)
  return (
    <div>
      <h1>Hio</h1>
    </div>
  )
}
