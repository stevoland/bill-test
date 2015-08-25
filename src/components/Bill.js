import React, {Component, PropTypes} from 'react';
import BillSection from './BillSection';
import {Table, Grid, Row, Col} from 'react-bootstrap';
import Time from 'react-time';

const DATE_FORMAT = 'DD/MM/YYYY';

export default class Bill extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  renderSubscriptions(styles) {
    const pack = this.props.data.package;

    if (pack && pack.subscriptions && pack.subscriptions.length) {
      return (
        <BillSection header="Packages">
          <Table responsive striped>
            <thead>
              <tr>
                <th>Name</th>
                <th className={styles.cost}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {pack.subscriptions.map(row => (
                <tr>
                  <td>{row.name}</td>
                  <td className={styles.cost}>£{row.cost}</td>
                </tr>
              ))}
              <tr>
                <td className={styles.cost}>Total: </td>
                <td className={styles.cost}>£{pack.total}</td>
              </tr>
            </tbody>
          </Table>
        </BillSection>
      );
    }
  }

  renderCalls(styles) {
    const calls = this.props.data.callCharges;

    if (calls && calls.calls && calls.calls.length) {
      return (
        <BillSection header="Calls">
          <Table responsive striped>
            <thead>
              <tr>
                <th>Number</th>
                <th>Duration</th>
                <th className={styles.cost}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {calls.calls.map((row, i) => (
                <tr key={i}>
                  <td>{row.called}</td>
                  <td>{row.duration}</td>
                  <td className={styles.cost}>£{row.cost}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className={styles.cost}>Total: </td>
                <td className={styles.cost}>£{calls.total}</td>
              </tr>
            </tbody>
          </Table>
        </BillSection>
      );
    }
  }

  renderSkyStore(styles) {
    const store = this.props.data.skyStore;

    let rentalsHead;
    let rentalsBody;
    let buyAndKeepHead;
    let buyAndKeepBody;

    if (store && store.rentals && store.rentals.length) {
      rentalsHead = (
        <thead>
          <tr>
            <th>Rentals</th>
            <th className={styles.cost}>Cost</th>
          </tr>
        </thead>
      );
      rentalsBody = (
        <tbody>
          {store.rentals.map((row, i) => (
            <tr key={i}>
              <td>{row.title}</td>
              <td className={styles.cost}>£{row.cost}</td>
            </tr>
          ))}
        </tbody>
      );
    }

    if (store && store.buyAndKeep && store.buyAndKeep.length) {
      buyAndKeepHead = (
        <thead>
          <tr>
            <th>Buy and Keep</th>
            <th className={styles.cost}>Cost</th>
          </tr>
        </thead>
      );
      buyAndKeepBody = (
        <tbody>
          {store.buyAndKeep.map(row => (
            <tr>
              <td>{row.title}</td>
              <td className={styles.cost}>£{row.cost}</td>
            </tr>
          ))}
        </tbody>
      );
    }

    return (rentalsHead || buyAndKeepHead) ? (
        <BillSection header="SkyStore">
          <Table responsive striped>
            {rentalsHead}
            {rentalsBody}
            {buyAndKeepHead}
            {buyAndKeepBody}
            <tr>
              <td className={styles.cost}>Total: </td>
              <td className={styles.cost}>£{store.total}</td>
            </tr>
          </Table>
        </BillSection>
      ) : null;
  }

  render() {
    const styles = require('./Bill.css');

    return (
      <div className={styles.Bill}>
        <BillSection header="Summary">
          <Grid>
            <Row>
              <Col xs={12} md={6}>
                <dl>
                  <dt>Due:</dt>
                  <dd className="testDue"><Time value={this.props.data.statement.due} format={DATE_FORMAT} /></dd>
                  <dt>To Pay:</dt>
                  <dd className="testTotal">£{this.props.data.total}</dd>
                </dl>
              </Col>
              <Col xs={12} md={6}>
                <dl>
                  <dt>From:</dt>
                  <dd><Time value={this.props.data.statement.period.from} format={DATE_FORMAT} /></dd>
                  <dt>To:</dt>
                  <dd><Time value={this.props.data.statement.period.to} format={DATE_FORMAT} /></dd>
                </dl>
              </Col>
            </Row>
          </Grid>
        </BillSection>
        {this.renderSubscriptions(styles)}
        {this.renderCalls(styles)}
        {this.renderSkyStore(styles)}
      </div>
    );
  }
}
