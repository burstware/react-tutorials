import React from 'react'

const Context = React.createContext('light')

export default function ContextConsumer() {
  return (
    <Context.Provider value="dark">
      <div></div>
    </Context.Provider>
  )
}
