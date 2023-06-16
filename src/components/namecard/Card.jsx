import "./Card.scss"
import PropTypes from "prop-types"

Card.propTypes = {
  name: PropTypes.string,
  time: PropTypes.string.isRequired,
}

export default function Card(props) {
  return (
    <>
      <div className="card">
        <strong>{props.name ? props.name : "Name"}</strong>
        <small>{props.time}</small>
      </div>
    </>
  )
}
