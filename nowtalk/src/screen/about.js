// pages/about.js

import React from "react";

const About = ({ loggedInUsername }) => {
	console.log(loggedInUsername)
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "centre",
				alignItems: "centre",
				height: "100vh",
			}}
		>
			<h1>
				sản phẩm của team ZeroGravityZoners. Beta 0.0.1
			</h1>
		</div>
	);
};

export default About;
