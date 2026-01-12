/* i wrote this to test that my SearchBar component
is correctly acting based on user input by calling
onChange whenever the user types*/

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

test("SearchBar component test", async () => {
    const user = userEvent.setup();
    const changeHandler = jest.fn();

    render(<SearchBar value = "" onChange={changeHandler} />);

    const input = screen.getByPlaceholderText(
        /search for a city/i
    );

    await user.type(input, "Zagreb");

    expect(changeHandler).toHaveBeenCalled();
    expect(changeHandler).toHaveBeenCalledTimes(6);
});