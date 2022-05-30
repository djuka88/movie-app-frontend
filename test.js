import { useQueryClient } from "react-query";
import { useAddMovieMutation, useGetAllGenresQuery } from "./queries/movie";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './AddMovie.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function AddMovie() {
    const { isLoading, error, data } = useGetAllGenresQuery();
    const theme = useTheme();
    const [personName, setPersonName] = useState([]);
    const { mutate: addMovie, error: addMovieError } = useAddMovieMutation();
    const schema = yup.object({
        title: yup.string().required(),
      });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    if (isLoading) {
        return (
          <div>
            <h3>Loading genres...</h3>
          </div>
        );
      }
  
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

  return (
    <div>
      <h1>Add new movie</h1>
      <form className="form">
      <TextField  name="title" className="Test" id="title" label="Title" variant="outlined" fullWidth {...register("title")}/>
        {/* <input
          type="text"
          name="title"
          placeholder="Title..."
          {...register("title")}
        ></input> */}
        <p>{errors.title?.message}</p>

        {/* <input
          type="text"
          name="cover_image"
          placeholder="Url to a picture..."
          {...register("cover_image")}
        ></input> */}
        <TextField className="test" id="cover_image" label="Url to a picture..." variant="outlined" fullWidth/>
        <p>{errors.cover_image?.message}</p>

        <FormControl sx={{ m: 1, width: 480, ml:0, mr:0, mt: 0}}>
        <InputLabel id="genere_label">Genre</InputLabel>
        <Select
          labelId="genere_label"
          id="genre"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Genre" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map(({name,id}) => (
            <MenuItem
              key={id}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        {/* <label htmlFor="genre">Genre:</label>
        <select name="genre" {...register("genre")}>
            <option value="">-Select One-</option>
        </select> */}

        {/* <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          placeholder="Description..."
          {...register("description")}
        ></textarea>
        <p>{errors.description?.message}</p> */}
        <TextareaAutosize className="TextArea" minRows={10} placeholder="Description..."></TextareaAutosize>

        {/* <input type="submit" onClick={handleSubmit(addMovie)} /> */}

      </form>
    </div>
  );
}

export default AddMovie;
