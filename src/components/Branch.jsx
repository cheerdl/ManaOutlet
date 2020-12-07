import React, { useEffect, useState } from 'react';
import axios from 'axios'

import {
  CircularProgress,
  LinearProgress,
} from '@material-ui/core'

import { withStyles, makeStyles } from '@material-ui/core/styles'

import Modal from './Modal.jsx';
import { commaNumber as cm, formatDate as fd } from '../utils'
import { getToken } from '../utils/token'

const Branch = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [isRowLoading, setRowLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [editingRow, setEditingRow] = useState(-1)
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const result = await axios.get('https://billbillbot.herokuapp.com/api/v1/bill', {
      headers: {
        Authorization: getToken(),
      },
      params: {
        branch: props.branchName,
      }
    }).then(res => res.data)

    setTransactions(result.data)
    setLoading(false)
  }

  const replaceModalItem = (item, index) => {
    setModalData(item)
    setEditingRow(index)
  }
  const saveModalDetails = async (data) => {
    setRowLoading(true)
    const result = await axios({
      url: 'https://billbillbot.herokuapp.com/api/v1/bill',
      method: 'PUT',
      headers: {
        Authorization: getToken(),
      },
      data,
    }).then(res => res.data)

    // setRowLoading(false)
    window.location.reload()
  }

  const calcTotal = item => Math.abs(Number(item.cashSum) + Number(item.transferSum))
  const calcDiff = item => Number(item.cashSum) + Number(item.transferSum) - Number(item.posSum)

  const listTransactions = () => transactions.map((item, index) => (
    <>
      <tr key={index}>
        <td>{ fd(item.datetime) }</td>
        <td>{ cm(item.cashSum) }</td>
        <td>{ cm(item.transferSum) }</td>

        <td>{ cm(calcTotal(item)) }</td>
        <td>{ cm(item.posSum) }</td>

        <td style={{
          backgroundColor: Math.abs(calcDiff(item)) > 1000 ? '#e46868' : 'inherit',
          fontWeight: Math.abs(calcDiff(item)) > 1000 ? 'bold' : 'inherit',
        }}>{ cm(calcDiff(item)) }</td>
        <td style={{ padding: '5px 10px' }}>
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() => replaceModalItem(item, index)}
            disabled={ isRowLoading }
          >
              {
                isRowLoading && editingRow === index ? (<></>)  : (
                  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                )
              }
              { isRowLoading && editingRow === index ? 'กำลังบันทึก...'  : ' แก้ไข' }
          </button>
        </td>
      </tr>

      {
        isRowLoading && editingRow === index && (
          <tr>
            <td style={{ padding: 0 }} colspan={7}>
              <LinearProgress/>
            </td>
          </tr>
        )
      }
    </>
  ))

  if (isLoading) {
    return <CircularProgress/>
  }

  return (
    <div>
      <h3 style={{ fontWeight: 'bold' }}>สาขา {props.branchNameTH}</h3>
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
          {listTransactions()}
        </tbody>
      </table>

      <Modal
        data={modalData}
        saveModalDetails={saveModalDetails}
      />
    </div>
  )
}

export default Branch
