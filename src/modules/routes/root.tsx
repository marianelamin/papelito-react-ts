import { Routes } from 'react-router-dom'

export function Root() {
  return (
    <div>
      <h1>Nothing to see.</h1>
      <Routes>{/* <Route path="/room/*" element={<LAZY_VIEWS.ROOM />} /> */}</Routes>
    </div>
  )
}
