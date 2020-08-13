import React from 'react';
import './App.css';

/*
<App>
    <InputTextBar>
    <FilterBar>
    <ItemBox>
       <Item>
*/

class Item extends React.Component {
  render() {
    const {title, content} = this.props;

    return (
        <div className="Item">
          <label>
            <input type="checkbox" />
            &nbsp;{title}
          </label>
          <textarea disabled>{content}</textarea>
        </div>      
    );
  }
}

class ItemBox extends React.Component {

  render() {
    console.log('랜더링');
    const data = this.props.data;
    let items = [];
    
    data.forEach((item, index) => {
      items.push(<Item key={index} id={index} title={item.title} content={item.content} />);
    });

    return (
      <div className="ItemBox">
        {items}
      </div>
    );
  }
}

class FilterBar extends React.Component {
  
  render() {
    return (
      <div className="FilterBar">
        <div className="FilterBar-left">
          <label>
            View tasks
            <select>
              <option>Started</option>
              <option>Finished</option>
            </select>
          </label>
        </div>
        <div className="FilterBar-right">
          <label>
            Search for a tasks
            <input type="text" />
          </label>
        </div>
      </div>
    );
  }
}

class InputTextBar extends React.Component {

  handleInputEnter = (e) => {
    if(e.key === 'Enter') {
      const item = {title: e.target.value, content: '내용을 입력하세요..', done: false};
      this.props.onHandleAddItem(item);
    }
  }

  render() {
    return (
      <div className="InputTextBar">
        <h1>TODO LIST</h1>
        <strong>React Development by&nbsp;<span>@tonyw</span></strong>
        <input type="text" placeholder="Enter a new task" onKeyPress={this.handleInputEnter}/>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {title: '밥 짓기', content: '창고에서 쌀 한 가마니 가져오면 됨.', done: false},
        {title: '리액트 공부하기', content: '구름EDU의 리액트 강의 3강 끝내기', done: false},
        {title: '12시간 잠 자기', content: '무조건 12시간 잔다.', done: true},
        {title: '집 청소하기', content: '화장실, 주방 등등', done: false},
        {title: '빨래하기', content: '귀찮...', done: false}
      ]
    };
  }

  handleAddItem = (item) => {
    let newData = this.state.data;
    newData.push(item);

    this.setState({
      data: newData
    });
  }

  render() {
    return (
      <div className="App">
        <InputTextBar onHandleAddItem={this.handleAddItem} />
        <FilterBar />
        <ItemBox data={this.state.data} />
      </div>
    );
  }
}

export default App;
