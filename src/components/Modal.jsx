import React, { useEffect, useState } from 'react';

import { commaNumber as cm, formatDate as fd } from '../utils'

var modalLabelStyle = {
    marginLeft: "50px"
  }

const Modal = (props) => {
  const [cash, setCash] = useState(0)
  const [transfer, setTransfer] = useState(0)
  const [posSum, setPosSum] = useState(0)

  useEffect(() => {
    setCash(props.data.cashSum)
    setTransfer(props.data.transferSum)
    setPosSum(props.data.posSum)
  }, [props.data.cashSum, props.data.transferSum, props.data.posSum])

  const cashHandler = e => setCash(e.target.value)
  const transferHandler = e => setTransfer(e.target.value)
  const posSumHandler = e => setPosSum(e.target.value)

  const handleSave = () => {
    props.saveModalDetails({
      cashSum: Number(cash),
      transferSum: Number(transfer),
      posSum: Number(posSum),
      transacSumId: props.data.transacSumId,
    })
  }

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document" style={{marginTop: 100}}>
          <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">แก้ไข</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div className="modal-body">
                  <h4>{fd(props.data.datetime)}</h4>
                  <p>
                    <span className="modal-label">เงินสด:</span>
                    <input style={modalLabelStyle} value={cash} onChange={cashHandler} />
                  </p>
                  <p>
                    <span className="modal-label">เงินโอน:</span>
                    <input style={modalLabelStyle} value={transfer} onChange={transferHandler} />
                  </p>

                  <p>
                    <span className="modal-label">ยอดตามระบบ:</span>
                    <input style={modalLabelStyle} value={posSum} onChange={posSumHandler} />
                  </p>
              </div>
              <div className="modal-footer">
                  {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleSave}>บันทึก</button>
              </div>
          </div>
      </div>
  </div>
  )
}

export default Modal
