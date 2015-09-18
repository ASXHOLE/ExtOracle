/**
 * 扩展Ext.Window，使其能够覆盖话务机控件
 */
Ext.override(Ext.Window, {
	onRender : function(ct, position) {
		Ext.Window.superclass.onRender.call(this, ct, position);
		if (this.plain) {
			this.el.addClass('x-window-plain');
		}

		// this element allows the Window to be focused for keyboard events
		this.focusEl = this.el.createChild({
					tag : 'a',
					href : '#',
					cls : 'x-dlg-focus',
					tabIndex : '-1',
					html : '&#160;'
				});
		this.focusEl.swallowEvent('click', true);

		this.proxy = this.el.createProxy('x-window-proxy');
		this.proxy.enableDisplayMode('block');

		this.el.setStyle("overflow", "hidden");
		this.iframeLayou = this.el.createChild({
			tag : 'iframe',
			frameborder : "0",
			scrolling : "no",
			style : 'background-color:#CCD8E7;overflow:hidden;position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%; z-index:-1; filter=progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50);'
		});
		if (this.modal) {
			this.mask = this.container.createChild({
						cls : 'ext-el-mask'
					}, this.el.dom);
			this.mask.enableDisplayMode('block');
			this.mask.hide();
			this.mon(this.mask, 'click', this.focus, this);
		}
		if (this.maximizable) {
			this.mon(this.header, 'dblclick', this.toggleMaximize, this);
		}
	}
});
Ext.override(Ext.Window.DD, {
	startDrag : function() {
		var w = this.win;
		this.proxy = w.ghost(w.initialConfig.cls);
		if (w.constrain !== false) {
			var so = w.el.shadowOffset;
			this.constrainTo(w.container, {
						right : so,
						left : so,
						bottom : so
					});
		} else if (w.constrainHeader !== false) {
			var s = this.proxy.getSize();
			this.constrainTo(w.container, {
						right : -(s.width - this.headerOffsets[0]),
						bottom : -(s.height - this.headerOffsets[1])
					});
		}
		this.proxy.createChild({
			tag : 'iframe',
			frameborder : "0",
			scrolling : "no",
			style : "background-color:#CCD8E7;overflow:hidden;position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%;z-index:-1;"
		});
		this.proxy.setStyle("overflow", "hidden");
	}
});