import PropTypes from 'prop-types';
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

UserListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function UserListHead({ headLabel }) {

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.alignRight ? 'right' : 'left'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel hideSortIcon>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
