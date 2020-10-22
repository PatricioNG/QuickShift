import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import DefaultLoading from '../DefaultLoading';
import IndividualMessage from './IndividualMessage';
import MessageListItem from './MessageListItem';
import SystemNotification from './SystemNotification';
import { useQuery, gql } from '@apollo/client'

//Main component for rendering the messages list and pages
export default function MessagesPage({ user, destination, routerProps }) {

    let { url } = useRouteMatch();

    const messageDetailsQuery = gql`
        {
            messages(id: ${user.id}, destination: "${destination}"){
                id
                message
                message_read
                is_system_notification
                business{
                    logo_link
                }
                user{
                    profile_image_link
                }
            }
        }
    `;

    const { loading, data } = useQuery(messageDetailsQuery);

    return loading
        ? <DefaultLoading />
        : (
            <main className='messages-page'>
                <Switch>

                    <Route path={`${url}`} render={() => <h1 className='messages-page__heading'>Your Messages</h1>} exact />
                    <Route path={`${url}/*`} render={() => {
                        return <span className='messages-page__header-back-wrapper'>
                            <Link className='messages-page__back-link' to={`${url}`}>
                                <button className='messages-page__back-button'>
                                    <svg className='messages-page__back-icon' width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 0L0.5 5L5.5 10V0Z" fill="#003E19" />
                                    </svg>
                                </button>
                            </Link>
                            <h1 className='messages-page__heading'>Your Messages</h1>
                        </span>
                    }} />

                </Switch>

                {
                    data.messages.length === 0
                        ? <h2 className='messages-page__no-messages'>No messages yet, but we will let you know when you get one!</h2>
                        :
                        <Switch>
                            <Route path={`${url}`} render={() => {
                                return <ul className='messages-page__list'>
                                    {data.messages.map((message) => <MessageListItem key={message.id} message={message} routerProps={routerProps} destination={destination} />)}
                                </ul>
                            }} exact />
                            <Route path={`${url}/message/:messageID`} render={(routerProps) => <IndividualMessage routerProps={routerProps} destination={destination} />} exact />
                            <Route path={`${url}/system-message/:messageID`} render={(routerProps) => <SystemNotification routerProps={routerProps} destination={destination} />} exact />
                        </Switch>
                }
            </main >
        )
}