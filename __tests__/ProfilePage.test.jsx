import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import ProfilePage from "../src/client/components/ProfilePage";

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

describe("ProfilePage", () => {
    it("can show user info (google)", async () => {
        const api = {
            auth: {
                getUser: () => ({
                    username: "Test",
                    displayName: "Test",
                    firstName: "Test",
                    lastName: "Test",
                    image: "test.png"
                })
            }
        }

        await mountComponent(<ProfilePage api={api} />);

        expect(container.innerHTML).toMatchSnapshot();
        container.querySelectorAll("p").forEach(p => {
            expect(p.textContent).toEqual("Test");
        });
    });

    it("can show user info (local)", async () => {
        const api = {
            auth: {
                getUser: () => ({
                    username: "Test",
                    displayName: "Test",
                })
            }
        }

        await mountComponent(<ProfilePage api={api} />);

        expect(container.querySelector("p").textContent).toEqual("Test");
    });

    it("can show error message", async () => {
        const api = {
            auth: {
                getUser: () => {
                    throw new Error("Error")
                }
            }
        }

        await mountComponent(<ProfilePage api={api} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual("Something went wrong: Error: Error");
    });
});
