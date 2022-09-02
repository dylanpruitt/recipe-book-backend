import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from './features/recipeSlice'

export default configureStore({
  reducer: {
    recipe: recipeReducer
  },
})