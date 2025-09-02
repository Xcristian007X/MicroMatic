//Crear estado inicial de un estado y el reducer (objeto)

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    post: null,
    post2: [],
    post3: null,
    post4: [],
    rutaS: "1A",
    modal2: false,
    position: null,
    modal: false
}

export const busSlice = createSlice({
  name: 'SectionBus',
  initialState: initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload.post
    },
    setPost2: (state, action) => {
      state.post2 = action.payload.post2
    },
    setPost3: (state, action) => {
      state.post3 = action.payload.post3
    },
    setPost4: (state, action) => {
      state.post4 = action.payload.post4
    },
    setrutaS: (state, action) => {
      state.rutaS = action.payload.rutaS
    },
    setmodal: (state, action) => {
      state.modal = action.payload.modal
    },
    setmodal2: (state, action) => {
      state.modal2 = action.payload.modal2
    },
    setPosition: (state, action) => {
      state.position = action.payload.position
    },
    unsetSection: (state) => {
      state.post = null
      state.post2 = null
      state.post3 = null
      state.post4 = null
      state.rutaS = null
      state.modal = null
      state.modal2 = null
      state.position = null
    },
    unsetPost3: (state) => {
      state.post3 = null
      state.rutaS = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPost, setPost2, setPost3, setPost4, setrutaS, setmodal, setmodal2, setPosition, unsetSection, unsetPost3} = busSlice.actions

export default busSlice.reducer