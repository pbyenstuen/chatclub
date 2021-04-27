import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import SignupPage from "../src/client/components/SignupPage";

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

describe("SignupPage", () => {
    it("can submit username and password", async () => {
        const signUp = jest.fn();

        const api = {
            auth: {
                signUp
            }
        }

        await mountComponent(<SignupPage api={api} />);

        Simulate.change(container.querySelector("input[name='username']"), {
            target: { value: "realDonaldTrump" },
        });

        Simulate.change(container.querySelector("input[name='password']"), {
            target: { value: "yourefired" },
        });

        Simulate.change(container.querySelector("input[name='confirmpassword']"), {
            target: { value: "yourefired" },
        });

        await act(async () => {
            Simulate.submit(container.querySelector("form"));
        });

        expect(signUp).toBeCalledWith({
            username: "realDonaldTrump",
            password: "yourefired"
        });
    });

    it("can show error message", async () => {
        const api = {
            auth: {
                signUp: () => {
                    throw new Error("Invalid username/password");
                }
            }
        }

        await mountComponent(<SignupPage api={api} />);

        container.querySelectorAll("input").forEach(e => 
            Simulate.change(e, {
            target: { value: "Value" },
        }));

        await act(async () => {
            Simulate.submit(container.querySelector("form"));
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual("Error: Invalid username/password");
    });

    it("can show error message for empty fields", async () => {
        await mountComponent(<SignupPage />);

        Simulate.submit(container.querySelector("form"));

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual("Please enter all fields");
    });

    it("can show error message for password inequality", async () => {
        await mountComponent(<SignupPage />);

        Simulate.change(container.querySelector("input[name='username']"), {
            target: { value: "realDonaldTrump" },
        });

        Simulate.change(container.querySelector("input[name='password']"), {
            target: { value: "yourefired" },
        });

        Simulate.change(container.querySelector("input[name='confirmpassword']"), {
            target: { value: "yourfired" },
        });

        Simulate.submit(container.querySelector("form"));

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h4").textContent).toEqual("Passwords do not match");
    });
});