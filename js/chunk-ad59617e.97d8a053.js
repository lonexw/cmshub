(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ad59617e"],{"0c62":function(e,t,a){},"1b22":function(e,t,a){"use strict";var n=a("b999"),i=a.n(n);i.a},"34d6":function(e,t){var a={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"userAssets"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"paginator"}},type:{kind:"NamedType",name:{kind:"Name",value:"PaginatorInput"}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"more"}},type:{kind:"NamedType",name:{kind:"Name",value:"AssetPaginatorInput"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userAssets"},arguments:[{kind:"Argument",name:{kind:"Name",value:"paginator"},value:{kind:"Variable",name:{kind:"Name",value:"paginator"}}},{kind:"Argument",name:{kind:"Name",value:"more"},value:{kind:"Variable",name:{kind:"Name",value:"more"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"items"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"file_size"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"type"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"updated_at"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"cursor"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"total"},arguments:[],directives:[]}]}}]}}]}},{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"userCreateBatchAsset"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"data"}},type:{kind:"NonNullType",type:{kind:"ListType",type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"AssetInput"}}}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"userCreateBatchAsset"},arguments:[{kind:"Argument",name:{kind:"Name",value:"data"},value:{kind:"Variable",name:{kind:"Name",value:"data"}}}],directives:[]}]}}],loc:{start:0,end:376}};a.loc.source={body:"query userAssets($paginator: PaginatorInput\n  $more: AssetPaginatorInput) {\n  userAssets(paginator: $paginator\n    more: $more) {\n    items {\n      id,\n      name,\n      url,\n      file_size,\n      type,\n      created_at,\n      updated_at\n    },\n    cursor {\n      total\n    }\n  }\n}\n\nmutation userCreateBatchAsset($data: [AssetInput!]!) {\n  userCreateBatchAsset(data: $data)\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function n(e,t){if("FragmentSpread"===e.kind)t.add(e.name.value);else if("VariableDefinition"===e.kind){var a=e.type;"NamedType"===a.kind&&t.add(a.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){n(e,t)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){n(e,t)})),e.definitions&&e.definitions.forEach((function(e){n(e,t)}))}var i={};function s(e,t){for(var a=0;a<e.definitions.length;a++){var n=e.definitions[a];if(n.name&&n.name.value==t)return n}}function o(e,t){var a={kind:e.kind,definitions:[s(e,t)]};e.hasOwnProperty("loc")&&(a.loc=e.loc);var n=i[t]||new Set,o=new Set,r=new Set;n.forEach((function(e){r.add(e)}));while(r.size>0){var c=r;r=new Set,c.forEach((function(e){if(!o.has(e)){o.add(e);var t=i[e]||new Set;t.forEach((function(e){r.add(e)}))}}))}return o.forEach((function(t){var n=s(e,t);n&&a.definitions.push(n)})),a}(function(){a.definitions.forEach((function(e){if(e.name){var t=new Set;n(e,t),i[e.name.value]=t}}))})(),e.exports=a,e.exports["userAssets"]=o(a,"userAssets"),e.exports["userCreateBatchAsset"]=o(a,"userCreateBatchAsset")},"392a":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-page",{attrs:{title:"内容"},scopedSlots:e._u([{key:"sider",fn:function(){return[a("a-menu",e._l(e.customs,(function(t,n){return a("a-menu-item",{key:n,on:{click:e.menuClick}},[e._v(" "+e._s(t.zh_name)+" ")])})),1)]},proxy:!0},{key:"content",fn:function(){return[e.show_list?a("contents",{attrs:{custom:e.selectCustom},on:{update:e.update}}):e._e(),e.show_update?a("update-content",{attrs:{"data-form":e.content,custom:e.selectCustom,model:"Admin"},on:{cancel:e.cancelUpdate}}):e._e()]},proxy:!0}])})},i=[],s=(a("4160"),a("159b"),a("2af9")),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"relative"},[a("header",{staticClass:"padding-lr-sm padding-tb-xs flex align-center justify-between solid-bottom line-grey"},[a("bg-tag",{attrs:{active:!0}},[e._v(e._s(e.custom?e.custom.name:""))]),a("a-button",{attrs:{type:"primary"},on:{click:function(t){return e.add()}}},[a("a-icon",{attrs:{type:"plus"}}),e._v("新增 ")],1)],1),a("div",{staticClass:"flex align-center padding-lr-sm solid-bottom line-grey",staticStyle:{height:"36px"}},[a("span",{staticClass:"margin-right-sm"},[e._v(e._s(e.select_num)+" 选中")]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.select_num>0,expression:"select_num > 0"}],staticClass:"flex",on:{click:e.batchDelete}},[a("bg-tag",{staticClass:"text-red"},[a("a-icon",{staticClass:"margin-right-xxs",attrs:{type:"delete"}}),e._v(" 删除 ")],1)],1)]),e.data.length>0?a("a-table",{staticClass:"content-table",attrs:{size:"middle",rowKey:"id",rowSelection:e.rowSelection,columns:e.columns,dataSource:e.data,loading:e.loading,pagination:!1,scroll:{x:1200,y:"calc(100vh - 210px)",scrollToFirstRowOnChange:!0}}}):e._e(),0!=e.data.length||e.loading?e._e():a("a-empty",{staticClass:"empty-content"}),a("div",{staticClass:"flex justify-center margin-top-sm"},[a("a-pagination",{attrs:{showSizeChanger:"",showQuickJumper:"",total:e.total,showTotal:function(e){return"共 "+e+" 条"},pageSize:e.search.paginator.limit,defaultCurrent:1,pageSizeOptions:["10","30","50","100"]},on:{change:e.change,showSizeChange:e.showSizeChange}})],1),a("a-modal",{attrs:{maskClosable:!1,width:e.referenceModal.width,title:e.referenceModal.title,visible:e.referenceModal.visible,footer:null},on:{cancel:e.closeReferenceDialog}},[e.referenceModal.visible?a("ContentShow",{attrs:{"custom-id":e.referenceModal.field.reference_custom_id,ids:e.referenceModal.ids}}):e._e(),a("div",{staticStyle:{"text-align":"right"}},[a("a-button",{staticClass:"margin-right-sm",on:{click:e.closeReferenceDialog}},[e._v("关闭")])],1)],1)],1)},r=[],c=(a("c975"),a("b0c0"),a("ac1f"),a("841c"),a("8785")),l=a("438c"),d=a("ca00"),u=a("4360"),m=a("a3be"),f=a("9530"),h=a.n(f),p=a("4c87");function g(){var e=Object(c["a"])(["query "," ($paginator: PaginatorInput, $more: ","PaginatorInput) { \n            "," (paginator: $paginator, more: $more) { \n            items { \n              ","\n            },\n            cursor { total } \n            }\n          }"]);return g=function(){return e},e}function v(){var e=Object(c["a"])(["mutation "," ($id: Int!) { \n                "," (id: $id)\n              }"]);return v=function(){return e},e}function b(){var e=Object(c["a"])(["mutation "," ($ids: [Int]!) { \n                "," (ids: $ids)\n              }"]);return b=function(){return e},e}var y={name:"Contents",props:{custom:{}},components:{BgTag:s["d"],PreviewImage:p["a"],ContentShow:s["e"]},data:function(){var e=this,t={onChange:function(t,a){e.select_num=a.length;var n=[];a.forEach((function(e){n.push(e.id)})),e.ids=n},onSelect:function(e,t,a){console.log(e,t,a)},onSelectAll:function(e,t,a){console.log(e,t,a)}};return{rowSelection:t,columns:[],data:[],fields:[],fieldNames:[],select_num:0,ids:[],show_create:!1,total:30,search:{paginator:{page:1,limit:30}},referenceModal:{title:"关联信息",visible:!1,width:"80%",item:{},field:{},data:[],fields:[],fieldNames:[],ids:[]},loading:!1}},created:function(){},computed:{},mounted:function(){this.getFieldList()},methods:{add:function(e){this.$emit("update",e)},batchDelete:function(){var e=this,t="userDeleteBatch"+e.custom.name;this.$confirm({title:"确认删除选中数据吗？",confirmLoading:!0,onOk:function(){e.$apollo.mutate({mutation:h()(b(),t,t),variables:{ids:e.ids},fetchPolicy:"no-cache",context:{uri:m["a"].projectUri+u["a"].state.common.currentProject.id}}).then((function(){e.getContentList(),e.select_num=0,e.ids=[]})).catch((function(t){e.$message.warning(Object(d["a"])(t.message))}))}})},deleteItem:function(e){var t=this,a="userDelete"+t.custom.name;this.$confirm({title:"确认删除吗？",confirmLoading:!0,onOk:function(){t.$apollo.mutate({mutation:h()(v(),a,a),variables:{id:e.id},fetchPolicy:"no-cache",context:{uri:m["a"].projectUri+u["a"].state.common.currentProject.id}}).then((function(){t.getContentList()})).catch((function(e){t.$message.warning(Object(d["a"])(e.message))}))}})},showSizeChange:function(e,t){this.search.paginator.limit=t,this.getContentList()},change:function(e,t){this.search.paginator.page=e,this.search.paginator.limit=t,this.getContentList()},getFieldList:function(){var e=this,t=this.$createElement;this.data=[];var a=this;a.$apollo.query({query:l["userFields"],variables:{more:{custom_id:a.custom.id}},fetchPolicy:"no-cache"}).then((function(n){var i=n.data.userFields.items,s=[],o=[],r=[];i.forEach((function(e){"__typename"!=e.name&&(s.push(e),"ASSET"==e.type?r.push({title:e.zh_name,dataIndex:e.name,customRender:function(a,n){if(e.is_multiple){var i=null;return n[e.name+"Asset"].forEach((function(e){e&&(i+=t("img",{attrs:{src:e.url}}))})),i}var s=n[e.name+"Asset"];if(s){var o=n[e.name+"Asset"].url;return n[e.name+"Asset"].type.indexOf("image")>-1?t("preview-image",{attrs:{src:o,height:"30px"}}):o}return""}}):"REFERENCE"==e.type?r.push({title:e.zh_name,dataIndex:e.name,customRender:function(t,n){var i=a.$createElement("a",{domProps:{innerHTML:t},on:{click:function(){a.showReferenceDialog(n,e,t)}}});return i}}):r.push({title:e.zh_name,dataIndex:e.name}),o.push(e.name))})),r.push({title:"操作",dataIndex:"action",customRender:function(e,t){var n=[],i=a.$createElement("a",{domProps:{innerHTML:"编辑"},on:{click:function(){a.add(t)}}}),s=a.$createElement("span",{domProps:{innerHTML:"|",width:"10px"}}),o=a.$createElement("a",{domProps:{innerHTML:"删除"},on:{click:function(){a.deleteItem(t)}}});return n.push(i),n.push(s),n.push(o),n}}),a.fields=s,a.columns=r,a.fieldNames=o,e.getContentList()})).catch((function(t){e.$message.warning(Object(d["a"])(t.message))}))},getContentList:function(){var e=this;this.data=[];var t=this;t.loading=!0;var a="user"+t.custom.plural_name,n="id";t.fields.forEach((function(e){n+=",".concat(e.name),"ASSET"==e.type&&(n+=",".concat(e.name,"Asset {\n            created_at,\n            updated_at,\n            id,\n            name,\n            url,\n            type\n          }")),"REFERENCE"==e.type&&(n+=",".concat(e.name,"Reference {\n            created_at,\n            updated_at,\n            id,\n            title\n          }"))})),t.$apollo.query({query:h()(g(),a,t.custom.name,a,n),variables:t.search,fetchPolicy:"no-cache",context:{uri:m["a"].projectUri+u["a"].state.common.currentProject.id}}).then((function(e){t.data=e.data[a].items,t.total=e.data[a].cursor.total,t.loading=!1})).catch((function(a){e.$message.warning(Object(d["a"])(a.message)),t.loading=!1}))},showReferenceDialog:function(e,t,a){this.referenceModal.item=e,this.referenceModal.field=t,this.referenceModal.ids="string"===typeof a?[a]:a,this.referenceModal.visible=!0},closeReferenceDialog:function(){this.referenceModal.visible=!1}}},k=y,C=(a("581c"),a("ef6f"),a("2877")),_=Object(C["a"])(k,o,r,!1,null,"eea8f8b4",null),w=_.exports,x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-layout",{staticClass:"layout"},[a("a-layout",{staticStyle:{"background-color":"white","margin-right":"240px"}},[a("a-layout-header",{staticClass:"header light",staticStyle:{height:"50px","line-height":"50px"}},[a("div",{staticClass:"flex align-center padding-lr-sm text-bold pointer text-black",on:{click:e.cancel}},[a("a-icon",{staticClass:"margin-right-xs",attrs:{type:"left"}}),e._v(" "+e._s(e.dataForm&&e.dataForm.id?"编辑":"创建")+" "+e._s(e.model)+" ")],1)]),a("a-layout-content",[a("div",{staticClass:"content-body padding-lr-sm"},[e.formShow?a("a-form-model",{ref:"createForm",attrs:{layout:"vertical",model:e.form,rules:e.rules}},[e._l(e.fields,(function(t,n){return["SINGLE_TEXT"==t.type?[a("a-form-model-item",{key:n,attrs:{label:t.zh_name,prop:t.name}},[a("a-input",{attrs:{placeholder:"请输入"+t.zh_name},on:{change:e.formValueChange},model:{value:e.form[t.name],callback:function(a){e.$set(e.form,t.name,a)},expression:"form[item.name]"}})],1)]:"MULTI_TEXT"==t.type?[a("a-form-model-item",{key:n,attrs:{label:t.zh_name,prop:t.name}},[a("a-input",{attrs:{type:"textarea",placeholder:"请输入"+t.zh_name},model:{value:e.form[t.name],callback:function(a){e.$set(e.form,t.name,a)},expression:"form[item.name]"}})],1)]:"RICH_TEXT"==t.type?[a("a-form-model-item",{key:n,attrs:{label:t.zh_name,prop:t.name}},[a("WangEditor",{attrs:{name:t.name},on:{change:e.richValueChange},model:{value:e.form[t.name],callback:function(a){e.$set(e.form,t.name,a)},expression:"form[item.name]"}})],1)]:"ASSET"==t.type?[a("a-form-model-item",{key:n,attrs:{label:t.zh_name,prop:t.name}},[e._l(e.form[t.name+"Asset"],(function(n,i){return a("div",{key:i},[a("tag",{attrs:{closable:""},on:{close:function(a){return e.removeAsset(n,t.name)}}},[e._v(e._s(n.name))])],1)})),a("a-button",{on:{click:function(a){return e.showAssetDialog(t)}}},[e._v("选择")])],2)]:"REFERENCE"==t.type?[a("a-form-model-item",{key:n,attrs:{label:t.zh_name,prop:t.name}},[t.is_required?a("a-input",{attrs:{type:"hidden"},model:{value:e.form[t.name],callback:function(a){e.$set(e.form,t.name,a)},expression:"form[item.name]"}}):e._e(),e._l(e.form[t.name+"Reference"],(function(n,i){return a("div",{key:i},[a("tag",{attrs:{closable:""},on:{close:function(a){return e.removeReference(n,t.name)}}},[e._v(e._s(n.title))])],1)})),a("a-button",{on:{click:function(a){return e.showReferenceDialog(t)}}},[e._v("选择")])],2)]:e._e()]}))],2):e._e()],1)])],1),a("a-layout-sider",{staticClass:"right-sider sider light padding-xs",style:{overflow:"auto",height:"100vh",position:"fixed",right:0,backgroundColor:"rgb(250, 250, 252)"}},[a("div",[a("a-button",{staticClass:"margin-right-xs",attrs:{type:"primary"},on:{click:e.submit}},[e._v("保存")]),a("a-button",{attrs:{type:"danger"},on:{click:e.submit}},[e._v("保存并发布")])],1),a("div",{staticClass:"text-df margin-tb"},[a("div",{staticClass:"margin-bottom-xs"},[e._v("信息")]),e.dataForm&&e.dataForm.id?a("div",{staticClass:"text-sm text-grey"},[a("div",{staticClass:"flex justify-between"},[a("span",[e._v("创建")]),a("span",[e._v("2020-04-09 18:17:54")])]),a("div",{staticClass:"flex justify-between"},[a("span",[e._v("更新")]),a("span",[e._v("2020-04-09 18:17:54")])])]):a("div",{staticClass:"text-sm text-grey margin-left-xs",staticStyle:{"font-style":"italic"}},[e._v("保存后显示")])]),a("div",{staticClass:"margin-tb"},[a("div",{staticClass:"text-df margin-bottom-xs"},[e._v("发布于")]),e.dataForm&&e.dataForm.id?a("div",{staticClass:"flex justify-between align-center padding-xs solid line-grey shadow radius",staticStyle:{"background-color":"white"}},[a("span",{staticClass:"text-sm"},[e._v("2020-04-09 18:25:11")]),a("a-tooltip",{attrs:{placement:"bottomRight"}},[a("template",{slot:"title"},[a("span",[e._v("取消发布")])]),a("a-icon",{staticClass:"pointer",staticStyle:{color:"red"},attrs:{type:"delete",theme:"filled"}})],2)],1):a("div",{staticClass:"text-sm text-grey margin-left-xs",staticStyle:{"font-style":"italic"}},[e._v("尚未发布")])])]),a("a-modal",{attrs:{maskClosable:!1,width:e.assetModal.width,title:e.assetModal.title,visible:e.assetModal.visible,footer:null},on:{cancel:e.closeAssetDialog}},[a("asset-picker",{attrs:{"form-name":e.assetModal.item.name,"is-multiple":e.assetModal.item.is_multiple},on:{selectChange:e.assetSelectChange}}),a("div",{staticStyle:{"text-align":"right"}},[a("a-button",{staticClass:"margin-right-sm",on:{click:e.closeAssetDialog}},[e._v("关闭")])],1)],1),a("a-modal",{attrs:{maskClosable:!1,width:e.referenceModal.width,title:e.referenceModal.title,visible:e.referenceModal.visible,footer:null},on:{cancel:e.closeReferenceDialog}},[a("reference-picker",{attrs:{"form-name":e.referenceModal.item.name,"is-multiple":e.referenceModal.item.is_multiple,"custom-id":e.referenceModal.item.reference_custom_id},on:{selectChange:e.referenceSelectChange}}),a("div",{staticStyle:{"text-align":"right"}},[a("a-button",{staticClass:"margin-right-sm",on:{click:e.closeReferenceDialog}},[e._v("关闭")])],1)],1)],1)},S=[],E=(a("a15b"),a("b2a3"),a("a54e"),a("92fa")),$=a.n(E),A=a("6042"),N=a.n(A),T=a("4d91"),j=a("0c63"),R=a("94eb"),F=a("0464"),P=a("a9d4"),M=a("daa3"),O=a("b488"),D=a("4df5"),I=a("6a21"),z=["pink","red","yellow","orange","cyan","green","blue","purple","geekblue","magenta","volcano","gold","lime"],L=new RegExp("^("+z.join("|")+")(-inverse)?$"),q={name:"ATag",mixins:[O["a"]],model:{prop:"visible",event:"close.visible"},props:{prefixCls:T["a"].string,color:T["a"].string,closable:T["a"].bool.def(!1),visible:T["a"].bool,afterClose:T["a"].func},inject:{configProvider:{default:function(){return D["a"]}}},data:function(){var e=!0,t=Object(M["k"])(this);return"visible"in t&&(e=this.visible),Object(I["a"])(!("afterClose"in t),"Tag","'afterClose' will be deprecated, please use 'close' event, we will remove this in the next version."),{_visible:e}},watch:{visible:function(e){this.setState({_visible:e})}},methods:{setVisible:function(e,t){this.$emit("close",t),this.$emit("close.visible",!1);var a=this.afterClose;a&&a(),t.defaultPrevented||Object(M["r"])(this,"visible")||this.setState({_visible:e})},handleIconClick:function(e){e.stopPropagation(),this.setVisible(!1,e)},isPresetColor:function(){var e=this.$props.color;return!!e&&L.test(e)},getTagStyle:function(){var e=this.$props.color,t=this.isPresetColor();return{backgroundColor:e&&!t?e:void 0}},getTagClassName:function(e){var t,a=this.$props.color,n=this.isPresetColor();return t={},N()(t,e,!0),N()(t,e+"-"+a,n),N()(t,e+"-has-color",a&&!n),t},renderCloseIcon:function(){var e=this.$createElement,t=this.$props.closable;return t?e(j["a"],{attrs:{type:"close"},on:{click:this.handleIconClick}}):null}},render:function(){var e=arguments[0],t=this.$props.prefixCls,a=this.configProvider.getPrefixCls,n=a("tag",t),i=this.$data._visible,s=e("span",$()([{directives:[{name:"show",value:i}]},{on:Object(F["a"])(Object(M["j"])(this),["close"])},{class:this.getTagClassName(n),style:this.getTagStyle()}]),[this.$slots["default"],this.renderCloseIcon()]),o=Object(R["a"])(n+"-zoom",{appear:!1});return e(P["a"],[e("transition",o,[s])])}},V={name:"ACheckableTag",model:{prop:"checked"},props:{prefixCls:T["a"].string,checked:Boolean},inject:{configProvider:{default:function(){return D["a"]}}},computed:{classes:function(){var e,t=this.checked,a=this.prefixCls,n=this.configProvider.getPrefixCls,i=n("tag",a);return e={},N()(e,""+i,!0),N()(e,i+"-checkable",!0),N()(e,i+"-checkable-checked",t),e}},methods:{handleClick:function(){var e=this.checked;this.$emit("input",!e),this.$emit("change",!e)}},render:function(){var e=arguments[0],t=this.classes,a=this.handleClick,n=this.$slots;return e("div",{class:t,on:{click:a}},[n["default"]])}},B=a("db14");q.CheckableTag=V,q.install=function(e){e.use(B["a"]),e.component(q.name,q),e.component(q.CheckableTag.name,q.CheckableTag)};var U=q,H=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"relative"},[a("header",{staticClass:"padding-lr-sm padding-tb-xs flex align-center justify-between solid-bottom line-grey"},[a("bg-tag",{attrs:{active:!0}},[e._v("Asset")])],1),e.data.length>0?a("a-table",{staticClass:"content-table",attrs:{size:"middle",rowKey:"id",columns:e.columns,dataSource:e.data,loading:e.loading,pagination:!1,scroll:{x:1200,y:"calc(100vh - 10px)",scrollToFirstRowOnChange:!0}},scopedSlots:e._u([{key:"url",fn:function(t,n){return[n.type.indexOf("image")>-1?a("preview-image",{attrs:{src:t,height:"30px"}}):a("span",[e._v(e._s(t))])]}},{key:"action",fn:function(t){return[a("a",{on:{click:function(a){return e.selectItem(t)}}},[e._v("选择")])]}}],null,!1,2458453533)}):e._e(),0!=e.data.length||e.loading?e._e():a("a-empty",{staticClass:"empty-content"}),a("div",{staticClass:"flex justify-center margin-top-sm"},[a("a-pagination",{attrs:{showSizeChanger:"",showQuickJumper:"",total:e.total,showTotal:function(e){return"共 "+e+" 条"},pageSize:e.search.paginator.limit,defaultCurrent:1,pageSizeOptions:["10","30","50","100"]},on:{change:e.change,showSizeChange:e.showSizeChange}})],1)],1)},J=[],X=a("34d6"),K={name:"AssetPicker",props:{formName:{type:String,default:""},isMultiple:{type:Boolean,default:!1}},components:{BgTag:s["d"],PreviewImage:p["a"]},data:function(){var e=this,t=[{title:"文件名",dataIndex:"name",scopedSlots:{customRender:"name"}},{title:"预览",dataIndex:"url",scopedSlots:{customRender:"url"}},{title:"大小",dataIndex:"file_size"},{title:"上传时间",dataIndex:"created_at"},{title:"选择",key:"action",scopedSlots:{customRender:"action"}}],a={onChange:function(t,a){console.log("selectedRowKeys: ".concat(t),"selectedRows: ",a),e.select_num=a.length},onSelect:function(t,a,n){console.log(t,a,n),e.$emit("selectChange",t,e.formName,e.isMultiple)},onSelectAll:function(e,t,a){console.log(e,t,a)}};return{rowSelection:a,columns:t,data:[],select_num:0,show_create:!1,total:30,search:{paginator:{page:1,limit:10}},loading:!1}},computed:{},mounted:function(){this.getList()},methods:{showSizeChange:function(e,t){this.search.paginator.limit=t,this.getList()},change:function(e,t){this.search.paginator.page=e,this.search.paginator.limit=t,this.getList()},getList:function(){var e=this,t=this;t.loading=!0,t.$apollo.query({query:X["userAssets"],variables:t.search,fetchPolicy:"no-cache",context:{uri:m["a"].projectUri+u["a"].state.common.currentProject.id}}).then((function(e){t.data=e.data.userAssets.items,t.total=e.data.userAssets.cursor.total,t.loading=!1})).catch((function(a){e.$message.warning(Object(d["a"])(a.message)),t.loading=!1}))},selectItem:function(e){this.$emit("selectChange",e,this.formName,this.isMultiple)}}},Q=K,G=(a("f79b"),a("be99"),Object(C["a"])(Q,H,J,!1,null,"3d720de8",null)),W=G.exports;function Y(){var e=Object(c["a"])(["mutation "," ($data: ","Input!) { \n                "," (data: $data) {\n                  ","\n                }\n              }"]);return Y=function(){return e},e}var Z={name:"UpdateContent",props:{dataForm:{type:Object,default:function(){return{}}},custom:{},model:{type:String,required:!0}},components:{AreaUpload:s["a"],WangEditor:s["i"],AssetPicker:W,Tag:U,ReferencePicker:s["h"]},data:function(){return{form:{},fields:[],fieldNames:[],rules:{title:[{required:!0,message:"必填",trigger:"blur"}]},assetModal:{title:"选择关联附件",visible:!1,width:"80%",item:{}},referenceModal:{title:"选择关联表",visible:!1,width:"80%",item:{}},formShow:!0,typeTexts:{ASSET:"Asset",REFERENCE:"Reference"}}},computed:{},mounted:function(){this.getFieldList()},methods:{cancel:function(){this.$emit("cancel")},submit:function(){var e=this,t=this;this.$refs.createForm.validate((function(a){if(!a)return!1;var n={};t.fields.forEach((function(e){if("ASSET"==e.type||"REFERENCE"==e.type){var a=[];e.is_multiple?(t.form[e.name+t.typeTexts[e.type]]&&t.form[e.name+t.typeTexts[e.type]].forEach((function(e){a.push(e.id)})),n[e.name]=a):n[e.name]=t.form[e.name+t.typeTexts[e.type]].length>0?t.form[e.name+t.typeTexts[e.type]][0].id:""}else n[e.name]=t.form[e.name]}));var i="userCreate";t.form.id&&(i="userUpdate",n["id"]=t.form.id),i+=t.custom.name,t.$apollo.mutate({mutation:h()(Y(),i,t.custom.name,i,t.fieldNames.join(",")),variables:{data:n},fetchPolicy:"no-cache",context:{uri:m["a"].projectUri+u["a"].state.common.currentProject.id}}).then((function(){e.$emit("cancel")})).catch((function(t){e.$message.warning(Object(d["a"])(t.message))}))}))},getFieldList:function(){var e=this,t=this;t.$apollo.query({query:l["userFields"],variables:{more:{custom_id:t.custom.id}},fetchPolicy:"no-cache"}).then((function(e){var a=e.data.userFields.items,n=[],i=[],s={};t.formShow=!1;var o=t.dataForm;a.forEach((function(e){if(n.push(e),i.push(e.name),e.is_required){var a="请输入";"ASSET"!=e.type&&"REFERENCE"!=e.type||(a="请选择"),s[e.name]=[{type:"string",required:!0,message:a+e.zh_name,trigger:"blur"}]}if(o&&o.id&&("RICH_TEXT"==e.type&&(t.form[e.name]=""),t.form[e.name]=o[e.name],"ASSET"==e.type||"REFERENCE"==e.type)){var r=t.typeTexts[e.type],c=[];e.is_multiple?c=o[e.name+r]:o[e.name+r]&&(c=[o[e.name+r]]),t.form[e.name+r]=c}})),o&&o.id?t.form["id"]=o.id:t.form["id"]=void 0,t.rules=s,t.fields=n,t.fieldNames=i,t.formShow=!0})).catch((function(t){e.$message.warning(Object(d["a"])(t.message))}))},richValueChange:function(e){var t=e[0],a=e[1];this.form[a]=t},showAssetDialog:function(e){this.assetModal.item=e,this.assetModal.visible=!0},closeAssetDialog:function(){this.assetModal.visible=!1},assetSelectChange:function(e,t,a){this.selectChange("asset",e,t,a)},removeAsset:function(e,t){var a=[],n=[];this.form[t+"Asset"].forEach((function(t){t.id!=e.id&&(a.push(t),e.is_multiple?n.push(t.id):n=t.id)})),this.form[t+"Asset"]=a,this.form[t]=n},removeReference:function(e,t){var a=[],n=[];this.form[t+"Reference"].forEach((function(t){t.id!=e.id&&(a.push(t),e.is_multiple?n.push(t.id):n=t.id)})),this.form[t+"Reference"]=a,this.form[t]=n},showReferenceDialog:function(e){this.referenceModal.item=e,this.referenceModal.visible=!0},closeReferenceDialog:function(){this.referenceModal.visible=!1},selectChange:function(e,t,a,n){console.log(this.$refs.createForm);var i="";if(i="asset"==e?"Asset":"Reference",n){var s=!1;this.form[a+i]&&this.form[a+i].length>0&&this.form[a+i].forEach((function(e){e.id==t.id&&(s=!0)})),s||(this.form[a+i]&&this.form[a+i].length>0?this.form[a+i].push(t):this.form[a+i]=[t],n?this.form[a].push(t.id):this.form[a]=t.id),this.$refs.createForm.clearValidate()}else this.form[a+i]=[t],n?this.form[a].push(t.id):this.form[a]=t.id,this.$refs.createForm.clearValidate(),"asset"==e?this.closeAssetDialog():this.closeReferenceDialog()},referenceSelectChange:function(e,t,a){this.selectChange("reference",e,t,a)},formValueChange:function(){this.form=Object.assign({},this.form)}}},ee=Z,te=(a("1b22"),Object(C["a"])(ee,x,S,!1,null,"6373dd70",null)),ae=te.exports,ne=a("f9eb"),ie={components:{UpdateContent:ae,Contents:w,BasePage:s["b"]},data:function(){return{content:{id:1},show_list:!1,selectedTags:[],customs:[],selectCustom:null,show_update:!1,show_models:!0,models_height:"0px"}},computed:{toggleDirection:function(){return this.show_models?"down":"right"}},mounted:function(){this.getCustomList()},methods:{getCustomList:function(){var e=this,t=this;t.$apollo.query({query:ne["userCustoms"],variables:{paginator:{limit:50}},fetchPolicy:"no-cache"}).then((function(e){var a=e.data.userCustoms.items,n=[];a.forEach((function(e){n.push(Object.assign(e,{active:!1}))})),t.customs=n})).catch((function(t){e.$message.warning(Object(d["a"])(t.message))}))},menuClick:function(e){this.selectCustom=null,this.show_list=!1,this.show_update=!1;var t=this;setTimeout((function(){t.selectCustom=t.customs[e.key],t.show_list=!0}),100)},cancelUpdate:function(){this.show_update=!1,this.show_list=!0},update:function(e){this.show_list=!1,this.content=e?e||{}:void 0;var t=this;setTimeout((function(){t.show_update=!0}),100)}}},se=ie,oe=(a("c66a"),Object(C["a"])(se,n,i,!1,null,"5fa55786",null));t["default"]=oe.exports},"581c":function(e,t,a){"use strict";var n=a("ac79"),i=a.n(n);i.a},a15b:function(e,t,a){"use strict";var n=a("23e7"),i=a("44ad"),s=a("fc6a"),o=a("a640"),r=[].join,c=i!=Object,l=o("join",",");n({target:"Array",proto:!0,forced:c||!l},{join:function(e){return r.call(s(this),void 0===e?",":e)}})},a293:function(e,t,a){},a54e:function(e,t,a){},ac79:function(e,t,a){},b7d2:function(e,t,a){},b999:function(e,t,a){},be99:function(e,t,a){"use strict";var n=a("0c62"),i=a.n(n);i.a},c66a:function(e,t,a){"use strict";var n=a("a293"),i=a.n(n);i.a},d388:function(e,t,a){},ef6f:function(e,t,a){"use strict";var n=a("d388"),i=a.n(n);i.a},f79b:function(e,t,a){"use strict";var n=a("b7d2"),i=a.n(n);i.a}}]);
//# sourceMappingURL=chunk-ad59617e.97d8a053.js.map