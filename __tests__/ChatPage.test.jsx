import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import ChatPage from "../src/client/components/ChatPage";

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const mountComponent = async (component) => {
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{component}</MemoryRouter>, container);
    });
}

describe("ChatPage", () => {
    it("can show error message", async () => {
        const api = {
            auth: {
                getUser: () => {
                    throw new Error("Error")
                }
            }
        }

        await mountComponent(<ChatPage api={api} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual("Something went wrong: Error: Error");
    });
});
