import React, { createRef } from 'react';
import './App.css';

/*
<App>
    <InputTextBar>
    <FilterBar>
    <ItemBox>
       <Item>
*/

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      textareaClassName: 'textarea-default',
      value: this.props.content
    }
    this.refTextArea = createRef();
  }

  componentDidUpdate() {
    if(!this.state.isDisabled) {
      console.log(this.refTextArea.current);
      this.refTextArea.current.focus();
    }
  }

  handleSaveDone = (e) => {
    this.props.onHandleEditItem(this.state.value, e.target.checked, this.props.id);
  }

  handleSaveContent = (e) => {
    this.setState({
      value: e.target.value
    });
    this.props.onHandleEditItem(e.target.value, this.props.done, this.props.id);
  }

  handleEditButton = (e) => {
    let flag;
    flag = this.state.isDisabled ? false : true;
    let className = flag ? 'textarea-default' : 'textarea-edit';
    
    this.setState({
      isDisabled: flag,
      textareaClassName: className
    });
  }

  handleEditEnter = (e) => {
    if(e.key === 'Enter') {
      let flag = this.state.isDisabled ? false : true;
      let className = flag ? 'textarea-default' : 'textarea-edit';
      this.setState({
        isDisabled: flag,
        textareaClassName: className
      });
    }
  }

  render() {
    const {title} = this.props;
    const {isDisabled, textareaClassName, value} = this.state;

    return (
        <div className="Item">
          <label>
            <input type="checkbox" checked={this.props.done} onChange={this.handleSaveDone} />
            &nbsp;{title}&nbsp;
          </label>
          <button type="button" onClick={this.handleEditButton} >
            {isDisabled ? 'Edit' : 'Done'}
          </button>
          <textarea className={textareaClassName} spellCheck="false" ref={this.refTextArea} value={value}
             onChange={this.handleSaveContent} disabled={isDisabled} onKeyPress={this.handleEditEnter}
             onFocus={(e) => {const val = e.target.value; e.target.value = ''; e.target.value = val;}} ></textarea>
        </div>
    );
  }
}

class ItemBox extends React.Component {

  render() {
    const data = this.props.data;
    let items = [];
    
    data.forEach((item, index) => {
      items.push(<Item key={index} id={index} title={item.title} content={item.content} done={item.done} onHandleEditItem={this.props.onHandleEditItem} />);
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
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
  }

  componentDidMount() {
    this.refInput.current.focus();
  }

  handleInputEnter = (e) => {
    if(e.key === 'Enter') {
      const item = {title: e.target.value, content: '내용을 입력하세요..', done: false};
      this.props.onHandleAddItem(item);
      this.refInput.current.value = '';
    }
  }

  render() {
    return (
      <div className="InputTextBar">
        <h1>TODO LIST</h1>
        <strong>React Development by&nbsp;<span>@tonyw</span></strong>
        <input type="text" ref={this.refInput} placeholder="Enter a new task" onKeyPress={this.handleInputEnter}/>
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

  handleEditItem = (content, done, index) => {
    let newData = this.state.data;
    newData[index].content = content;
    newData[index].done = done;

    this.setState({
      data: newData
    });
  }

  handleAddItem = (item) => {
    let newData = this.state.data;
    newData.unshift(item);

    this.setState({
      data: newData
    });
  }

  render() {
    return (
      <div className="App">
        <InputTextBar onHandleAddItem={this.handleAddItem} />
        <FilterBar />
        <ItemBox data={this.state.data} onHandleEditItem={this.handleEditItem} />
      </div>
    );
  }
}

export default App;
