import {expect} from 'chai';
import {load, _TYPES} from '../bill';

describe('load expectedAction', () => {
  it('should create an action to load the bill', () => {
    const action = load();

    expect(action.types[0]).to.equal(_TYPES[0]);
    expect(action.types[1]).to.equal(_TYPES[1]);
    expect(action.types[2]).to.equal(_TYPES[2]);
    expect(action.promise).to.be.a('function');
  });
});
