const {buildSchema} = require('graphql')

const schema = buildSchema(`

    type Triangle {
        id: ID
        firstSide: Int
        secondSide: Int
        thirdSide: Int
    }

    input TriangleInput {
        id: ID
        firstSide: Int!
        secondSide: Int!
        thirdSide: Int!
    }

    type Query {
        getAllTriangles: [Triangle]
        getCorrectTriangle(id: ID, firstSide: Int, secondSide: Int, thirdSide: Int): Boolean
    }

    type Mutation {
        createTriangle(input: TriangleInput): Triangle
    }

`)

module.exports = schema