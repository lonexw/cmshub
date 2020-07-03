(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28f5bf99"],{"1c4b":function(t,e,s){},"4a8a":function(t,e,s){},"6428a":function(t,e,s){"use strict";var a=s("6dd7"),i=s.n(a);i.a},"6dd7":function(t,e,s){},"78b2":function(t,e,s){"use strict";var a=s("4a8a"),i=s.n(a);i.a},"8f7f":function(t,e,s){"use strict";var a=s("1c4b"),i=s.n(a);i.a},b619:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("base-page",{attrs:{title:"模型"},scopedSlots:t._u([{key:"sider",fn:function(){return[s("div",{staticClass:"flex justify-between align-center"},[s("bg-tag",{attrs:{toggle:!0,toggleDirection:t.toggleDirection},nativeOn:{click:function(e){return t.toggleModels(e)}}},[t._v("Models")]),s("bg-tag",{staticClass:"text-blue text-sm",nativeOn:{click:function(e){return t.showCreate(e)}}},[s("a-icon",{attrs:{type:"plus"}}),t._v(" 添加")],1)],1),s("div",{ref:"models",class:(t.show_models?"":"hidden")+" margin-top-xs models"},[s("bg-tag",{staticClass:"flex align-center margin-left-xs text-black",attrs:{active:!0}},[t._v(" Asset "),s("span",{staticClass:"tag bg-gray margin-left-xs"},[t._v("system")])])],1)]},proxy:!0},{key:"content",fn:function(){return[t.init?s("div",{staticClass:"text-center",staticStyle:{"margin-top":"200px"}},[s("h1",{staticClass:"text-xxxl"},[t._v("开启项目")]),s("h1",{staticClass:"text-xxxl"},[t._v("创建第一个 Model")]),s("a-button",{attrs:{type:"primary",size:"large"},on:{click:t.showCreate}},[s("a-icon",{attrs:{type:"plus"}}),t._v("创建 Model")],1)],1):s("detail-model",{attrs:{visible:t.show_create}}),s("update-model",{attrs:{visible:t.show_create},on:{cancel:t.cancelCreate}})]},proxy:!0}])})},i=[],n=s("2af9"),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("a-modal",{attrs:{title:"创建 Model",visible:t.visible,footer:null,maskClosable:!1},on:{cancel:t.cancel}},[s("a-form-model",{ref:"createForm",attrs:{layout:"vertical",model:t.form,rules:t.rules}},[s("a-form-model-item",{attrs:{label:"展示名称",prop:"zh_name"}},[s("div",{staticClass:"text-sm text-gray margin-bottom-xs"},[t._v(" 项目中将展示这个名称（中文、字母、数字、下划线） ")]),s("a-input",{attrs:{placeholder:"请输入展示名称"},model:{value:t.form.zh_name,callback:function(e){t.$set(t.form,"zh_name",e)},expression:"form.zh_name"}})],1),s("a-form-model-item",{attrs:{label:"API ID",prop:"name"}},[s("div",{staticClass:"text-sm text-gray margin-bottom-xs"},[t._v(" 用于通过 API 访问此模型的 ID（字母、数字、下划线，字母开头） ")]),s("a-input",{attrs:{placeholder:"请输入 API ID"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),s("a-form-model-item",{attrs:{label:"API ID 复数形式",prop:"plural_name"}},[s("div",{staticClass:"text-sm text-gray margin-bottom-xs"},[t._v(" API ID 复数形式（字母、数字、下划线，字母开头） ")]),s("a-input",{attrs:{placeholder:"API ID 复数形式"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),s("a-form-model-item",{attrs:{label:"描述",prop:"description"}},[s("a-input",{attrs:{type:"textarea",placeholder:"请输入描述"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),s("a-form-model-item",{staticClass:"text-right",staticStyle:{"margin-bottom":"0"}},[s("a-button",{staticClass:"margin-right-sm",on:{click:t.cancel}},[t._v(" 取消 ")]),s("a-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v(" 确认 ")])],1)],1)],1)],1)},r=[],l={name:"UpdateModel",props:{visible:{type:Boolean,required:!0}},components:{},data:function(){return{form:{},rules:{zh_name:[{required:!0,message:"请输入展示名称",trigger:"blur"}],name:[{required:!0,message:"请输入 API ID",trigger:"blur"}],plural_name:[{required:!0,message:"请输入 API ID 的复数形式",trigger:"blur"}]}}},computed:{},mounted:function(){},methods:{cancel:function(){this.$emit("cancel")},submit:function(){this.$refs.createForm.validate((function(t){if(!t)return console.log("error submit!!"),!1;alert("submit!")}))}}},c=l,m=s("2877"),d=Object(m["a"])(c,o,r,!1,null,"12ab29aa",null),u=d.exports,f=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a-layout",{staticClass:"layout"},[s("a-layout",{staticStyle:{"background-color":"white","margin-right":"240px"}},[s("a-layout-content",[s("div",{staticClass:"model-body padding-lr-sm"},[s("header",{staticClass:"flex justify-between margin-bottom-xs"},[s("div",{staticClass:"flex align-end"},[s("span",{staticClass:"zh-name"},[t._v("管理员")]),s("span",{staticClass:"name"},[t._v("#Admin")]),s("a-dropdown",[s("a",{staticClass:"ant-dropdown-link",on:{click:function(t){return t.preventDefault()}}},[s("bg-tag",[s("a-icon",{staticClass:"options",attrs:{type:"ellipsis"}})],1)],1),s("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[s("a-menu-item",[s("a",{attrs:{href:"javascript:;"}},[s("a-icon",{staticClass:"margin-right-xs",attrs:{type:"edit"}}),t._v("编辑 Model")],1)]),s("a-menu-item",[s("a",{attrs:{href:"javascript:;"}},[s("a-icon",{staticClass:"margin-right-xs",attrs:{type:"delete"}}),t._v("删除 Model")],1)])],1)],1)],1),s("bg-tag",[s("div",{staticClass:"text-blue pointer"},[s("a-icon",{staticClass:"margin-right-xs",attrs:{type:"form"}}),t._v("添加内容")],1)])],1),s("div",{staticClass:"text-sm text-grey margin-bottom-xs"},[t._v("描述")]),s("div",{staticClass:"margin-bottom-xs"},[s("a-switch",{staticClass:"margin-right-xs",attrs:{size:"small"}}),s("span",{staticClass:"text-sm"},[t._v("显示系统字段")])],1),s("a-empty",{staticStyle:{"margin-top":"150px"},attrs:{description:"点击右侧 新增字段"}})],1)])],1),s("a-layout-sider",{staticClass:"right-sider sider light",style:{overflow:"auto",height:"100vh",position:"fixed",right:0}},[s("fields")],1)],1)},g=[],p=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},h=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"padding-xs"},[s("div",{staticClass:"text-grey margin-bottom-xs"},[t._v("字符串")]),s("div",{staticClass:"field flex align-center pointer margin-bottom-xs solid line-grey shadow text-ssm",attrs:{onselectstart:"return false;"}},[s("div",{staticClass:"text-icon"},[t._v("单")]),s("div",{staticClass:"name margin-left-xs"},[t._v("单行文本")])]),s("div",{staticClass:"text-grey margin-bottom-xs"},[t._v("富文本")]),s("div",{staticClass:"field flex align-center pointer margin-bottom-xs solid line-grey shadow text-ssm",attrs:{onselectstart:"return false;"}},[s("div",{staticClass:"text-icon"},[t._v("百")]),s("div",{staticClass:"name margin-left-xs"},[t._v("百度编辑器")])])])}],v={name:"Fields",props:{},components:{},data:function(){return{}},computed:{},mounted:function(){},methods:{}},x=v,b=(s("6428a"),Object(m["a"])(x,p,h,!1,null,"2beb58fb",null)),_=b.exports,y={name:"DetailModel",props:{visible:{type:Boolean,required:!0}},components:{BgTag:n["d"],Fields:_},data:function(){return{}},computed:{},mounted:function(){},methods:{cancel:function(){},submit:function(){}}},C=y,w=(s("78b2"),Object(m["a"])(C,f,g,!1,null,"7c0c6094",null)),k=w.exports,I={components:{BasePage:n["b"],BgTag:n["d"],UpdateModel:u,DetailModel:k},data:function(){return{init:!1,show_models:!0,show_create:!1,models_height:"0px"}},computed:{toggleDirection:function(){return this.show_models?"down":"right"}},mounted:function(){this.models_height=this.$refs.models.offsetHeight+"px",this.$refs.models.style.height=this.models_height},methods:{toggleModels:function(){this.show_models=!this.show_models,this.$refs.models.style.height=this.show_models?this.models_height:"0px"},showCreate:function(){this.show_create=!0},cancelCreate:function(){this.show_create=!1}}},D=I,$=(s("8f7f"),Object(m["a"])(D,a,i,!1,null,"3cce9896",null));e["default"]=$.exports}}]);
//# sourceMappingURL=chunk-28f5bf99.65d02538.js.map