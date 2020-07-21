import { cloneDeep } from 'lodash';
import types from './types';
import request from '../../request';
import {
  tabList, tableList, colunms, initData,
} from './mockData';

const newTableList = cloneDeep(tableList);
newTableList[0].table = initData();

export const addTab = (tabItem: any) => (dispatch: any) => {
  dispatch({
    type: types.ADD_TAB,
    payload: tabItem,
  });
  dispatch(addTable({
    id: tabItem.id,
    table: [{
      key: '1',
      temperature: '36',
      date: '2020-06-18',
      classes: '小一班',
      students: '张三',
      telephone: '1212121212',
    }],
  }));
  dispatch(addTableHeader({
    id: tabItem.id,
    col: [{
      title: tabItem.key,
      dataIndex: 'temperature',
      isKey: true,
      type: 'input',
      editable: true,
    }],
  }));
};

export const initTabList = () => ({
  type: types.INIT_TAB_LIST,
  payload: tabList,
});

export const addTable = (tableItem: any) => ({
  type: types.ADD_TABLE,
  payload: tableItem,
});

export const addTableHeader = (headerItem: any) => ({
  type: types.ADD_TABLE_HEADER,
  payload: headerItem,
});

export const deleteTable = (tableItem: any) => ({
  type: types.DELETE_TABLE,
  payload: tableItem,
});

export const deleteTableHeader = (headerItem: any) => ({
  type: types.DELETE_TABLE_HEADER,
  payload: headerItem,
});

export const initTable = (range: any) => (dispatch: any) => {
  request.get('list').then((res) => {
    if (res.status === 200) {
      newTableList[0].table = res.data;
      dispatch({
        type: types.INIT_TABLE,
        payload: { list: newTableList, range },
      });
    }
  })


  dispatch({
    type: types.INIT_TABLE_HEAD,
    payload: colunms,
  });
};

export const deleteTab = (data: any) => (dispatch: any) => {
  dispatch({
    type: types.DELETE_TAB,
    payload: data,
  });
  dispatch(deleteTable(data));
  dispatch(deleteTableHeader(data));
};

export const renameTab = (data: any) => ({
  type: types.RENAME_TAB,
  payload: data,
});

export const changeTable = (data: any) => (dispatch: any) => {
  dispatch({
    type: types.CHANGE_TABLE,
    payload: data,
  });
  dispatch({
    type: types.CHANGE_TABLE_HEAD,
    payload: data,
  });
};

export const updateTableCell = (data: any) => ({
  type: types.UPDATE_TABLE_CELL,
  payload: data,
});

export const getNewTableList = (range: {}) => ({
  type: types.GET_NEW_TABLE_LIST,
  payload: range,
});
