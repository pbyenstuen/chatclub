import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import Application from "../src/client/components/Application";

require('react-router-dom').BrowserRouter = ({ children }) => <div>{children}</div>

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const mountComponent = async (component, entries) => {
    await act(async () => {
        await ReactDOM.render(<MemoryRouter initialEntries={[entries]}>{component}</MemoryRouter>, container);
    });
}

describe("Application", () => {
    it("routes to NotFound on invalid path", async () => {
        const api = {
            auth: {
                getUser: () => ({
                    username: "Test",
                    displayName: "Test",
                })
            }
        }

        await mountComponent(<Application api={api} />, "/nothing");

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("NOT FOUND: 404");
    });

    it("can route to correct path", async () => {
        const api = {
            auth: {
                getUser: () => ({
                    username: "Test",
                    displayName: "Test",
                })
            }
        }

        await mountComponent(<Application api={api} />, "/login");

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("SIGN IN");
    });

    it("routes to /login when not authenticated", async () => {
        const api = {
            auth: {
                getUser: () => {
                    return undefined;
                }
            }
        }

        await mountComponent(<Application api={api} />, "/profile");

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("SIGN IN");
    });
});
