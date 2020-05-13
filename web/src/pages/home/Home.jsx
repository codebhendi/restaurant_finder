import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import makeStyles from '@material-ui/styles/makeStyles';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import mapboxgl from 'mapbox-gl';
import Axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmhlbmRpIiwiYSI6ImNrYTVnODJqajAzYzgzbHF3bW01N3FuMXAifQ.0dBCwvRqLBreDXO5mAeQoQ';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    height: '50vh',
  },
  map: { height: '55vh', width: '65vw', margin: 'auto' },
  backdrop: {
    zIndex: 4,
    color: '#fff',
  },
}));

const Home = () => {
  const classes = useStyles();
  let ref;
  let map;
  const [latLng, setLatLng] = useState({
    lat: 28.616353037907157, lng: 77.20832969993124, zoom: 5,
  });
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    setLatLng({ ...latLng, lng: e.lngLat.lng, lat: e.lngLat.lat });
  };

  useEffect(() => {
    map = new mapboxgl.Map({
      container: ref,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [latLng.lng, latLng.lat],
      zoom: 10,
    });

    map.on('click', handleClick);
  }, []);

  const getRestaurant = async () => {
    const options = {
      url: `http://localhost:3000/api/find?lat=${latLng.lat}&lng=${latLng.lng}`,
      headers: { 'Content-Type': 'application/json' },
      method: 'get',
    };

    setLoading(true);

    try {
      const { data: { message } } = await Axios(options);
      setNearby(message);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setNearby([]);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography>
        {`Latitude; ${latLng.lat} `}
        {`Longitude; ${latLng.lng}`}
      </Typography>
      <div className={classes.container} ref={(el) => { ref = el; }} />
      <Button variant="outlined" onClick={getRestaurant}>Get Restaurants</Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Cuisines</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nearby.map(({ restaurant }) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.location.address}</TableCell>
                <TableCell>{restaurant.cuisines}</TableCell>
                <TableCell>
                  {`Latitude: ${restaurant.location.latitude}, Longitude: ${restaurant.location.longitude}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Home;
