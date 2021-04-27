import React from "react";
import ReactDOM from "react-dom";
import { act, isDOMComponent, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import HeaderBar from "../src/client/components/HeaderBar";

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

describe("HeaderBar", () => {
    it("renders unauthenticated view", async () => {
        await mountComponent(<HeaderBar user={undefined} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(isDOMComponent(container.querySelector("h3"))).toEqual(false);
    });

    it("renders authenticated view", async () => {
        const user = {
            username: "User",
            displayName: "User"
        }

        await mountComponent(<HeaderBar user={user} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h3").textContent).toEqual("User");
    });

    it("updates user on logout", async () => {
        const logOut = jest.fn();
        const updateUser = jest.fn();

        let user = {
            username: "User",
            displayName: "User"
        }
        
        const api = {
            auth: {
                logOut
            }
        }

        await mountComponent(<HeaderBar api={api} user={user} updateUser={updateUser} />);

        expect(container.querySelector("h3").textContent).toEqual("User");
        
        await act(async () => {
            await Simulate.click(container.querySelector("button"));
        });
        
        expect(updateUser).toBeCalled();
    });

    it("can show error message", async () => {
        const user = {
            username: "User",
            displayName: "User"
        }

        const api = {
            auth: {
                logOut: () => {
                    throw new Error;
                }
            }
        }

        await mountComponent(<HeaderBar api={api} user={user} />);

        await act(async () => {
            await Simulate.click(container.querySelector("button"));
        });

        expect(container.querySelector("h3").textContent).toEqual("Logout failed");
    });
});