import React, {
  Component,
} from 'react';
import {
  Dropdown,
} from 'antd';
import { connect } from 'react-redux';
import {
  CaretDownOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { TableList } from '../../components';
import {
  initTable, addTable, changeTable, updateTableCell, getNewTableList,
} from '../../store/temperatureTab/action';
import { subjectWindow } from './subject';
import { ITabItem } from '../../components/tabList';
import { getMenuList } from '../../utils/dom';
import { EditableRow } from '../../components/tableList/tableRow';
import { EditableCell } from '../../components/tableList/tableCell';

const tableCellHeight = 55;

const mapStateToProps = (state: any) => ({
  uiShowTable: state.temperatureTab.uiShowTable,
  activeColumns: state.temperatureTab.activeColumns,
  count: state.temperatureTab.count,
});

const mapDispatchToProps = (dispatch: any) => ({
  addTable: (tab: ITabItem) => dispatch(addTable(tab)),
  initTable: (range: {}) => dispatch(initTable(range)),
  changeTable: (tab: ITabItem) => dispatch(changeTable(tab)),
  updateTableCell: (cellData: any) => dispatch(updateTableCell(cellData)),
  getNewTableList: (range: {}) => dispatch(getNewTableList(range)),
});

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class BodyTable extends Component<any, any> {
  scrollRange = { min: 0, max: 0 }; // 滚动条对应的表格位置

  height = document.body.clientHeight;

  currentPageCount = Math.ceil(this.height / tableCellHeight);

  maxCount = this.currentPageCount * 4;

  cols: any;

  tableBody: any;

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.initTable(this.scrollRange);

    subjectWindow.subscribe((data) => {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.changeTable(data);
    });
  }

  componentDidUpdate() {
    this.computedPrevAndLastPosition();
  }

  getUiShowRange = () => {
    this.scrollRange.min = 0;
    this.scrollRange.max = this.maxCount;
  }

  computedPrevAndLastPosition = () => {
    const prevNode = document.querySelector('.tbody-prev');
    const lastNode = document.querySelector('.tbody-last');
    const prevHeight = this.scrollRange.min * tableCellHeight;
    // eslint-disable-next-line react/destructuring-assignment
    const lastHeight = (this.props.count - this.scrollRange.max) * tableCellHeight;
    // eslint-disable-next-line no-unused-expressions
    prevNode?.setAttribute('style', `height: ${prevHeight}px`);
    // eslint-disable-next-line no-unused-expressions
    lastNode?.setAttribute('style', `height: ${lastHeight}px`);
  }

  updateTableCell = (data: any) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.updateTableCell(data);
  }

  handleColumns = (data: any) => {
    const dropDownList = [{ id: 1, name: '新增字段', click: () => {} },
      { id: 1, name: '删除字段', click: () => {} },
      { id: 1, name: '设为主字段', click: () => {} },
      { id: 1, name: '选中', click: () => {} }];
    return data.map((element : any) => {
      const col = {
        ...element,
        title: <div>
          {
            element.isKey && <KeyOutlined />
          }
          <span>{element.title}</span>
          <Dropdown overlay={getMenuList(dropDownList)} trigger={['click']}>
            <a className="ant-dropdown-link">
              <CaretDownOutlined />
            </a>
          </Dropdown>
        </div>,
      };
      if (!element.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          col,
          handleSave: this.updateTableCell,
        }),
      };
    });
  }

  handleScroll = (e: any) => {
    const { scrollTop } = e.target;
    const realHeight = (scrollTop * this.props.count * tableCellHeight) / (e.target.scrollHeight);
    const index = Math.floor(realHeight / tableCellHeight);
    if (this.maxCount - index <= this.currentPageCount * 2 || index <= this.currentPageCount * 2) {
      this.scrollRange.min = index;
      this.scrollRange.max = index + this.maxCount;
      this.props.getNewTableList(this.scrollRange);
    }
  }

  body = (table: any) => {
    const columns = this.cols;
    return (
      <div className="ant-table-header self-table-body" onScroll={this.handleScroll}>
        <div className="tbody-prev" />
        <table>
          <tbody className="ant-table-tbody">
            {
              table && table.map((item: any, index: number) => (
                <EditableRow {...item}>
                  {
                    columns.map((col: any) => (
                      <EditableCell className="ant-table-cell" record={item} col={col} handleSave={this.updateTableCell}>
                        {item[col.dataIndex]}
                        {' '}
                      </EditableCell>
                    ))
                  }
                  <EditableCell className="ant-table-cell ant-table-cell-scrollbar"> </EditableCell>
                </EditableRow>
              ))
            }
          </tbody>
        </table>
        <div className="tbody-last" />
      </div>
    );
  };

  render() {
    const { activeColumns, uiShowTable } = this.props;
    this.cols = this.handleColumns(activeColumns);
    const components = {
      body: this.body,
    };
    return <TableList columns={this.cols} dataSource={uiShowTable} components={components} />;
  }
}
