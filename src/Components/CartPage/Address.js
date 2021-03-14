import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";
import CreateIcon from "@material-ui/icons/Create";
import CancelIcon from "@material-ui/icons/Cancel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SlideEffectButton from "../../Shared/ButtonComponents/SlideEffectButton";
import { changeAddress } from "../../Redux/Actioncreators/Actions";
import axios from "axios";

const styles = {
  disabledInput: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black",
    },
  },
  floatingLabelFocusStyle: {
    color: "red",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },
};

function Address(props) {
  let user = {};
  if (props.user.data && props.user.data.userdata)
    user = props.user.data.userdata;

  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(user.userName);
  const [newMobile, setNewMobile] = useState(user.userMobile || ""); //test
  const [newAddress, setNewAddress] = useState(user.userAddress);
  const [saveAddress, setSaveAddress] = useState(false);
  const [oldObj, setOldObj] = useState({
    address: newAddress,
    mobile: newMobile,
    name: newName,
  });
  useEffect(() => {
    if (props.data)
      props.data({ name: newName, address: newAddress, mobile: newMobile });
  }, []);

  const changeHandler = (event) => {
    if (event.target.name === "name") setNewName(event.target.value.trimLeft());
    else if (event.target.name === "mobile")
      if (isNaN(event.target.value) || event.target.value.length > 10)
        setNewMobile(newMobile);
      else setNewMobile(event.target.value.trim());
    else if (event.target.name === "address")
      setNewAddress(event.target.value.trimLeft());
  };

  const cancelHandler = () => {
    setEditMode(!editMode);
    setNewName(oldObj.name);
    setNewAddress(oldObj.address);
    setNewMobile(oldObj.mobile);
  };
  const saveHandler = () => {
    if (
      !(
        newName &&
        newMobile &&
        newAddress &&
        newMobile.length === 10 &&
        !isNaN(newMobile)
      )
    )
      return;
    if (saveAddress)
      axios
        .post("/user/changeAddress", {
          email: user.userEmail,
          address: newAddress,
        })
        .then((res) => {
          props.editAddress(newAddress);
        })
        .catch((err) => {
          console.log(err);
        });
    else props.editAddress(newAddress);
    props.data({ email: newName, address: newAddress, mobile: newMobile });
    setEditMode(!editMode);
    setOldObj({
      address: newAddress,
      mobile: newMobile,
      name: newName,
    });
  };
  return (
    <div className="addressdiv-cart">
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{ color: "black", marginLeft: "22%" }}
          >
            Shipping address
            {!editMode ? (
              <CreateIcon
                onClick={() => setEditMode(!editMode)}
                style={{ fill: "blue", marginLeft: "22%", fontSize: "28px" }}
              />
            ) : (
              <CancelIcon
                onClick={() => cancelHandler()}
                style={{ fill: "red", marginLeft: "22%", fontSize: "25px" }}
              ></CancelIcon>
            )}
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "2%" }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            required
            name="name"
            label="Name"
            fullWidth
            style={{ margin: "2% 2% 0 2%" }}
            className={props.classes.disabledInput}
            disabled={!editMode}
            InputLabelProps={{
              style: { color: "blue", fontSize: "16pt", marginBottom: "5%" },
              shrink: true,
            }}
            placeholder="Full Name"
            error={newName === ""}
            helperText={newName === "" ? "Name cannot be Empty" : null}
            value={newName}
            onChange={(event) => changeHandler(event)}
          />
        </Grid>
        <Grid item xs={12} sm={1}></Grid> <Grid item xs={1}></Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            required
            name="mobile"
            label="Mobile"
            style={{ margin: "2% 2% 0 2%" }}
            fullWidth
            value={newMobile}
            className={props.classes.disabledInput}
            InputLabelProps={{
              style: { color: "blue", fontSize: "16pt", marginBottom: "5%" },
              shrink: true,
            }}
            disabled={!editMode}
            placeholder="10 digit Mobile Number"
            error={newMobile === "" || newMobile.length != 10}
            helperText={
              newMobile === ""
                ? "Mobile number cannot be empty"
                : newMobile.length != 10
                ? "Mobile number should be 10 digits"
                : null
            }
            onChange={(event) => changeHandler(event)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={8} sm={10}>
          <TextField
            required
            style={{ margin: "3% 2% 0 1%" }}
            name="address"
            label="Address"
            fullWidth
            value={newAddress}
            className={props.classes.disabledInput}
            InputLabelProps={{
              style: { color: "blue", fontSize: "16pt", marginBottom: "5%" },
              shrink: true,
            }}
            disabled={!editMode}
            placeholder="Door No, Flat , Street , Locality , City , Pincode, State"
            onKeyPress={(event) => event.key === "Enter" && saveHandler()}
            error={newAddress === ""}
            helperText={
              newAddress === "" ? "Address number cannot be empty" : null
            }
            onChange={(event) => changeHandler(event)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          {editMode && (
            <FormControlLabel
              style={{ margin: "0 8%" }}
              control={
                <Checkbox
                  checked={saveAddress}
                  onChange={() => setSaveAddress(!saveAddress)}
                  name="saveAddress"
                  color="primary"
                />
              }
              label="Make this as default address"
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {editMode && (
            <SlideEffectButton
              color="blue"
              onClick={saveHandler}
              buttonName="Save"
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.signin.data,
});

const mapDispatchToProps = (dispatch) => ({
  editAddress: (addressVal) => dispatch(changeAddress(addressVal)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Address));
