import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import UserQuizInfoModal from './modal';
const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });
  
const Row = ({ row, onSetModalData }) => {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const [modalData, setModalData] = useState({
      answers: [],
      id: ''
    });

    console.log(modalData);

    return (
      <>
      {
        modalData.id && (
          <UserQuizInfoModal 
            modalData={modalData}
            onSetModalData={setModalData}
          />
        )
      }
     
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
             {row.email}
          </TableCell>
          <TableCell align="left">{row.firstName}</TableCell>
          <TableCell align="left">{row.lastName}</TableCell>
          <TableCell align="left">{row.accountCreationDate}</TableCell>
          <TableCell align="left">{row.userId}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Point</TableCell>
                      <TableCell align="right">Time</TableCell>
                      <TableCell align="right">Quiz Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.quizHistory?.slice(1).map((historyRow) => (
                      <TableRow 
                        key={historyRow.date} 
                        style={{
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setModalData({
                            id: historyRow.id,
                            answers: historyRow.answers,
                          })
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.point}</TableCell>
                        <TableCell align="right">{historyRow.time}</TableCell>
                        <TableCell align="right">
                          {historyRow.title}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  export default Row;