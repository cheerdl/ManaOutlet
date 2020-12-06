import React, { Component } from 'react';
import Modal from './modal.js';

import {
  CircularProgress,
  TableCell,
} from '@material-ui/core'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

class List extends Component {
  state = {
    isLoading: true,
    requiredItem: 0,
    brochure: []
  }

  constructor(props) {
    super(props);
    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get('https://billbillbot.herokuapp.com/api/v1/bill', {
      headers: {
        Authorization: "Bearer "+localStorage.getItem("token")
      },
      params: {
        branch: "Bangkok"
      }
    }).then((result) => {
      let brochure = this.state.brochure;
      for(var i = 0; i < result.data.data.length; i++){
        const data = {
          date: result.data.data[i].datetime.substring(0, 10),
          cash: result.data.data[i].cashSum,
          transfer: result.data.data[i].transferSum,
          all: 0,
          allpos: result.data.data[i].posSum,
          diff: 0,
          id: result.data.data[i].transacSumId
        }
        brochure.push(data);
      }
      this.setState({ brochure: brochure });
      this.setState({isLoading: false});
    }).catch((error) => {
      console.log(error)
    })
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
    console.log(tempbrochure[requiredItem]);
    this.setState({ brochure: tempbrochure });
    axios({
      url: 'https://billbillbot.herokuapp.com/api/v1/bill',
      method: 'PUT',
      data: {
        "transacSumId": tempbrochure[requiredItem].id,
        "transferSum": tempbrochure[requiredItem].transfer,
        "cashSum": tempbrochure[requiredItem].cash,
        "posSum": tempbrochure[requiredItem].allpos
      },
      headers: {
        Authorization: 'Bearer '+localStorage.getItem("token")
      }
    }).then((result) => {
      window.location.reload()
      // console.log(result)
    })
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });
  }

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return (<CircularProgress/>)
    }
    else{
      const brochure = this.state.brochure.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.cash}</td>
            <td>{item.transfer}</td>
            <td>{Math.abs(parseInt(item.cash)+parseInt(item.transfer))}</td>
            <td>{item.allpos}</td>
            <td>{Math.abs(parseInt(item.cash)+parseInt(item.transfer) - parseInt(item.allpos))}</td>
            <td><button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => this.replaceModalItem(index)}>แก้ไข</button> {" "}</td>
          </tr>
        )
      });
      const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      const requiredItem = this.state.requiredItem;
      let modalData = this.state.brochure[requiredItem];
      return (
        <div>
          <h3 style={{fontWeight: "bold"}}>สาขา {this.props.branchName}</h3>
          <table className="table">
            <thead className="thead-dark">
              <th>วันที่</th>
              <th>เงินสด</th>
              <th>เงินโอน</th>
              <th>ยอดรวมทั้งหมด</th>
              <th>ยอดตามระบบ</th>
              <th>ผลต่าง</th>
              <th></th>
            </thead>
            <tbody>
              {brochure}
            </tbody>
          </table>
          <Modal
            date={modalData.date}
            cash={Number.parseInt(modalData.cash)}
            transfer={modalData.transfer}
            all={modalData.all}
            allpos={modalData.allpos}
            diff={modalData.diff}
            id={modalData.id}
            saveModalDetails={this.saveModalDetails}
          />
        </div>
      );
    }
  }
}

export default List;