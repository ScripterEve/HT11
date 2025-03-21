import mongoose from 'mongoose';


const extractRecipes = (responseText) => {
    const recipeBlocks = responseText.split("\n\n");
    return recipeBlocks
      .map((block) => {
        const lines = block.split("\n");
        if (lines.length < 3) return null;
        return {
          name: lines[0].trim(),
          ingredients: lines[1]
            .replace("2: ", "")
            .split(", ")
            .map((item) => item.trim()),
          instructions: lines[2].replace("3: ", "").trim(),
        };
      })
      .filter((recipe) => recipe !== null);
  };

  productRouter.post('/favorite', async (req, res) => {
    const { userId, name, ingredients, instructions } = req.body; // Get data from the request body
  
    try {
      const newProduct = new Product({
        userId,
        name,
        ingredients,
        instructions,
        liked: true, // Mark as favorited
      });
  
      // Save the product to the database
      const savedProduct = await newProduct.save();
  
      // Return the saved product
      res.status(201).json(savedProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
