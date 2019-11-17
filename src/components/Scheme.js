import React from 'react';
import Tree from './Tree';
import Equipment from './Equipment';

class Scheme extends React.Component {
  constructor() {
    super();
    this.state = {
      showEq: false,
      showEqItem: false,
      id: ''
    };
  }

  handleShowEqItem = e => {
    this.setState ({
      showEqItem: !this.state.showEqItem,
      id: e.target.id
    });
  }

  render() {
   return (
    <div className="container">
      <div className="panel-left">
        <Tree
          onToggleEqItem={this.handleShowEqItem}
        />
    </div>
      <div className="panel-right">
          { this.state.showEqItem
            &&
            <Equipment
              id={this.state.id}
            /> }
        </div>
      </div>
    );
  }
}
export default Scheme;