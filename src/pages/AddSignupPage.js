import React, { createRef, Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Field } from 'formik';
import {
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { withStyles } from '@material-ui/core/styles';
import ReactS3Uploader from 'react-s3-uploader';
import * as yup from 'yup';

import withRoot from '../withRoot';
import { addSignup } from '../store/actionCreators';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  uploaderField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 20,
    width: 300,
  },
});

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required()
});

class AddSignupPage extends Component {
  constructor(props) {
    super(props);
    this.uploader = createRef();
  }

  onSubmit = async (values, { setSubmitting }) => {
    const { addSignup, history } = this.props;

    await this.uploader.uploadFile();

    addSignup(values);
    setSubmitting(false);
    history.push('/');
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Signup
          </Typography>
          <Formik
            initialValues={{ firstName: '', lastName: '' }}
            validationSchema={schema}
            onSubmit={this.onSubmit}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  type="text"
                  name="firstName"
                  label="First Name"
                  className={classes.textField}
                  component={TextField}
                />
                <Field
                  type="text"
                  name="lastName"
                  label="Last Name"
                  className={classes.textField}
                  component={TextField}
                />
                <ReactS3Uploader
                  ref={uploader => { this.uploader = uploader; }}
                  onSignedUrl={this.onSignedUrl}
                  className={classes.uploaderField}
                  accept="application/pdf"
                  autoUpload={false}
                  signingUrl="https://urlsigner-uiczqjvmcp.now.sh/?objectName=cv.pdf"
                />
                <br/>
                <Button color="secondary" type="submit">Add</Button>
              </form>
            )}
          </Formik>
        </Paper>
      </main>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  addSignup
}, dispatch);

export default compose(withRoot, withRouter, withStyles(styles), connect(null, mapDispatchToProps))(AddSignupPage);
