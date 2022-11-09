import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick, colortheme }) => {
  const useStyles = makeStyles((theme) => ({
    selectbutton: {
      border: `1px solid ${colortheme}`,
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? colortheme : "",
      color: selected ? "black" : "",
      fontWeight: 700,
      "&:hover": {
        backgroundColor: colortheme,
        color: "black",
      },
      width: "24%",
      // margin: 5,
      [theme.breakpoints.down("md")]:{
        fontSize:".6rem",
        textAlign:"center",
        padding:10,
      }
    },
  }));

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
