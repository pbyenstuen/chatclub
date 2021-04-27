import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import ChatView from "../src/client/components/ChatView";

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

describe("ChatView", () => {
    it("can render existing messages from chat log", async () => {
        const user = {
            displayName: "Mammy Two Shoes"
        }

        const chatLog = [
            {
                id: "1",
                username: "Tom",
                message: "Cool chat",
            },
            {
                id: "2",
                username: "Jerry",
                message: "^",
            },
        ];

        await mountComponent(<ChatView chatLog={chatLog} user={user} />);

        expect(container).toMatchSnapshot();
        expect(container.querySelector(".message-user-info h5").textContent).toEqual("Tom");
        expect(container.querySelector(".message p").textContent).toEqual("Cool chat");
    });

    it("can send new message", async () => {
        const sendMessage = jest.fn();

        const user = {
            displayName: "Mammy Two Shoes"
        }

        await mountComponent(<ChatView chatLog={[]} user={user} sendMessage={sendMessage} />);

        Simulate.change(container.querySelector("input"), {
            target: { value: "..." },
        });

        Simulate.submit(container.querySelector("form"));

        expect(sendMessage).toBeCalledWith({
            message: "...", 
            picture: null, 
            username: "Mammy Two Shoes"
        });
        expect(container.querySelector("input").getAttribute("value")).toEqual("");
    });
});
