import React, { Component } from 'react';

var modalLabelStyle = {
    marginStart: "50px"
  };

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            date: '',
            cash: '',
            transfer: '',
            all: '',
            allpos: '',
            id: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date,
            cash: nextProps.cash,
            transfer: nextProps.transfer,
            all: nextProps.all,
            allpos: nextProps.allpos,
            id: nextProps.id
        });
    }

    dateHandler(e) {
        this.setState({ date: e.target.value });
    }

    cashHandler(e) {
        this.setState({ cash: e.target.value });
    }
    transferHandler(e) {
        this.setState({ transfer: e.target.value });
    }
    allHandler(e) {
        this.setState({ all: e.target.value });
    }
    allposHandler(e) {
        this.setState({ allpos: e.target.value });
    }

    handleSave() {
        const item = this.state;
        this.props.saveModalDetails({
            date: this.state.date,
            cash: parseFloat(this.state.cash, 10),
            transfer: parseFloat(this.state.transfer, 10),
            all: parseFloat(this.state.all, 10),
            allpos: parseFloat(this.state.allpos, 10),
            id: this.state.id
        })
    }

    render() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document" style={{marginTop: 100}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">แก้ไข</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* <p><span className="modal-lable">Date:</span><input value={this.state.date} onChange={(e) => this.dateHandler(e)} /></p> */}
                            <p><center><h4>วันที่ {this.state.date}</h4></center></p>
                            <p><span className="modal-label">เงินสด:</span><input style={modalLabelStyle} value={this.state.cash} onChange={(e) => this.cashHandler(e)} /></p>
                            <p><span className="modal-label">เงินโอน:</span><input style={modalLabelStyle} value={this.state.transfer} onChange={(e) => this.transferHandler(e)} /></p>
                            {/* <p><span className="modal-lable">All:</span><input value={this.state.all} onChange={(e) => this.allHandler(e)} /></p> */}
                            <p><span className="modal-label">ยอดตามระบบ:</span><input style={modalLabelStyle} value={this.state.allpos} onChange={(e) => this.allposHandler(e)} /></p>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;