import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Employee, pos, senioritys } from "../App";
import { useTheme } from "@mui/material/styles";
import { FieldValues, useForm } from "react-hook-form";

interface EmployeeID extends Employee {
  id: number;
}

const TableList = () => {
  const [employees, setEmployees] = useState<EmployeeID[]>([]);
  const [id, selectId] = useState("");
  const [error, setError] = useState("");
  const [item, selectItem] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const { register, handleSubmit, formState:{errors,isValid} } = useForm();
  const [fname, setFname] = useState<String>("");
  const [lname, setLname] = useState<String>("");
  const [position, setPosition] = useState<String>("");
  const [seniority, setSeniority] = useState<String>("");


  const handleClickOpen = (params: any) => {
    setOptions("1");
    setOpen(true);
    selectId(params.id);
    selectItem(params.fname + " " + params.lname);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (params: any) => {
    setOptions("2");
    setOpen(true);
    selectId(params.id);
    setFname(params.fname);
    setLname(params.lname);
    setPosition(params.position);
    setSeniority(params.seniority);
  };

  const onSubmit = (data: FieldValues) => {
    const originalEmployees = [...employees];
    const updateEmployee = {...employees,
        id: id,
      fname: data.fname,
      lname: data.lname,
      position: data.position,
      seniority: data.seniority,
    };

    axios.patch('http://localhost:8080/employee/'+id,updateEmployee)
    .catch(err => {
        setError(err.message);
        setEmployees(originalEmployees);
    });
    setOpen(false);
    window.location.reload();
   
  };

  const handleDeleteItem = (id: any) => {
    const originalEmployees = [...employees];
    setEmployees(employees.filter((a) => a.id !== id));

    axios.delete("http://localhost:8080/employee/" + id).catch((err) => {
      setError(err.message);
      setEmployees(originalEmployees);
    });
    setOpen(false);
  };

  const renderDetailsButton = (params: any) => {
    return (
      <strong>
        <Button onClick={() => handleEdit(params.row)}>
          <CreateRoundedIcon />
        </Button>
        <Button color="secondary" onClick={() => handleClickOpen(params.row)}>
          <DeleteForeverRoundedIcon />
        </Button>
      </strong>
    );
  };

  const columns: GridColDef[] = [
    { field: "fname", headerName: "First name", width: 150 },
    { field: "lname", headerName: "Last name", width: 150 },
    { field: "position", headerName: "Position", width: 150 },
    { field: "seniority", headerName: "Seniority", width: 150 },
    {
      field: "id",
      headerName: "",
      width: 200,
      align: "center",
      renderCell: renderDetailsButton,
    },
  ];

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    axios
      .get<EmployeeID[]>("http://localhost:8080/employee/getAll", {
        signal: controller.signal,
      })
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      {options === "1" && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="delete-dialog"
        >
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove user <b>{item}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              No
            </Button>
            <Button onClick={() => handleDeleteItem(id)}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
      {options === "2" && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-dialog"  
        >
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle id="edit-dialog">EDIT EMPLOYEE</DialogTitle>
          <DialogContent sx={{width:"400px"}}>
            
            <Stack spacing={2}>
            <TextField
              sx={{ bgcolor: "#ffffff" }}
              id="fname"
              label="First Name"
              type="text"
              defaultValue={fname}
              {...register("fname",{required:true})}
            />
            <TextField
              sx={{ bgcolor: "#ffffff" }}
              id="lname"
              label="Last Name"
              type="text"
              defaultValue={lname}
              {...register("lname",{required:true})}
            />
            <FormControl sx={{ bgcolor: "#ffffff" }}>
              <InputLabel id="position-label">Position</InputLabel>
              <Select
                labelId="position-label"
                id="position"
                label="Position"
                defaultValue={position}
                {...register("position",{required:true})}
              >
                <MenuItem value=""></MenuItem>
                {pos.map((poss) => (
                  <MenuItem key={poss} value={poss}>
                    {poss}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ bgcolor: "#ffffff" }}>
              <InputLabel id="seniority-label">Seniority</InputLabel>
              <Select
                labelId="seniority-label"
                id="seniority"
                label="Seniority"
                defaultValue={seniority}
                {...register("seniority",{required:true})}
              >
                <MenuItem value=""></MenuItem>
                {senioritys.map((seniorityss) => (
                  <MenuItem key={seniorityss} value={seniorityss}>
                    {seniorityss}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Stack>
           
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button disabled={!isValid} type="submit" variant="contained" color="success">Update</Button>
          </DialogActions>
          </form>
        </Dialog>
      )}
      <Paper elevation={3} sx={{ p: 2, bgcolor: "#fffaf6" }}>
        <Typography variant="h6" sx={{ textAlign: "center", pb: 2 }}>
          EMPLOYEE LIST
        </Typography>
        {error && <p>{error}</p>}
        {isLoading == true && (
          <Divider
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Divider>
        )}
        <DataGrid
          autoHeight
          rows={employees}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Paper>
    </>
  );
};

export default TableList;
