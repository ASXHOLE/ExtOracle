var college = [ [ 'c', '计算机学院' ], [ 'm', '机车学院' ], [ 'f', '外国语学院' ] ];

var foreignlanguage = [ [ 'f1', '英语一班' ], [ 'f2', '英语二班' ], [ 'f3', '日语一班' ],
		[ 'f4', '日语二班' ] ];

var machinecar = [ [ 'm1', '车辆一班' ], [ 'm2', '车辆二班' ], [ 'm3', '车辆三班' ] ];

var computer = [ [ 'c1', '软工一班' ], [ 'c2', '软工二班' ], [ 'c3', '数媒一班' ],
		[ 'c4', '计科一班' ], [ 'c5', '计科二班' ] ];

var collegeStore = new Ext.data.ArrayStore({
	fields : [ 'valueField', 'displayField' ],
	data : college
});

var classStore = new Ext.data.ArrayStore({
	fields : [ 'valueField', 'displayField' ],
	data : []
});

var allclassStore = new Ext.data.ArrayStore({
	fields : [ 'valueField', 'displayField' ],
	data : []
});

/*
 * 拼接数组方法 var allclass=foreignlanguage; allclass=allclass.concat(machinecar);
 * allclass=allclass.concat(computer); allclassStore.loadData(allclass);
 */

/* loadData()函数方法 */
allclassStore.loadData(foreignlanguage, true);
allclassStore.loadData(machinecar, true);
allclassStore.loadData(computer, true);
			

var jsonstore = new Ext.data.JsonStore(
		{
			proxy : new Ext.data.HttpProxy({
				type : "ajax",
				url : 'src/com/extorc/util/servlet?method=query',
				successProperty : "success"
			}),
			method : 'post',
			totalProperty : "results",
			fields : [ 'number', 'name', 'age', 'gender', 'college', 'classes',
					'post' ],
			root : "rows",
			baseParams : {
				start : 0,
				limit : 5
			}
		});

var modistore = new Ext.data.JsonStore({
	proxy : new Ext.data.HttpProxy({
		type : "ajax",
		url : 'src/com/extorc/util/servlet?method=modiquery',
		successProperty : "success"
	}),
	method : 'post',
	totalProperty : "results",
	fields : [ 'id', 'number', 'name', 'age', 'gender', 'college', 'classes',
			'post' ],
	root : "rows",
	baseParams : {
		start : 0,
		limit : 5
	}
});

var selModel = new Ext.grid.CheckboxSelectionModel();

var sexStore = new Ext.data.ArrayStore({
	fields : [ 'valField', 'displayText' ],
	data : [ [ 'm', '男' ], [ 'f', '女' ] ]
// 性别代码
});

var checkedPost = '';
var mcheckedPost = '';

var newp;
var newwin;

var modiwin;
var modip;

var gp;

Ext.onReady(function() {
			// 初始化信息提示功能
			Ext.QuickTips.init();
			// 统一指定错误信息提示浮动显示方式
			Ext.form.Field.prototype.msgTarget = 'side';

			
			

			var number=new Ext.form.TextField({// -----------------------------------------------学号框
				id : "number",
				fieldLabel : "学号",
				// width:500,
				//allowBlank : false,// 默认是true,如果是false,就是不允许空
				// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
				// 要使提示内容出现，需要添加 Ext.QuickTips.init();
				blankText : "请输入学号!!!",// 为空验证失败提示信息

				emptyText : "请输入学生的学号!"// 空字段中默认显示信息

			});
			
			var name=new Ext.form.TextField({// -------------------------------------------姓名框
				id : "name",
				fieldLabel : "姓名",
				//allowBlank : false,// 默认是true,如果是false,就是不允许空
				// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
				// 要使提示内容出现，需要添加 Ext.QuickTips.init();
				blankText : "请输入姓名!!!",// 为空验证失败提示信息
			});
			
			var age=new Ext.form.NumberField({// ------------------------------------------年龄框
				id : "age",
				fieldLabel : "年龄",
				//allowBlank : false,// 默认是true,如果是false,就是不允许空
				// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
				// 要使提示内容出现，需要添加 Ext.QuickTips.init();
				blankText : "请输入年龄!!!",// 为空验证失败提示信息
			});
			
			var collegeCombo=new Ext.form.ComboBox({// ---------------------------------------------学院下拉框
				id : 'collegeCombo',
				fieldLabel : '学院',
				mode : 'local',
				readOnly : false,
				triggerAction : 'all',
				editable : false,
				emptyText : '------------请选择学院------------',
				store : collegeStore,
				valueField : 'valueField',
				displayField : 'displayField',
				listeners : {
					'select' : function() {
						Ext.getCmp('classCombo').setValue("");
						classStore.removeAll();
						if (this.getValue() == 'c') {// 这里可以把这个value传到后台，动态获取班级，返回来并load到store里
							classStore.loadData(computer);
						} else if (this.getValue() == 'f') {
							classStore.loadData(foreignlanguage);
						} else if (this.getValue() == 'm') {
							classStore.loadData(machinecar);
						}
					}
				}

			});
			
			var classCombo=new Ext.form.ComboBox({// ---------------------------------------------班级下拉框
				id : 'classCombo',
				fieldLabel : '班级',
				mode : 'local',
				readOnly : false,
				triggerAction : 'all',
				store : classStore,
				editable : false,
				valueField : 'valueField',
				displayField : 'displayField'
			});
			
			var p1 = new Ext.form.FormPanel(
					{
						title : "查询学生信息",
						frame : true,
						autoHeight : true,
						//columnWidth: .25,
						layout : "column",
						
						items : [ {
							columnWidth : .2,
							layout : 'form',
							frame : false,
							items : [number]
						} ,{
							columnWidth : .2,
							layout : 'form',
							frame : false,
							items : [name]
						} ,{
							columnWidth : .6,
							layout : 'form',
							frame : false,
							items : [age]
						} ,{
							columnWidth : .2,
							layout : 'form',
							frame : false,
							items : [collegeCombo]
						},{
							columnWidth : .2,
							layout : 'form',
							frame : false,
							items : [classCombo]
						}],
						buttonAlign : 'center',
						buttons : [
								{
									text : '查询',
									handler :onQuery
									
								}, {
									text : '重置',
									handler : function() {
										p1.form.reset();
									}
								} ]
					});
			

			var MyRecord = Ext.data.Record.create([ {
				name : 'id',
				type : 'Number'
			}, {
				name : 'number',
				type : 'String'
			}, {
				name : 'name',
				type : 'String'
			}, {
				name : 'age',
				type : 'int'
			}, {
				name : 'gender',
				type : 'String'
			}, {
				name : 'college',
				type : 'String'
			}, {
				name : 'classes',
				type : 'String'
			}, {
				name : 'post',
				type : 'String'
			} ]);

			

			newp = new Ext.form.FormPanel(
					{
						url:'src/com/extorc/util/servlet?method=add',
						title : "新增学生信息",
						frame : true,
						//autoHeight : true,
						width : 500,
						headerAsText : false,
						border : false, 
						// columnWidth: .25,
						// layout:'column',
						items : [ new Ext.form.TextField({// -----------------------------------------------学号框
							id : "n_number",
							fieldLabel : "学号",
							// width:500,
							allowBlank : false,// 默认是true,如果是false,就是不允许空
							// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
							// 要使提示内容出现，需要添加 Ext.QuickTips.init();
							blankText : "请输入学号!!!",// 为空验证失败提示信息

							emptyText : "请输入学生的学号!"// 空字段中默认显示信息

						}), new Ext.form.TextField({// -------------------------------------------姓名框
							id : "n_name",
							fieldLabel : "姓名",
							allowBlank : false,// 默认是true,如果是false,就是不允许空
							// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
							// 要使提示内容出现，需要添加 Ext.QuickTips.init();
							blankText : "请输入姓名!!!",// 为空验证失败提示信息
						}), new Ext.form.NumberField({// ------------------------------------------年龄框
							id : "n_age",
							fieldLabel : "年龄",
							allowBlank : false,// 默认是true,如果是false,就是不允许空
							// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
							// 要使提示内容出现，需要添加 Ext.QuickTips.init();
							blankText : "请输入年龄!!!",// 为空验证失败提示信息
						}), new Ext.form.RadioGroup({// -------------------------------------------性别单选框
							id : 'n_gender',
							fieldLabel : '性别',
							items : [ {
								name : 'sex',// 名字相同的单选框做为一组
								inputValue : 'm',
								boxLabel : '男',
								checked : true
							}, {
								name : 'sex',
								inputValue : 'f',
								boxLabel : '女'
							} ]
						}), new Ext.form.ComboBox({// ---------------------------------------------学院下拉框
							id : 'n_collegeCombo',
							fieldLabel : '学院',
							mode : 'local',
							readOnly : false,
							triggerAction : 'all',
							editable : false,
							emptyText : '------------请选择学院------------',
							store : collegeStore,
							valueField : 'valueField',
							displayField : 'displayField',
							listeners : {
								'select' : function() {
									Ext.getCmp('classCombo').setValue("");
									classStore.removeAll();
									if (this.getValue() == 'c') {// 这里可以把这个value传到后台，动态获取班级，返回来并load到store里
										classStore.loadData(computer);
									} else if (this.getValue() == 'f') {
										classStore.loadData(foreignlanguage);
									} else if (this.getValue() == 'm') {
										classStore.loadData(machinecar);
									}
								}
							}

						}), new Ext.form.ComboBox({// ---------------------------------------------班级下拉框
							id : 'n_classCombo',
							fieldLabel : '班级',
							mode : 'local',
							readOnly : false,
							triggerAction : 'all',
							store : classStore,
							editable : false,
							valueField : 'valueField',
							displayField : 'displayField'
						}), new Ext.form.CheckboxGroup({// ---------------------------------------职务复选组
							id : 'n_postCheck',
							fieldLabel : '职务',
							items : [ {
								boxLabel : '班长',
								inputValue : '班长'
							}, {
								boxLabel : '团支书',
								inputValue : '团支书'
							}, {
								boxLabel : '生活委员',
								inputValue : '生活委员'
							}, {
								boxLabel : '学习委员',
								inputValue : '学习委员'
							} ]
						}) ],
						buttonAlign : 'center',
						buttons : [
								{
									text : '新增',
									handler :onNew
								}, {
									text : '重置',
									handler : function() {
										newp.form.reset();
									}
								} ]
					});
			
			// 获取复选组的值
			Ext.getCmp('n_postCheck').on('change', function(cbgroup, checked) {
				checkedPost = '';
				for (var i = 0; i < checked.length; i++) {
					checkedPost = checkedPost + ' ' + checked[i].getRawValue();
				}
				// alert(checkedPost);
			});

			newwin = new Ext.Window({
				title : '新增学生信息',
				//width : 476,
				//height : 374,
				//resizable : true,
				modal : true,
				closeAction:"hide",
				items : newp
			});

			modip = new Ext.form.FormPanel(
					{
						title : "修改学生信息",
						frame : true,
						//autoHeight : true,
						width : 500,
						headerAsText : false,
						border : false, 
						// columnWidth: .25,
						// layout:'column',
						items : [ new Ext.form.TextField({// -----------------------------------------------学号框
							id : "m_number",
							fieldLabel : "学号",
							// width:500,
							allowBlank : false,// 默认是true,如果是false,就是不允许空
							// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
							// 要使提示内容出现，需要添加 Ext.QuickTips.init();
							blankText : "请输入学号!!!",// 为空验证失败提示信息
							
							emptyText : "请输入学生的学号!"// 空字段中默认显示信息

						}), new Ext.form.TextField({// -------------------------------------------姓名框
							id : "m_name",
							fieldLabel : "姓名",
							allowBlank : false,// 默认是true,如果是false,就是不允许空
							// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
							// 要使提示内容出现，需要添加 Ext.QuickTips.init();
							blankText : "请输入姓名!!!",// 为空验证失败提示信息
						}), new Ext.form.NumberField({// ------------------------------------------年龄框
							id : "m_age",
							fieldLabel : "年龄",
							allowBlank : false,// 默认是true,如果是false,就是不允许空
							// 假如不为空时，定义提示信息 默认的提示信息是：This field is required
							// 要使提示内容出现，需要添加 Ext.QuickTips.init();
							blankText : "请输入年龄!!!",// 为空验证失败提示信息
						}), new Ext.form.RadioGroup({// -------------------------------------------性别单选框
							id : 'm_gender',
							fieldLabel : '性别',
							items : [ {
								name : 'sex',// 名字相同的单选框做为一组
								inputValue : 'm',
								boxLabel : '男',
								checked : true
							}, {
								name : 'sex',
								inputValue : 'f',
								boxLabel : '女'
							} ]
						}), new Ext.form.ComboBox({// ---------------------------------------------学院下拉框
							id : 'm_collegeCombo',
							fieldLabel : '学院',
							mode : 'local',
							readOnly : false,
							triggerAction : 'all',
							editable : false,
							emptyText : '------------请选择学院------------',
							store : collegeStore,
							valueField : 'valueField',
							displayField : 'displayField',
							listeners : {
								'select' : function() {
									Ext.getCmp('classCombo').setValue("");
									classStore.removeAll();
									if (this.getValue() == 'c') {// 这里可以把这个value传到后台，动态获取班级，返回来并load到store里
										classStore.loadData(computer);
									} else if (this.getValue() == 'f') {
										classStore.loadData(foreignlanguage);
									} else if (this.getValue() == 'm') {
										classStore.loadData(machinecar);
									}
								}
							}

						}), new Ext.form.ComboBox({// ---------------------------------------------班级下拉框
							id : 'm_classCombo',
							fieldLabel : '班级',
							mode : 'local',
							readOnly : false,
							triggerAction : 'all',
							store : classStore,
							editable : false,
							valueField : 'valueField',
							displayField : 'displayField'
						}), new Ext.form.CheckboxGroup({// ---------------------------------------职务复选组
							id : 'm_postCheck',
							fieldLabel : '职务',
							items : [ {
								boxLabel : '班长',
								inputValue : '班长'
							}, {
								boxLabel : '团支书',
								inputValue : '团支书'
							}, {
								boxLabel : '生活委员',
								inputValue : '生活委员'
							}, {
								boxLabel : '学习委员',
								inputValue : '学习委员'
							} ]
						}),new Ext.form.TextField({
							id:'m_id',
							fieldLabel : 'id',
							hidden : true 
						}) ],
						buttonAlign : 'center',
						buttons : [
								{
									text : '修改',
									handler : onModi
								}, {
									text : '重置',
									handler : function() {
										modip.form.reset();
									}
								} ]
					});
			
			// 获取复选组的值
			Ext.getCmp('m_postCheck').on('change', function(cbgroup, checked) {
				mcheckedPost = '';
				for (var i = 0; i < checked.length; i++) {
					mcheckedPost = mcheckedPost + ' ' + checked[i].getRawValue();
				}
				// alert(checkedPost);
			});
			modiwin = new Ext.Window({
				title : '修改学生信息',
				//width : 476,
				//height : 374,
				//resizable : true,
				modal : true,
				closeAction:"hide",
				items : modip
			});

			

			gp = new Ext.grid.EditorGridPanel(
					{
						id : 'egp',
						title : '学生信息',
						sm : selModel,
						// columnWidth: .75,
						clicksToEdit : 1,
						// autoHeight:true,
						height : 290,
						tbar : [
								{
									text : "新增",
									// iconCls: "save",
									handler : function() {
										newwin.show();
										
									}
								},
								'-',
								{
									text:"修改",
									handler:modi
									
								},
								'-',
								{
									text : "删除",
									// iconCls: "refresh",
									handler : onDelete
								} ],
						bbar : new Ext.PagingToolbar({
							pageSize : 5,
							store : jsonstore,
							displayInfo : true,
							displayMsg : '显示{0}-{1}条，共{2}条',
							emptyMsg : "没有数据",
							prevText : "上一页",
							nextText : "下一页",
							refreshText : "刷新",
							lastText : "尾页",
							firstText : "首页",
							beforePageText : "当前页",
							afterPageText : "共{0}页"
						}),
						columns : [
								selModel,
								{
									header : "学号",
									dataIndex : "number",
									editor : new Ext.form.TextField(
									/*
									 * listeners:{
									 *  }
									 */
									)
								},
								{
									header : "姓名",
									dataIndex : "name",
									editor : new Ext.form.TextField({
										allowBlank : false
									})
								},
								{
									header : "年龄",
									dataIndex : "age",
									editor : new Ext.form.NumberField()
								},
								{
									header : "性别",
									dataIndex : "gender",
									renderer : function(value, metaData,
											record, rowIndex, colIndex, store) {
										var idx = sexStore.find("valField",
												value);
										return (idx != "-1") ? sexStore
												.getAt(idx).data.displayText
												: '';
									},// 翻译性别代码
									editor : new Ext.form.ComboBox({
										editable : false,
										valueField : 'valField',
										displayField : 'displayText',
										mode : "local",
										triggerAction : "all",
										store : sexStore
									})
								},
								{
									header : "学院",
									dataIndex : "college",
									renderer : function(value, metaData,
											record, rowIndex, colIndex, store) {
										var idx = collegeStore.find(
												"valueField", value);
										return (idx != "-1") ? collegeStore
												.getAt(idx).data.displayField
												: '';
									},// 翻译学院代码
									editor : new Ext.form.ComboBox({
										editable : false,
										valueField : 'valueField',
										displayField : 'displayField',
										mode : "local",
										triggerAction : "all",
										store : collegeStore
									})
								},
								{
									header : "班级",
									dataIndex : "classes",
									renderer : function(value, metaData,
											record, rowIndex, colIndex, store) {
										var idx = allclassStore.find(
												"valueField", value);
										return (idx != "-1") ? allclassStore
												.getAt(idx).data.displayField
												: '';// 翻译班级代码
										Ext.getCmp('gender').getValue()
												.getGroupValue();

									},
									editor : new Ext.form.ComboBox({
										editable : false,
										valueField : 'valueField',
										displayField : 'displayField',
										mode : "local",
										triggerAction : "all",
										store : classStore
									})
								}, {
									header : "职务",
									dataIndex : "post",
									width : 200,
								/*
								 * editor: new Ext.form.CheckboxGroup({
								 * id:'gppostCheck', //fieldLabel:'职务', items: [{
								 * boxLabel: '班长', inputValue: '班长' }, {
								 * boxLabel: '团支书', inputValue: '团支书' }, {
								 * boxLabel: '生活委员', inputValue: '生活委员' }, {
								 * boxLabel: '学习委员', inputValue: '学习委员' }],
								 * listener:{ 'checked':function(){ alert(); } } })
								 */} ],
						store : jsonstore,
						listeners : {
							'cellclick' : function(grid, rowIndex, columnIndex,
									e) { // 获取鼠标点击的该单元格该行的学院单元格的值
								// editCell_row = rowIndex;
								//editCell_col = columnIndex;  
								var record = grid.getStore().getAt(rowIndex);
								var fieldName = grid.getColumnModel()
										.getDataIndex(5);
								var data = record.get(fieldName);
								if (data == 'c') {//这里可以把这个value传到后台，动态获取班级，返回来并load到store里
									classStore.loadData(computer);
								} else if (data == 'f') {
									classStore.loadData(foreignlanguage);
								} else if (data == 'm') {
									classStore.loadData(machinecar);
								}

								//alert(data);
							},

							'afteredit' : function(obj) {
								if (obj.field == 'number') {
									var gp = Ext.getCmp('egp');
									var rowCount = gp.getStore().getCount();
									//验证学号是否重复
									for (var i = 0; i < rowCount; i++) {
										if (i != obj.row) {
											var record = gp.getStore().getAt(i);
											var fieldName = gp.getColumnModel()
													.getDataIndex(1);
											var data = record.get(fieldName);
											if (obj.value == data) {
												Ext.MessageBox.alert("警告",
														"该学生学号重复，不能修改！");
												obj.record.set('number',
														obj.originalValue);
												return 0;
											}
										}
									}

								}

							}
						}
					});

			var panel = new Ext.Panel({
				renderTo : "test_div",
				title : "EXTJS 基础组件展示",
				//layout : "column",
				items : [ p1, gp ]
			});

		});
