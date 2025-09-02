import { configureStore } from '@reduxjs/toolkit'

//reducer (actualizar states)
import busReducer from '../reducers/busSlice'

export default configureStore({
  reducer: {
    Section: busReducer
  },
  })
