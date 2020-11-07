import NumberFormat from "react-number-format";
import React, { useRef }from "react";
import PropTypes from "prop-types";
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  TextField, DialogContentText, DialogActions,
} from "@material-ui/core";
import { USE_STYLES_FOR_MAIN_CONTENT } from "./meterial-ui";
import CloseIcon from "@material-ui/icons/Close";
import PaymentType from "../_components/PaymentType/PaymentType";
import LinearProgress from "@material-ui/core/LinearProgress";
import GridContainer from "./components/Grid/GridContainer";
import GridItem from "./components/Grid/GridItem";
import Card from "./components/Card/Card";
import CardHeader from "./components/Card/CardHeader";
import CardBody from "./components/Card/CardBody";
import CardFooter from "./components/Card/CardFooter";
import {CancelPresentationOutlined, Print} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import ArchiveIcon from "@material-ui/icons/Archive";
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactToPrint from 'react-to-print';
import PrintConsigneeFormOne from "../_components/AddConsigneeForm/_component/PrintConsigneeFormOne";
import Divider from "@material-ui/core/Divider";
import PrintConsigneeFormTwo from "../_components/AddConsigneeForm/_component/PrintConsigneeFormTwo";

export const DATE_FORMAT_FOR_MOMENT = "YYYY-MM-DD";

export const PAYMENT_TYPE_MOTHS_OPTIONS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const PAYMENT_TYPE_YEAR_OPTIONS = function () {
  let date = new Date();
  let fullYear = date.getFullYear();
  let yearStart = fullYear.toString().substr(-2);
  var yearEnd = parseInt(yearStart) + 11;

  var arr = [];

  while (yearStart < yearEnd) {
    arr.push("" + yearStart++);
  }

  return arr;
};

export function NumberFormatCustom(props) {
  const { inputRef, onChange, prefix, ...other } = props;

  return (
      <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator={","}
          decimalSeparator={"."}
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale={true}
          isNumericString
          prefix={prefix}
      />
  );
}

export function NumberOnly(props) {
  const { inputRef, onChange, ...other } = props;

  return (
      <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          allowNegative={false}
          isNumericString
      />
  );
}

export function PhoneNumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
      <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          format="+94 (###) ###-####"
          mask="_"
      />
  );
}

export function numberWithCommas(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function numberWithZero(x) {
  return x.toLocaleString("en", {
    useGrouping: true,
    minimumFractionDigits: 2,
  });
  // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function TodayDate() {
  var today = new Date();
  var date =
      today.getDate() + "/" + +(today.getMonth() + 1) + "/" + today.getFullYear();
  return date;
}

export function getUnique(arr, comp) {
  // store the comparison  values in array
  const unique =  arr.map(e => e[comp])
      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e]).map(e => arr[e]);

  return unique;
}

export function getDuplicatedValue (arr, comp) {
  // store the comparison  values in array
  const unique =  arr.map(e => e[comp])
      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) !== i && i)
      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e]).map(e => arr[e]);

  return unique[0];
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Loader() {
  return (
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: "30px", marginBottom: "30px" }}
      >
        <CircularProgress size={25}/>
      </Grid>
  );
}

export function ConsigneeDialogBox(props) {
  const classes = USE_STYLES_FOR_MAIN_CONTENT();
  const { currentSelectedItem, open, onClose } = props;

  return (
      <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen
          TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={props.onClick}
            >
              <CloseIcon />
            </IconButton>
            <p className={classes.title}>
              {currentSelectedItem.customer
                  ? "Customer : " +
                  currentSelectedItem.customer.customer_name +
                  " | File No : " +
                  currentSelectedItem.code +
                  currentSelectedItem.code_ext
                  : "No data available"}
              {" | " +
              "Invoice Amount: " + currentSelectedItem.currency +" "+
              numberWithCommas(currentSelectedItem.invoice_value) +
              ".00"}
            </p>
            {localStorage.getItem("userType") === "admin" && (
                <>
                  <Button
                      variant="contained"
                      onClick={props.handleArchive}
                      className={classes.archiveButton}
                  >
                    Archive
                  </Button>
                  <Button
                      variant="contained"
                      color="secondary"
                      onClick={props.handleClose}
                      className={classes.closeButton}
                  >
                    Close
                  </Button>
                </>

            )}
          </Toolbar>
        </AppBar>
        <DialogContent style={{ marginTop : "10px"}}>
          <PaymentType
              consigneeId={currentSelectedItem.id}
              SelectedItem={currentSelectedItem}
              handleClose={onClose}
          />
        </DialogContent>
      </Dialog>
  );
}

export function ArchiveConsignee(props) {
  const classes = USE_STYLES_FOR_MAIN_CONTENT();
  const {
    currentSelectedItem,
    open,
    onClose,
    isLoading,
    handleArchiveConsignee,
    handleCloseArchiveDialog,
    quotedAmount,
    handleChangeQuotedAmount,
    error,
  } = props;

  return (
      <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ width: "500px" }}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h6 className="cardTitleWhite">ARCHIVE</h6>
                </CardHeader>
                <CardBody>
                  {error && <Alert severity="error">{error}</Alert>}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <div style={{ marginTop: "15px" }}>
                        <lable>Quoted Amount</lable>
                        <TextField
                            id="quoted_amount"
                            required
                            autoFocus
                            fullWidth
                            margin="normal"
                            name="quoted_amount"
                            placeholder="Quoted Amount"
                            value={quotedAmount}
                            onChange={handleChangeQuotedAmount}
                            InputProps={{
                              inputComponent: NumberFormatCustom,
                              inputProps: { prefix: "LKR " },
                            }}
                        />
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  {isLoading ? (
                      <LinearProgress style={{ width: "100%" }} />
                  ) : (
                      <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<ArchiveIcon />}
                            onClick={() =>
                                handleArchiveConsignee(currentSelectedItem)
                            }
                        >
                          archive
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<CancelPresentationOutlined />}
                            onClick={handleCloseArchiveDialog}
                        >
                          Cancel
                        </Button>
                      </div>
                  )}
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
      </Dialog>
  );
}

export function CloseConsignee(props) {
  const {
    currentSelectedItem,
    open,
    onClose,
    isLoading,
    handleCloseConsignee,
    handleCloseDialog,
  } = props;

  return (
      <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"CLOSE"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to Close?
          </DialogContentText>
        </DialogContent>
        {isLoading ? (<LinearProgress />) : (
            <DialogActions>
              <Button onClick={() => handleCloseConsignee(currentSelectedItem)} color="inherit" autoFocus>
                Yes
              </Button>
              <Button onClick={handleCloseDialog} color="primary" >
                No
              </Button>
            </DialogActions>
        )}
      </Dialog>
  );
}


export function PrintDialogBox (props) {
  const componentRef = useRef();

  const {
    open,
    consigneeData,
    handleClose,
    tuna,
    printName,
    currency
  } = props;



  return (
      <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogContent  >
            {consigneeData && (
            <Card style={{ width: "400px"}}>
              <CardHeader color="primary">
                <span>Print Consignee- <b>{printName}</b></span>
              </CardHeader>

                  <CardBody>
                    <DialogContentText id="alert-dialog-description" style={{ marginTop: "20px"}}>
                      Do you really want to Print Consignee <b>({tuna ? tuna.code + tuna.code_ext : consigneeData.code + consigneeData.code_ext})?</b>
                    </DialogContentText>
                  </CardBody>

              <Divider/>
              <div>
                <IconButton aria-label="print" onClick={handleClose}>
                  <ReactToPrint
                      trigger={() => <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<Print />}
                      >Print</Button>}
                      content= {() => componentRef.current}
                  />
                </IconButton>


                {printName === "print-1" ? (
                    <div style={{ display : "none"}}>
                      <PrintConsigneeFormOne
                          formData={consigneeData}
                          ref={componentRef}
                          tuna={tuna}
                          currency={currency}
                      />
                    </div>
                ):(
                    <div style={{ display : "none"}}>
                      <PrintConsigneeFormTwo
                          formData={consigneeData}
                          ref={componentRef}
                          tuna={tuna}
                          currency={currency}
                      />
                    </div>
                )}

                <Button
                    variant="contained"
                    size="small"
                    onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>

            </Card>)}
          </DialogContent >
        </Dialog>
      </div>
  );
}