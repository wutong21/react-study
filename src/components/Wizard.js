import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core/";
import { Stepper } from "@material-ui/core/";
import { Step } from "@material-ui/core/";
import { StepLabel } from "@material-ui/core/";
import Back from "./common/Back";

const qs = require("query-string");
const backgroundShape = require("../images/shape.svg");

const numeral = require("numeral");
numeral.defaultFormat("0,000");

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary["A100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    marginTop: 10,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    margin: `0 ${theme.spacing(2)}px`
  },
  smallContainer: {
    width: "60%"
  },
  bigContainer: {
    width: "80%"
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stepGrid: {
    width: "80%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  stepper: {
    backgroundColor: "transparent"
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 42
  },
  formControl: {
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  borderColumn: {
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    paddingBottom: 24,
    marginBottom: 24
  },
  flexBar: {
    marginTop: 32,
    display: "flex",
    justifyContent: "center"
  }
});

const getQuestionsInternet = () => {
  return [
    { Q: "- 说一下HTTP2.0 、HTTP的区别？", A: "John Doe" },
    { Q: "- 说一下HTTP2.0有什么新特性？", A: "Tokyo" }
  ];
};

const getQuestionsBrowser = () => {
  return [
    { Q: "- 垃圾回收在什么时候会发生？", A: "John Doe" },
    { Q: "- 跨域问题怎么处理？", A: "Tokyo" },
    { Q: "- 你对缓存有什么了解？", A: "Tokyo" },
    { Q: "- 如果命中强缓存返回的状态码是什么？", A: "Tokyo" }
  ];
};

const getQuestionsJs = () => {
  return [
    { Q: "- 如何判断类型？判断类型的方法有几种？", A: "John Doe" },
    {
      Q: "- 存储基本类型和引用类型时，是存在什么地方，存储的是什么? ",
      A: "Tokyo"
    },
    { Q: "- setTimeout与正常进程的执行顺序?", A: "Tokyo" },
    { Q: "- 看代码说输出 Promise链式调用与正常进程的执行顺序？", A: "Tokyo" },
    { Q: "- 讲一下宏任务和微任务？", A: "Tokyo" },
    { Q: "- 讲一下主进程发生阻塞的原因？", A: "Tokyo" }
  ];
};

const getQuestionsVue = () => {
  return [
    { Q: "- v-model 的双向绑定是怎么实现 ？", A: "John Doe" },
    { Q: "- v-bind 和v-model有什么区别？", A: "Tokyo" },
    { Q: "- .sysc的主要特征是什么？ ", A: "Tokyo" },
    { Q: "- 父子组件的调用顺序？ ", A: "Tokyo" }
  ];
};

const getSteps = () => {
  return ["网络", "浏览器", "JavaScript", "CSS", "Vue"];
};

class Wizard extends Component {
  state = {
    activeStep: 0,
    receivingAccount: "Home Account",
    repaimentAccount: "Saving Account",
    termsChecked: false,
    labelWidth: 0
  };

  componentDidMount() {}

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTerms = (event) => {
    this.setState({ termsChecked: event.target.checked });
  };

  stepActions() {
    if (this.state.activeStep === 3) {
      return "Next";
    }
    if (this.state.activeStep === 4) {
      return "Done";
    }
    return "Next";
  }

  goToDashboard = (event) => {
    const queryString = this.props.location.search;

    this.props.history.push({
      pathname: "/dashboard",
      search: queryString
    });
  };

  render() {
    const { classes } = this.props;
    const queryString = this.props.location.search;
    const parsed = queryString ? qs.parse(queryString) : {};
    const steps = getSteps();
    const { activeStep } = this.state;
    const questionInternet = getQuestionsInternet();
    const questionBrowser = getQuestionsBrowser();
    const questionJs = getQuestionsJs();
    const questionVue = getQuestionsVue();

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={10}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12}>
                <Back />
                <div className={classes.stepContainer}>
                  <div className={classes.bigContainer}>
                    <Stepper
                      classes={{ root: classes.stepper }}
                      activeStep={activeStep}
                      alternativeLabel
                    >
                      {steps.map((label) => {
                        return (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                  {activeStep === 0 && (
                    <div className={classes.bigContainer}>
                      <Paper className={classes.paper}>
                        <Grid item container xs={24}>
                          {questionInternet.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12}>
                                <Typography
                                  style={{ textTransform: "uppercase" }}
                                  color="secondary"
                                  gutterBottom
                                >
                                  {item.Q}
                                </Typography>

                                <Typography variant="h5" gutterBottom>
                                  <TextField
                                    fullWidth
                                    id="standard-multiline-static"
                                    label="答案"
                                    multiline
                                    rows={6}
                                    defaultValue=""
                                    variant="standard"
                                  />
                                </Typography>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Paper>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className={classes.smallContainer}>
                      <Paper className={classes.paper}>
                        <Grid item container xs={24}>
                          {questionBrowser.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12}>
                                <Typography
                                  style={{ textTransform: "uppercase" }}
                                  color="secondary"
                                  gutterBottom
                                >
                                  {item.Q}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                  <TextField
                                    fullWidth
                                    id="standard-multiline-static"
                                    label="答案"
                                    multiline
                                    rows={6}
                                    defaultValue=""
                                    variant="standard"
                                  />
                                </Typography>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Paper>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className={classes.bigContainer}>
                      <Paper className={classes.paper}>
                        <Grid item container xs={24}>
                          {questionJs.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12}>
                                <Typography
                                  style={{ textTransform: "uppercase" }}
                                  color="secondary"
                                  gutterBottom
                                >
                                  {item.Q}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                  <TextField
                                    fullWidth
                                    id="standard-multiline-static"
                                    label="答案"
                                    multiline
                                    rows={6}
                                    defaultValue=""
                                    variant="standard"
                                  />
                                </Typography>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Paper>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className={classes.bigContainer}>
                      <Paper className={classes.paper}>
                        <Typography
                          style={{ textTransform: "uppercase" }}
                          color="secondary"
                          gutterBottom
                        >
                          题目如下图所示
                          <img src={require("../images/CSS.png")} alt="" />
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                          ...
                        </Typography>
                      </Paper>
                    </div>
                  )}
                  {activeStep === 4 && (
                    <div className={classes.smallContainer}>
                      <Paper className={classes.paper}>
                        <Grid item container xs={24}>
                          {questionVue.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12}>
                                <Typography
                                  style={{ textTransform: "uppercase" }}
                                  color="secondary"
                                  gutterBottom
                                >
                                  {item.Q}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                  <TextField
                                    fullWidth
                                    id="standard-multiline-static"
                                    label="答案"
                                    multiline
                                    rows={6}
                                    defaultValue=""
                                    variant="standard"
                                  />
                                </Typography>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Paper>
                    </div>
                  )}
                  <div className={classes.flexBar}>
                    {activeStep !== 4 && (
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.backButton}
                        size="large"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={
                        activeStep !== 4 ? this.handleNext : this.goToDashboard
                      }
                      size="large"
                    >
                      {this.stepActions()}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Wizard));
