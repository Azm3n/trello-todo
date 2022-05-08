import React, { useState, useEffect, useRef } from 'react';
import List from './List';

export default ({ addFunction, color, height }) => {
	const [isClicked, setisClicked] = useState(false)
	const [iValue, setiValue] = useState("")
	const ref = useRef()

	useEffect(() => {
		ref.current.style.backgroundColor = color;
		const clickDetected = (element) => {
			 if(ref.current.contains(element.target)) {
				  return;
			 }

			 setisClicked(false);
			 ref.current.style.maxHeight = height;
			 ref.current.style.backgroundColor = color;
		}
		document.body.addEventListener('click', clickDetected, true)

		return () => {
			 document.body.removeEventListener('click', clickDetected, true)
		}
   }, [])

	const checkPressedKey = (element) => {
        if(element.key == "Enter") {
			createList();
            setisClicked(false);
			ref.current.style.maxHeight = height;
			ref.current.style.backgroundColor = color;
            return;
        }

		if(element.key == "Escape") {
			setisClicked(false);
			ref.current.style.maxHeight = height;
			ref.current.style.backgroundColor = color;
            return;
		}

        return;
    }

	const createList = () => {
		addFunction(iValue);
	}

	const mainOnClickHandler = (element) => {
		if(element.target.id === "delete") {
			return;
		}
		setisClicked(true);
		ref.current.style.maxHeight = "8%";
		ref.current.style.backgroundColor = color;
	}

	const declineOnClickHandler = () => {
		setiValue("");
		setisClicked(false);
		ref.current.style.maxHeight = height;
		ref.current.style.backgroundColor = color;
		return;
	}

	return <div className="addPhaseContainer" onClick={(element) => mainOnClickHandler(element)} ref={ref}>
			<p  style={{display: isClicked ? 'none' : 'block'}}>Add another list</p>
			<div id="addPhase" style={{display: isClicked ? 'flex' : 'none' }}
				onKeyDown={(element) => checkPressedKey(element)}>
				<input id="taskName" type="text" value={iValue} onChange={(value) => setiValue(value.target.value)}/>
				<div id="interactionSection">
					<input id="taskButton" type="button" onClick={() => createList()} value="Add List" />
					<hr/>
					<div id="delete" onClick={() => declineOnClickHandler()}>X</div>
				</div>
			</div>
	</div>;
};
