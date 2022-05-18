import { Link } from "react-router-dom";

function NavLink(props) {
  const style = { float: "right", marginRight: "10px" };
  const link = props.href || "#";

  return (
    <Link to={link} style={style} onClick={props.onClick}>
      {props.name}
    </Link>
  );
}

export default NavLink;
