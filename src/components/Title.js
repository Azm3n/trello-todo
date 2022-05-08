import React, { useState, useRef } from 'react';

export default () => {
    const [isClicked, setisClicked] = useState(false)
    const [input, setInput] = useState("To-Do List based on Trello")
    const inputRef = useRef();
    const valueRef = useRef();

    const checkPressedKey = (element) => {
        if(element.key == "Enter" || element.key == "Escape" ) {
            setisClicked(false);
            saveTitle()
            return;
        }
        return;
    }

    const blur = () => {
        var tmpVar = input.replaceAll(" ", "");
        if(tmpVar === "") {
            setInput("To-Do List based on Trello");
            setisClicked(false)
            return;
        }

        setisClicked(false)
        saveTitle()
    }

    const changeTitle = () => {
        setTimeout(() => {
            valueRef.current.style.display = "none";
            inputRef.current.style.display = "block";
            inputRef.current.style.opacity = 1;
            inputRef.current.select();
        }, 500);
        valueRef.current.style.opacity = 0;
    }

    const saveTitle = () => {
        setTimeout(() => {
            inputRef.current.style.display = "none";
            valueRef.current.style.display = "block";
            valueRef.current.style.opacity = 1;
        }, 500)
        inputRef.current.style.opacity = 0;
    }

	return <div id="title" 
                className="navigation-element"
                onClick={() => setisClicked(true)}>
                    <p id="value-display" ref={valueRef} onClick={changeTitle}>{input}</p>
                    <input id="title-input" 
                        value={input}
                        onChange={(input) => setInput(input.target.value)}
                        onKeyDown={(element) => checkPressedKey(element)}
                        onBlur={() => blur()}
                        ref={inputRef}
                        maxLength="26"
                        autocomplete="off"
                    />
            </div>;
};