import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";

import App from "@/App.vue";
import MovieDatabase from "@/components/MovieDatabase.vue";

describe("App.vue", () => {
  it("renders static about text", () => {
    const wrapper = shallowMount(App, {});
    expect(wrapper.text()).to.include("Movie Database");
  });
});

describe("MovieDatabase.vue", () => {
  it("renders static text when passed nothing", () => {
    const data = [];
    const wrapper = shallowMount(MovieDatabase, {
      propsData: { data }
    });
    expect(wrapper.text()).to.include("Close");
  });
});
