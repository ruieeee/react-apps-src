import React, { useState, useEffect, ReactEventHandler } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowId,
  ValueGetterParams,
} from "@material-ui/data-grid";
import { auth, db } from "../../firebase";
import { Button, Grid } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

//dataGrid : https://material-ui.com/api/data-grid/

interface Props {}

const Table: React.FC = (props) => {
  interface Rows {
    rows: GridRowPros;
    rowId: String;
  }
  interface GridRowPros {
    Age: Number;
    Name: String;
    userId: String;
  }

  const rowType: GridRowPros = { Age: 0, Name: "", userId: "" };
  const RowsType: Rows = { rows: rowType, rowId: "" };

  const [row, setRow] = useState([RowsType.rows]);
  const [rowId, setRowId] = useState([RowsType.rowId]);
  //   const[data,setData] = useState({});
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const unSub = db.collection("Table").onSnapshot((snapshot) => {
      setRow(
        snapshot.docs.map((doc) => ({
          Age: doc.data().Age,
          Name: doc.data().Name,
          userId: doc.data().userId,
        }))
      );
      setRowId(snapshot.docs.map((doc) => doc.id));
    });
    return () => unSub();
    //snapshotのfirebase側の監視を終わらせる->サブスクリプションを停止させる->停止させるための関数:db.collectionの返り値
    //クリーンナップ関数でunSubを呼ぶ
  }, []);

  //columns Option :https://material-ui.com/components/data-grid/columns/
  let makeColumns: GridColDef[] = [];

  let rowIndex = [];
  row.map((row) => {
    rowIndex = Object.keys(row);
    rowIndex.map((key) => {
      makeColumns.push({
        field: key,
        headerName: key,
        type: typeof key,
        //disableClickEventBubbling: true, columnをクリックしたとき選択しない
      });
    });
  });

  const columns: GridColDef[] = makeColumns;

  let datas: {
    id: String;
    Age: Number;
    Name: String;
    userId: String;
  }[] = [];

  //row option : https://material-ui.com/components/data-grid/rows/
  for (let i in rowId) {
    datas.push({
      id: rowId[i],
      Age: row[i].Age,
      Name: row[i].Name,
      userId: row[i].userId,
    });
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("Table").add({
      Age: dialogText1,
      Name: dialogText2,
      userId: uid,
    });
    setDialogText1(0);
    setDialogText2("");
  };
  const [dialogText1, setDialogText1] = useState(Number);
  const [dialogText2, setDialogText2] = useState(String);

  const deleteTask = () => {
    selection.map((sectionId: GridRowId) =>
      db.collection("Table").doc(String(sectionId)).delete()
    );
  };

  const [selection, setSelection] = useState<GridRowId[]>([]);

  return (
    <div style={{ height: 400, width: "80%" }}>
      <h1>TableName</h1>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        行の追加
        <AddCircleOutlineIcon />
      </Button>
      <Button variant="outlined" color="primary" onClick={deleteTask}>
        行の削除
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">行の追加</DialogTitle>
        <DialogContent>
          <DialogContentText>値を入力してください</DialogContentText>
          <TextField
            autoFocus
            type="number"
            margin="dense"
            id="Age"
            label="Age"
            value={dialogText1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDialogText1(Number(e.target.value));
            }}
          />
          <br />
          <TextField
            autoFocus
            type="string"
            margin="dense"
            id="name"
            label="Name"
            value={dialogText2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDialogText2(e.target.value);
            }}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleAdd} color="primary">
            追加
          </Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={datas}
        columns={columns}
        autoPageSize
        checkboxSelection
        autoHeight
        components={{
          Toolbar: GridToolbar,
        }}
        onSelectionModelChange={(newSelection) => {
          setSelection(newSelection.selectionModel);
        }}
        selectionModel={selection}
      />
    </div>
  );
};

export default Table;

/* <DataGrid
        rows={datas}
        columns={columns}
        autoPageSize
        checkboxSelection
        autoHeight

        テーブルのツールバー
        components={{
          Toolbar: GridToolbar,
        }}
      /> */
