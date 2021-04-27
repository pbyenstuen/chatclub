import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import EditChatterPage from "../src/client/components/EditChatterPage";

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

describe("EditChatterPage", () => {
    it("can submit changes to chatter", async () => {
        const updateChatter = jest.fn();

        const api = {
            chatters: {
                updateChatter,
                getChatter: () => ({
                    id: 1,
                    email: "test@test.test",
                    firstName: "Test",
                    lastName: "Tester"
                })
            }
        }

        await mountComponent(<EditChatterPage api={api} />);

        Simulate.change(container.querySelector("input[name='email']"), {
            target: { value: "supertest@test.test" },
        });

        Simulate.change(container.querySelector("input[name='firstname']"), {
            target: { value: "Supertest" },
        });

        Simulate.change(container.querySelector("input[name='lastname']"), {
            target: { value: "Supertester" },
        });

        await act(async () => {
            Simulate.submit(container.querySelector("form"));
        });

        expect(updateChatter).toBeCalledWith(
            1, {
            email: "supertest@test.test",
            firstName: "Supertest",
            lastName: "Supertester"
        });
    });
});