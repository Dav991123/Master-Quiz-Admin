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

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    paper: {
        margin: 20
    }
  });
  
  function createData(accountCreationDate, email, firstName, lastName, userId) {
    return { accountCreationDate, email, firstName, lastName, userId };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Users = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        database.ref('/users').on('value', e => {
            const data = Object.values(e.val()) 
            setUsers(data);
          });
    }, []);

    

    
    return (
        <Paper elevation={2} className={classes.paper}>
            <TableContainer >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">Account Creation Date</TableCell>
                        <TableCell align="left">User ID</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((row) => (
                        <TableRow key={row.userId}>
                        <TableCell component="th" scope="row">
                            {row.email}
                        </TableCell>
                        <TableCell align="left">{row.firstName}</TableCell>
                        <TableCell align="left">{row.lastName}</TableCell>
                        <TableCell align="left">{row.accountCreationDate}</TableCell>
                        <TableCell align="left">{row.userId}</TableCell>

                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
};

export default Users;