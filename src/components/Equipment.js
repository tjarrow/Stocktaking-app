import React from 'react';
import AddItem from './AddItem';
import '../server/data.js';

class Equipment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments: [],
      showEditBtn: false,
      showAddBtn: true,
      showIdInput: false,
      showRoomInput: true,
      editById: '',
      editByName:''
    };
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  findItem = (room_id) => {
    return this.state.equipments
    .filter((e) => e.room === room_id)
    .map((equipment, index) => (
      <div className="equipment-item">
        <span room={`${equipment.room}`} key={index}>{equipment.name} - x{equipment.count}</span>
        <div className='btn-wrap'>
          <button id={`${equipment._id}`} onClick={e => this.handleDeleteItem(e)}>Удалить</button>
          <button className={`${equipment._id}`} onClick={this.handleShowEditComponents}>Редактировать </button>
        </div>
      </div>
    ))
  }

  handleShowEditComponents = (e) => {
    this.setState({
      editById: e.target.className,
      showEditBtn: !this.state.showEditBtn,
      showAddBtn: !this.state.showAddBtn,
      showIdInput: !this.state.showIdInput,
      showRoomInput:!this.state.showRoomInput
    });
  }

  handleDeleteItem = (e) => {
    let equip = new Scorocode.Object("equipment");
    equip.getById(e.target.id).then((item) => {
	  equip.remove(item).then(() => {
      console.info("Item removed");
    });
   });
  }

  componentDidMount() {
    var eq = new Scorocode.Query("equipment");
    eq.find().then((found) => {
      let equipment = found.result;
      this.setState({equipments: equipment});
    });
  }

  render() {
    const room_id = this.props.id;
    return (
      <div>
        <span className="equipment-item__header">Список оборудования:</span>
        {this.findItem(room_id)}
        <AddItem
          editById={this.state.editById}
          showEditBtn={this.state.showEditBtn}
          showAddBtn={this.state.showAddBtn}
          showIdInput={this.state.showIdInput}
          showRoomInput={this.state.showRoomInput}
        />
      </div>
    );
  }
}

export default Equipment;
