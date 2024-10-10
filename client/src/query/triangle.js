import {gql} from '@apollo/client'

export const GET_ALL_TRIANGLES = gql`
    query {
        getAllTriangles {
            id, firstSide, secondSide, thirdSide
        }
    }

`

export const GET_CORRECT_TRIANGLE = gql`
    query getCorrectTriangle($id: ID, $firstSide: Int, $secondSide: Int, $thirdSide: Int){
        getCorrectTriangle(id: $id, firstSide: $firstSide, secondSide: $secondSide, thirdSide: $thirdSide)
    }

`