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
