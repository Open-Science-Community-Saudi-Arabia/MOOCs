import React from 'react'
import Button from '../../components/Button/Button'
import Card from '../../components/Card/Card'
import './profile.css'

const Profile = () => {
	return (
		<div className='profile'>
			<div className='profile-header'>
				<h2>My Profile</h2>
			</div>
			<div className='profile-container'>
				<div className='profile-card'>
					<Card>
						<div className='profile-card-content'>
							<img src='/images/png/user.png' alt='user image' />
							<h3>Shakir O'neal</h3>
							<p>+801-545-223-453</p>
							<p>shakir44neal@gmail.com</p>
							<p>Student</p>
							<div className='profile-button'>
								<button className='button primary'>Edit</button>
							</div>
						</div>
					</Card>
				</div>
				<div className='profile-courses'>
					<h3>My Courses</h3>
					<div className='profile-courses-list'>
						<Card>
							<img src='/images/png/course-1.png' alt='user image' />
							<h3>Course Name</h3>
							<p>Tutor name</p>
							<hr />
						</Card>
						<Card>
							<img src='/images/png/course-2.png' alt='user image' />
							<h3>Course Name</h3>
							<p>Tutor name</p>

							<hr />
						</Card>
						<Card>
							<img src='/images/png/course-3.png' alt='user image' />
							<h3>Course Name</h3>
							<p>Tutor name</p>
							<hr />
						</Card>
						<Card>
							<img src='/images/png/course-4.png' alt='user image' />
							<h3>Course Name</h3>
							<p>Tutor name</p>

							<hr />
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
