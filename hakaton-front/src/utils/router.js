import React from "react";
import { Route ,Redirect} from "react-router-dom";
import { ROUTES } from "../constants";
import { hasLoggedUser } from "./jwtToken";

// ovo nisam koristion nigde ovde u projektu ali da imamo, PublicRouter je bkvl za neulogovane 
// a PrivateRouter za ulogovane korisnike, ako ima bkvl samo stranice za ulogovane/neulogovane ovo je top
// a ako ima po rolama imamo ProtectedRouter gde mu se prosledjuju dozvoljene role

export const PublicRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!hasLoggedUser()) {
					return <Component {...props} />;
				} else {
					window.history.back()
				}
			}}
		/>
	);
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (hasLoggedUser()) {
					return <Component {...props} />;
				} else {
					return (
					<Redirect
 							to={{
 								pathname: ROUTES.SIGNIN,
 								state: {
 									from: props.location,
 								},
 							}}
 						/>)
				}
			}}
		/>
	);
};
  
export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if(rest.roles==="*"){
					return <Component {...props} />;
				}
				if (hasRoles(rest.roles) === true) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: rest.redirectTo,
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

export function hasRoles(desiredRoles) {
	validateAccessToken();
	let roles = JSON.parse(localStorage.getItem("roles"));
	let retVal = false;

	if (roles) {
		roles.forEach((role) => {
			desiredRoles.forEach((desiredRole) => {
				if (desiredRole === "*" || desiredRole === role.name) {
					retVal = true;
				}
			});
		});
	} else if (desiredRoles.length === 0) {
		retVal = true;
	}

	return retVal;
}
