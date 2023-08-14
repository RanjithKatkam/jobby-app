import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineStar} from 'react-icons/ai'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {BsBriefcase} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    itemDetails: '',
    similarJobDetails: '',
  }

  componentDidMount() {
    this.renderItemDetails()
  }

  renderItemDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const updatedJobsDetails = {
        companyLogoUrl: updatedData.jobDetails.company_logo_url,
        id: updatedData.jobDetails.id,
        employmentType: updatedData.jobDetails.employment_type,
        jobDescription: updatedData.jobDetails.job_description,
        rating: updatedData.jobDetails.rating,
        location: updatedData.jobDetails.location,
        packagePerAnnum: updatedData.jobDetails.package_per_annum,
        title: updatedData.jobDetails.title,
        companyWebsiteUrl: updatedData.jobDetails.company_website_url,
        lifeAtCompanyDescription:
          updatedData.jobDetails.life_at_company.description,
        lifeAtCompanyImageUrl: updatedData.jobDetails.life_at_company.image_url,
        skills: updatedData.jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          skillName: eachItem.name,
        })),
      }

      const similarJobs = updatedData.similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        rating: eachItem.rating,
        location: eachItem.location,
        title: eachItem.title,
      }))

      this.setState({
        itemDetails: updatedJobsDetails,
        similarJobDetails: similarJobs,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failed})
    }
  }

  renderJobDetailsSuccessView = () => {
    const {itemDetails, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      rating,
      location,
      packagePerAnnum,
      title,
      lifeAtCompanyDescription,
      companyWebsiteUrl,
      lifeAtCompanyImageUrl,
      skills,
    } = itemDetails

    return (
      <div className="item-container">
        <div className="item-card">
          <div className="card-logo-container">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
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
            <div className="company-link-container">
              <h1 className="description-heading">Description</h1>
              <div className="align-link">
                <a className="link-url" href={companyWebsiteUrl}>
                  Visit
                </a>
                <FiExternalLink className="visit-link" />
              </div>
            </div>
            <p className="item-job-description">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(eachItem => (
                <li className="skills-list-item" key={eachItem.skillName}>
                  <img
                    className="skill-image"
                    src={eachItem.imageUrl}
                    alt={eachItem.skillName}
                  />
                  <h1 className="skill-name">{eachItem.skillName}</h1>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="skills-heading">Life at Company</h1>
            <div className="photo-description-container">
              <p className="life-at-company-description">
                {lifeAtCompanyDescription}
              </p>
              <img
                className="life-at-image"
                src={lifeAtCompanyImageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobDetails.map(eachItem => (
            <li className="similar-card-list" key={eachItem.id}>
              <div className="card-logo-container">
                <img
                  className="company-logo"
                  src={eachItem.companyLogoUrl}
                  alt="similar job company logo"
                />
                <div>
                  <h1 className="job-title">{eachItem.title}</h1>
                  <div className="rating-container">
                    <AiOutlineStar className="star" />
                    <p className="rating">{eachItem.rating}</p>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="description-heading">Description</h1>
                <p className="job-description">{eachItem.jobDescription}</p>
              </div>
              <div className="location-container">
                <div className="div1">
                  <div className="loc-icon">
                    <HiOutlineLocationMarker className="icon-loc" />
                    <p className="location">{eachItem.location}</p>
                  </div>
                  <div className="loc-icon">
                    <BsBriefcase className="icon-loc" />
                    <p className="location">{eachItem.employmentType}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-main-container">
      <div className="failure-container">
        <img
          className="failure-view-image"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          onClick={this.renderItemDetails}
          className="header-logout-button"
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="failure-main-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiConstants.failed:
        return this.renderFailureView()
      case apiConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default JobItemDetails
