import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(date,cash,transfer,allpos,profit,diff) {
  return { date,cash,transfer,allpos,profit,diff };
}

const rows = [
  createData('01/11/2020', 6500, 4000, 10500, 10500, 0),
  createData('02/11/2020', 7000, 6000, 13000, 13000, 0),
  createData('03/11/2020', 6000, 7000, 14000, 13000, 1000),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

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
            <StyledTableCell align="center">ยอดตามระบบ</StyledTableCell>
            <StyledTableOrange align="center">ผลรวมรายได้</StyledTableOrange>
            <StyledTableGreen align="center">ผลรวมผลต่าง</StyledTableGreen>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              {/* <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell> */}
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">{row.cash}</StyledTableCell>
              <StyledTableCell align="center">{row.transfer}</StyledTableCell>
              <StyledTableCell align="center">{row.allpos}</StyledTableCell>
              <StyledTableOrangeText align="center">{row.profit}</StyledTableOrangeText>
              <StyledTableGreenText align="center">{row.diff}</StyledTableGreenText>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
