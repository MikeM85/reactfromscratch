import React, { Component } from "react";
import { BrowserRouter as Route} from "react-router-dom";
// import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

import { setCurrentUser, logoutUser } from "./Actions/authActions";
import { clearCurrentProfile } from "./Actions/profileActions";
// import PrivateRoute from "./components/common/PrivateRoute";

// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
import Landing from "./Components/layout/Landing";
// import NoMatch from "./components/nomatch/NoMatch";
// import FollowReview from "./components/review/FollowReview";
// import UserReview from "./components/review/UserReview";

import Register from "./pages/Register";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Restaurants from "./pages/Restaurants";
// import Profiles from "./pages/Profiles";
// import RestaurantReview from "./pages/RestaurantReview.js";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token, get User info and expiration
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set User and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout User
		store.dispatch(logoutUser());
		// Clear current profile
		store.dispatch(clearCurrentProfile());
		// Redirect to Login
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
      <div className="container page-h">
								
									<Route exact path="/" component={Landing} />
									<Route exact path="/register" component={Register} />
									<Route exact path="/login" component={Login} />
									
								

      </div>
							
		);
	}
}

export default App;