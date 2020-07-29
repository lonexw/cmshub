(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63f16db1"],{"0003":function(e,t,a){},"1a70":function(e,t,a){"use strict";var i=a("0003"),n=a.n(i);n.a},4087:function(e,t){var a={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userProjects"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userProjects"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userCreateProject"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"description"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCreateProject"},arguments:[{kind:"Argument",name:{kind:"Name",value:"data"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"ObjectField",name:{kind:"Name",value:"name"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}},{kind:"ObjectField",name:{kind:"Name",value:"description"},value:{kind:"Variable",name:{kind:"Name",value:"description"}}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userUpdateProject"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NamedType",name:{kind:"Name",value:"ID"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"name"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"description"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userUpdateProject"},arguments:[{kind:"Argument",name:{kind:"Name",value:"data"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}},{kind:"ObjectField",name:{kind:"Name",value:"name"},value:{kind:"Variable",name:{kind:"Name",value:"name"}}},{kind:"ObjectField",name:{kind:"Name",value:"description"},value:{kind:"Variable",name:{kind:"Name",value:"description"}}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:495}};a.loc.source={body:"query userProjects {\n  userProjects {\n    id,\n    name,\n    description\n  }\n}\n\nmutation userCreateProject($id: ID, $name: String!, $description: String) {\n  userCreateProject(data: {\n    id: $id,\n    name: $name,\n    description: $description\n  }) {\n    description,\n    name,\n    id\n  }\n}\n\nmutation userUpdateProject($id: ID, $name: String!, $description: String) {\n  userUpdateProject (data: {\n    id: $id,\n    name: $name,\n    description: $description\n  }) {\n    id, name, description\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};function i(e,t){if("FragmentSpread"===e.kind)t.add(e.name.value);else if("VariableDefinition"===e.kind){var a=e.type;"NamedType"===a.kind&&t.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){i(e,t)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){i(e,t)})),e.definitions&&e.definitions.forEach((function(e){i(e,t)}))}var n={};function r(e,t){for(var a=0;a<e.definitions.length;a++){var i=e.definitions[a];if(i.name&&i.name.value==t)return i}}function o(e,t){var a={kind:e.kind,definitions:[r(e,t)]};e.hasOwnProperty("loc")&&(a.loc=e.loc);var i=n[t]||new Set,o=new Set,s=new Set;i.forEach((function(e){s.add(e)}));while(s.size>0){var d=s;s=new Set,d.forEach((function(e){if(!o.has(e)){o.add(e);var t=n[e]||new Set;t.forEach((function(e){s.add(e)}))}}))}return o.forEach((function(t){var i=r(e,t);i&&a.definitions.push(i)})),a}(function(){a.definitions.forEach((function(e){if(e.name){var t=new Set;i(e,t),n[e.name.value]=t}}))})(),e.exports=a,e.exports["userProjects"]=o(a,"userProjects"),e.exports["userCreateProject"]=o(a,"userCreateProject"),e.exports["userUpdateProject"]=o(a,"userUpdateProject")},"4ee0":function(e,t,a){},"6bd0":function(e,t,a){},"7b3c":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("header",{staticClass:"project-header text-center text-xxxxl padding-xxs text-black"},[i("logo")],1),i("div",{staticClass:"project-body"},[e.is_create?i("project-create",{attrs:{"form-data":e.formData},on:{cancel:e.cancelCreate}}):i("project-list",{on:{create:e.create,update:e.update}})],1),i("footer",{staticClass:"solid-top padding-xxs project-footer"},[i("a-popover",{attrs:{placement:"topLeft"}},[i("template",{slot:"content"},[i("div",[i("a-button",{attrs:{type:"link"},on:{click:function(t){e.updatePwdVisible=!0}}},[i("a-icon",{attrs:{type:"edit"}}),e._v("修改密码")],1)],1),i("div",[i("a-button",{attrs:{type:"link"},on:{click:e.logout}},[i("a-icon",{attrs:{type:"logout"}}),e._v("退出")],1)],1)]),i("img",{staticClass:"margin-left round pointer",attrs:{src:a("9b19"),width:"40px"}})],2)],1),i("a-modal",{attrs:{title:"修改密码"},on:{ok:e.updatePwdSubmit},model:{value:e.updatePwdVisible,callback:function(t){e.updatePwdVisible=t},expression:"updatePwdVisible"}},[i("a-form-model",{attrs:{model:e.formPwd,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[i("a-form-model-item",{attrs:{label:"原密码"}},[i("a-input",{attrs:{type:"password"},model:{value:e.formPwd.old_password,callback:function(t){e.$set(e.formPwd,"old_password",t)},expression:"formPwd.old_password"}})],1),i("a-form-model-item",{attrs:{label:"新密码"}},[i("a-input",{attrs:{type:"password"},model:{value:e.formPwd.password,callback:function(t){e.$set(e.formPwd,"password",t)},expression:"formPwd.password"}})],1),i("a-form-model-item",{attrs:{label:"确认密码"}},[i("a-input",{attrs:{type:"password"},model:{value:e.formPwd.password_confirmation,callback:function(t){e.$set(e.formPwd,"password_confirmation",t)},expression:"formPwd.password_confirmation"}})],1)],1)],1)],1)},n=[],r=(a("d3b7"),a("5530")),o=a("1101"),s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"logo"},[i("router-link",{attrs:{to:{name:"Index"}}},[i("img",{attrs:{src:a("9b19")}}),e.showTitle?i("h1",[e._v(e._s(e.title))]):e._e()])],1)},d=[],c={name:"Logo",components:{},props:{title:{type:String,default:"CMS Hub",required:!1},showTitle:{type:Boolean,default:!0,required:!1}}},l=c,u=a("2877"),m=Object(u["a"])(l,s,d,!1,null,null,null),f=m.exports,p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",{staticClass:"text-lg margin-bottom"},[e._v("我的项目")]),a("div",{staticClass:"flex flex-wrap"},[e._l(e.list,(function(t,i){return[a("a-dropdown",{key:i},[a("div",{key:i,staticClass:"project",on:{click:function(a){return e.goSchema(t)}}},[a("div",{staticClass:"icon"},[e._v(e._s(t.name))]),a("div",{staticClass:"margin-top text-bold text-black"},[e._v(e._s(t.name))])]),a("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[a("a-menu-item",[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return e.update(t)}}},[e._v("编辑")])])],1)],1)]})),a("div",{staticClass:"project",on:{click:e.create}},[a("a-icon",{staticClass:"add-icon",attrs:{type:"plus-circle"}}),a("div",{staticClass:"margin-top text-bold text-black"},[e._v("创建新项目")])],1)],2)])},v=[],k=a("4087"),b=a("ca00"),h=a("4360"),g={components:{},data:function(){return{list:[]}},created:function(){this.getList()},methods:{create:function(){this.$emit("create")},update:function(e){this.$emit("update",e)},goSchema:function(e){var t=this;h["a"].dispatch("SetCurrentProject",e).then((function(){t.$router.push({name:"Content"})}))},getList:function(){var e=this,t=this;t.$apollo.query({query:k["userProjects"],variables:{},fetchPolicy:"no-cache"}).then((function(e){t.list=e.data.userProjects})).catch((function(t){e.$message.warning(Object(b["a"])(t.message))}))}}},w=g,y=(a("da3d"),Object(u["a"])(w,p,v,!1,null,"5842cb68",null)),S=y.exports,j=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",{staticClass:"text-lg margin-bottom"},[e._v("创建新项目")]),a("a-form",{attrs:{form:e.form},on:{submit:e.handleSubmit}},[a("a-row",{attrs:{gutter:32}},[a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"项目名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{initialValue:e.formData?e.formData.name:"",rules:[{required:!0,message:"请输入项目名称"}]}],expression:"[\n              'name',\n              {\n                initialValue: formData ? formData.name : '',\n                rules: [{ required: true, message: '请输入项目名称' }]\n              }\n            ]"}],attrs:{size:"large"}})],1)],1),a("a-col",{attrs:{span:12}},[a("a-form-item",{attrs:{label:"项目描述"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["description",{initialValue:e.formData?e.formData.description:"",rules:[{required:!1,message:"请输入项目描述"}]}],expression:"[\n              'description',\n              {\n                initialValue: formData ? formData.description : '',\n                rules: [{ required: false, message: '请输入项目描述' }]\n              }\n            ]"}],attrs:{size:"large"}})],1)],1)],1),a("div",{staticClass:"flex justify-center margin-top"},[a("a-button",{staticClass:"margin-right",attrs:{type:"link",loading:e.submit_loading},on:{click:e.cancel}},[e._v("取消")]),a("a-button",{attrs:{type:"primary","html-type":"submit",loading:e.submit_loading}},[e._v(" "+e._s(e.formData&&e.formData.id>0?"保存":"创建")+" ")])],1)],1)],1)},N=[],P=(a("a4d3"),a("e01a"),a("b0c0"),{components:{},props:{formData:{type:Object,default:function(){return{}}}},data:function(){return{form:this.$form.createForm(this),submit_loading:!1}},created:function(){},methods:{cancel:function(){this.$emit("cancel")},goSchema:function(){this.$router.push({name:"Schema"})},handleSubmit:function(e){var t=this;e.preventDefault();var a=this;this.form.validateFields((function(e,i){e||a.$apollo.mutate({mutation:a.formData&&a.formData.id>0?k["userUpdateProject"]:k["userCreateProject"],variables:{id:a.formData&&a.formData.id>0?a.formData.id:"",name:i.name,description:i.description},fetchPolicy:"no-cache"}).then((function(e){h["a"].dispatch("SetCurrentProject",a.formData&&a.formData.id>0?e.data.userUpdateProject:e.data.userCreateProject).then((function(){t.$router.push({name:"Schema"})})),t.goSchema()})).catch((function(e){t.$message.warning(Object(b["a"])(e.message))}))}))}}}),D=P,_=(a("c0da"),Object(u["a"])(D,j,N,!1,null,"6a28bfa4",null)),$=_.exports,x=a("2f62"),C=a("9408"),V=a("f5b5"),O={components:{Logo:f,ProjectList:S,ProjectCreate:$},data:function(){return{labelCol:{span:4},wrapperCol:{span:14},domTitle:o["a"],is_create:!1,updatePwdVisible:!1,formData:{},formPwd:{}}},created:function(){},methods:Object(r["a"])({},Object(x["b"])(["Logout"]),{create:function(){this.formData={},this.is_create=!0},update:function(e){this.formData=e,this.is_create=!0},cancelCreate:function(){this.is_create=!1},logout:function(){var e=this;this.$confirm({title:"确认退出吗？",confirmLoading:!0,onOk:function(){e.$apollo.query({query:C["userLogout"],variables:{}}).finally((function(){e.Logout({}).finally((function(){setTimeout((function(){window.location.reload()}),16)}))}))}})},updatePwdSubmit:function(){var e=this,t=this;t.$apollo.mutate({mutation:V["userUpdatePwd"],variables:{data:t.formPwd},fetchPolicy:"no-cache"}).then((function(){e.$message.success("保存成功"),t.formPwd={}})).catch((function(t){e.$message.warning(Object(b["a"])(t.message))}))}})},F=O,q=(a("1a70"),a("af6a"),Object(u["a"])(F,i,n,!1,null,"077c7400",null));t["default"]=q.exports},af6a:function(e,t,a){"use strict";var i=a("bbe2"),n=a.n(i);n.a},bbe2:function(e,t,a){},c0da:function(e,t,a){"use strict";var i=a("4ee0"),n=a.n(i);n.a},ca00:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));a("ac1f"),a("5319");function i(e){return e.replace(/GraphQL error:/,"")}},da3d:function(e,t,a){"use strict";var i=a("6bd0"),n=a.n(i);n.a},e01a:function(e,t,a){"use strict";var i=a("23e7"),n=a("83ab"),r=a("da84"),o=a("5135"),s=a("861d"),d=a("9bf2").f,c=a("e893"),l=r.Symbol;if(n&&"function"==typeof l&&(!("description"in l.prototype)||void 0!==l().description)){var u={},m=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof m?new l(e):void 0===e?l():l(e);return""===e&&(u[t]=!0),t};c(m,l);var f=m.prototype=l.prototype;f.constructor=m;var p=f.toString,v="Symbol(test)"==String(l("test")),k=/^Symbol\((.*)\)[^)]+$/;d(f,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,t=p.call(e);if(o(u,e))return"";var a=v?t.slice(7,-1):t.replace(k,"$1");return""===a?void 0:a}}),i({global:!0,forced:!0},{Symbol:m})}}}]);