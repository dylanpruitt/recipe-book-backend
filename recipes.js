
/**
 *  THIS FILE WILL GET DELETED LATER ONCE DATABASES ARE IMPLEMENTED
 *  FOR NOW, THIS IS JUST TESTING EVERYTHING ON STATIC SITES FIRST
 */

let dorianMacAndCheese = {
    id: 1,
    name: "Dorian's Mac and Cheese",
    description: "Probably my favorite recipe for mac and cheese. Takes about 15-25 minutes.",
    directions: "In sauce pot, combine pasta, salt, and 1 1/2 cups water.\nPlace pot on oven and heat on high.\nStir pasta occasionally. When water boils, start tracking the pasta cook time.\nIn a bowl, combine 1 tsp. cornstarch and 2 tbsp. cold water. Stir to form slurry mix.\nOn a cutting board, cut cheese into small pieces. Sprinkle 1 tsp. cornstarch over cheese, and mix until cheese is completely covered in cornstarch.\nIf pasta water is evaporating too quickly, reduce heat and add 1/2 cup hot water to pot.\nThis is the trickiest part about this recipe - it's easy to think you need to add more water than\nyou have.\nOnce pasta is done cooking, reduce to low. Stir slurry and add to pot.\nStir pot until slurry is thick (about 1 minute).\nAdd cheese mix to pot, and turn heat to medium. Stir pot until cheese mix is thick (about 1 minute).\nRemove from heat and serve with pepper..\nIn sauce pot, combine pasta, salt, and 1 1/2 cups water.\nPlace pot on oven and heat on high.\nStir pasta occasionally. When water boils, start tracking the pasta cook time.\nIn a bowl, combine 1 tsp. cornstarch and 2 tbsp. cold water. Stir to form slurry mix.\nOn a cutting board, cut cheese into small pieces. Sprinkle 1 tsp. cornstarch over cheese, and\nmix until cheese is completely covered in cornstarch.\nIf pasta water is evaporating too quickly, reduce heat and add 1/2 cup hot water to pot.\nThis is the trickiest part about this recipe - it's easy to think you need to add more water than\nyou have.\nOnce pasta is done cooking, reduce to low. Stir slurry and add to pot.\nStir pot until slurry is thick (about 1 minute).\nAdd cheese mix to pot, and turn heat to medium. Stir pot until cheese mix is thick (about 1 minute).\nRemove from heat and serve with pepper.",
    ingredients: ["1/4 lb pasta", "1 1/2 oz. cheese (without anti-caking agents)", "2 teaspoons cornstarch", "water", "1/2 teaspoon salt", "pepper, to taste"]
};

let strawberrySmoothie = {
    id: 2,
    name: "Strawberry Smoothie",
    description: "An easy recipe for a strawberry smoothie.",
    directions: "Combine all ingredients in blender, and blend until smooth and creamy.",
    ingredients: ["8 strawberries, hulled", "1/2 cup milk", "1/2 cup vanilla yogurt", "1 tablespoon white sugar", "2 teaspoons vanilla extract"]
};

let ovenPulledChicken = {
    id: 3,
    name: "Oven Pulled Chicken",
    description: "I used this to make BBQ chicken in the oven, to get around not having a crock pot / slow cooker.",
    directions: "Preheat oven to 350*F, and place aluminum foil in a baking tray.\nCut several slices in each chicken breast, and place chicken on a baking tray.\nCombine sauce ingredients and pour evenly over chicken breasts, making sure to get some in the cuts.\nCool for 40-45 minutes.\nPlace chicken into large bowl and shred.",
    ingredients: ["2 boneless chicken breasts", "sauce of your choosing"]
};

let peanutButterCookies = {
    id: 4,
    name: "Peanut Butter Cookies",
    description: "I think this recipe comes from a Betty Crocker cookbook - I used to bake this all the time with my nana.",
    directions: "Mix sugars, peanut butter, butter, and egg in large bowl. Stir in remaining ingredients.\nHeat oven to 375 *F.\nShape dough into small balls, roll into sugar, and place on ungreased cookie sheet. Flatten in crisscross pattern with fork.\nBake about 10 minutes or until golden brown.\nRemove from heat and cool.",
    ingredients: ["1/2 cup granulated sugar", "1/2 cup packed brown sugar", "1/2 cup peanut butter", "1/2 cup butter, softened", "1 egg", "1 1/4 cups flour", "3/4 teaspoon baking soda", "1/2 teaspoon baking powder"]
};

let recipes = [dorianMacAndCheese, strawberrySmoothie, ovenPulledChicken, peanutButterCookies];

const getRecipeByID = (id) => {
    let data = null;

    recipes.forEach((recipe, index) => {
        if (recipe.id == id) {
            data = recipe;
        }
    });

    return data;
}

