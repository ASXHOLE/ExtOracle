onQuery=function(){
	/*Ext.apply(jsonstore.baseParams,{
		start : 0,
		limit : 5,
		"number":Ext.getCmp('number').getValue(),
		name:Ext.getCmp('name').getValue(),
		age:Ext.getCmp('age').getValue(),
		collegeCombo:Ext.getCmp('collegeCombo').getValue(),
		classCombo:Ext.getCmp('classCombo').getValue()
	});*/
	jsonstore.baseParams = {
			start : 0,
			limit : 5,
			number:Ext.getCmp('number').getValue(),
			name:Ext.getCmp('name').getValue(),
			age:Ext.getCmp('age').getValue(),
			collegeCombo:Ext.getCmp('collegeCombo').getValue(),
			classCombo:Ext.getCmp('classCombo').getValue()
		}
	jsonstore.load();
};

onNew= function() {
	if(Ext.getCmp('n_number').getValue()==""||Ext.getCmp('n_name').getValue()==""||Ext.getCmp('n_age').getValue()==""){
		Ext.Msg.alert('警告',"学号，姓名，年龄不能为空");  
	}else{
    Ext.Ajax.request({  
        url:'src/com/extorc/util/servlet?method=add',  
        method:'POST',  
        waitMsg:"正在提交表单数据，请稍候。。。。。。",
        params:{id: '',
			number : Ext.getCmp(
					'n_number')
					.getValue(),
			name : Ext.getCmp('n_name')
					.getValue(),
			age : Ext.getCmp('n_age')
					.getValue(),
			gender : Ext.getCmp(
					'n_gender')
					.getValue()
					.getGroupValue(),
			college : Ext.getCmp(
					'n_collegeCombo')
					.getValue(),
			classes : Ext.getCmp(
					'n_classCombo')
					.getValue(),
			post : checkedPost},  
        success:function(form,action){  
	        var obj = Ext.util.JSON.decode(form.responseText);  
        	if(obj.success==true)  
	        {   
	        	Ext.Msg.alert('提示',obj.msg);  
	        	jsonstore.baseParams = {
						start : 0,
						limit : 5,
						number:Ext.getCmp('number').getValue(),
						name : Ext.getCmp('name').getValue(),
						age : Ext.getCmp('age').getValue(),
						collegeCombo : Ext.getCmp('collegeCombo').getValue(),
						classCombo : Ext.getCmp('classCombo').getValue()
					}
	        	jsonstore.reload();  
	        	
	        	newp.form.reset();
				newwin.hide();
	        }  
	        else  
	        {  
	        	Ext.Msg.alert('提示',obj.msg);  
	        }  
        },  
        failure:function(form,action){  
        	//var text=eval("("+form.responseText+")");
        	Ext.Msg.alert('警告','系统错误');  
        }  
        });  
}
};

onModi=function() {
	if(Ext.getCmp('m_number').getValue()==""||Ext.getCmp('m_name').getValue()==""||Ext.getCmp('m_age').getValue()==""){
		Ext.Msg.alert('警告',"学号，姓名，年龄不能为空");  
	}else{
		var m=Ext.getCmp('m_number').getValue();
    Ext.Ajax.request({  
        url:'src/com/extorc/util/servlet?method=modi',  
        method:'POST',  
        waitMsg:"正在提交表单数据，请稍候。。。。。。",
        params:{id: Ext.getCmp('m_id').getValue(),
			number : Ext.getCmp(
					'm_number')
					.getValue(),
			name : Ext.getCmp('m_name')
					.getValue(),
			age : Ext.getCmp('m_age')
					.getValue(),
			gender : Ext.getCmp(
					'm_gender')
					.getValue()
					.getGroupValue(),
			college : Ext.getCmp(
					'm_collegeCombo')
					.getValue(),
			classes : Ext.getCmp(
					'm_classCombo')
					.getValue(),
			post : mcheckedPost},  
        success:function(form,action){  
	        var obj = Ext.util.JSON.decode(form.responseText);  
        	if(obj.success==true)  
	        {   
	        	Ext.Msg.alert('提示',obj.msg);  
	        	jsonstore.baseParams = {
						start : 0,
						limit : 5,
						id:Ext.getCmp('m_id').getValue(),
						number:Ext.getCmp('number').getValue(),
						name : Ext.getCmp('name').getValue(),
						age : Ext.getCmp('age').getValue(),
						collegeCombo : Ext.getCmp('collegeCombo').getValue(),
						classCombo : Ext.getCmp('classCombo').getValue()
					}
	        	jsonstore.reload();  
	        	
	        	modip.form.reset();
				modiwin.hide();
	        }  
	        else  
	        {  
	        	Ext.Msg.alert('提示',obj.msg);  
	        }  
        },  
        failure:function(form,action){  
        	//var text=eval("("+form.responseText+")");
        	Ext.Msg.alert('警告','系统错误');  
        }  
        });  
	}
};

modi=function(){
	if (selModel.getSelections().length !=1) {
		Ext.MessageBox.alert('系统提示',
				'请选择一条数据');
		return;
	} else {
		modiwin.show();
		var recs = gp.getSelectionModel().getSelections();
		var id=recs[0].id;
		modistore.baseParams = {
				start : 0,
				limit : 5,
				id:id
			}
		modistore.load(	{
				callback:function(){
					Ext.getCmp('m_number').setValue(modistore.getAt(0).get('number'));
					Ext.getCmp('m_name').setValue(modistore.getAt(0).get('name'));
					Ext.getCmp('m_age').setValue(modistore.getAt(0).get('age'));
					Ext.getCmp('m_gender').setValue(modistore.getAt(0).get('gender'));
					Ext.getCmp('m_collegeCombo').setValue(modistore.getAt(0).get('college'));
					Ext.getCmp('m_id').setValue(modistore.getAt(0).get('id'));
					if (modistore.getAt(0).get('college') == 'c') {
						classStore.loadData(computer);
					} else if (modistore.getAt(0).get('college') == 'f') {
						classStore.loadData(foreignlanguage);
					} else if (modistore.getAt(0).get('college') == 'm') {
						classStore.loadData(machinecar);
					}
					Ext.getCmp('m_classCombo').setValue(modistore.getAt(0).get('classes'));
					
				}
		});
		
	}
};

onDelete=function() {
	if (selModel.getSelections().length < 1) {
		Ext.MessageBox.alert('系统提示',
				'请至少选择一条数据');
		return;
	} else {
		Ext.MessageBox
				.confirm(
						'确认操作',
						'<span style="font-size:16px;color:#ff0000">警告</span> : 该操作将会删除选中的用户相关信息，且操作无法恢复。<br/>确定要继续吗？',
						function(v) {
							if (v == 'yes') {
								var recs = gp.getSelectionModel().getSelections();
								Ext.each(recs,
												function(item) {
													//alert(item.id);
													 Ext.Ajax.request({  
													        url:'src/com/extorc/util/servlet?method=delete',  
													        method:'POST',  
													        waitMsg:"正在提交数据，请稍候。。。。。。",
													        params:{id: item.id,
													        	
																},  
													        success:function(form,action){  
														        var obj = Ext.util.JSON.decode(form.responseText);  
													        	if(obj.success==true)  
														        {   
														        	Ext.Msg.alert('提示',obj.msg);  
														        	jsonstore.baseParams = {
																			start : 0,
																			limit : 5,
																			"number":Ext.getCmp('number').getValue(),
																			name:Ext.getCmp('name').getValue(),
																			age:Ext.getCmp('age').getValue(),
																			collegeCombo:Ext.getCmp('collegeCombo').getValue(),
																			classCombo:Ext.getCmp('classCombo').getValue()
																		}
														        	jsonstore.reload();  
														        	
														        }  
														        else  
														        {  
														        	Ext.Msg.alert('提示',obj.msg);  
														        }  
													        },  
													        failure:function(form,action){  
													        	//var text=eval("("+form.responseText+")");
													        	Ext.Msg.alert('警告','系统错误');  
													        }  
													        });  
												});
							}
							// Ext.getCmp('gp').getView().refresh();

						}, this);
	}
};
