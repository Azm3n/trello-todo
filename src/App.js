import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import ListConfig from './components/ListConfig';
import Profile from './components/Profile';
import Menu from './components/Menu';
import Title from './components/Title';
import List from './components/List';

import './style/main.css';
import './style/title.css';

import './style/classes.css';


class App extends React.Component {
	state = {
		board: []
	};

	componentDidMount() {
		this.setState({board: [{type: "config", color: "#ffffff3d", height: "5%", task: []}]})
	}

	addList = (value) => {
		const newElement = { type: "list", id: uuidv4(), title: value, task: []}
		var tmpArr = this.state.board;
		tmpArr.splice(-1, 0,newElement)
		this.setState({board: tmpArr})
	} 

	setBoard = (updatedBoard) => {
		this.setState({board: updatedBoard})
	}

	render() {
		return (
			<div id="container">
				<div id="navigation">
					<Menu />
					<Title />
					<Profile />
				</div>
				<div id="board">
					{this.state.board.map((el) => {
						if(el.type == "config") {
							return <ListConfig addFunction={this.addList} color={el.color} height={el.height}/>
						} else if (el.type == "list") {
							return <List iValue={el.title} board={this.state.board} setBoard={this.setBoard} task={el.task} listId={el.id} />
						}
					})}
				</div>
			</div>
		);
	}
}

export default App;
