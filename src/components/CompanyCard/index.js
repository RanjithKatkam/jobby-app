import {Link} from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const CompanyCard = props => {
  const {companyDetails} = props
  const {
    companyLogoUrl,
    title,
    location,
    rating,
    jobDescription,
    employmentType,
    packagePerAnnum,
    id,
  } = companyDetails
  return (
    <Link className="link-class" to={`/Jobs/${id}`}>
      <li className="card-list">
        <div className="card-logo-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiOutlineStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div className="div1">
            <div className="loc-icon">
              <HiOutlineLocationMarker className="icon-loc" />
              <p className="location">{location}</p>
            </div>
            <div className="loc-icon">
              <BsBriefcase className="icon-loc" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <div>
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default CompanyCard
