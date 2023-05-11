import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

// COMPONENTS
import Image from "components/image/Image.component";
import IsVisible from "components/is-visible/IsVisible.component";
import ToolBar from "components/toolbar/ToolBar.component";
// UTILITIES
import { generateUUID } from "utilities";
// IMAGES
import removeIcon from "assets/imgs/remove.png";

type CTableType = {
  headItems: [];
  bodyItems: any;
  hasRemoveBtn?: boolean;
  onRemoveClick?: any;
  onSearchChange?: any;
  onSortChange?: any;
  text?: string;
};

function CTable({
  headItems,
  bodyItems,
  hasRemoveBtn,
  onRemoveClick,
  text,
  onSearchChange,
  onSortChange,
}: CTableType) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(() => {
    const bodyItemsCopy = Object.assign([], bodyItems);
    return bodyItemsCopy?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    // eslint-disable-next-line
  }, [text, page, rowsPerPage, onSortChange]);

  return (
    <TableContainer
      component={Paper}
      className="c-table"
    >
      <ToolBar
        onFilterChange={onSearchChange}
        onSortChange={onSortChange}
        searchText={text}
        listLength={visibleRows.length}
      />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {headItems?.map((item: any) => (
              <TableCell key={generateUUID()}>{item.displayName.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows?.map((c: any) => {
            return (
              <TableRow key={c.uuid}>
                {headItems?.map((head: any) => {
                  return head.isIcon ? (
                    <TableCell key={generateUUID()}>
                      <Image
                        path={c[head.label]}
                        alt={c[head.label]}
                        className="c-table__icon"
                      />
                    </TableCell>
                  ) : (
                    <TableCell key={generateUUID()}>{c[head.label]}</TableCell>
                  );
                })}
                <IsVisible isVisible={hasRemoveBtn!}>
                  <TableCell>
                    <Image
                      path={removeIcon}
                      alt="removeicon"
                      className="c-table__remove-icon"
                      onClick={(e: React.FormEvent<HTMLFormElement>) => onRemoveClick(e, c.uuid)}
                    />
                  </TableCell>
                </IsVisible>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={bodyItems?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default CTable;
