import React from 'react'
import ImageAvatar from '../../shared/avatars/ImageAvatar'

// Landing page for business functions, functions were to be implemented for 
// profile editing, viewing previous invoices, and reaching out to support
// but implementation was paused in time for submission.
export default function MyBusinessPage({ business }) {

    return (
        <main className='my-business'>

            <div className='my-business__nav-wrapper'>
                <header className='my-business__header-wrapper'>
                    <h1 className='my-business__heading'>Hello there, {business.name}.</h1>
                    <div className='my-business__profile-wrapper'>
                        <ImageAvatar src={business.logo_link} size='medium' shadow={true} />
                    </div>
                    <section className='my-business__business-info-card'>
                        <h2 className='my-business__business-info-card-heading'>What would you like to do?</h2>
                        <div className='my-business__card-section-wrapper'>
                            <button className='my-business__card-action-button'>Edit my details</button>
                        </div>
                        <div className='my-business__card-section-wrapper'>
                            <button className='my-business__card-action-button'>Previous Shifts</button>
                        </div>
                        <div className='my-business__card-section-wrapper'>
                            <button className='my-business__card-action-button'>Contact Support</button>
                        </div>
                    </section>
                </header>
            </div>

        </main>
    )
}