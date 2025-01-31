const Category = require('../modells/categoryModel')
const Product = require('../modells/productModel')

const createProduct = async (req, res) => {

    await Product.sync();

    const { ProductName, CategoryName } = req.body;

    if (!ProductName || !CategoryName) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    try {
        const category = await Category.findOne({
            where: { CategoryName }
        })

        if (!category) {
            return res.status(400).json({
                success: false,
                message: `Category with name '${CategoryName}' not found`
            })
        }

        const newProduct = await Product.create({
            ProductName,
            CategoryId: category.CategoryId
        })

        res.status(200).json({
            success: true,
            message: 'Created Product successfully',
            product: newProduct
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const getAllProduct = async (req, res) => {

    try {

        const { page = 1, pageSize = 10 } = req.query
        const pageNumber = parseInt(page, 10)
        const limit = parseInt(pageSize, 10)

        const offset = (pageNumber - 1) * limit

        const products = await Product.findAll({
            limit,
            offset,
            include : {
                model : Category,
                attributes : ['CategoryName']
            }
        })

        if (products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No product Found'
            })
        }

        const totalProducts = await Product.count()
        const totalPages = Math.ceil(totalProducts / limit)

        res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: {
                products,
                pageNumber,
                pageSize: limit,
                totalProducts,
                totalPages
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {

        const { ProductId } = req.params;
        const { ProductName, CategoryName } = req.body;

        if (!ProductName && !CategoryName) {
            return res.status(400).json({
                success: false,
                message: "Please provide atleast one field (ProductName or CategoryName)"
            })
        }

        let product = await Product.findByPk(ProductId);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (CategoryName) {
            const category = await Category.findOne({
                where: { CategoryName }
            });

            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: `Category with name '${CategoryName}' not found`
                });
            }

            product.CategoryId = category.CategoryId;
        }

        if (ProductName) {
            product.ProductName = ProductName;
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            getProduct: product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const deleteProduct = async (req, res) => {
    try {

        const { ProductId } = req.params

        if (!ProductId) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        let product = await Product.findByPk(ProductId)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'product not found'
            });
        }

        await product.destroy()

        res.status(200).json({
            success: true,
            message: 'product deleted successfully',
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const categoryController = {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}

module.exports = categoryController