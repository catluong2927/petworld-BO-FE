import React from 'react';

import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
    Chip
} from '@mui/material';


function OwnerPackageInfo(props) {
    const { packageCenter } = props;

    console.log(packageCenter)

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
                        src={packageCenter.image}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80
                        }}
                    />

                    <Typography
                        gutterBottom
                        variant="h5"
                        component={'span'}
                    >
                        {packageCenter.packageName}&ensp;-&ensp;${packageCenter.price}
                    </Typography>
                    
                    <Typography
                        color="text.secondary"
                        variant="body2"
                        component={'span'}
                    >
                        Center's name:&ensp;{packageCenter.centerName}
                    </Typography>
                    
                    <Typography
                        color="text.secondary"
                        variant="body2"
                        component={'span'}
                    >
                        Description:&ensp;{packageCenter.description}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ margin: '10px' }}
                        component={'span'}
                    >
                        <Chip
                            label={packageCenter.isActive ? 'Active' : 'Inactive'}
                            style={packageCenter.isActive ?
                                { backgroundColor: '#C7F2A4', color: '#5F8D4E', fontSize: '15px', fontWeight: 'bold' } :
                                { backgroundColor: '#FFA8A8', color: '#DF2E38', fontSize: '15px', fontWeight: 'bold' }
                            }
                            variant="outlined"
                        />
                        &ensp;
                        <Chip
                            label={packageCenter.status ? 'Stocking' : 'Out of stock'}
                            style={packageCenter.status ?
                                { backgroundColor: '#C7F2A4', color: '#5F8D4E', fontSize: '15px', fontWeight: 'bold' } :
                                { backgroundColor: '#FFA8A8', color: '#DF2E38', fontSize: '15px', fontWeight: 'bold' }
                            }
                            variant="outlined"
                        />
                    </Typography>

                </Box>
            </CardContent>
        </Card>
    )
};


export default OwnerPackageInfo;