import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from '@mui/material';



function UserProfile(props) {

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
                        {props.user.userName}
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
        </Card>
    )
};


export default UserProfile;