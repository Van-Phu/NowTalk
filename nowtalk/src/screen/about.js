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
				GeeksforGeeks is a Computer Science portal
				for geeks.
			</h1>
		</div>
	);
};

export default About;
