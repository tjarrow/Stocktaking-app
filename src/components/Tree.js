import React from 'react';
import ReactDOM from 'react-dom';
import Equipment from './Equipment';

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: []
    }
  }

 componentWillMount() {
  var buildings = new Scorocode.Query("buildings");
  var eq = new Scorocode.Query("equipment");
    buildings.find().then((finded) => {
    let buildings = finded.result;
    this.setState({buildings: buildings});
  });
}

render() {
  return (
   <div id="multi-tree">
    <h4><a className="scheme-header" href="#">Схема зданий организации</a></h4>
     <ul>
      { this.state.buildings.length !== 0 &&
        this.state.buildings.map((building, index) => {
        return (
          <li key={index}><span><a id={`${building._id}`}>{building.name}</a></span>
            <ul>
              { building&&building.rooms !== undefined && building.rooms.map((room, index) => {
              return (
                <li key={index}><span><a id={`${room.id}`} onClick={this.props.onToggleEqItem}>{room.name}</a></span>
                  <ul>
                    { room&&room.children!==undefined&&room.children.map((item, index) => {
                     return (
                      <li key={index}><span><a id={`${item.id}`} onClick={this.props.onToggleEqItem}>{item.name}</a></span>
                        <ul>
                          {item&&item.children!==undefined&&item.children.map((i, index) => {
                            return (
                              <li key={index}><span><a id={`${i.id}`} onClick={this.props.onToggleEqItem}>{this.state.containEq && <div className = 'item-indicator'>Индикатор</div>}{i.name}</a></span></li>
                            )})
                           }
                         </ul>
                      </li>
                    )})
                    }
                  </ul>
                </li>
                )})
                }
            </ul>
          </li>
          )})}
      </ul>
     </div>
    )
  }
}
export default Tree;
