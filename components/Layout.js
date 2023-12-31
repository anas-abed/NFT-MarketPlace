import React from "react";
import NavBar from "@component/components/NavBar";

const Layout = (props) => {
	return (
		<div>
			<NavBar/>
            {props.children}
        </div>
	)
}

export default Layout;