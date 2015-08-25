import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DocumentMeta from 'react-document-meta';
import {isLoaded as isBillLoaded, load as loadBill} from '../redux/bill';
import {PageHeader} from 'react-bootstrap';
import Bill from '../components/Bill';

const title = 'Your Bill';

@connect(
  state => ({bill: state.bill}),
  dispatch => bindActionCreators({loadBill}, dispatch)
)
export default class Home extends Component {
  static propTypes = {
    bill: PropTypes.object,
    loadBill: PropTypes.func
  }

  onTryAgain = (e) => {
    this.props.loadBill();
    e.preventDefault();
  }

  renderError() {
    return (
      <p>
        Sorry, there was a problem fetching your bill.{' '}
        <a href="/" onClick={this.onTryAgain}>Try again</a>.
      </p>
    );
  }

  renderContent() {
    if (this.props.bill.loading) {
      return <p>Loading&hellip;</p>;
    }

    if (this.props.bill.error) {
      return this.renderError();
    }

    return <Bill data={this.props.bill.data} />;
  }

  render() {
    const content = this.renderContent();

    return (
      <div>
        <DocumentMeta title={title} />
        <PageHeader>{title}</PageHeader>

        {content}
      </div>
    );
  }

  static fetchData(store) {
    if (!isBillLoaded(store.getState())) {
      return store.dispatch(loadBill());
    }
  }
}
