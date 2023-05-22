import PropTypes from 'prop-types';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick,
}) {

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
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
