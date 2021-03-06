;;
/**
 *  业务的交互代码
 */

var base;

(function() {

	base = {
		init: function() {
			var that = this;

			that._cacheParam()
				._initcharts()

			return that;
		},

		// 存储相应的变量
		_cacheParam: function() {
			var that = this;

			that._$users_module = $('#users_module').html();
			that._$users_button = $('#users_button').html();
			that._$conventionalScan_module = $('#conventionalScan_module').html();
			that._$conventionalScan_button = $('#conventionalScan_button').html();
			that._$vulscanPlugins_module = $('#vulscanPlugins_module').html();
			that._$vulscanPlugins_button = $('#vulscanPlugins_button').html();

			return that;
		},

		// 初始化图表类页面
		_initcharts: function()
		{
			var that = this;
			// 网站漏洞扫描 - 常规漏洞扫描 - 风险类型统计
			smarttang.createHcharts({
				type: 'pie',
				DomName: 'conventionalScan_levelcount',
				dataName: '风险类型统计',
				dataSource: [
					['高危',193],
					['中危',291],
					['低危',21]
				]
			});

			// 网站漏洞扫描 - 常规漏洞扫描 - 风险级别统计
			smarttang.createHcharts({
				type: 'column',
				DomName: 'conventionalScan_typecount',
				dataSource: [
					['SQL注入漏洞',19],
					['XSS跨站脚本攻击',291],
					['CSRF跨站请求伪造',211],
					['LFI本地文件包含',821],
					['RFI远程文件包含',11]
				]
			})
			return that;
		},

		// 用户(添加视图)
		userAdd_view: function()
		{
			var that = this;

	        alerts.modal({
	            title: '添加用户',
	            status: 'small',
	            body: that._$users_module,
	            bottom: that._$users_button
	        });

	        return that;
		},

		// 用户(添加数据)
		userAdd_data: function()
		{
			var that = this;

			var formData = huineng.getFormData($('.modal-body .form-horizontal'));

			myajax.post({
				remoteurl: SYSTEM,
				parames: $.extend(formData,{'jump':'users','obj':'add'}),
				success:function(msg){
					if (msg['status'] == 1){
						$('.modal').modal('hide');
						toastr.success('添加用户成功!');
						table_obj.ajax.reload();
					}else{
						toastr.error('添加用户失败! 状态号: '+msg['status']);
					}
				}
			});

	        return that;
		},

		// 用户操作行为(删除、状态切换)
		userOperat_data: function(id,jobs)
		{
			var that = this;

			myajax.post({
				remoteurl: SYSTEM,
				parames: {'jump':'users','id':id,'obj':jobs},
				success:function(msg){
					if (msg['status'] == 1){
						toastr.success('用户操作成功!');
						table_obj.ajax.reload();
					}else{
						toastr.error('用户操作失败! 状态号: '+msg['status']);
					}
				}
			});

	        return that;
		},

		// 添加网站扫描任务(常规扫描)
		webscanConventAdd_view: function()
		{
			var that = this;

	        alerts.modal({
	            title: '添加网站扫描',
	            status: 'small',
	            body: that._$conventionalScan_module,
	            bottom: that._$conventionalScan_button
	        });

	        return that;
		},

		// 添加扫描插件
		vulscanPluginsAdd_view: function()
		{
			var that = this;

	        alerts.modal({
	            title: '添加扫描插件',
	            status: 'small',
	            body: that._$vulscanPlugins_module,
	            bottom: that._$vulscanPlugins_button
	        });

			// 添加上传属性
			$(".modal-body .filestyle")
						.attr('type','file')
						.filestyle({'buttonText':'选择插件'});

	        return that;
		}

	};

    $(function() {
        base.init();
    });
})(this, jQuery);