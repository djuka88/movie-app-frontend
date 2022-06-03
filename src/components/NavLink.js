import { Link } from "react-router-dom";

function NavLink(props) {
  const style = props.style ?? { float: "right" };
  const link = props.href || "#";

  return (
    <Link to={link} style={{...style , marginRight: "10px"}} onClick={props.onClick}>
      {props.name}
    </Link>
  );
}

export default NavLink;
