import { gql } from '@apollo/client';

export const businessQuery = (businessID) => gql`
    {
        business(id: ${businessID}){
            id
            name
            logo_link
            street_address
            city
        }
    }
`;

export const businessShiftsPendingApplications = (businessID, pendingOnly, futureOnly) => gql`
    {
        businessShifts(id: ${businessID}, pendingOnly: ${pendingOnly}, futureOnly: ${futureOnly}){
            id
            start_time
            end_time
            role
            pendingApplications{
            id
            }
        }
    }`;

export const businessShiftDetails = (shiftID) => gql`
    {
        shift(id: ${shiftID}){
            id
            start_time
            pendingApplications{
                id
                shift_id
                applied_on
                application_message
                user{
                    first_name
                    last_name
                    profile_image_link
                }
            }
        }
    }`;

export const businessLandingPageQuery = (id, shiftOptions, applicationOptions, upcomingShiftOptions) => gql`
{
    shifts: businessShifts(id: ${id}, pendingOnly: ${shiftOptions[0]}, futureOnly: ${shiftOptions[1]}){
        id
        pending
    }
    applications: businessApplications(id: ${id}, pendingOnly: ${applicationOptions[0]}, upcomingShifts: ${applicationOptions[1]}){
        id

    }
    upcomingShifts: businessUpcomingShifts(id: ${id}){
        id
        role
        start_time
        end_time
        user{
            id
            first_name
            last_name
            profile_image_link
        }
    }
}`;

export const businessInvoicedShiftsQuery = (businessID) => gql`
    {
        invoicedShifts: businessInvoicedShifts(businessID: ${businessID}){
            role
            rate
            start_time
            end_time
        }
    }
`;

//Mutations
export const createShift = gql`
    mutation($id: Int!, $start: DateTime!, $end: DateTime!, $role: String!, $rate: Float!){
        createShift(
            business_id: $id,
            start_time: $start,
            end_time: $end,
            role: $role,
            rate: $rate ){
                id
            }
    }`;

export const reviewApplicationMutation = gql`
    mutation($shiftID: Int!, $applicationID: Int!, $accepted: Boolean!){
          reviewApplication(
              shift_id: $shiftID, 
              applicationID: $applicationID, 
              accepted: $accepted){
                  id
            },
    }
`;