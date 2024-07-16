import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { senioritys, pos, Employee } from "../App";
import { useState } from "react";
import axios from "axios";

const FormCard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const onSubmit = (data: FieldValues) => {
    const newEmployee = {
      fname: data.fname,
      lname: data.lname,
      position: data.position,
      seniority: data.seniority,
    };

    setEmployees([newEmployee, ...employees]);

    axios
      .post("http://localhost:8080/employee/add", newEmployee)
      .then((res) => {
        setEmployees([res.data, ...employees]);
        window.location.reload();
      });
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, bgcolor: "#ffddb2" }}>
        <Typography variant="h6" sx={{ textAlign: "center", pb: 2 }}>
          ADD EMPLOYEE
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              sx={{ bgcolor: "#ffffff" }}
              id="fname"
              label="First Name"
              type="text"
              {...register("fname", { required: true })}
            />
            <TextField
              sx={{ bgcolor: "#ffffff" }}
              id="lname"
              label="Last Name"
              type="text"
              {...register("lname", { required: true })}
            />
            <FormControl sx={{ bgcolor: "#ffffff" }}>
              <InputLabel id="position-label">Position</InputLabel>
              <Select
                labelId="position-label"
                id="position"
                label="Position"
                defaultValue=""
                {...register("position", { required: true })}
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
                defaultValue=""
                {...register("seniority", { required: true })}
              >
                <MenuItem value=""></MenuItem>
                {senioritys.map((seniorityss) => (
                  <MenuItem key={seniorityss} value={seniorityss}>
                    {seniorityss}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              disabled={!isValid}
              variant="contained"
              type="submit"
              color="error"
            >
              Save
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export default FormCard;
