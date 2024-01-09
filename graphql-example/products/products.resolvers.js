const productsModel = require('./products.model')

module.exports = {
    Query: {
        products: () => {
            return productsModel.getAllProducts()
        },
        productsByPrice: (_, args) => {
            return productsModel.getProductsByPrice(args.min, args.max);
        },
        product: (_, args) => {
            return productsModel.getProductsById(args.id)
        }
    },
    Mutation: {
        addNewProduct: (_, args) => {
            return productsModel.addNewProduct(args.id, args.description, args.price)
        },
        addNewProductReview: (_, args) => {
            productsModel.addNewProductReview(args.id, args.rating, args.comment)
        }
    }
}

// The graphql convention, when you're not using one of the earlier arguments is to name that argument using an underscore. If there were two arguments not being used, you would use two underscores for the second argument and so on 