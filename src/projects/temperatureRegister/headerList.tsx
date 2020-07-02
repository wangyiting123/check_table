import React, { Component } from 'react';
import { Dropdown } from 'antd';
import { connect } from 'react-redux';
import {
  CaretDownOutlined,
} from '@ant-design/icons';
import {
  TabList, showDialog, FormLabel,
} from '../../components';
import {
  initTabList, addTab, deleteTab, renameTab,
} from '../../store/temperatureTab/action';
import { subjectWindow } from './subject';
import { CONSTANTS } from './constants';
import { getMenuList } from '../../utils/dom';

interface ITabItem {
  id: string;
  name: string;
  type: string;
}

interface Props {
  tabList: Array<ITabItem>,
  addTab: ()=>any,
  deleteTab: ()=>any,
}

const mapStateToProps = (state: any) => ({
  tabList: state.temperatureTab.tabList,
});

const mapDispatchToProps = (dispatch: any) => ({
  addTab: (tab: ITabItem) => dispatch(addTab(tab)),
  initTabList: () => dispatch(initTabList()),
  deleteTab: (tab: ITabItem) => dispatch(deleteTab(tab)),
  renameTab: (tab: ITabItem) => dispatch(renameTab(tab)),
});

@(connect(mapStateToProps, mapDispatchToProps) as any)
export default class HeaderList extends Component<any, any> {
  newTabData: any;

  dropDownList: any;

  selectTabData: any;

  constructor(props: any) {
    super(props);
  }

  deleteTab= (data: any) => {
    showDialog({
      content: '确定删除此表格吗？',
      title: '删除',
      confirm: () => {
        this.props.deleteTab({ index: data.parentParams.index });
      },
    });
  }

  renameTab = (data: any) => {
    const config = [{
      name: 'input',
      params: {
        title: '表名称',
        defaultValue: data.name,
        onChange: this.createNewTab,
      },
    }];
    showDialog({
      content: <FormLabel config={config} />,
      title: '建表',
      confirm: () => {
        if (this.newTabData !== data.name) {
          this.props.renameTab({ index: data.parentParams.index, newName: this.newTabData });
        }
      },
      cancel: () => {
        this.newTabData = '';
      },
    });
  }

  componentWillMount() {
    this.props.initTabList();
  }

  createNewTab = (e: any) => {
    this.newTabData = e.target.value;
  }

  createNewTabBySelect = (value: string) => {
    this.selectTabData = value;
  }

  tabListChanged = (data: any) => {
    if (data.type === 'add') {
      const config = [{
        name: 'input',
        params: {
          title: '表名称',
          onChange: this.createNewTab,
        },
      },
      {
        name: 'select',
        params: {
          title: '主子段',
          options: [{ id: 1, title: '班级' }, { id: 2, title: '姓名' }],
          onChange: this.createNewTabBySelect,
        },
      }];
      showDialog({
        content: <FormLabel config={config} />,
        title: '建表',
        confirm: () => {
          const newTab = {
            id: this.props.tabList.length + 1, name: this.newTabData, type: CONSTANTS.TAB_SELF_TYPE, key: this.selectTabData,
          };
          this.props.addTab(newTab);
        },
        cancel: () => {
          this.newTabData = '';
        },
      });
    } else {
      subjectWindow.onNext(data);
    }
  }

  showAddDialog = (item: ITabItem, e: any) => {
    this.tabListChanged(item);
    e.stopPropagation();
  }

  showSelectList = (item: ITabItem, e: any) => {
    e.stopPropagation();
  }

  tabName =(data: ITabItem, index: string) => {
    this.dropDownList = [{
      id: 1, name: '删除表', click: this.deleteTab, parentParams: { ...data, index },
    },
    {
      id: 2, name: '重命名', click: this.renameTab, parentParams: { ...data, index },
    }];
    if (data.type === CONSTANTS.TAB_ADD_TYPE) {
      return <div onClick={this.showAddDialog.bind(null, data)}>{data.name}</div>;
    }
    return (
      <div>
        <span>{data.name}</span>
        <Dropdown overlay={getMenuList(this.dropDownList)} trigger={['click']}>
          <a className="ant-dropdown-link">
            <CaretDownOutlined />
          </a>
        </Dropdown>
      </div>
    );
  }

  getTabList = () => this.props.tabList.map((item: any, index: string) => {
    item.tabName = this.tabName(item, index);
    return item;
  })

  render() {
    const tabData = this.getTabList();
    return <TabList list={tabData} onChange={this.tabListChanged} />;
  }
}
