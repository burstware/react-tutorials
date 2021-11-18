import React, { useState } from 'react'
import './App.css'
import ReactDnd from './DragAndDrop/DragAndDrop'
import UsePrevious from './UsePrevious'

function App() {
  const [selection, setSelection] = useState('')
  return (
    <div
      style={{
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}
    >
      <h1 style={{ cursor: 'pointer' }} onClick={() => setSelection('')}>
        Tutorials
      </h1>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li
          style={{
            cursor: 'pointer',
            color: selection === 'react-dnd' ? 'red' : 'blue'
          }}
          onClick={() => setSelection('react-dnd')}
        >
          react-dnd
        </li>
        <li
          style={{
            cursor: 'pointer',
            color: selection === 'use-previous' ? 'red' : 'blue'
          }}
          onClick={() => setSelection('use-previous')}
        >
          use-previous
        </li>
      </ul>
      {selection === 'react-dnd' && <ReactDnd />}
      {selection === 'use-previous' && <UsePrevious />}
    </div>
  )
}

export default App
