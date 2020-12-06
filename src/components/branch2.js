import React, { Component } from 'react';
import Modal from './modal.js';

class List extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      requiredItem: 0,
      brochure: [
        {
          date: "01/11/2020",
          cash: 1500,
          transfer: 2000,
          all: 3500,
          allpos: 3500,
          diff: 0
        }, {
          date: "02/11/2020",
          cash: 3000,
          transfer: 2000,
          all: 5000,
          allpos: 5000,
          diff: 0
        }, {
          date: "03/11/2020",
          cash: 2000,
          transfer: 1000,
          all: 3000,
          allpos: 3000,
          diff: 0
        }
      ]
    }
  }

  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    });
  }

  saveModalDetails(item) {
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.brochure;
    tempbrochure[requiredItem] = item;
    this.setState({ brochure: tempbrochure });
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });
  }

  render() {
    const brochure = this.state.brochure.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.date}</td>
          {/* <td>{" "} - {" "}</td> */}
          <td>{item.cash}</td>
      <td>{item.transfer}</td>
      <td>{Math.abs(parseInt(item.cash)+parseInt(item.transfer))}</td>
      <td>{item.allpos}</td>
      <td>{Math.abs(parseInt(item.cash)+parseInt(item.transfer) - parseInt(item.allpos))}</td>

          <td>
            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
              onClick={() => this.replaceModalItem(index)}>แก้ไข</button> {" "}
            {/* <button className="btn btn-danger" onClick={() => this.deleteItem(index)}>remove</button> */}
          </td>
        </tr>
      )
    });

    const requiredItem = this.state.requiredItem;
    let modalData = this.state.brochure[requiredItem];
    return (
      <div>
          <h3 style={{fontWeight: "bold"}}>สาขา 2</h3>
        <table className="table table-striped">
          <thead>
            <td>วันที่</td>
            <td>เงินสด</td>
            <td>เงินโอน</td>
            <td>ยอดรวมทั้งหมด</td>
            <td>ยอดตามระบบ</td>
            <td>ผลต่าง</td>
            <td></td>
          </thead>
          <tbody>
            {brochure}
          </tbody>
        </table>
        <Modal
          date={modalData.date}
          cash={modalData.cash}
          transfer={modalData.transfer}
          all={modalData.all}
          allpos={modalData.allpos}
          diff={modalData.diff}
          saveModalDetails={this.saveModalDetails}
        />
      </div>
    );
  }
}

export default List;
