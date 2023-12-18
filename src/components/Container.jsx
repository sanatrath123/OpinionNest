
import PropTypes from "prop-types";

function Container ({children}){
    return(
       <div className="w-full max-w-8xl mx-auto px-4'">{children}</div>
    )
}
Container.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default Container