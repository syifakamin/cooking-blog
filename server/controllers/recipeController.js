require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/** 
 * Get /
 * HomePage
 */

exports.homepage = async (req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chineese = await Recipe.find({ 'category': 'Chineese' }).limit(limitNumber);


        const food = { latest, thai, american, chineese };

        res.render('index', { title: 'Cooking Blog - Homepage', categories, food });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" });
    }
}



/** 
 * Get /categories
 * Categories
 */

exports.exploreCategories = async (req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Homepage', categories });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" });
    }
}



/** 
 * Get /recipes/:id
 * Recipes
 */

exports.exploreRecipe = async (req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', { title: 'Cooking Blog - Homepage', recipe });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" });
    }
}



/** 
 * Get /Category/:id
 * Category
 */

exports.exploreCategoriesById = async (req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categories', categoryById });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" });
    }
}

/** 
 * POST /Search
 * Search
 */
exports.searchRecipe = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
        res.render('search', { title: 'Cooking Blog - Search', recipe });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });

    }
}





// async function insertDymmyRecipeData() {
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Chineese steak tofu stew",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chineese",
//                 "image": "chineese-steak-tofu-stew.jpg"
//             },
//             {
//                 "name": "Chineese inspired pinch salad",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chineese",
//                 "image": "thai-chinese-inspired-pinch-salad.jpg"
//             },
//             {
//                 "name": "Tom Daley",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chineese",
//                 "image": "tom-daley.jpg"
//             },
//             {
//                 "name": "Spring Rolls",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chineese",
//                 "image": "spring-rolls.jpg"
//             },
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDymmyRecipeData();




// enable this function to insert data to mongodb

// async function insertDymyCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                 "name": "Thai",
//                 "image": "thai-food.jpg"
//             },
//             {
//                 "name": "American",
//                 "image": "american-food.jpg"
//             },
//             {
//                 "name": "Chineese",
//                 "image": "chinese-food.jpg"
//             },
//             {
//                 "name": "Mexican",
//                 "image": "mexican-food.jpg"
//             },
//             {
//                 "name": "Indian",
//                 "image": "indian-food.jpg"
//             },
//             {
//                 "name": "Spanish",
//                 "image": "spanish-food.jpg"
//             }
//         ]);
//     } catch (error) {
//         console.log('error insert', + error)
//     }
// }
// 
// insertDymyCategoryData(); 


// end insert data