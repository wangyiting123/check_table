 const initData = () => {
  const number = 20000;
  const list = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < number; i++) {
    list.push({
      key: `${i}`,
      temperature: '36',
      date: '2020-06-18',
      classes: '小一班',
      students: '张三',
      telephone: `${i}`,
    });
  }
  return list;
};

module.exports = initData;
const tableList = [{
  id: 1,
  table: [
    {
      key: '1',
      temperature: '36',
      date: '2020-06-18',
      classes: '小一班',
      students: '张三',
      telephone: '1212121212',
    },
    {
      key: '2',
      temperature: '36.4',
      date: '2020-06-18',
      classes: '小一班',
      students: '莉丝',
      telephone: '1212121212',
    },
    {
      key: '3',
      temperature: '36.3',
      date: '2020-06-18',
      classes: '小一班',
      students: '小张',
      telephone: '1212121212',
    },
    {
      key: '4',
      temperature: '36.5',
      date: '2020-06-18',
      classes: '小一班',
      students: '张小',
      telephone: '1212121212',
    },
  ],
}];
const colunms = [{
  id: 1,
  col: [
    {
      title: '体温',
      dataIndex: 'temperature',
      isKey: true,
      type: 'input',
      editable: true,
    },
    {
      title: '日期',
      dataIndex: 'date',
      isKey: false,
      type: 'input',
    },
    {
      title: '班级',
      dataIndex: 'classes',
      isKey: false,
      type: 'select',
      editable: true,
      options: [{ id: 1, title: '小一班' }, { id: 2, title: '小二班' }],
    },
    {
      title: '学生',
      dataIndex: 'students',
      isKey: false,
      type: 'input',
    },
    {
      title: '家长电话',
      dataIndex: 'telephone',
      isKey: false,
      type: 'input',
    },
  ],
}];

 const tabList = [{ id: 1, name: '测温情况', type: 'self' }];
