import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import ImageAvatar from '../avatars/ImageAvatar';

//Renders the list item of a message card with an option to view the message
export default function MessageListItem({ message, destination }) {

    let { url } = useRouteMatch();

    return (
        <li className={`message-list-item ${message.message_read ? '' : 'message-list-item--unread'}`}>

            <section className='message-list-item__section-wrapper'>
                {message.is_system_notification
                    ? <svg className='message-list-item__system-notification' width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14 13.75V8.75C14 5.68 12.37 3.11 9.5 2.43V1.75C9.5 0.92 8.83 0.25 8 0.25C7.17 0.25 6.5 0.92 6.5 1.75V2.43C3.64 3.11 2 5.67 2 8.75V13.75L0 15.75V16.75H16V15.75L14 13.75ZM8 19.75C9.1 19.75 10 18.85 10 17.75H6C6 18.85 6.9 19.75 8 19.75ZM4 14.75H12V8.75C12 6.27 10.49 4.25 8 4.25C5.51 4.25 4 6.27 4 8.75V14.75Z" fill="#003e19" />
                    </svg>
                    : <ImageAvatar src={destination === 'user'
                        ? message.business.logo_link
                        : message.user.profile_image_link} size='extra-small' shadow={true} />}
            </section>

            <section className='message-list-item__section-wrapper'>
                <p className='message-list-item__message-preview'>{message.message}</p>
            </section>

            <section className='message-list-item__section-wrapper'>
                <Link to={message.is_system_notification
                    ? `${url}/system-message/${message.id}`
                    : `${url}/message/${message.id}`}>
                    <button className='message-list-item__view-message'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18 0H2C0.9 0 0 0.9 0 2V20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H3.17L2 15.17V2H18V14ZM7 7H5V9H7V7ZM13 7H15V9H13V7ZM11 7H9V9H11V7Z" fill="white" />
                        </svg>
                    </button>
                </Link>
            </section>
        </li>
    )
}