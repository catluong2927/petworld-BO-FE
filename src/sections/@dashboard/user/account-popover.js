import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

import UploadImage from '../../../components/upload/UploadImage';

// const user = {
//   avatar: '/assets/avatars/avatar-anika-visser.png',
//   city: 'Los Angeles',
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Anika Visser',
//   timezone: 'GTM-7'
// };
function AccountProfile(props) {
  console.log(props.user);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={props.user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {props.user.fullName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {props.user.userName}&ensp;{props.user.phone}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {props.user.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <UploadImage setNewAvatar={props.setNewAvatar}/>
      </CardActions>
    </Card>
  )
};


export default AccountProfile;