import { Routes } from 'react-router-dom'

export function Root() {
  return (
    <div>
      <h1>Oops! Doesn't seem we have anything here.</h1>
      <h2>Nothing to see.</h2>
      <Routes>{/* <Route path="/room/*" element={<LAZY_VIEWS.ROOM />} /> */}</Routes>
    </div>
  )
}
