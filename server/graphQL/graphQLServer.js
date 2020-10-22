const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const app = express();
const userAssignment = require('./UserAssignment');

//JWT
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `` //AUTH0 URI
    }),

    audience: 'http://localhost:4000/graphql',
    issuer: ``, //AUTH0 Connection Details
    algorithms: ['RS256']
})

app.get('/user', checkJwt, userAssignment);
app.use('/graphql', checkJwt, graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => console.log('Server listening on 4000'));