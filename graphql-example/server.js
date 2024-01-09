const path = require("path");
const express = require("express");
// const { graphqlHTTP } = require("express-graphql");
const { ApolloServer} = require('apollo-server-express')

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// look into any directories or subdirectories in our project. Thats what the double asterisk symbol mean, matching any files that have zero or more characters, thats the single asterisk followed by dot graphql in their file name
// const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const typesArray = loadFilesSync("**/*", {
    extensions: ["graphql"],
});
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

async function startApolloServer() {
    const app = express()
    const schema = makeExecutableSchema({
        typeDefs: [typesArray],
        resolvers:  resolversArray
    });
    //This apollo server contains all middleware and logic to handle incoming graphql requests 
    const server = new ApolloServer({
        schema: schema
    });

    await server.start()
    server.applyMiddleware({app, path:'/graphql'}) // Connects apollos graphql middleware with our express server

    app.listen(3000, () => {
        console.log("Running GraphQL server...");
    });
}

startApolloServer()

// const schema = makeExecutableSchema({
//     typeDefs: [typesArray],
//     resolvers:  resolversArray
// });


// const root = {
//     products: require("./products/products.model"),
//     orders: require("./orders/orders.model"),
// };

// const app = express();

// app.use(
//     "/graphql",
//     graphqlHTTP({
//         schema: schema,
//         // rootValue: root,  // data is now being loaded directy into our resolver function. This is not needed anymore
//         graphiql: true,
//     })
// );

// app.listen(3000, () => {
//     console.log("Running GraphQL server...");
// });
