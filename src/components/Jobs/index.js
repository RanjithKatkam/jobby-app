import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CompanyCard from '../CompanyCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Jobs extends Component {
  state = {
    profileStatus: apiConstants.initial,
    profileDetailsList: '',
    jobsListStatus: apiConstants.initial,
    jobsList: '',
    searchInput: '',
    searchInputValue: '',
    employmentType: [],
    minimumPackage: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.renderJobs()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSearchResults = () => {
    const {searchInput} = this.state
    this.setState({searchInputValue: searchInput}, this.renderJobs)
  }

  renderJobs = async () => {
    this.setState({jobsListStatus: apiConstants.loading})
    const {searchInputValue, employmentType, minimumPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInputValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const responseData = await response.json()
      const updatedJobsList = responseData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        rating: eachItem.rating,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedJobsList,
        jobsListStatus: apiConstants.success,
      })
    } else {
      this.setState({jobsListStatus: apiConstants.failed})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const responseData = await response.json()

      const updatedProfileDetails = {
        name: responseData.profile_details.name,
        profileImage: responseData.profile_details.profile_image_url,
        bio: responseData.profile_details.short_bio,
      }

      this.setState({
        profileStatus: apiConstants.success,
        profileDetailsList: updatedProfileDetails,
      })
    } else {
      this.setState({profileStatus: apiConstants.failed})
    }
  }

  returnProfileDetails = () => {
    const {profileDetailsList} = this.state
    return (
      <>
        <img
          className="profile-pic"
          src={profileDetailsList.profileImage}
          alt="profile"
        />
        <h1 className="profile-name">{profileDetailsList.name}</h1>
        <p className="profile-bio">{profileDetailsList.bio}</p>
      </>
    )
  }

  returnProfileFailureView = () => (
    <button
      onClick={this.getProfileDetails}
      className="header-logout-button"
      type="button"
    >
      Retry
    </button>
  )

  returnProfileLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiConstants.success:
        return this.returnProfileDetails()
      case apiConstants.loading:
        return this.returnProfileLoadingView()
      case apiConstants.failed:
        return this.returnProfileFailureView()
      default:
        return null
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul className="jobs-container">
          {jobsList.map(eachItem => (
            <CompanyCard companyDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="failure-heading">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.renderJobs}
        className="header-logout-button"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsListData = () => {
    const {jobsListStatus} = this.state
    switch (jobsListStatus) {
      case apiConstants.success:
        return this.renderJobsList()
      case apiConstants.loading:
        return this.renderJobsLoadingView()
      case apiConstants.failed:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  onChangeSalaryRangeInput = event => {
    this.setState({minimumPackage: event.target.id}, this.renderJobs)
  }

  onChangeEmploymentTypeInput = event => {
    const {employmentType} = this.state
    const checkEmploymentList = employmentType.filter(
      eachItem => eachItem === event.target.idd,
    )
    if (checkEmploymentList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.renderJobs,
      )
    } else {
      const filteredList = employmentType.filter(
        eachItem => eachItem !== event.target.value,
      )
      this.setState({employmentType: filteredList}, this.renderJobs)
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-main-container">
        <Header />
        <div className="container-jobs-flex">
          <div className="first-half">
            <div className="profile-container">
              {this.renderProfileDetails()}
            </div>
            <hr />
            <h1 className="skills-heading1">Type of Employment</h1>
            <ul className="type-of-employments-container">
              {employmentTypesList.map(eachItem => (
                <li className="list" key={eachItem.employmentTypeId}>
                  <input
                    className="checkbox"
                    id={eachItem.employmentTypeId}
                    type="checkbox"
                    onChange={this.onChangeEmploymentTypeInput}
                  />
                  <label
                    className="checkbox-label"
                    htmlFor={eachItem.employmentTypeId}
                  >
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr />
            <h1 className="skills-heading1">Salary Range</h1>
            <ul className="salary-range-container">
              {salaryRangesList.map(eachItem => (
                <li className="list" key={eachItem.salaryRangeId}>
                  <input
                    className="radio"
                    name="options"
                    id={eachItem.salaryRangeId}
                    type="radio"
                    onChange={this.onChangeSalaryRangeInput}
                  />
                  <label
                    className="radio-label"
                    htmlFor={eachItem.salaryRangeId}
                  >
                    {eachItem.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="second-half">
            <div className="search-container">
              <input
                className="search-input"
                placeholder="Search"
                type="search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                className="search-button"
                type="button"
                onClick={this.onChangeSearchResults}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsListData()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
