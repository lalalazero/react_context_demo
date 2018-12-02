import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
const context = React.createContext();

function F1() {
  return (
    <div className="bordered">
      我是第一层
      <F2 />
    </div>
  );
}
function F2() {
  return (
    <div className="bordered">
      我是第二层
      <F3 />
    </div>
  );
}
function F3() {
  return (
    <div className="bordered">
      我是第三层，consumer在这里，传递变量给第四层使用
      <context.Consumer>{x => <F4 n4={x.n} setN={x.setN} />}</context.Consumer>
    </div>
  );
}

function F4(props) {
  return (
    <div className="bordered">
      我是第四层，使用props变量={props.n4}
      <button onClick={props.setN}>点击+1</button>
    </div>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      x: {
        n: 100,
        setN: () => {
          console.log("setN被调用了。。。");
          this.setState({
            x: {
              ...this.state.x,
              n: this.state.x.n + 1
            }
          });
        }
      }
    };
  }
  render() {
    return (
      <div>
        我是app，Provider在这，传递我的state的x对象，
        包含变量n，和更改变量的函数
        <context.Provider value={this.state.x}>
          <F1 />
        </context.Provider>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
