import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './BasicCard.css';

export default function BasicCard({ title, count }) {
  const [cardColor, setCardColor] = React.useState('#000000'); // Default color

  React.useEffect(() => {
    switch (title) {
      case 'All Users':
        setCardColor('#ffffff'); // Blue for All Users
        break;
      case 'Normal':
        setCardColor('#DBFFC2'); // Green for Normal
        break;
      case 'Mild':
        setCardColor('#F3FFC2'); // Yellow for Mild
        break;
      case 'Moderate':
        setCardColor('#C2E1FF'); // Gray for Moderate
        break;
      case 'Severe':
        setCardColor('#FFECD3'); // Red for Severe
        break;
      case 'Extremely Severe':
        setCardColor('#FFCEC2'); // Red for Severe
        break;
      default:
        setCardColor('#000000'); // Default color
    }
  }, [title]);

  const textColor = 'black';

  return (
    <Card sx={{ minWidth: 50, backgroundColor: cardColor, color: textColor }}>
      <CardContent>
        <Typography variant="h4" component="div">
         0{count}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary" >
          Health Status
        </Typography>
      </CardContent>
    </Card>
  );
}
