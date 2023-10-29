import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './BasicCard.css';
import { useHistory } from 'react-router-dom';

const linkStyle = {
  cursor: 'pointer', // Change the cursor to a pointer
};

export default function BasicCard({ title, count }) {
  const history = useHistory();

  const handleClick = () => {
    // Use the `history` object to navigate to the '/employees' page with a query parameter
    history.push(`/employees?status=${title}`);
  };

  const cardColor = getTitleColor(title);
  const textColor = 'black';

  function getTitleColor(title) {
    switch (title) {
      case 'Health Status (All)':
        return '#ffffff'; // Blue for All Users
      case 'Normal':
        return '#DBFFC2'; // Green for Normal
      case 'Mild':
        return '#F3FFC2'; // Yellow for Mild
      case 'Moderate':
        return '#C2E1FF'; // Gray for Moderate
      case 'Severe':
        return '#FFECD3'; // Red for Severe
      case 'Extremely Severe':
        return '#FFCEC2'; // Red for Extremely Severe
      default:
        return '#000000'; // Default color
    }
  }

  return (
    <Card
      sx={{ minWidth: 50, minHeight: 164, backgroundColor: cardColor, color: textColor }}
      onClick={handleClick}
      style={linkStyle}
    >
      <CardContent>
        <Typography variant="h4" component="div">
          0{count}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Health Status
        </Typography>
      </CardContent>
    </Card>
  );
}
