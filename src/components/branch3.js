import React, { Component } from 'react';
import Modal from './modal.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
class List extends Component {
  constructor(props) {
    super(props);
    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.state = {
      isLoading: true,
      requiredItem: 0,
      brochure: [
      ]
    }
  }

  componentWillMount() {
    this.test();
  }

  test() {
    axios.get('https://billbillbot.herokuapp.com/api/v1/bill', {
      headers: {
        Authorization: "Bearer "+localStorage.getItem("token")
      },
      params: {
        branch: "Cambodia"
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
          diff: 0
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
    this.setState({ brochure: tempbrochure });
  }

  deleteItem(index) {
    let tempBrochure = this.state.brochure;
    tempBrochure.splice(index, 1);
    this.setState({ brochure: tempBrochure });
  }

  render() {
    const {isLoading} = this.state;
    if(isLoading){
      return<Spinner animation="border" role="status" style={{color: "grey", marginLeft: 500, marginTop: 200, width: 80, height: 80}}>
            <span className="sr-only">Loading...</span>
            </Spinner>
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
          <h3 style={{fontWeight: "bold"}}>สาขา อุดรธานี</h3>
          <table class="table">
            <thead class="thead-dark">
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
}

export default List;
