import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <div className="failures-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="failure-heading">Page Not Found</h1>
      <p className="failure-description">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
