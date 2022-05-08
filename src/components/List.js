import React, { useState, useRef } from 'react';
import ListConfig from './ListConfig';
import Task from './Task';
import { v4 as uuidv4 } from 'uuid';

export default ({ iValue, board, setBoard, task, listId }) => {
    const [taskClicked, settaskClicked] = useState(false);
    const [localValue, setLocalValue] = useState(iValue);
	const ref = useRef();
	const subRef = useRef();
	const draggingItem = useRef();
	const dragOverItem = useRef();

	const checkPressedKey = (element) => {
        if(element.key == "Enter" || element.key == "Escape" ) {
            settaskClicked(false);
            return;
        }
        return;
    }

	const addTask = (value) => {
		var tmp = board;
		for(var i = 0; i< tmp.length; i++) {
			if(tmp[i].id == listId) {
				tmp[i].task= [...tmp[i].task, {value: value, taskId: uuidv4()}]
			}
		}
		setBoard(tmp)
	}

	const onDragOver = (e) => {
		e.preventDefault();
	}

	const onDrop = (e) => {
		let id = e.dataTransfer.getData("id")
		let value = e.dataTransfer.getData("value")

		var tmp = board;
		for(var i = 0; i< tmp.length; i++) {
			for(var j=0;j< tmp[i].task.length;j++) {
				if(tmp[i].task[j].taskId == id) {
					if(tmp[i].id == listId) {
						return
					}
					tmp[i].task.splice(j, 1)
				}
			}
		}

		for(var a=0; a<tmp.length;a++) {
			if(tmp[a].id == listId) {
				tmp[a].task= [...tmp[a].task, {value: value, taskId: id}]
			}
		}

		draggingItem.current = null;
		dragOverItem.current = null;

		setBoard(tmp)
	}

    return (
        <div className="listContainer">
			<div className="list">
				<div className="taskNameList">
					<div className="tName" onClick={() => {settaskClicked(true)}}>
						<div style={{display: taskClicked ? 'none' : 'block'}}>{localValue}</div>
						<input style={{display: taskClicked ? 'block' : 'none' }}
							   ref={ref}
                               value={localValue}
							   onMouseOver={() => ref.current.select()}
                               onChange={(input) => setLocalValue(input.target.value)}
							   onBlur={() => settaskClicked(false)}
							   onKeyDown={(element) => checkPressedKey(element)}/>
					</div>
					<div className="tOption">...</div>
				</div>
				<div className="subTasks" ref={subRef} onDragOver={(e) => onDragOver(e)}
										  onDrop={(e)=> onDrop(e)}>
											  {task.map((el, index) => {
												  return <Task value={el.value} taskId={el.taskId} index={index} board={board} setBoard={setBoard} draggingItem={draggingItem} dragOverItem={dragOverItem} />
											  })}
				</div>
				<ListConfig addFunction={addTask} color={"#ebecf0"} height={"4%"}/>
		    </div>
		</div>
    )
}