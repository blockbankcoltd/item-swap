import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Route, withRouter, Link, Redirect } from "react-router-dom";
import { searchGame } from "../../redux/actions";

const DarkMode = (props) => {
  console.log("props", props);
  const [searchText, setSearchText] = useState("");
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "is_dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }
  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(darkTheme);
  }

  // useEffect(() => {
  //     const firstPath = props.match.path.split('/')[1];
  //     console.log('firstPath', firstPath);
  //     if (firstPath === 'search') {
  //         window.location.reload();
  //     }
  // }, []);

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "is_dark");
      theme = darkTheme;
    }
  };

  const handleSearch = (e) => {
    const firstPath = props.match.path.split("/")[1];
    if (firstPath === "search") {
      props.history.push({
        pathname: `/search/${searchText}`,
        match: { searchText, props: props },
      });
      window.location.reload();
    } else {
      props.history.push({
        pathname: `/search/${searchText}`,
        match: { searchText, props: props },
      });
    }
    // let callback = () => {
    //     console.log('searchKey', searchText);
    //     props.history.push(`/explore-games`);
    // }

    // dispatch(searchGame({ searchText, callback }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("you have searched for - ");
    // or you can send to backend
  };
  return (
    <div className="mode_switcher">
      {/* <h6>Dark mode <strong>Available</strong></h6> */}
      <div className="widget widget-subcribe">
        <div className="form-subcribe">
          <form
            id="subscribe-form"
            // action="#"
            method="GET"
            acceptCharset="utf-8"
            className="form-submit"
          >
            <input
              // name="email"
              className="email"
              type="text"
              placeholder="Search..."
              required
              autoComplete="off"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <p className="button" onClick={(e) => handleSearch(e)}>
              <i className="fa fa-search" style={{ color: "#fff" }}></i>
            </p>
          </form>
        </div>
      </div>
      <Link to="#" className="subcribe" onClick={(e) => switchTheme(e)}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEhSURBVHgBtZWNEYIwDIUfngMwgiO4gWygG+gGuoFuwAiMwAiMwAh1BDeIjfc4a4XScMd3l+MoyUsa+gMYEBGnhrUQYonZYGV+Evjibt46b7sJ/yftD43x1qoGpqCDsNc7ZEJxx9gu17FBJt63zi6MSTRgz/fS24OtG+i9nYOYvRZkmfXYjMaYr3gmgQuEDjobjh+jbyWs+KBLSoCtG5LcYYV9Vo4Jnypn5biwp8H4B6SLKGO/WG92J6f6WxTFC0uR77KsEj4n+vRYkOBu+MlnWIkE9HkKxqvwG5Yia2w0ijbCo4Jjuif6QLhjC4eNp0dFLZnnkKNIjfyimqwZyXflmKYeFdamHPXCaafEJXEnM4kWeMVShh9giVn9Tt7CxhNG3rhxSa0K5UYkAAAAAElFTkSuQmCC"
          alt=""
        />
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DarkMode),
);
