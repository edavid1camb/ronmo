import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { TextField } from "../components/TextField";

const validationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Weak password"
    ),
  captcha: yup.string().required(),
});

const captchaKey = process.env.REACT_APP_CAPTCHA_KEY;
const initialValues = {
  email: "",
  password: "",
  captcha: "",
};

export const Login = ({ onLoginSuccess }) => {
  const recaptchaRef = React.useRef({});

  const login = ({ email, password }) => {
    onLoginSuccess(email, password);
  };

  const onSubmit = (values, actions) => {
    const captchaValue = recaptchaRef.current.getValue();

    if (!captchaValue) {
      actions.setFieldValue("captcha", "");
      actions.setSubmitting(false);
      return;
    }
    console.log(2);
    try {
      login(values);
    } catch (error) {
      recaptchaRef.current.reset();
    }
    actions.setSubmitting(false);
  };

  return (
    <Container>
      <Grid xs={12}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, setFieldValue, isSubmitting }) => (
            <>
              <Typography align="center" variant="h3" paragraph gutterBottom>
                Login
              </Typography>

              <Form>
                <Grid container>
                  <TextField name="email" placeholder="Email Address" />
                  <TextField
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 5,
                    }}
                  >
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={captchaKey}
                      onChange={(e) => {
                        setFieldValue("captcha", e);
                      }}
                    />
                    <Typography
                      color="error"
                      hidden={!(errors.captcha && touched.captcha)}
                    >
                      Enter Captcha
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      style={{ marginTop: 5 }}
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                      fullWidth
                      endIcon={isSubmitting && <CircularProgress size={20} />}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </>
          )}
        </Formik>
      </Grid>
    </Container>
  );
};
