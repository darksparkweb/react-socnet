import React from "react";
import {create, ReactTestInstance} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import {updateStatus} from "../../../Redux/profileReducer";

describe("ProfileStatusComponent", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="TEST COMPONENT YO!"  updateStatus={updateStatus}/>);
        const instance = component.getInstance() as ReactTestInstance
        //@ts-ignore
        expect(instance.state.status as string).toBe("TEST COMPONENT YO!");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="TEST COMPONENT YO!"  updateStatus={updateStatus}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <input> should not be displayed with correct status", () => {
        const component = create(<ProfileStatus status="TEST COMPONENT YO!" updateStatus={updateStatus} />);
        const root = component.root;

        expect(() => {
            let input = root.findByType("input")
        }).toThrow();
    });

    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status="TEST COMPONENT YO!" updateStatus={updateStatus}/>);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("TEST COMPONENT YO!");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="TEST COMPONENT YO!" updateStatus={updateStatus}/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onClick()
        let input = root.findByType("input");
        expect(input.props.value).toBe("TEST COMPONENT YO!");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="TEST COMPONENT YO!" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        //@ts-ignore
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    })
});