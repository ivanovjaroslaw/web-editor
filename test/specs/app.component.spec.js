import { shallowMount } from '@vue/test-utils';
import App from '../../src/App';

jest.mock('firebase/app', () => {
  const data = { test: 'test' };
  const snapshot = { val: () => data };
  return {
    initializeApp: jest.fn().mockReturnThis(),
    database: jest.fn().mockReturnValue({
      ref: jest.fn().mockReturnThis(),
      once: jest.fn(() => Promise.resolve(snapshot)),
    }),
    auth: jest.fn().mockReturnThis(),
  };
});

jest.mock('../../src/adapters/api-auth.adapter', () => {
  return function () {
    return {
      setHandlers: jest.fn().mockReturnThis(),
      signInAnonymously: jest.fn().mockReturnValue({
        subscribe: jest.fn().mockReturnValue(),
      }),
    };
  };
});

// @todo: there is an error or warning message which is just annoying:
//   console.error node_modules/vue/dist/vue.runtime.common.js:603
//     [Vue warn]: Cannot find element: #app
//  but the actual return result is success
describe('AppComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  beforeEach(() => {
    wrapper.destroy();
  });

  it('has a correct header title', () => {
    const expected = 'UI Web Editor';
    expect(wrapper.find('h1').text()).toContain(expected);
  });
});
