import React from 'react/addons';
import {expect} from 'chai';
import Home from '../Home';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import ApiClient from 'ApiClient';
import response from './billFixture';

const { TestUtils } = React.addons;


describe('Home', () => {

  function renderWithState(state) {
    const client = new ApiClient();
    const store = createStore(client, state);
    const renderer = TestUtils.renderIntoDocument(
      <Provider store={store} key="provider">
        {() => <Home/>}
      </Provider>
    );

    return renderer;
  }

  describe('while loading', () => {
    let renderer;
    let dom;

    before(() => {
      renderer = renderWithState({
        bill: {
          load: () => {},
          loaded: false,
          loading: true
        }
      });
      dom = React.findDOMNode(renderer);
    });

    it('should render correctly', () => {
      expect(renderer).to.be.ok;
    });

    it('should render with spinner', () => {
      const text = dom.getElementsByTagName('p')[0].textContent;
      expect(text).to.equal('Loading…');
    });
  });

  describe('with error', () => {
    let renderer;
    let dom;

    before(() => {
      renderer = renderWithState({
        bill: {
          load: () => {},
          loaded: true,
          loading: false,
          error: true
        }
      });
      dom = React.findDOMNode(renderer);
    });

    it('should render correctly', () => {
      expect(renderer).to.be.ok;
    });

    it('should render with error message', () => {
      const text = dom.getElementsByTagName('p')[0].textContent;
      expect(text).to.equal('Sorry, there was a problem fetching your bill. Try again.');
    });
  });

  describe('with full response', () => {
    let renderer;
    let dom;

    before(() => {
      renderer = renderWithState({
        bill: {
          load: () => {},
          loaded: true,
          loading: false,
          data: response
        }
      });
      dom = React.findDOMNode(renderer);
    });

    it('should render correctly', () => {
      expect(renderer).to.be.ok;
    });

    it('should render with due date', () => {
      const text = dom.getElementsByClassName('testDue')[0].textContent;
      expect(text).to.equal('25/01/2015');
    });

    it('should render with total', () => {
      const text = dom.getElementsByClassName('testTotal')[0].textContent;
      expect(text).to.equal('£136.03');
    });
  });

});
