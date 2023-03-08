import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import ThePaginator from "../ThePaginator.vue";

describe("ThePaginator", () => {
  const comp = shallowMount(ThePaginator, {
    props: {
      currentPage: 1,
      pageLimit: 20,
      arrayLen: 41,
    },
  });

  it("should have the correct number of pages", () => {
    expect(comp.findAll("[class='btn btn-primary me-1']").length).toBe(3);
  });

  it("shouldn't let the user go to a page less than the first", () => {
    const previousPageButton = comp.get("[data-test='previousPage']");
    expect(previousPageButton.attributes("disabled")).toBeDefined();
  });

  it("should emit the pageUpdate event when user is able to click on a button", () => {
    const nextPageButton = comp.get("[data-test='nextPage']");
    nextPageButton.trigger("click");
    expect(comp.emitted()).toHaveProperty("pageUpdate");
  });
});
