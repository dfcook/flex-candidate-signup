import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';
import { approveSignup, declineSignup } from '../store/actionCreators';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  table: {
    minWidth: 700,
  },
  signup: {
    marginTop: 20
  }
});

const SignupListingsPage = ({ approveSignup, classes, declineSignup, signups }) => (
  <main className={classes.main}>
    <Paper className={classes.paper}>
      <Typography component="h1" variant="h5">
        Signups
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell/>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {signups.map(({id, firstName, lastName, status}) => (
            <TableRow key={id}>
              <TableCell>{firstName}&nbsp;{lastName}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>
                <Button
                  color="secondary"
                  disabled={status !== 'Pending'}
                  onClick={() => approveSignup(id)}
                >
                  Approve
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  disabled={status !== 'Pending'}
                  onClick={() => declineSignup(id)}
                >
                  Decline
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button component={Link} to="/sign-up" className={classes.signup}>Add Signup</Button>
    </Paper>
  </main>
);

SignupListingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  signups: PropTypes.array.isRequired,
  approveSignup: PropTypes.func.isRequired,
  declineSignup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  signups: state.signups
});

const mapDispatchToProps = dispatch => bindActionCreators({
  approveSignup,
  declineSignup
}, dispatch);

export default compose(withRoot, withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(SignupListingsPage);
