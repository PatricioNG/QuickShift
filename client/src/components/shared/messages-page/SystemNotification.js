import React from 'react';
import moment from 'moment';
import QSLogo from '../../../assets/logo/QS_logo.png';
import ImageAvatar from '../avatars/ImageAvatar';
import DefaultLoading from '../DefaultLoading';
import { useQuery, gql, useMutation } from '@apollo/client'

//Component to render messages that are system based, with no option to reply
export default function SystemNotification({ routerProps }) {
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
    const { loading, data } = useQuery(messageDetailsQuery, {
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
            <section className='message-card message-card--system'>
                <div className='message-card__section-wrapper'>
                    <ImageAvatar src={QSLogo} size='small' shadow={false} />
                    <span className='message-card__header-wrapper'>
                        <h2 className='message-card__sender'>
                            Notification from QuickShift
                        </h2>
                        <p className='message-card__sent-on'>
                            <span className='message-card__sent-on-label'>Received:</span><br />{moment(data.message.message_sent).format('ddd MMM Do[,] h:mm a')}
                        </p>
                    </span>
                </div>

                <div className='message-card__section-wrapper'>
                    <textarea className='message-card__message-text' readOnly defaultValue={data.message.message}></textarea>
                </div>
            </section>
        )

}