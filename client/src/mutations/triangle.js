import {gql} from '@apollo/client'

export const CREATE_TRIANGLE = gql`
    mutation createTriangle($input: TriangleInput) {
        createTriangle(input: $input) {
            id, firstSide, secondSide, thirdSide
        }
    } 

`