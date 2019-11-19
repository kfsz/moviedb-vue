import Vuetify from 'vuetify'

import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import { createLocalVue } from '@vue/test-utils'

import App from "@/App.vue";

const localVue = createLocalVue()

describe('App.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const wrapper = shallowMount(App, {
    localVue,
    vuetify,
    propsData: {},
  })

  it('should have a custom title', () => {
    expect(wrapper.html()).to.contain('Movie DB');
  })

  it('should have one about button', () => {
    const aboutButton = wrapper.find("#about-button");
    expect(aboutButton).to.exist;
    expect(aboutButton.html()).to.contain('About');
  })

  it('should have one toggle theme button', () => {
    const changeButton = wrapper.find("#change-theme-button");
    expect(changeButton).to.exist;
    expect(changeButton.html()).to.contain('Toggle dark mode');
  })

})