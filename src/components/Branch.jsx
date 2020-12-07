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
        branch: 'Bangkok',
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

    setRowLoading(false)
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
            disabled={isRowLoading && editingRow === index}
          >
              แก้ไข
          </button>
        </td>
      </tr>

      { isRowLoading && editingRow === index && (<LinearProgress/>) }
    </>
  ))

  if (isLoading) {
    return <CircularProgress/>
  }

  return (
    <div>
      <h3 style={{ fontWeight: 'bold' }}>สาขา {props.branchName}</h3>
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
