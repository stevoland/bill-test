import React, {Component, PropTypes} from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    const styles = require('./App.css');

    return (
      <div className={styles.App}>
        {this.props.children}
      </div>
    );
  }
}
