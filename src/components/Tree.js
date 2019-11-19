import React from "react";

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      openNodes: {}
    };
  }

  componentWillMount() {
    var buildings = new Scorocode.Query("buildings");
    buildings.find().then(finded => {
      let buildings = finded.result;
      this.setState({ buildings: buildings });
    });
  }

  toggleTree(id) {
    const openNodes = this.state.openNodes;

    if (openNodes[id] !== undefined) {
      openNodes[id] = !openNodes[id];
    } else {
      openNodes[id] = true;
    }

    this.setState({ openNodes });
  }

  render() {
    return (
      <div id="multi-tree">
        <h4>
          <a className="scheme-header" href="#">
            Схема офисов организации
          </a>
        </h4>
        <ul>
          {this.state.buildings.length !== 0 &&
            this.state.buildings.map(building => {
              return (
                <li key={building._id}>
                  <span onClick={this.toggleTree.bind(this, building._id)}>
                    <em
                      className={
                        this.state.openNodes[building._id] ? "???" : "marker"
                      }
                    ></em>
                    <a id={`${building._id}`}>{building.name}</a>
                  </span>
                  <ul
                    className={
                      this.state.openNodes[building._id]
                        ? ""
                        : "hide" /*display:none;*/
                    }
                  >
                    {building &&
                      building.rooms !== undefined &&
                      building.rooms.map(room => {
                        return (
                          <li key={room.id}>
                            <span onClick={this.toggleTree.bind(this, room.id)}>
                              <em
                                className={
                                  this.state.openNodes[room.id]
                                    ? "???"
                                    : "marker"
                                }
                              ></em>
                              <a
                                id={`${room.id}`}
                                onClick={this.props.onToggleEqItem}
                              >
                                {room.name}
                              </a>
                            </span>
                            <ul
                              className={
                                this.state.openNodes[room.id]
                                  ? ""
                                  : "hide" /*display:none;*/
                              }
                            >
                              {room &&
                                room.children !== undefined &&
                                room.children.map(item => {
                                  return (
                                    <li key={item.id}>
                                      <span>
                                        <a
                                          id={`${item.id}`}
                                          onClick={this.props.onToggleEqItem}
                                        >
                                          {item.name}
                                        </a>
                                      </span>
                                      <ul>
                                        {item &&
                                          item.children !== undefined &&
                                          item.children.map(i => {
                                            return (
                                              <li key={i.id}>
                                                <span>
                                                  <a
                                                    id={`${i.id}`}
                                                    onClick={
                                                      this.props.onToggleEqItem
                                                    }
                                                  >
                                                    {i.name}
                                                  </a>
                                                </span>
                                              </li>
                                            );
                                          })}
                                      </ul>
                                    </li>
                                  );
                                })}
                            </ul>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default Tree;
