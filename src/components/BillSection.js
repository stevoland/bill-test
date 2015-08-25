import React, {Component, PropTypes} from 'react';
import {Panel} from 'react-bootstrap';

export default class BillSection extends Component {
  static propTypes = {
    header: PropTypes.node,
    children: PropTypes.node
  }

  render() {
    const header = <h2>{this.props.header}</h2>;

    return (
      <Panel header={header}>
        <div>
          {this.props.children}
        </div>
      </Panel>
    );
  }
}
