import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './Schema'
import cors from 'cors'
import { DataSource } from 'typeorm'
import { Users } from './Entities/Users'

async function main() {
    const AppDataSource = new DataSource({
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "anand",
        "database": "GraphQlSchema",
        "entities": [Users],
        "synchronize": true,
        "logging": true
    })
    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(
        "/graphql",
        graphqlHTTP({
            schema,
            graphiql: true,
        })
    );

    app.listen(3001, () => {
        console.log("SERVER RUNNING ON PORT 3001");
    });
}
main().catch((err) => {
    console.log(err);
});