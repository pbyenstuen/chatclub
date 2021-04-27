import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import ChattersPage from "../src/client/components/ChattersPage";

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

describe("ChattersPage", () => {
    it("it shows created chatters", async () => {
        const api = {
            chatters: {
                getChatters: () => [{
                    id: 1,
                    email: "test@test.test",
                    firstName: "Test",
                    lastName: "Tester"
                }]
            }
        }

        await mountComponent(<ChattersPage api={api} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("p").textContent).toEqual("test@test.test");
    });

    it("can create new chatter", async () => {
        const createChatter = jest.fn();

        const api = {
            chatters: {
                createChatter,
                getChatters: () => [{
                    id: 1,
                    email: "test@test.test",
                    firstName: "Test",
                    lastName: "Tester"
                }]
            }
        }

        await mountComponent(<ChattersPage api={api} />);

        Simulate.change(container.querySelector("input[name='email']"), {
            target: { value: "chat@chat.chat" },
        });

        Simulate.change(container.querySelector("input[name='firstname']"), {
            target: { value: "Chat" },
        });

        Simulate.change(container.querySelector("input[name='lastname']"), {
            target: { value: "Chatson" },
        });

        await act(async () => {
            Simulate.submit(container.querySelector("form"));
        });

        expect(createChatter).toBeCalledWith({
            email: "chat@chat.chat",
            firstName: "Chat",
            lastName: "Chatson"
        });
    });

    it("can show error message for empty fields when creating chatter", async () => {
        const api = {
            chatters: {
                getChatters: () => [{
                    id: 1,
                    email: "test@test.test",
                    firstName: "Test",
                    lastName: "Tester"
                }]
            }
        }

        await mountComponent(<ChattersPage api={api} />);

        Simulate.submit(container.querySelector("form"));

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h5").textContent).toEqual("Please enter all fields");
    });

    it("can show error message on creating chatter", async () => {
        const api = {
            chatters: {
                getChatters: () => [{
                    id: 1,
                    email: "test@test.test",
                    firstName: "Test",
                    lastName: "Tester"
                }],
                createChatter: () => {
                    throw new Error("Error");
                }
            }
        }

        await mountComponent(<ChattersPage api={api} />);

        container.querySelectorAll("input").forEach(e => 
            Simulate.change(e, {
            target: { value: "Value" },
        }));

        await act(async () => {
            Simulate.submit(container.querySelector("form"));
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h5").textContent).toEqual("Error: Error");
    });

    it("can show error message on rendering chatters list", async () => {
        const api = {
            chatters: {
                getChatters: () => {
                    throw new Error("Error");
                }
            }
        }

        await mountComponent(<ChattersPage api={api} />);

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("Something went wrong: Error: Error");
    });

    it("can show edit chatter page", async () => {
        const api = {
            chatters: {
                getChatters: () => [{
                    id: 1,
                    email: "test@test.test",
                    firstName: "Test",
                    lastName: "Tester"
                }]
            }
        }

        await mountComponent(<ChattersPage api={api} />);

        await act(async () => {
            await Simulate.click(container.querySelector("#chatter-item a"));
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h2").textContent).toEqual("Edit Chatter");
        expect(container.querySelector("h3").textContent).toEqual("test@test.test");
    });

    it("can call deletion function", async () => {
        const deleteChatter = jest.fn();

        const api = {
            chatters: {
                deleteChatter,
                getChatters: () => [{
                    id: 1,
                    email: "test@test.test",
                    firstName: "Test",
                    lastName: "Tester"
                }]
            }
        }

        await mountComponent(<ChattersPage api={api} />);

        await act(async () => {
            await Simulate.click(container.querySelector("#del-btn"));
        });

        expect(deleteChatter).toBeCalled();
    });
});
