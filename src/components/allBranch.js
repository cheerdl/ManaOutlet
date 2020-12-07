import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { LinearProgress } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { getToken } from '../utils/token'
import { formatDate as fd, commaNumber as cn } from '../utils'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableOrange = withStyles({
  head: {
    backgroundColor: '#D6692C',
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
})(TableCell);
const StyledTableGreen = withStyles({
  head: {
    backgroundColor: '#1E7D33',
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
})(TableCell);
const StyledTableOrangeText = withStyles({
  root: {
    backgroundColor: 'rgba(214,105,44,0.3)',
  },
  body: {
    fontSize: 14,
    color: 'black',
  },
})(TableCell);
const StyledTableGreenText = withStyles({
  root: {
    backgroundColor: 'rgba(30,125,51,0.3)',
  },
  body: {
    fontSize: 14,
    color: 'black',
  },
})(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles()
  const [isLoading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)

    const result = await axios({
      url: 'https://billbillbot.herokuapp.com/api/v1/bill/total',
      headers: {
        Authorization: getToken(),
      },
    }).then((res) => res.data)

    setTransactions(result.data)
    setLoading(false)
  }

  const calcDiff = ({ posSum, cashSum, transferSum }) => Number(posSum) - (Number(cashSum) + Number(transferSum))

  return (
    <div>
      <h3 style={{fontWeight: "bold"}}>ยอดรวมทุกสาขา</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">วันที่</StyledTableCell>
              <StyledTableCell align="center">เงินสด</StyledTableCell>
              <StyledTableCell align="center">เงินโอน</StyledTableCell>
              <StyledTableOrange align="center">ผลรวมรายได้</StyledTableOrange>
              <StyledTableCell align="center">ยอดตามระบบ</StyledTableCell>
              <StyledTableGreen align="center">ผลรวมผลต่าง</StyledTableGreen>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{fd(transaction.datetime)}</StyledTableCell>
                <StyledTableCell align="center">{cn(transaction.cashSum)}</StyledTableCell>
                <StyledTableCell align="center">{cn(transaction.transferSum)}</StyledTableCell>
                <StyledTableOrangeText align="center">{cn(transaction.total)}</StyledTableOrangeText>
                <StyledTableCell align="center">{cn(transaction.posSum)}</StyledTableCell>
                <StyledTableGreenText align="center">{cn(calcDiff(transaction))}</StyledTableGreenText>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        { isLoading && (<LinearProgress/>) }
      </TableContainer>
    </div>
  );
}
