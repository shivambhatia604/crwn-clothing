import React,{useEffect} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component.jsx";
import { contacts } from "./components/contact/contact.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";

import Header from "./components/header/header.component.jsx";
import { GlobalStyle } from './global.styles';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { connect } from "react-redux";
import { checkUserSession } from "./redux/user/user.actions";
// import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

const App= ({checkUserSession,currentUser}) => {

      useEffect(() =>{
        checkUserSession();
      },[checkUserSession]);
  // componentDidMount() {
  //   const {checkUserSession} = this.props;
  //   checkUserSession();
  // }

  // componentWillUnmount() {
  //   // this.unsubscribeFromAuth();
  // }

  
    return (
      <div>
      <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/contact" component={contacts} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
