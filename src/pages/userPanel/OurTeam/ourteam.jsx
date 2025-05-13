import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ourTeam.css'

export default function MediaCard() {
  return (
    <div className='mainBox'>
    <Card sx={{ maxWidth: 345 ,height:"60vh"}}>
      <CardMedia
         sx={{ height: 280,
            backgroundImage:`url("/chef1.jpg")`,
            backgroundSize:"100% 100%"
               }}
            //   image=
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Chef
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        A chef is a culinary professional responsible for preparing and cooking food, often overseeing kitchen staff and managing food-related operations.
        </Typography>
      </CardContent>
     
    </Card>
    <Card sx={{ maxWidth: 345,height:"60vh" }}>
    <CardMedia
      sx={{ height: 280,
        backgroundImage:`url("/chef2.jpg")`,
        backgroundSize:"100% 100%"
           }}
        //   image=
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Chef
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      A chef is a culinary professional responsible for preparing and cooking food, often overseeing kitchen staff and managing food-related operations.
      </Typography>
    </CardContent>
   
  </Card>

<Card sx={{ maxWidth: 345,height:"60vh" }}>
<CardMedia
  sx={{ height: 280,
backgroundImage:`url("/chef3.jpg")`,
backgroundSize:"100% 100%"
   }}
//   image=
  title="green iguana"
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
   Chef
  </Typography>
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  A chef is a culinary professional responsible for preparing and cooking food, often overseeing kitchen staff and managing food-related operations.
  </Typography>
</CardContent>

</Card>
</div>
  );
}
