import React, { useEffect, useState } from 'react';
import { database } from '../../../core/firebase/base';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Row from './tableRow';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    paper: {
        margin: 20
    }
  });

export default function User() {
    const [users, setUsers] = useState([]);

    const [modalData, setModalData] = useState({
      answers: [],
      id: ''
    });
    
    const classes = useStyles();
    useEffect(() => {
          database.ref('/users').once('value', e => {
              const data = Object.values(e.val()) 
              setUsers(data);
            });
      }, []);

    return (
        <Paper elevation={2} className={classes.paper}>
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Email</TableCell>
                    <TableCell align="left">First Name</TableCell>
                    <TableCell align="left">Last Name</TableCell>
                    <TableCell align="left">Account Creation Date</TableCell>
                    <TableCell align="left">User ID</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((row) => (
                    <Row key={row.name} row={row} />
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
    );
}