/* eslint-disable import/no-unresolved */
import { cloneDeep } from 'lodash';
// eslint-disable-next-line import/extensions
import types from './types';

const initState = {
  tabList: <any>[{ id: 'add', name: '+建表', type: 'add' }],
  activeTable: <any>[],
  activeTableId: String,
  tableList: <any>[],
  activeColumns: <any>[],
  columns: <any>[],
  uiShowTable: <any>[],
  count: Number,
};

const reducers: any = {};
reducers[types.ADD_TAB] = (state = initState, action: { type: any, payload: any }) => {
  const tabList = cloneDeep(state.tabList);
  tabList.splice(state.tabList.length - 1, 0, action.payload);
  return {
    ...state,
    tabList,
  };
};

reducers[types.ADD_TABLE] = (state = initState, action: { type: any, payload: any }) => {
  const tableList = cloneDeep(state.tableList);
  tableList.push(action.payload);
  return {
    ...state,
    tableList,
  };
};

reducers[types.ADD_TABLE_HEADER] = (state = initState, action: { type: any, payload: any }) => {
  const columns = cloneDeep(state.columns);
  columns.push(action.payload);
  return {
    ...state,
    columns,
  };
};

reducers[types.DELETE_TAB] = (state = initState, action: { type: any, payload: any }) => {
  const tabList = cloneDeep(state.tabList);
  tabList.splice(action.payload.index, 1);
  return {
    ...state,
    tabList,
  };
};

reducers[types.RENAME_TAB] = (state = initState, action: { type: any, payload: any }) => {
  const tabList = cloneDeep(state.tabList);
  tabList[action.payload.index].name = action.payload.newName;
  return {
    ...state,
    tabList,
  };
};

reducers[types.DELETE_TABLE] = (state = initState, action: { type: any, payload: any }) => {
  const tableList = cloneDeep(state.tableList);
  tableList.splice(action.payload.index, 1);
  return {
    ...state,
    tableList,
  };
};

reducers[types.DELETE_TABLE_HEADER] = (state = initState, action: { type: any, payload: any }) => {
  const columns = cloneDeep(state.columns);
  columns.splice(action.payload.index, 1);
  return {
    ...state,
    columns,
  };
};

reducers[types.INIT_TABLE] = (state = initState, action: { type: any, payload: any }) => {
  const tableList = cloneDeep(state.tableList);
  const { range } = action.payload;
  const list = tableList.concat(action.payload.list);
  const newTable = list[0].table.slice(range.min, range.max + 1);
  return {
    ...state,
    tableList: list,
    activeTable: list[0].table,
    uiShowTable: newTable,
    activeTableId: list[0].id,
    count: list[0].table.length,
  };
};

reducers[types.INIT_TABLE_HEAD] = (state = initState, action: { type: any, payload: any }) => {
  const columns = cloneDeep(state.columns);
  const list = columns.concat(action.payload);
  return {
    ...state,
    columns: list,
    activeColumns: list[0].col,
  };
};

reducers[types.INIT_TAB_LIST] = (state = initState, action: { type: any, payload: any }) => {
  const tabList = cloneDeep(state.tabList);
  const list = action.payload.concat(tabList);
  return {
    ...state,
    tabList: list,
  };
};

reducers[types.CHANGE_TABLE] = (state = initState, action: { type: any, payload: any }) => {
  const tableList = cloneDeep(state.tableList);
  let activeTable = null;
  tableList.forEach((element: any) => {
    if (element.id === action.payload.id) {
      activeTable = element.table;
    }
  });
  return {
    ...state,
    activeTable,
    activeTableId: action.payload.id,
  };
};

reducers[types.CHANGE_TABLE_HEAD] = (state = initState, action: { type: any, payload: any }) => {
  const columns = cloneDeep(state.columns);
  let activeColumns = null;
  columns.forEach((element: any) => {
    if (element.id === action.payload.id) {
      activeColumns = element.col;
    }
  });
  return {
    ...state,
    activeColumns,
  };
};

reducers[types.UPDATE_TABLE_CELL] = (state = initState, action: { type: any, payload: any }) => {
  const tableList = cloneDeep(state.tableList);
  let activeTable = cloneDeep(state.activeTable);
  let uiShowTable = cloneDeep(state.uiShowTable);
  uiShowTable = uiShowTable.map((el: any) => {
    if (el.key === action.payload.key) {
      return { ...el, ...action.payload };
    }
    return el;
  });
  activeTable = activeTable.map((el: any) => {
    if (el.key === action.payload.key) {
      return { ...el, ...action.payload };
    }
    return el;
  });
  tableList.forEach((element: any) => {
    if (element.id === state.activeTableId) {
      // eslint-disable-next-line no-param-reassign
      element.table = activeTable;
    }
  });
  return {
    ...state,
    tableList,
    activeTable,
    uiShowTable,
  };
};

reducers[types.GET_NEW_TABLE_LIST] = (state = initState, action: { type: any, payload: any }) => {
  const activeTable = cloneDeep(state.activeTable);
  const { max, min } = action.payload;
  const newTable = activeTable.slice(min, max + 1);
  return {
    ...state,
    uiShowTable: newTable,
  };
};

const reducer = (state = initState, action: { type: string; payload: any }) => {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }
  return state;
};

export default reducer;
