const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const app = express()
const triangles = [{id: 1, firstSide: 3, secondSide: 4, thirdSide: 5}]

app.use(cors())

const createTriangle = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}
const root = {
    getAllTriangles: () => {
        return triangles
    },
    getCorrectTriangle: ({id, firstSide, secondSide, thirdSide}) => {
        const triangle = triangles.find(triangle => triangle.id == id);
        if((firstSide + secondSide > thirdSide) && 
        (firstSide + thirdSide > secondSide) &&
        (secondSide + thirdSide > firstSide)) {
            return true;
        }
        else {
            return false;
        }
    },
    createTriangle: ({input}) => {
        const triangle = createTriangle(input)
        triangles.push(triangle)
        return triangle
    }
}



app.use('/graphql', graphqlHTTP( {
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(5000, () => console.log('server started on port 5000'))