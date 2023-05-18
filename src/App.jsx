import { useEffect, useState } from 'react'
import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { List, ListItem, ListItemText, Divider } from '@mui/material';



function App() {
  const [animals, setAnimals] = useState([]);

useEffect(() => {
  const lastQuery = localStorage.getItem('lastQuery');
  search(lastQuery);
}, []);


/**
 * Asynchronously searches for animals data using the given query string. 
 *
 * @param {string} q - The query string to use for searching for animal data.
 * @return {Promise<void>} - A promise that resolves when the search is complete and animal data has been set.
 */
  const search = async (q) => {
    const response = await fetch('http://localhost:8080?' + new URLSearchParams({ q }));
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  }

  return (
    <>
    <Box component="div" height={"100vh"} p={4} m={2} alignItems="center" justifyContent="start" display="flex" flexDirection="column" bgcolor="background.paper">
      {/* <h1 className='text-2xl'></h1> */}
      <Typography variant="h1" m={3}>🐐 Animal Farm</Typography>

      <TextField id="filled-basic" label="Search" variant="filled" sx={{"margin-bottom": "1.5rem", margin: "1rem"}} onChange={e => search(e.target.value)} style={{ width: '700px' }} />

      <List  sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }} >
        {animals.map(animal => (
            <>
            <ListItem>
            <ListItemText
              primary={animal.type}
              secondary={`${animal.name} - ${animal.age} years old`}
              />
            </ListItem>
            <Divider/>
            </>
          ))
        }
        {animals.length === 0 && "No animals"}
      </List>
    </Box>
    </>
  )
}

export default App;
