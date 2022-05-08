import React, { useRef } from 'react';

export default ({ value, taskId, index, board, setBoard, draggingItem, dragOverItem }) => {

	const onDragStart = (e) => {
		e.dataTransfer.setData("value", value);
		e.dataTransfer.setData("id", taskId);
		draggingItem.current = index;
	}

	const onDragEnter = (e) => {
		dragOverItem.current = index;
		if (dragOverItem.current == undefined || draggingItem.current == undefined) {
			return;
		} else if(dragOverItem.current != draggingItem.current) {
			const tmp = board;
			var draggingItemContent, indList=0;
			for(var i = 0; i< tmp.length; i++) {
				for(var j=0;j< tmp[i].task.length;j++) {
					if(tmp[i].task[j].taskId == taskId) {
						draggingItemContent = tmp[i].task[draggingItem.current]
						indList=i;
						break;
					}
				}
			}

			for(var v = 0; v< tmp.length; v++) {
				if(v == indList) {
					tmp[v].task.splice(draggingItem.current, 1);
					tmp[v].task.splice(dragOverItem.current, 0, draggingItemContent);
					break;
				}
			}

			draggingItem.current = dragOverItem.current;
			dragOverItem.current = null;
			setBoard(tmp)
		}
	}

	const onDragEnd = (e) => {
		draggingItem.current = null;
		dragOverItem.current = null;
	}

	return <div className="task" onDragStart={(e) => onDragStart(e, index)} onDragEnter={(e) => onDragEnter(e)}  onDragEnd={(e) => onDragEnd(e)} draggable>
				<p>{value}</p>
			</div>;
};