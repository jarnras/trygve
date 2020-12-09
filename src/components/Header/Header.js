import React from 'react';
import './Header.scss';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { redirectToLogin } from '../../modules/admin/actions';

class Header extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    location: PropTypes.object,
    redirectToLogin: PropTypes.func.isRequired,
  };


  render() {
    const { pathname } = this.props.location || { pathname: '/' };

    return (
      <nav className="navbar navbar-collapse navbar-default" id="navbarNav">
        <div className="container">
          <a onClick={() => browserHistory.push(`/`)} className="navbar-brand">
            {' '}
            {BRANDING_HEADER_TITLE}
          </a>
            <ul className="nav navbar-nav nav-pills">
              <li className={`nav-item ${pathname === "/" ? 'active' : ''}`}>
                <a onClick={() => browserHistory.push(`/`)}> Hem </a>
              </li>
              <li className={`nav-item ${pathname === "/admin" ? 'active' : ''}`}>
                <a onClick={() => browserHistory.push(`/admin`)}> Evenemang </a>
              </li>
              <li className={`nav-item ${pathname === "/admin/users" ? 'active' : ''}`}>
                <a onClick={() => browserHistory.push(`/admin/users`)}> Användare </a>
              </li>
              <li className={`nav-item ${pathname === "/admin/points" ? 'active' : ''}`}>
                <a onClick={() => browserHistory.push(`/admin/points`)}> Kvartettkonto </a>
              </li>
            </ul>

          {this.props.loggedIn ? (
            <a
            onClick={() => this.props.redirectToLogin()}
            className="navbar-brand"
            style={{ float: 'right' }}
            >
              Logout
            </a>
          ) : (
            ''
            )}
            </div>
        </nav>
    );
  }
}

const mapDispatchToProps = {
  redirectToLogin,
};

const mapStateToProps = state => ({
  loggedIn: state.admin.loggedIn,
  location: state.location,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
