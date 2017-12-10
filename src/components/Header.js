import React, {Component} from 'react'

class Header extends Component {
  render() {
    return (
      <nav className="pt-navbar">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Chord Creator</div>
          <input className="pt-input" placeholder="Search songs..." type="text"/>
        </div>
        <div className="pt-navbar-group pt-align-right">
          <span className="pt-navbar-divider"/>
          <button className="pt-button pt-minimal pt-icon-user"/>
          <button className="pt-button pt-minimal pt-icon-cog"/>
        </div>
      </nav>
    )
  }
}

export default Header
