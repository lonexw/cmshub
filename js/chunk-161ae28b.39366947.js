(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-161ae28b"],{1662:function(e,n,i){"use strict";i.r(n);var a=function(){var e=this,n=e.$createElement,i=e._self._c||n;return i("div",{staticClass:"main"},[i("a-card",{attrs:{title:"接口信息"}},[i("div",{on:{click:function(n){return n.preventDefault(),e.copyDocumentUrl(n)}}},[e._v("接口文档地址："),i("a-input",{attrs:{disabled:""},model:{value:e.form.document_url,callback:function(n){e.$set(e.form,"document_url",n)},expression:"form.document_url"}})],1),i("div",{on:{click:function(n){return n.preventDefault(),e.copyApiUrl(n)}}},[e._v("接口对接地址："),i("a-input",{attrs:{disabled:""},model:{value:e.form.api_url,callback:function(n){e.$set(e.form,"api_url",n)},expression:"form.api_url"}})],1)]),i("a-card",{staticStyle:{"margin-top":"20px"},attrs:{title:"token管理"}},[i("a-button",{attrs:{type:"primary"},on:{click:e.createToken}},[e._v(" 创建token ")]),i("a-table",{attrs:{size:"middle",rowKey:"id",columns:e.columns,dataSource:e.data,loading:e.loading,pagination:!1,locale:{emptyText:"暂无数据"},scroll:e.columns.length>5?{x:2e3}:{x:100}},scopedSlots:e._u([{key:"scopes",fn:function(n){return[n.includes("OPEN")?i("span",[e._v(" 开放 ")]):i("span",[n.includes("QUERY")?i("span",[e._v(" 查询 ")]):e._e(),n.includes("MUTATION")?i("span",[e._v(" 增删改 ")]):e._e()])]}},{key:"action",fn:function(n,a){return[i("a",{attrs:{href:"javascript:;"},on:{click:function(n){return e.edit(a)}}},[e._v("编辑")]),e._v(" | "),i("a",{attrs:{href:"javascript:;"},on:{click:function(n){return e.remove(a)}}},[e._v("删除")])]}}])})],1),i("a-card",{staticStyle:{"margin-top":"20px"},attrs:{title:"语言管理"}},[i("a-button",{attrs:{type:"primary"},on:{click:e.createLanguage}},[e._v(" 创建语言 ")]),i("a-table",{attrs:{size:"middle",rowKey:"id",columns:e.languageColumns,dataSource:e.languageData,loading:e.loading,pagination:!1,locale:{emptyText:"暂无数据"},scroll:e.columns.length>5?{x:2e3}:{x:100}},scopedSlots:e._u([{key:"language",fn:function(n){return[1===n.is_default?i("span",[e._v(" 是 ")]):e._e(),0===n.is_default?i("span",[e._v(" 否 ")]):e._e()]}},{key:"action",fn:function(n,a){return[i("a",{attrs:{href:"javascript:;"},on:{click:function(n){return e.removeLanguage(a)}}},[e._v("移除")])]}}])})],1),i("a-modal",{attrs:{title:e.tokenForm&&e.tokenForm.id?"编辑token":"创建token"},on:{ok:e.submitToken},model:{value:e.tokenFormVisible,callback:function(n){e.tokenFormVisible=n},expression:"tokenFormVisible"}},[i("a-form-model",{attrs:{model:e.tokenForm,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[i("a-form-model-item",{attrs:{label:"token"}},[i("a-input",{model:{value:e.tokenForm.token,callback:function(n){e.$set(e.tokenForm,"token",n)},expression:"tokenForm.token"}}),i("a-button",{attrs:{type:"primary"},on:{click:e.randToken}},[e._v(" 生成token ")])],1),i("a-form-model-item",{attrs:{label:"描述"}},[i("a-input",{model:{value:e.tokenForm.description,callback:function(n){e.$set(e.tokenForm,"description",n)},expression:"tokenForm.description"}})],1),i("a-form-model-item",{attrs:{label:"对应权限"}},[i("a-select",{attrs:{mode:"multiple",placeholder:"请选择权限"},model:{value:e.tokenForm.scopes,callback:function(n){e.$set(e.tokenForm,"scopes",n)},expression:"tokenForm.scopes"}},e._l(["QUERY","MUTATION","OPEN"],(function(n,a){return i("a-select-option",{key:a,attrs:{value:n}},["QUERY"===n?i("span",[e._v("查询")]):"MUTATION"===n?i("span",[e._v("增删改")]):"OPEN"===n?i("span",[e._v("开放")]):e._e()])})),1)],1),i("a-form-model-item",{attrs:{label:"对应模型"}},[i("div",{style:{borderBottom:"1px solid #E9E9E9"}},[i("a-checkbox",{attrs:{indeterminate:e.indeterminate,checked:e.checkAll},on:{change:e.onCheckAllChange}},[e._v(" 全选/取消 ")])],1),i("a-checkbox-group",{attrs:{options:e.customList},on:{change:e.onChange},model:{value:e.checkedList,callback:function(n){e.checkedList=n},expression:"checkedList"}})],1)],1)],1),i("a-modal",{on:{ok:e.submitLanguage},model:{value:e.languageFormVisible,callback:function(n){e.languageFormVisible=n},expression:"languageFormVisible"}},[i("a-form-model",{attrs:{model:e.languageForm,"label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[i("a-form-model-item",{attrs:{label:"语言"}},[i("a-select",{attrs:{placeholder:"请选择语言"},model:{value:e.languageForm.language_id,callback:function(n){e.$set(e.languageForm,"language_id",n)},expression:"languageForm.language_id"}},e._l(e.languages,(function(n){return i("a-select-option",{key:n.id,attrs:{value:n.id}},[e._v(" "+e._s(n.name)+" ")])})),1)],1)],1)],1)],1)},t=[],o=(i("a4d3"),i("e01a"),i("4160"),i("159b"),i("5530")),d=i("2f62"),s=i("22b6"),r=i("f9eb"),l=i("1cf9"),u=i("ca00"),m={components:{},data:function(){return{form:{},tokenFormVisible:!1,languages:[],tokenForm:{},languageForm:{},languageFormVisible:!1,columns:[{title:"token",dataIndex:"token"},{title:"描述",dataIndex:"description"},{title:"权限",dataIndex:"scopes",scopedSlots:{customRender:"scopes"}},{title:"操作",dataIndex:"action",fixed:"right",scopedSlots:{customRender:"action"}}],languageColumns:[{title:"code",dataIndex:"language.code"},{title:"名称",dataIndex:"language.name"},{title:"是否默认",dataIndex:"language",scopedSlots:{customRender:"language"}},{title:"操作",dataIndex:"action",fixed:"right",scopedSlots:{customRender:"action"}}],data:[],languageData:[],customList:[],checkedList:[],indeterminate:!0,checkAll:!1,loading:!1,labelCol:{span:4},wrapperCol:{span:14}}},computed:Object(o["a"])({},Object(d["c"])({project:function(e){return e.common.currentProject}})),mounted:function(){this.form={document_url:"http://cms-api.yousails.com/graphql-playground",api_url:"http://cms-api.yousails.com/graphql?Project-Id="+this.project.id},this.getList(),this.userCustoms(),this.getLanguages()},methods:{copyApiUrl:function(){this.copy(this.form.api_url)},copyDocumentUrl:function(){this.copy(this.form.document_url)},copy:function(e){var n=document.createElement("input");n.value=e,document.body.appendChild(n),n.select(),document.execCommand("Copy"),this.$message.success("复制成功"),document.body.removeChild(n)},getAllLanguages:function(){var e=this,n=this;n.$apollo.query({query:l["userAllLanguages"],variables:{},fetchPolicy:"no-cache"}).then((function(e){n.languages=e.data.userAllLanguages.items})).catch((function(n){e.$message.warning(Object(u["a"])(n.message))}))},getLanguages:function(){var e=this,n=this;n.$apollo.query({query:l["userLanguages"],variables:{},fetchPolicy:"no-cache"}).then((function(e){null!==e.data.userLanguages&&(n.languageData=e.data.userLanguages.items)})).catch((function(n){e.$message.warning(Object(u["a"])(n.message))}))},userCustoms:function(){var e=this,n=this;n.$apollo.query({query:r["userCustoms"],variables:{paginator:{limit:100}},fetchPolicy:"no-cache"}).then((function(e){var i=e.data.userCustoms.items,a=[];i.forEach((function(e){a.push({value:e.id,label:e.zh_name})})),n.customList=a})).catch((function(n){e.$message.warning(Object(u["a"])(n.message))}))},onChange:function(e){this.indeterminate=!!e.length&&e.length<this.customList.length,this.checkAll=e.length===this.customList.length},onCheckAllChange:function(e){var n=this,i=[];e.target.checked&&n.customList.forEach((function(e){i.push(e.value)})),n.checkedList=i,n.indeterminate=!1,n.checkAll=e.target.checked},getList:function(){var e=this,n=this;n.$apollo.query({query:s["userTokens"],variables:{},fetchPolicy:"no-cache"}).then((function(e){n.data=e.data.userTokens.items})).catch((function(n){e.$message.warning(Object(u["a"])(n.message))}))},createToken:function(){this.tokenForm={},this.checkedList=[],this.tokenFormVisible=!0},createLanguage:function(){this.languageForm={},this.languages=[],this.languageFormVisible=!0,this.getAllLanguages()},edit:function(e){this.tokenForm=Object.assign({},e);var n=[];e.custom_ids.forEach((function(e){n.push(""+e)})),this.checkedList=n,this.tokenFormVisible=!0},randToken:function(){var e=(new Date).getTime();this.tokenForm.token=e,this.tokenForm=Object.assign({},this.tokenForm)},submitToken:function(){var e=this,n=this,i={};n.tokenForm&&n.tokenForm.id&&(i.id=n.tokenForm.id),i.custom_ids=n.checkedList,i.token=n.tokenForm.token,i.description=n.tokenForm.description,i.scopes=n.tokenForm.scopes,n.$apollo.mutate({mutation:n.tokenForm&&n.tokenForm.id?s["userUpdateToken"]:s["userCreateToken"],variables:{data:i},fetchPolicy:"no-cache"}).then((function(){e.$message.success("保存成功"),n.tokenForm={},n.tokenFormVisible=!1,n.getList()})).catch((function(n){e.$message.warning(Object(u["a"])(n.message))}))},submitLanguage:function(){var e=this,n=this,i={};i.language_id=n.languageForm.language_id,n.$apollo.mutate({mutation:l["userCreateLanguage"],variables:{data:i},fetchPolicy:"no-cache"}).then((function(){e.$message.success("保存成功"),n.languageForm={},n.languageFormVisible=!1,n.getLanguages()})).catch((function(n){e.$message.warning(Object(u["a"])(n.message))}))},remove:function(e){var n=this,i=this;i.$apollo.mutate({mutation:s["userDeleteToken"],variables:{id:e.id},fetchPolicy:"no-cache"}).then((function(){n.$message.success("删除成功"),n.getList()})).catch((function(e){n.$message.warning(Object(u["a"])(e.message))}))},removeLanguage:function(e){var n=this,i=this;i.$apollo.mutate({mutation:l["userDeleteLanguage"],variables:{id:e.id},fetchPolicy:"no-cache"}).then((function(){n.$message.success("移除成功"),n.getLanguages()})).catch((function(e){n.$message.warning(Object(u["a"])(e.message))}))}}},c=m,k=(i("c20e"),i("2877")),v=Object(k["a"])(c,a,t,!1,null,"2b218143",null);n["default"]=v.exports},"1cf9":function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userAllLanguages"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userAllLanguages"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_default"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userLanguages"},variableDefinitions:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userLanguages"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"language"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"code"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_default"},arguments:[],directives:[]}]}}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userCreateLanguage"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"data"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"LanguageInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCreateLanguage"},arguments:[{kind:"Argument",name:{kind:"Name",value:"data"},value:{kind:"Variable",name:{kind:"Name",value:"data"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"project_id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userDeleteLanguage"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userDeleteLanguage"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userLanguageCode"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userLanguageCode"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[]}]}}],loc:{start:0,end:538}};i.loc.source={body:"query userAllLanguages {\n  userAllLanguages {\n    items {\n      id,\n      name,\n      code,\n      is_default\n    }\n  }\n}\n\nquery userLanguages {\n  userLanguages {\n    items {\n      id,\n      code,\n      language{\n      code,\n      name,\n      is_default\n      }\n    }\n  }\n}\n\nmutation userCreateLanguage($data: LanguageInput!) {\n  userCreateLanguage(data: $data) {\n    id,\n    project_id\n  }\n}\n\nmutation userDeleteLanguage($id: Int!) {\n  userDeleteLanguage (id: $id)\n}\n\nquery userLanguageCode ($id: Int!) {\n  userLanguageCode (id: $id)\n}\n\n\n",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var i=e.type;"NamedType"===i.kind&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,n)})),e.definitions&&e.definitions.forEach((function(e){a(e,n)}))}var t={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function d(e,n){var i={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=t[n]||new Set,d=new Set,s=new Set;a.forEach((function(e){s.add(e)}));while(s.size>0){var r=s;s=new Set,r.forEach((function(e){if(!d.has(e)){d.add(e);var n=t[e]||new Set;n.forEach((function(e){s.add(e)}))}}))}return d.forEach((function(n){var a=o(e,n);a&&i.definitions.push(a)})),i}(function(){i.definitions.forEach((function(e){if(e.name){var n=new Set;a(e,n),t[e.name.value]=n}}))})(),e.exports=i,e.exports["userAllLanguages"]=d(i,"userAllLanguages"),e.exports["userLanguages"]=d(i,"userLanguages"),e.exports["userCreateLanguage"]=d(i,"userCreateLanguage"),e.exports["userDeleteLanguage"]=d(i,"userDeleteLanguage"),e.exports["userLanguageCode"]=d(i,"userLanguageCode")},"22b6":function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userTokens"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"paginator"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginatorInput"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"more"}},type:{kind:"NamedType",name:{kind:"Name",value:"TokenPaginatorInput"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userTokens"},arguments:[{kind:"Argument",name:{kind:"Name",value:"paginator"},value:{kind:"Variable",name:{kind:"Name",value:"paginator"}}},{kind:"Argument",name:{kind:"Name",value:"more"},value:{kind:"Variable",name:{kind:"Name",value:"more"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"token"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"project_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"custom_ids"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"scopes"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"cursor"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userCreateToken"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"data"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TokenInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCreateToken"},arguments:[{kind:"Argument",name:{kind:"Name",value:"data"},value:{kind:"Variable",name:{kind:"Name",value:"data"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"token"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userUpdateToken"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"data"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"TokenInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userUpdateToken"},arguments:[{kind:"Argument",name:{kind:"Name",value:"data"},value:{kind:"Variable",name:{kind:"Name",value:"data"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"token"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"project_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"scopes"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userDeleteToken"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userDeleteToken"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[]}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userToken"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userToken"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"token"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"project_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"custom_ids"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"scopes"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:738}};i.loc.source={body:"query userTokens($paginator: PaginatorInput, $more: TokenPaginatorInput) {\n  userTokens (paginator: $paginator, more: $more) {\n    items {\n      id\n      token\n      description\n      project_id\n      custom_ids\n      scopes\n    }\n    cursor {\n      total\n    }\n  }\n}\n\nmutation userCreateToken($data: TokenInput!) {\n  userCreateToken(data: $data) {\n    description\n    token\n    id\n  }\n}\n\nmutation userUpdateToken($data: TokenInput!) {\n  userUpdateToken (data: $data) {\n    id\n    token\n    description\n    project_id\n    scopes\n  }\n}\n\nmutation userDeleteToken($id: Int!) {\n  userDeleteToken (id: $id)\n}\n\nquery userToken($id: Int!) {\n  userToken (id: $id) {\n    id\n    token\n    description\n    project_id\n    custom_ids\n    scopes\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var i=e.type;"NamedType"===i.kind&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,n)})),e.definitions&&e.definitions.forEach((function(e){a(e,n)}))}var t={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function d(e,n){var i={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=t[n]||new Set,d=new Set,s=new Set;a.forEach((function(e){s.add(e)}));while(s.size>0){var r=s;s=new Set,r.forEach((function(e){if(!d.has(e)){d.add(e);var n=t[e]||new Set;n.forEach((function(e){s.add(e)}))}}))}return d.forEach((function(n){var a=o(e,n);a&&i.definitions.push(a)})),i}(function(){i.definitions.forEach((function(e){if(e.name){var n=new Set;a(e,n),t[e.name.value]=n}}))})(),e.exports=i,e.exports["userTokens"]=d(i,"userTokens"),e.exports["userCreateToken"]=d(i,"userCreateToken"),e.exports["userUpdateToken"]=d(i,"userUpdateToken"),e.exports["userDeleteToken"]=d(i,"userDeleteToken"),e.exports["userToken"]=d(i,"userToken")},c20e:function(e,n,i){"use strict";var a=i("fb80"),t=i.n(a);t.a},ca00:function(e,n,i){"use strict";i.d(n,"a",(function(){return a}));i("ac1f"),i("5319");function a(e){return e.replace(/GraphQL error:/,"")}},e01a:function(e,n,i){"use strict";var a=i("23e7"),t=i("83ab"),o=i("da84"),d=i("5135"),s=i("861d"),r=i("9bf2").f,l=i("e893"),u=o.Symbol;if(t&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var m={},c=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),n=this instanceof c?new u(e):void 0===e?u():u(e);return""===e&&(m[n]=!0),n};l(c,u);var k=c.prototype=u.prototype;k.constructor=c;var v=k.toString,g="Symbol(test)"==String(u("test")),p=/^Symbol\((.*)\)[^)]+$/;r(k,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,n=v.call(e);if(d(m,e))return"";var i=g?n.slice(7,-1):n.replace(p,"$1");return""===i?void 0:i}}),a({global:!0,forced:!0},{Symbol:c})}},f9eb:function(e,n){var i={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userCustoms"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"paginator"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginatorInput"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"more"}},type:{kind:"NamedType",name:{kind:"Name",value:"CustomPaginatorInput"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCustoms"},arguments:[{kind:"Argument",name:{kind:"Name",value:"paginator"},value:{kind:"Variable",name:{kind:"Name",value:"paginator"}}},{kind:"Argument",name:{kind:"Name",value:"more"},value:{kind:"Variable",name:{kind:"Name",value:"more"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"zh_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"plural_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category_id"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"cursor"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userCustom"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCustom"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"zh_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"plural_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category_id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userCreateCustom"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"data"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CustomInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCreateCustom"},arguments:[{kind:"Argument",name:{kind:"Name",value:"data"},value:{kind:"Variable",name:{kind:"Name",value:"data"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"zh_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"plural_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category_id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userUpdateCustom"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"data"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"CustomInput"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userUpdateCustom"},arguments:[{kind:"Argument",name:{kind:"Name",value:"data"},value:{kind:"Variable",name:{kind:"Name",value:"data"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"zh_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"plural_name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category_id"},arguments:[],directives:[]}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userDeleteCustom"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"Int"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userDeleteCustom"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[]}]}}],loc:{start:0,end:820}};i.loc.source={body:"query userCustoms ($paginator: PaginatorInput, $more: CustomPaginatorInput) {\n  userCustoms (paginator: $paginator, more: $more) {\n    items {\n      id,\n      name,\n      zh_name,\n      plural_name,\n      description,\n      category_id\n    },\n    cursor {\n      total\n    }\n  }\n}\n\nquery userCustom ($id: Int!) {\n  userCustom (id: $id) {\n    id,\n    name,\n    zh_name,\n    plural_name,\n    description,\n    category_id\n  }\n}\n\nmutation userCreateCustom($data: CustomInput!) {\n  userCreateCustom(data: $data) {\n    id,\n    name,\n    zh_name,\n    plural_name,\n    description,\n    category_id\n  }\n}\n\nmutation userUpdateCustom($data: CustomInput!) {\n  userUpdateCustom(data: $data) {\n    id,\n    name,\n    zh_name,\n    plural_name,\n    category_id\n  }\n}\n\nmutation userDeleteCustom($id: Int!) {\n  userDeleteCustom (id: $id)\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};function a(e,n){if("FragmentSpread"===e.kind)n.add(e.name.value);else if("VariableDefinition"===e.kind){var i=e.type;"NamedType"===i.kind&&n.add(i.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){a(e,n)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){a(e,n)})),e.definitions&&e.definitions.forEach((function(e){a(e,n)}))}var t={};function o(e,n){for(var i=0;i<e.definitions.length;i++){var a=e.definitions[i];if(a.name&&a.name.value==n)return a}}function d(e,n){var i={kind:e.kind,definitions:[o(e,n)]};e.hasOwnProperty("loc")&&(i.loc=e.loc);var a=t[n]||new Set,d=new Set,s=new Set;a.forEach((function(e){s.add(e)}));while(s.size>0){var r=s;s=new Set,r.forEach((function(e){if(!d.has(e)){d.add(e);var n=t[e]||new Set;n.forEach((function(e){s.add(e)}))}}))}return d.forEach((function(n){var a=o(e,n);a&&i.definitions.push(a)})),i}(function(){i.definitions.forEach((function(e){if(e.name){var n=new Set;a(e,n),t[e.name.value]=n}}))})(),e.exports=i,e.exports["userCustoms"]=d(i,"userCustoms"),e.exports["userCustom"]=d(i,"userCustom"),e.exports["userCreateCustom"]=d(i,"userCreateCustom"),e.exports["userUpdateCustom"]=d(i,"userUpdateCustom"),e.exports["userDeleteCustom"]=d(i,"userDeleteCustom")},fb80:function(e,n,i){}}]);