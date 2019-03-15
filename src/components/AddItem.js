import React from 'react';
import ReactDOM from 'react-dom';
import '../server/data.js';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemRoom: '',
      itemId: '',
      itemCount: 1
    }
    this.handleChangeItem = this.handleChangeItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
 }

  handleChangeItem = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState ({
      [name] : value
    });
  }

  handleAddItem = (e) => {
    e.preventDefault();
    let comp = new Scorocode.Object("equipment");
    if ((this.state.itemName != '') && (this.state.itemRoom != '') && (this.state.itemCount != ''))
    {
      comp.set("name", this.state.itemName);
      comp.set("room", this.state.itemRoom);
      comp.set("count", Number.parseInt(this.state.itemCount));
      comp.save().then(() => {
        console.info("Item added");
      });
    }
  }

  handleEditItem = (e) => {
    e.preventDefault();
    let equip = new Scorocode.Object("equipment");
    if ((this.state.itemName != '') && (this.state.itemId != '') && (this.state.itemCount != ''))
    {
      equip.set("_id", this.state.itemId)
      .set("name", this.state.itemName)
      .set("count", Number.parseInt(this.state.itemCount));
      equip.save().then(() => console.info("Item edited"));
    }
  }

  render() {
    return (
      <div>
        <form className='add-item'>
          {this.props.showIdInput  &&
          <label>
            ID оборудования:
            <input
              className='add-item-id__input'
              type='text' name='itemId'
              value={this.props.editById}
              onChange={e => this.handleChangeItem(e)} />
          </label>
          }
          <label>
            Название оборудования:
            <input
              className='add-item-name__input'
              type='text' name='itemName'
              value={this.state.itemName}
              placeholder='Стол'
              onChange={e => this.handleChangeItem(e)} />
          </label>
          {this.props.showRoomInput  &&
          <label>
            В какой комнате:
            <input
              className='add-item-room__input'
              type='text'
              name='itemRoom'
              value={this.state.itemRoom}
              placeholder='Например, b1floor1room1'
              onChange={e => this.handleChangeItem(e)} />
          </label>
          }
          <label>
            Количество:
            <input
              className='add-item-count__input'
              type='number'
              min = '1'
              name='itemCount'
              value={this.state.itemCount}
              onChange={e => this.handleChangeItem(e)} />
          </label>
          {this.props.showAddBtn &&
          <button onClick={e => this.handleAddItem(e)}  className="button">Добавить оборудование</button>
          }
          {this.props.showEditBtn &&
          <button onClick={e => this.handleEditItem(e)}  className="button">Редактировать оборудование</button>
          }
        </form>
      </div>
    )
  }
}

export default AddItem;
