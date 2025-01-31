const Category = require('../modells/categoryModel')

const createCategory = async (req, res) => {

    await Category.sync();

    const { CategoryName } = req.body
    
    if(!CategoryName){
        return res.status(400).json({
            success : false,
            message : "Please fill all fields"
        })
    }

    try {

        const newCategory =  await Category.create({
            CategoryName
        })

        res.status(200).json({
            success : true,
            message : 'Created category successfully',
            category : newCategory
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error : err.message
        })

    }    
}

const getAllCategory = async (req, res) => {

    try {

        const categories = await Category.findAll()

        if(categories.length === 0){
            return res.status(400).json({
                success : false,
                message : 'No Category Found'                
            })
        }
        
        res.status(200).json({
            success : true,
            message : 'category fetched successfully',
            getCategory : categories
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error : err.message
        })
    }
    
}

const updateCategory = async (req, res) => {
    try {

        const { CategoryId } = req.params
        const { CategoryName } = req.body

        console.log("CategoryId from request:", CategoryId);

        if(!CategoryName){
            return res.status(400).json({
                success : false,
                message : "Please provide CategoryName to update"
            })
        }

        let category = await Category.findByPk(CategoryId)

        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        category.CategoryName = CategoryName
        await category.save()        
        
        res.status(200).json({
            success : true,
            message : 'category updated successfully',
            category : category
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
    
}

const deleteCategory = async (req, res) => {
    try {

        const { CategoryId } = req.params

        if(!CategoryId){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        let category = await Category.findByPk(CategoryId)

        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        await category.destroy()

        res.status(200).json({
            success : true,
            message : 'category deleted successfully',
            category : category
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }    
}

const categoryController = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}

module.exports = categoryController