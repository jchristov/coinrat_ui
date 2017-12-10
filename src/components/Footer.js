import React, {Component} from 'react'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {year: new Date().getFullYear()}
  }

  render() {
    return <footer>
      © {this.state.year} Petr Hejna
      | Distributed under
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://opensource.org/licenses/MIT"
      >
        MIT License
      </a>
    </footer>
  }
}

export default Footer
