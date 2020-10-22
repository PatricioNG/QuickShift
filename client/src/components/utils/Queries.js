import { gql } from '@apollo/client';

//User Queries
export const userQuery = (userID) => gql`
        query { 
            user(id: ${userID}){
                id
                first_name
                profile_image_link
                email
                new_user
            }
        }`;

export const userShiftsQuery = (userID) => gql`
        {
            userShifts(id: ${userID}){
                id
                role
                start_time
                end_time
            }
        }
    `;

export const upcomingShiftsQuery = (userID, timeStamp) => gql`
    query {
        userNextShifts(id: ${userID}, date: "${timeStamp}"){
                id
                start_time
                end_time
                role
                pending
                business{
                    logo_link
                    name
                    street_address
                    city
                    postal_code
                }      
            }
    }`;


export const shiftQuery = (shiftID) => gql`
        {
            shift(id: ${shiftID}){
                id
                role
                rate
                start_time
                end_time
                business{
                    street_address
                    postal_code
                    city
                    province
                    name
                    logo_link
                }
            }
        }
    `;

export const completedShiftQuery = (userID) => gql`
        {
            userCompletedShifts(id: ${userID}){
                id
                start_time
                end_time
                role
                pending
                business{
                    logo_link
                    name
                    street_address
                    city
                    postal_code
                }      
            }
        }
    `;

export const nextShiftsQuery = (timeStamp) => gql`
        query ($userID: Int!){ 
           userNextShifts(id: $userID, date: "${timeStamp}" ) {
                id
                start_time
                end_time
                role
                business {
                    name
                    street_address
                    postal_code
                    logo_link
                }
            }
        }`;

export const pendingShiftsApplicationsQuery = (userID) => gql`
        query { 
            pendingShifts(userID: ${userID}){
                id
                start_time
                end_time
                role
                pending
                business{
                    logo_link
                    name
                    street_address
                    city
                    postal_code
                }      
            }
            pendingApplications(userID: ${userID}){
                id
                applied_on
                shift{
                    role
                    start_time
                    end_time
                }
                business{
                    name
                    logo_link
                    street_address
                    city
                    postal_code
                }
            }
        }
    `;

//Mutations
export const createApplicationMutation = () => gql`
        mutation( $userID: Int!, $shiftID: Int!, $message: String!){
            createApplication(
                user_id: $userID,
                shift_id: $shiftID,
                application_message: $message){
                    id
                }
        }`;


export const updateUser = () => gql`
        mutation( $firstName: String!, $lastName: String!, $email: String!){
            updateUser(
                first_name: $firstName,
                last_name: $lastName,
                email: $email){
                id
            }
        }
`;