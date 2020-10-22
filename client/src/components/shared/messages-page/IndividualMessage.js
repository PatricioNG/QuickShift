import React from 'react';
import moment from 'moment';
import ImageAvatar from '../avatars/ImageAvatar';
import DefaultLoading from '../DefaultLoading';
import { useQuery, gql, useMutation } from '@apollo/client'

// Renders an individual message card with the option for replying
// Replying functionality is not built out yet
export default function IndividualMessage({ routerProps, destination }) {
    const { messageID } = routerProps.match.params;

    const messageDetailsQuery = gql`
        {
            message(id: ${messageID}){
                id
                message
                message_read
                is_system_notification
                business{
                    logo_link
                    name
                }
                user{
                    profile_image_link
                    first_name
                    last_name
                }
            }
        }
    `;

    const readMessageMutation = gql`
        mutation ($id: Int!){
            markMessageRead(messageID: $id){
                id
            }
        }`;

    const [readMessage] = useMutation(readMessageMutation);
    const { loading, error, data } = useQuery(messageDetailsQuery, {
        onCompleted: async () => {
            if (!data.message.message_read) await readMessage({
                variables: { id: data.message.id },
                refetchQueries: [{
                    query: gql`{
                message(id: ${messageID}){
                id
                message
                message_read
                is_system_notification
                business{
                    logo_link
                    name
                }
                user{
                    profile_image_link
                    first_name
                    last_name
                }
            }}` }]
            })
        }
    });


    return loading
        ? <DefaultLoading />
        : (
            <section className='message-card'>

                <div className='message-card__section-wrapper'>
                    <ImageAvatar src={destination === 'business'
                        ? data.message.user.profile_image_link
                        : data.message.business.logo_link} size='small' shadow={false} />
                    <span className='message-card__header-wrapper'>
                        <h2 className='message-card__sender'>
                            {destination === 'business'
                                ? `${data.message.user.first_name} ${data.message.user.last_name}`
                                : data.message.business.name}
                        </h2>
                        <p className='message-card__sent-on'>
                            <span className='message-card__sent-on-label'>Received:</span><br />{moment(data.message.message_sent).format('ddd MMM Do[,] h:mm a')}
                        </p>
                    </span>
                </div>
                <div className='message-card__section-wrapper'>
                    <textarea className='message-card__message-text' readOnly defaultValue={data.message.message}></textarea>
                </div>
                <div className='message-card__section-wrapper'>
                    <button className='message-card__reply'>Reply</button>
                </div>
            </section>
        )

}