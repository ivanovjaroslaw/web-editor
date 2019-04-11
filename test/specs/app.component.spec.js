import { shallowMount } from '@vue/test-utils';
import App from '../../src/App';

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
