import * as React from "react";
import {configure, shallow, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import InfoMenu from "./info-menu";

configure({adapter: new Adapter});

const menuNames = ["Overview", "Details", "Reviews"];

describe("test InfoMenu", () => {
  it("click on menu item link should trigger callback and pass menu name into it", () => {
    const mockCallback = jest.fn((name) => name);
    const activeItemName = menuNames[2];

    const tree = mount(
      <InfoMenu
        onMenuItemClick={mockCallback}
        activeItemName={activeItemName}
        menuNames={menuNames}
      />
    )

    tree.find(".movie-nav__link").at(2).simulate("click");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.results[0].value).toBe(activeItemName);
  })

  it("menu item which name match with prop activeItemName value, should contain active class", () => {
    const ACTIVE_CLASS = "movie-nav__item--active";

    const tree = mount(
      <InfoMenu
        onMenuItemClick={() => {}}
        activeItemName={menuNames[2]}
        menuNames={menuNames}
      />
    )

    const menuItem = tree.find(".movie-nav__item").at(2);
    const anotherMenuItem = tree.find(".movie-nav__item").at(0);

    expect(menuItem.hasClass(ACTIVE_CLASS)).toBe(true);
    expect(anotherMenuItem.hasClass(ACTIVE_CLASS)).toBe(false);
  })
})
