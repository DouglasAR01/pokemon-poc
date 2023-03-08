import { describe, it, expect, assert } from "vitest";
import { shallowMount } from "@vue/test-utils";
import TheSimpleSearch from "../TheSimpleSearch.vue";

describe("TheSimpleSearch", async () => {
  const comp = shallowMount(TheSimpleSearch, {
    props: {
      items: [
        { name: "bulbasaur" },
        { name: "ivysaur" },
        { name: "charmander" },
      ],
      lookFor: "name",
    },
  });  
  const input = comp.get("[data-test='searchInput']");
  await input.setValue("saur");
  input.trigger("keyup");

  it("should emit the filtered array", async () => {
    const emit = comp.emitted("filtered");
    expect(emit).toBeTruthy();
    expect(emit).toHaveLength(1);
    if(!emit) return false;
    expect(emit[0][0]).toEqual([{ name: "bulbasaur" }, { name: "ivysaur" }]);   
  });
  
  it("should suggest the first array element", async () => {
    const span = comp.get("[data-test='suggest']");
    expect(span.text()).toBe("You may be looking for bulbasaur");
  });
});
