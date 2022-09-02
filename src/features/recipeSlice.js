import { createSlice } from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    values: [
      {
        title: "Test",
        description: "Also test",
        ingredients: [
          { value: "test" },
          { value: "test" },
        ],
        directions: [
          { value: "test test test" },
          { value: "test test test" },
        ]
      }
    ],
  },
  reducers: {
    update: (state, action) => {
      state.values = action.payload.slice();
    },
  },
})

export const { update } = recipeSlice.actions

export default recipeSlice.reducer