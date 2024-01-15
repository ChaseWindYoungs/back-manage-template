import{b5 as te,a2 as De,a4 as be,j as ie,u as H,t as O,F as ce,m as fe,p as z,r as D,f as F,P as Z,X as w,R as se,U as oe,k as j,l as K,v as B,x as M,y as W,z as Pe,n as L,Y as I,I as U,E as $,J as xe,a1 as ve,af as pe,B as me,i as Fe,a3 as Le,ao as ue,o as ye,b7 as we,G as Ie,H as Re,A as Me,ag as Ke,c as Te,a5 as Se}from"./index-f0783a82.js";import{E as Ae}from"./el-checkbox-4af63efc.js";import{_ as ae,r as ne,b as Ge,E as Ue,s as Be,J as qe,c as Je,I as $e,j as Oe}from"./el-button-36eb49f7.js";import{_ as ze}from"./index-a9f0f71d.js";import{u as He}from"./event-90858fbb.js";import{E as R}from"./aria-03dc81bc.js";const q="$treeNodeId",he=function(n,e){!e||e[q]||Object.defineProperty(e,q,{value:n.id,enumerable:!1,configurable:!1,writable:!1})},de=function(n,e){return n?e[n]:e[q]},re=(n,e,s)=>{const o=n.value.currentNode;s();const t=n.value.currentNode;o!==t&&e("current-change",t?t.data:null,t)},le=n=>{let e=!0,s=!0,o=!0;for(let t=0,r=n.length;t<r;t++){const d=n[t];(d.checked!==!0||d.indeterminate)&&(e=!1,d.disabled||(o=!1)),(d.checked!==!1||d.indeterminate)&&(s=!1)}return{all:e,none:s,allWithoutDisable:o,half:!e&&!s}},X=function(n){if(n.childNodes.length===0||n.loading)return;const{all:e,none:s,half:o}=le(n.childNodes);e?(n.checked=!0,n.indeterminate=!1):o?(n.checked=!1,n.indeterminate=!0):s&&(n.checked=!1,n.indeterminate=!1);const t=n.parent;!t||t.level===0||n.store.checkStrictly||X(t)},V=function(n,e){const s=n.store.props,o=n.data||{},t=s[e];if(typeof t=="function")return t(o,n);if(typeof t=="string")return o[t];if(typeof t>"u"){const r=o[e];return r===void 0?"":r}};let _e=0;class T{constructor(e){this.id=_e++,this.text=null,this.checked=!1,this.indeterminate=!1,this.data=null,this.expanded=!1,this.parent=null,this.visible=!0,this.isCurrent=!1,this.canFocus=!1;for(const s in e)te(e,s)&&(this[s]=e[s]);this.level=0,this.loaded=!1,this.childNodes=[],this.loading=!1,this.parent&&(this.level=this.parent.level+1)}initialize(){const e=this.store;if(!e)throw new Error("[Node]store is required!");e.registerNode(this);const s=e.props;if(s&&typeof s.isLeaf<"u"){const r=V(this,"isLeaf");typeof r=="boolean"&&(this.isLeafByUser=r)}if(e.lazy!==!0&&this.data?(this.setData(this.data),e.defaultExpandAll&&(this.expanded=!0,this.canFocus=!0)):this.level>0&&e.lazy&&e.defaultExpandAll&&this.expand(),Array.isArray(this.data)||he(this,this.data),!this.data)return;const o=e.defaultExpandedKeys,t=e.key;t&&o&&o.includes(this.key)&&this.expand(null,e.autoExpandParent),t&&e.currentNodeKey!==void 0&&this.key===e.currentNodeKey&&(e.currentNode=this,e.currentNode.isCurrent=!0),e.lazy&&e._initDefaultCheckedNode(this),this.updateLeafState(),this.parent&&(this.level===1||this.parent.expanded===!0)&&(this.canFocus=!0)}setData(e){Array.isArray(e)||he(this,e),this.data=e,this.childNodes=[];let s;this.level===0&&Array.isArray(this.data)?s=this.data:s=V(this,"children")||[];for(let o=0,t=s.length;o<t;o++)this.insertChild({data:s[o]})}get label(){return V(this,"label")}get key(){const e=this.store.key;return this.data?this.data[e]:null}get disabled(){return V(this,"disabled")}get nextSibling(){const e=this.parent;if(e){const s=e.childNodes.indexOf(this);if(s>-1)return e.childNodes[s+1]}return null}get previousSibling(){const e=this.parent;if(e){const s=e.childNodes.indexOf(this);if(s>-1)return s>0?e.childNodes[s-1]:null}return null}contains(e,s=!0){return(this.childNodes||[]).some(o=>o===e||s&&o.contains(e))}remove(){const e=this.parent;e&&e.removeChild(this)}insertChild(e,s,o){if(!e)throw new Error("InsertChild error: child is required.");if(!(e instanceof T)){if(!o){const t=this.getChildren(!0);t.includes(e.data)||(typeof s>"u"||s<0?t.push(e.data):t.splice(s,0,e.data))}Object.assign(e,{parent:this,store:this.store}),e=De(new T(e)),e instanceof T&&e.initialize()}e.level=this.level+1,typeof s>"u"||s<0?this.childNodes.push(e):this.childNodes.splice(s,0,e),this.updateLeafState()}insertBefore(e,s){let o;s&&(o=this.childNodes.indexOf(s)),this.insertChild(e,o)}insertAfter(e,s){let o;s&&(o=this.childNodes.indexOf(s),o!==-1&&(o+=1)),this.insertChild(e,o)}removeChild(e){const s=this.getChildren()||[],o=s.indexOf(e.data);o>-1&&s.splice(o,1);const t=this.childNodes.indexOf(e);t>-1&&(this.store&&this.store.deregisterNode(e),e.parent=null,this.childNodes.splice(t,1)),this.updateLeafState()}removeChildByData(e){let s=null;for(let o=0;o<this.childNodes.length;o++)if(this.childNodes[o].data===e){s=this.childNodes[o];break}s&&this.removeChild(s)}expand(e,s){const o=()=>{if(s){let t=this.parent;for(;t.level>0;)t.expanded=!0,t=t.parent}this.expanded=!0,e&&e(),this.childNodes.forEach(t=>{t.canFocus=!0})};this.shouldLoadData()?this.loadData(t=>{Array.isArray(t)&&(this.checked?this.setChecked(!0,!0):this.store.checkStrictly||X(this),o())}):o()}doCreateChildren(e,s={}){e.forEach(o=>{this.insertChild(Object.assign({data:o},s),void 0,!0)})}collapse(){this.expanded=!1,this.childNodes.forEach(e=>{e.canFocus=!1})}shouldLoadData(){return this.store.lazy===!0&&this.store.load&&!this.loaded}updateLeafState(){if(this.store.lazy===!0&&this.loaded!==!0&&typeof this.isLeafByUser<"u"){this.isLeaf=this.isLeafByUser;return}const e=this.childNodes;if(!this.store.lazy||this.store.lazy===!0&&this.loaded===!0){this.isLeaf=!e||e.length===0;return}this.isLeaf=!1}setChecked(e,s,o,t){if(this.indeterminate=e==="half",this.checked=e===!0,this.store.checkStrictly)return;if(!(this.shouldLoadData()&&!this.store.checkDescendants)){const{all:d,allWithoutDisable:a}=le(this.childNodes);!this.isLeaf&&!d&&a&&(this.checked=!1,e=!1);const p=()=>{if(s){const m=this.childNodes;for(let l=0,i=m.length;l<i;l++){const h=m[l];t=t||e!==!1;const y=h.disabled?h.checked:t;h.setChecked(y,s,!0,t)}const{half:v,all:u}=le(m);u||(this.checked=u,this.indeterminate=v)}};if(this.shouldLoadData()){this.loadData(()=>{p(),X(this)},{checked:e!==!1});return}else p()}const r=this.parent;!r||r.level===0||o||X(r)}getChildren(e=!1){if(this.level===0)return this.data;const s=this.data;if(!s)return null;const o=this.store.props;let t="children";return o&&(t=o.children||"children"),s[t]===void 0&&(s[t]=null),e&&!s[t]&&(s[t]=[]),s[t]}updateChildren(){const e=this.getChildren()||[],s=this.childNodes.map(r=>r.data),o={},t=[];e.forEach((r,d)=>{const a=r[q];!!a&&s.findIndex(m=>m[q]===a)>=0?o[a]={index:d,data:r}:t.push({index:d,data:r})}),this.store.lazy||s.forEach(r=>{o[r[q]]||this.removeChildByData(r)}),t.forEach(({index:r,data:d})=>{this.insertChild({data:d},r)}),this.updateLeafState()}loadData(e,s={}){if(this.store.lazy===!0&&this.store.load&&!this.loaded&&(!this.loading||Object.keys(s).length)){this.loading=!0;const o=t=>{this.childNodes=[],this.doCreateChildren(t,s),this.loaded=!0,this.loading=!1,this.updateLeafState(),e&&e.call(this,t)};this.store.load(this,o)}else e&&e.call(this)}}class Ye{constructor(e){this.currentNode=null,this.currentNodeKey=null;for(const s in e)te(e,s)&&(this[s]=e[s]);this.nodesMap={}}initialize(){if(this.root=new T({data:this.data,store:this}),this.root.initialize(),this.lazy&&this.load){const e=this.load;e(this.root,s=>{this.root.doCreateChildren(s),this._initDefaultCheckedNodes()})}else this._initDefaultCheckedNodes()}filter(e){const s=this.filterNodeMethod,o=this.lazy,t=function(r){const d=r.root?r.root.childNodes:r.childNodes;if(d.forEach(a=>{a.visible=s.call(a,e,a.data,a),t(a)}),!r.visible&&d.length){let a=!0;a=!d.some(p=>p.visible),r.root?r.root.visible=a===!1:r.visible=a===!1}e&&r.visible&&!r.isLeaf&&!o&&r.expand()};t(this)}setData(e){e!==this.root.data?(this.root.setData(e),this._initDefaultCheckedNodes()):this.root.updateChildren()}getNode(e){if(e instanceof T)return e;const s=be(e)?de(this.key,e):e;return this.nodesMap[s]||null}insertBefore(e,s){const o=this.getNode(s);o.parent.insertBefore({data:e},o)}insertAfter(e,s){const o=this.getNode(s);o.parent.insertAfter({data:e},o)}remove(e){const s=this.getNode(e);s&&s.parent&&(s===this.currentNode&&(this.currentNode=null),s.parent.removeChild(s))}append(e,s){const o=s?this.getNode(s):this.root;o&&o.insertChild({data:e})}_initDefaultCheckedNodes(){const e=this.defaultCheckedKeys||[],s=this.nodesMap;e.forEach(o=>{const t=s[o];t&&t.setChecked(!0,!this.checkStrictly)})}_initDefaultCheckedNode(e){(this.defaultCheckedKeys||[]).includes(e.key)&&e.setChecked(!0,!this.checkStrictly)}setDefaultCheckedKey(e){e!==this.defaultCheckedKeys&&(this.defaultCheckedKeys=e,this._initDefaultCheckedNodes())}registerNode(e){const s=this.key;!e||!e.data||(s?e.key!==void 0&&(this.nodesMap[e.key]=e):this.nodesMap[e.id]=e)}deregisterNode(e){!this.key||!e||!e.data||(e.childNodes.forEach(o=>{this.deregisterNode(o)}),delete this.nodesMap[e.key])}getCheckedNodes(e=!1,s=!1){const o=[],t=function(r){(r.root?r.root.childNodes:r.childNodes).forEach(a=>{(a.checked||s&&a.indeterminate)&&(!e||e&&a.isLeaf)&&o.push(a.data),t(a)})};return t(this),o}getCheckedKeys(e=!1){return this.getCheckedNodes(e).map(s=>(s||{})[this.key])}getHalfCheckedNodes(){const e=[],s=function(o){(o.root?o.root.childNodes:o.childNodes).forEach(r=>{r.indeterminate&&e.push(r.data),s(r)})};return s(this),e}getHalfCheckedKeys(){return this.getHalfCheckedNodes().map(e=>(e||{})[this.key])}_getAllNodes(){const e=[],s=this.nodesMap;for(const o in s)te(s,o)&&e.push(s[o]);return e}updateChildren(e,s){const o=this.nodesMap[e];if(!o)return;const t=o.childNodes;for(let r=t.length-1;r>=0;r--){const d=t[r];this.remove(d.data)}for(let r=0,d=s.length;r<d;r++){const a=s[r];this.append(a,o.data)}}_setCheckedKeys(e,s=!1,o){const t=this._getAllNodes().sort((a,p)=>p.level-a.level),r=Object.create(null),d=Object.keys(o);t.forEach(a=>a.setChecked(!1,!1));for(let a=0,p=t.length;a<p;a++){const m=t[a],v=m.data[e].toString();if(!d.includes(v)){m.checked&&!r[v]&&m.setChecked(!1,!1);continue}let l=m.parent;for(;l&&l.level>0;)r[l.data[e]]=!0,l=l.parent;if(m.isLeaf||this.checkStrictly){m.setChecked(!0,!1);continue}if(m.setChecked(!0,!0),s){m.setChecked(!1,!1);const i=function(h){h.childNodes.forEach(g=>{g.isLeaf||g.setChecked(!1,!1),i(g)})};i(m)}}}setCheckedNodes(e,s=!1){const o=this.key,t={};e.forEach(r=>{t[(r||{})[o]]=!0}),this._setCheckedKeys(o,s,t)}setCheckedKeys(e,s=!1){this.defaultCheckedKeys=e;const o=this.key,t={};e.forEach(r=>{t[r]=!0}),this._setCheckedKeys(o,s,t)}setDefaultExpandedKeys(e){e=e||[],this.defaultExpandedKeys=e,e.forEach(s=>{const o=this.getNode(s);o&&o.expand(null,this.autoExpandParent)})}setChecked(e,s,o){const t=this.getNode(e);t&&t.setChecked(!!s,o)}getCurrentNode(){return this.currentNode}setCurrentNode(e){const s=this.currentNode;s&&(s.isCurrent=!1),this.currentNode=e,this.currentNode.isCurrent=!0}setUserCurrentNode(e,s=!0){const o=e[this.key],t=this.nodesMap[o];this.setCurrentNode(t),s&&this.currentNode.level>1&&this.currentNode.parent.expand(null,!0)}setCurrentNodeKey(e,s=!0){if(e==null){this.currentNode&&(this.currentNode.isCurrent=!1),this.currentNode=null;return}const o=this.getNode(e);o&&(this.setCurrentNode(o),s&&this.currentNode.level>1&&this.currentNode.parent.expand(null,!0))}}const Ve=ie({name:"ElTreeNodeContent",props:{node:{type:Object,required:!0},renderContent:Function},setup(n){const e=H("tree"),s=O("NodeInstance"),o=O("RootTree");return()=>{const t=n.node,{data:r,store:d}=t;return n.renderContent?n.renderContent(ce,{_self:s,node:t,data:r,store:d}):fe(o.ctx.slots,"default",{node:t,data:r},()=>[ce("span",{class:e.be("node","label")},[t.label])])}}});var We=ae(Ve,[["__file","tree-node-content.vue"]]);function Ne(n){const e=O("TreeNodeMap",null),s={treeNodeExpand:o=>{n.node!==o&&n.node.collapse()},children:[]};return e&&e.children.push(s),z("TreeNodeMap",s),{broadcastExpanded:o=>{if(n.accordion)for(const t of s.children)t.treeNodeExpand(o)}}}const ge=Symbol("dragEvents");function Xe({props:n,ctx:e,el$:s,dropIndicator$:o,store:t}){const r=H("tree"),d=D({showDropIndicator:!1,draggingNode:null,dropNode:null,allowDrop:!0,dropType:null});return z(ge,{treeNodeDragStart:({event:v,treeNode:u})=>{if(typeof n.allowDrag=="function"&&!n.allowDrag(u.node))return v.preventDefault(),!1;v.dataTransfer.effectAllowed="move";try{v.dataTransfer.setData("text/plain","")}catch{}d.value.draggingNode=u,e.emit("node-drag-start",u.node,v)},treeNodeDragOver:({event:v,treeNode:u})=>{const l=u,i=d.value.dropNode;i&&i.node.id!==l.node.id&&ne(i.$el,r.is("drop-inner"));const h=d.value.draggingNode;if(!h||!l)return;let y=!0,g=!0,C=!0,P=!0;typeof n.allowDrop=="function"&&(y=n.allowDrop(h.node,l.node,"prev"),P=g=n.allowDrop(h.node,l.node,"inner"),C=n.allowDrop(h.node,l.node,"next")),v.dataTransfer.dropEffect=g||y||C?"move":"none",(y||g||C)&&(i==null?void 0:i.node.id)!==l.node.id&&(i&&e.emit("node-drag-leave",h.node,i.node,v),e.emit("node-drag-enter",h.node,l.node,v)),(y||g||C)&&(d.value.dropNode=l),l.node.nextSibling===h.node&&(C=!1),l.node.previousSibling===h.node&&(y=!1),l.node.contains(h.node,!1)&&(g=!1),(h.node===l.node||h.node.contains(l.node))&&(y=!1,g=!1,C=!1);const x=l.$el.querySelector(`.${r.be("node","content")}`).getBoundingClientRect(),S=s.value.getBoundingClientRect();let b;const _=y?g?.25:C?.45:1:-1,Y=C?g?.75:y?.55:0:1;let A=-9999;const f=v.clientY-x.top;f<x.height*_?b="before":f>x.height*Y?b="after":g?b="inner":b="none";const E=l.$el.querySelector(`.${r.be("node","expand-icon")}`).getBoundingClientRect(),k=o.value;b==="before"?A=E.top-S.top:b==="after"&&(A=E.bottom-S.top),k.style.top=`${A}px`,k.style.left=`${E.right-S.left}px`,b==="inner"?Ge(l.$el,r.is("drop-inner")):ne(l.$el,r.is("drop-inner")),d.value.showDropIndicator=b==="before"||b==="after",d.value.allowDrop=d.value.showDropIndicator||P,d.value.dropType=b,e.emit("node-drag-over",h.node,l.node,v)},treeNodeDragEnd:v=>{const{draggingNode:u,dropType:l,dropNode:i}=d.value;if(v.preventDefault(),v.dataTransfer.dropEffect="move",u&&i){const h={data:u.node.data};l!=="none"&&u.node.remove(),l==="before"?i.node.parent.insertBefore(h,i.node):l==="after"?i.node.parent.insertAfter(h,i.node):l==="inner"&&i.node.insertChild(h),l!=="none"&&t.value.registerNode(h),ne(i.$el,r.is("drop-inner")),e.emit("node-drag-end",u.node,i.node,l,v),l!=="none"&&e.emit("node-drop",u.node,i.node,l,v)}u&&!i&&e.emit("node-drag-end",u.node,null,l,v),d.value.showDropIndicator=!1,d.value.draggingNode=null,d.value.dropNode=null,d.value.allowDrop=!0}}),{dragState:d}}const Qe=ie({name:"ElTreeNode",components:{ElCollapseTransition:ze,ElCheckbox:Ae,NodeContent:We,ElIcon:Ue,Loading:Be},props:{node:{type:T,default:()=>({})},props:{type:Object,default:()=>({})},accordion:Boolean,renderContent:Function,renderAfterExpand:Boolean,showCheckbox:{type:Boolean,default:!1}},emits:["node-expand"],setup(n,e){const s=H("tree"),{broadcastExpanded:o}=Ne(n),t=O("RootTree"),r=D(!1),d=D(!1),a=D(null),p=D(null),m=D(null),v=O(ge),u=me();z("NodeInstance",u),n.node.expanded&&(r.value=!0,d.value=!0);const l=t.props.props.children||"children";F(()=>{const f=n.node.data[l];return f&&[...f]},()=>{n.node.updateChildren()}),F(()=>n.node.indeterminate,f=>{y(n.node.checked,f)}),F(()=>n.node.checked,f=>{y(f,n.node.indeterminate)}),F(()=>n.node.expanded,f=>{Z(()=>r.value=f),f&&(d.value=!0)});const i=f=>de(t.props.nodeKey,f.data),h=f=>{const E=n.props.class;if(!E)return{};let k;if(Fe(E)){const{data:ee}=f;k=E(ee,f)}else k=E;return Le(k)?{[k]:!0}:k},y=(f,E)=>{(a.value!==f||p.value!==E)&&t.ctx.emit("check-change",n.node.data,f,E),a.value=f,p.value=E},g=f=>{re(t.store,t.ctx.emit,()=>t.store.value.setCurrentNode(n.node)),t.currentNode.value=n.node,t.props.expandOnClickNode&&P(),t.props.checkOnClickNode&&!n.node.disabled&&x(null,{target:{checked:!n.node.checked}}),t.ctx.emit("node-click",n.node.data,n.node,u,f)},C=f=>{t.instance.vnode.props.onNodeContextmenu&&(f.stopPropagation(),f.preventDefault()),t.ctx.emit("node-contextmenu",f,n.node.data,n.node,u)},P=()=>{n.node.isLeaf||(r.value?(t.ctx.emit("node-collapse",n.node.data,n.node,u),n.node.collapse()):(n.node.expand(),e.emit("node-expand",n.node.data,n.node,u)))},x=(f,E)=>{n.node.setChecked(E.target.checked,!t.props.checkStrictly),Z(()=>{const k=t.store.value;t.ctx.emit("check",n.node.data,{checkedNodes:k.getCheckedNodes(),checkedKeys:k.getCheckedKeys(),halfCheckedNodes:k.getHalfCheckedNodes(),halfCheckedKeys:k.getHalfCheckedKeys()})})};return{ns:s,node$:m,tree:t,expanded:r,childNodeRendered:d,oldChecked:a,oldIndeterminate:p,getNodeKey:i,getNodeClass:h,handleSelectChange:y,handleClick:g,handleContextMenu:C,handleExpandIconClick:P,handleCheckChange:x,handleChildNodeExpand:(f,E,k)=>{o(E),t.ctx.emit("node-expand",f,E,k)},handleDragStart:f=>{t.props.draggable&&v.treeNodeDragStart({event:f,treeNode:n})},handleDragOver:f=>{f.preventDefault(),t.props.draggable&&v.treeNodeDragOver({event:f,treeNode:{$el:m.value,node:n.node}})},handleDrop:f=>{f.preventDefault()},handleDragEnd:f=>{t.props.draggable&&v.treeNodeDragEnd(f)},CaretRight:qe}}}),Ze=["aria-expanded","aria-disabled","aria-checked","draggable","data-key"],en=["aria-expanded"];function nn(n,e,s,o,t,r){const d=w("el-icon"),a=w("el-checkbox"),p=w("loading"),m=w("node-content"),v=w("el-tree-node"),u=w("el-collapse-transition");return se((j(),K("div",{ref:"node$",class:L([n.ns.b("node"),n.ns.is("expanded",n.expanded),n.ns.is("current",n.node.isCurrent),n.ns.is("hidden",!n.node.visible),n.ns.is("focusable",!n.node.disabled),n.ns.is("checked",!n.node.disabled&&n.node.checked),n.getNodeClass(n.node)]),role:"treeitem",tabindex:"-1","aria-expanded":n.expanded,"aria-disabled":n.node.disabled,"aria-checked":n.node.checked,draggable:n.tree.props.draggable,"data-key":n.getNodeKey(n.node),onClick:e[1]||(e[1]=I((...l)=>n.handleClick&&n.handleClick(...l),["stop"])),onContextmenu:e[2]||(e[2]=(...l)=>n.handleContextMenu&&n.handleContextMenu(...l)),onDragstart:e[3]||(e[3]=I((...l)=>n.handleDragStart&&n.handleDragStart(...l),["stop"])),onDragover:e[4]||(e[4]=I((...l)=>n.handleDragOver&&n.handleDragOver(...l),["stop"])),onDragend:e[5]||(e[5]=I((...l)=>n.handleDragEnd&&n.handleDragEnd(...l),["stop"])),onDrop:e[6]||(e[6]=I((...l)=>n.handleDrop&&n.handleDrop(...l),["stop"]))},[B("div",{class:L(n.ns.be("node","content")),style:xe({paddingLeft:(n.node.level-1)*n.tree.props.indent+"px"})},[n.tree.props.icon||n.CaretRight?(j(),M(d,{key:0,class:L([n.ns.be("node","expand-icon"),n.ns.is("leaf",n.node.isLeaf),{expanded:!n.node.isLeaf&&n.expanded}]),onClick:I(n.handleExpandIconClick,["stop"])},{default:W(()=>[(j(),M(Pe(n.tree.props.icon||n.CaretRight)))]),_:1},8,["class","onClick"])):U("v-if",!0),n.showCheckbox?(j(),M(a,{key:1,"model-value":n.node.checked,indeterminate:n.node.indeterminate,disabled:!!n.node.disabled,onClick:e[0]||(e[0]=I(()=>{},["stop"])),onChange:n.handleCheckChange},null,8,["model-value","indeterminate","disabled","onChange"])):U("v-if",!0),n.node.loading?(j(),M(d,{key:2,class:L([n.ns.be("node","loading-icon"),n.ns.is("loading")])},{default:W(()=>[$(p)]),_:1},8,["class"])):U("v-if",!0),$(m,{node:n.node,"render-content":n.renderContent},null,8,["node","render-content"])],6),$(u,null,{default:W(()=>[!n.renderAfterExpand||n.childNodeRendered?se((j(),K("div",{key:0,class:L(n.ns.be("node","children")),role:"group","aria-expanded":n.expanded},[(j(!0),K(ve,null,pe(n.node.childNodes,l=>(j(),M(v,{key:n.getNodeKey(l),"render-content":n.renderContent,"render-after-expand":n.renderAfterExpand,"show-checkbox":n.showCheckbox,node:l,accordion:n.accordion,props:n.props,onNodeExpand:n.handleChildNodeExpand},null,8,["render-content","render-after-expand","show-checkbox","node","accordion","props","onNodeExpand"]))),128))],10,en)),[[oe,n.expanded]]):U("v-if",!0)]),_:1})],42,Ze)),[[oe,n.node.visible]])}var tn=ae(Qe,[["render",nn],["__file","tree-node.vue"]]);function sn({el$:n},e){const s=H("tree"),o=ue([]),t=ue([]);ye(()=>{d()}),we(()=>{o.value=Array.from(n.value.querySelectorAll("[role=treeitem]")),t.value=Array.from(n.value.querySelectorAll("input[type=checkbox]"))}),F(t,a=>{a.forEach(p=>{p.setAttribute("tabindex","-1")})}),He(n,"keydown",a=>{const p=a.target;if(!p.className.includes(s.b("node")))return;const m=a.code;o.value=Array.from(n.value.querySelectorAll(`.${s.is("focusable")}[role=treeitem]`));const v=o.value.indexOf(p);let u;if([R.up,R.down].includes(m)){if(a.preventDefault(),m===R.up){u=v===-1?0:v!==0?v-1:o.value.length-1;const i=u;for(;!e.value.getNode(o.value[u].dataset.key).canFocus;){if(u--,u===i){u=-1;break}u<0&&(u=o.value.length-1)}}else{u=v===-1?0:v<o.value.length-1?v+1:0;const i=u;for(;!e.value.getNode(o.value[u].dataset.key).canFocus;){if(u++,u===i){u=-1;break}u>=o.value.length&&(u=0)}}u!==-1&&o.value[u].focus()}[R.left,R.right].includes(m)&&(a.preventDefault(),p.click());const l=p.querySelector('[type="checkbox"]');[R.enter,R.space].includes(m)&&l&&(a.preventDefault(),l.click())});const d=()=>{var a;o.value=Array.from(n.value.querySelectorAll(`.${s.is("focusable")}[role=treeitem]`)),t.value=Array.from(n.value.querySelectorAll("input[type=checkbox]"));const p=n.value.querySelectorAll(`.${s.is("checked")}[role=treeitem]`);if(p.length){p[0].setAttribute("tabindex","0");return}(a=o.value[0])==null||a.setAttribute("tabindex","0")}}const on=ie({name:"ElTree",components:{ElTreeNode:tn},props:{data:{type:Array,default:()=>[]},emptyText:{type:String},renderAfterExpand:{type:Boolean,default:!0},nodeKey:String,checkStrictly:Boolean,defaultExpandAll:Boolean,expandOnClickNode:{type:Boolean,default:!0},checkOnClickNode:Boolean,checkDescendants:{type:Boolean,default:!1},autoExpandParent:{type:Boolean,default:!0},defaultCheckedKeys:Array,defaultExpandedKeys:Array,currentNodeKey:[String,Number],renderContent:Function,showCheckbox:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},allowDrag:Function,allowDrop:Function,props:{type:Object,default:()=>({children:"children",label:"label",disabled:"disabled"})},lazy:{type:Boolean,default:!1},highlightCurrent:Boolean,load:Function,filterNodeMethod:Function,accordion:Boolean,indent:{type:Number,default:18},icon:{type:Je}},emits:["check-change","current-change","node-click","node-contextmenu","node-collapse","node-expand","check","node-drag-start","node-drag-end","node-drop","node-drag-leave","node-drag-enter","node-drag-over"],setup(n,e){const{t:s}=Ie(),o=H("tree"),t=D(new Ye({key:n.nodeKey,data:n.data,lazy:n.lazy,props:n.props,load:n.load,currentNodeKey:n.currentNodeKey,checkStrictly:n.checkStrictly,checkDescendants:n.checkDescendants,defaultCheckedKeys:n.defaultCheckedKeys,defaultExpandedKeys:n.defaultExpandedKeys,autoExpandParent:n.autoExpandParent,defaultExpandAll:n.defaultExpandAll,filterNodeMethod:n.filterNodeMethod}));t.value.initialize();const r=D(t.value.root),d=D(null),a=D(null),p=D(null),{broadcastExpanded:m}=Ne(n),{dragState:v}=Xe({props:n,ctx:e,el$:a,dropIndicator$:p,store:t});sn({el$:a},t);const u=Re(()=>{const{childNodes:c}=r.value;return!c||c.length===0||c.every(({visible:N})=>!N)});F(()=>n.currentNodeKey,c=>{t.value.setCurrentNodeKey(c)}),F(()=>n.defaultCheckedKeys,c=>{t.value.setDefaultCheckedKey(c)}),F(()=>n.defaultExpandedKeys,c=>{t.value.setDefaultExpandedKeys(c)}),F(()=>n.data,c=>{t.value.setData(c)},{deep:!0}),F(()=>n.checkStrictly,c=>{t.value.checkStrictly=c});const l=c=>{if(!n.filterNodeMethod)throw new Error("[Tree] filterNodeMethod is required when filter");t.value.filter(c)},i=c=>de(n.nodeKey,c.data),h=c=>{if(!n.nodeKey)throw new Error("[Tree] nodeKey is required in getNodePath");const N=t.value.getNode(c);if(!N)return[];const G=[N.data];let J=N.parent;for(;J&&J!==r.value;)G.push(J.data),J=J.parent;return G.reverse()},y=(c,N)=>t.value.getCheckedNodes(c,N),g=c=>t.value.getCheckedKeys(c),C=()=>{const c=t.value.getCurrentNode();return c?c.data:null},P=()=>{if(!n.nodeKey)throw new Error("[Tree] nodeKey is required in getCurrentKey");const c=C();return c?c[n.nodeKey]:null},x=(c,N)=>{if(!n.nodeKey)throw new Error("[Tree] nodeKey is required in setCheckedNodes");t.value.setCheckedNodes(c,N)},S=(c,N)=>{if(!n.nodeKey)throw new Error("[Tree] nodeKey is required in setCheckedKeys");t.value.setCheckedKeys(c,N)},b=(c,N,G)=>{t.value.setChecked(c,N,G)},_=()=>t.value.getHalfCheckedNodes(),Y=()=>t.value.getHalfCheckedKeys(),A=(c,N=!0)=>{if(!n.nodeKey)throw new Error("[Tree] nodeKey is required in setCurrentNode");re(t,e.emit,()=>t.value.setUserCurrentNode(c,N))},f=(c,N=!0)=>{if(!n.nodeKey)throw new Error("[Tree] nodeKey is required in setCurrentKey");re(t,e.emit,()=>t.value.setCurrentNodeKey(c,N))},E=c=>t.value.getNode(c),k=c=>{t.value.remove(c)},ee=(c,N)=>{t.value.append(c,N)},Ce=(c,N)=>{t.value.insertBefore(c,N)},Ee=(c,N)=>{t.value.insertAfter(c,N)},ke=(c,N,G)=>{m(N),e.emit("node-expand",c,N,G)},je=(c,N)=>{if(!n.nodeKey)throw new Error("[Tree] nodeKey is required in updateKeyChild");t.value.updateChildren(c,N)};return z("RootTree",{ctx:e,props:n,store:t,root:r,currentNode:d,instance:me()}),z($e,void 0),{ns:o,store:t,root:r,currentNode:d,dragState:v,el$:a,dropIndicator$:p,isEmpty:u,filter:l,getNodeKey:i,getNodePath:h,getCheckedNodes:y,getCheckedKeys:g,getCurrentNode:C,getCurrentKey:P,setCheckedNodes:x,setCheckedKeys:S,setChecked:b,getHalfCheckedNodes:_,getHalfCheckedKeys:Y,setCurrentNode:A,setCurrentKey:f,t:s,getNode:E,remove:k,append:ee,insertBefore:Ce,insertAfter:Ee,handleNodeExpand:ke,updateKeyChildren:je}}});function rn(n,e,s,o,t,r){const d=w("el-tree-node");return j(),K("div",{ref:"el$",class:L([n.ns.b(),n.ns.is("dragging",!!n.dragState.draggingNode),n.ns.is("drop-not-allow",!n.dragState.allowDrop),n.ns.is("drop-inner",n.dragState.dropType==="inner"),{[n.ns.m("highlight-current")]:n.highlightCurrent}]),role:"tree"},[(j(!0),K(ve,null,pe(n.root.childNodes,a=>(j(),M(d,{key:n.getNodeKey(a),node:a,props:n.props,accordion:n.accordion,"render-after-expand":n.renderAfterExpand,"show-checkbox":n.showCheckbox,"render-content":n.renderContent,onNodeExpand:n.handleNodeExpand},null,8,["node","props","accordion","render-after-expand","show-checkbox","render-content","onNodeExpand"]))),128)),n.isEmpty?(j(),K("div",{key:0,class:L(n.ns.e("empty-block"))},[fe(n.$slots,"empty",{},()=>{var a;return[B("span",{class:L(n.ns.e("empty-text"))},Me((a=n.emptyText)!=null?a:n.t("el.tree.emptyText")),3)]})],2)):U("v-if",!0),se(B("div",{ref:"dropIndicator$",class:L(n.ns.e("drop-indicator"))},null,2),[[oe,n.dragState.showDropIndicator]])],2)}var Q=ae(on,[["render",rn],["__file","tree.vue"]]);Q.install=n=>{n.component(Q.name,Q)};const ln=Q,an=ln;const dn=`# Promise
Promise基本原理

1、Promise 是一个类，在执行这个类的时候，会传入一个执行器，这个执行器会立即执行

2、Promise 有三个状态

\`Pending 等待\`

\`Fulfilled 完成\`

\`Rejected 失败\`

3、状态只能由 Pending --> Fulfilled， 或者 Pending --> Rejected ，并且一旦发生改变就不能修改

4、Promise中使用 resolve 和 reject 来改变状态

5、then方法中做的事儿就是状态的判断，

\`如果状态是成功，调用成功的回调函数\`

\`如果状态是失败，调用失败的回调函数\`

### 一、Promise核心逻辑的实现

1、新建 MyPromise 类，传入 执行器 executor

\`\`\`jsx
class MyPromise {
    constructor (executor) {
        // exevutor 是一个执行器，会立即执行
        executor()
    }
}
\`\`\`

 

2、executor 执行器传入 resolve 和 reject 方法

\`\`\`jsx
class MyPromise {
    constructor(executor) {
        // exevutor 是一个执行器，会立即执行
        // 并传入resolve和reject方法
        // 为什么要用this去接，因为这是 MyPromise 内部的方法
        executor(this.resolve, this.reject)    
    }
    // 为什么 要用箭头函数？ 
    // 因为如果直接调用的话，普通函数的this会直接指向 window 或者 undefined
    // 用箭头函数就可以让this指向当前实例对象
    
    // 更改成功后的状态
    resolve = () => {}
    
    // 更改失败后的状态
    reject = () => {}
}
\`\`\`

3、状态与结果的管理

\`\`\`jsx
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        executor(this.resolve, this.reject)
    }
    // 存储状态的变量，初始值是pending
    status = PENDING

    // 成功之后的值
    value = null

    // 失败之后的值
    reason = null

    // 更改成功后的状态
    resolve = (value) => {
        
        // 只有状态是等待，才能执行状态修改
        if(this.status === PENDING) {
            // 修改状态为成功
            this.status = FULFILLED
            // 保存成功之后的值
            this.value = value 
        }
        
    }
    reject = (reason) => {
        // 只有状态是等待，才能执行状态修改
        if(this.status === PENDING) {
            // 修改状态为成功
            this.status = REJECTED
            // 保存成功之后的值
            this.reason = reason 
        }
    }
}
\`\`\`

4. then 的简单实现

\`\`\`jsx
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
    constructor(executor) {
        executor(this.resolve, this.reject)
    }
    status=PENDING

    value = null
    reason = null
    resolve = (value) => {
        if(this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
        }
    }
    reject = (reason) => {
        if(this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
        }
    }
    then(onFulfilled, onRejected) {
        // 判断状态
        if(this.status === FULFILLED) {
            // 调用成功的回调函数，并且把值返回
            onFulfilled(this.value)
        } else if(this.status === REJECTED) {
            // 调用成功的回调函数，并且把原因返回
            onRejected(this.reason)
        }
    }
}

// 5、使用 module.exports 对外暴露 MyPromise 类
module.exports = MyPromise;
\`\`\`

5、使用 module.exports 对外暴露 MyPromise 类

\`\`\`jsx
module.exports = MyPromise;
\`\`\`

test

\`\`\`jsx
// Promise.resolve().then(() => {
//     console.log(0);
//     return Promise.resolve(4);
// }).then((res) => {
//     console.log(res)
// })

// Promise.resolve().then(() => {
//     console.log(1);
// }).then(() => {
//     console.log(2);
// }).then(() => {
//     console.log(3);
// }).then(() => {
//     console.log(5);
// }).then(() =>{
//     console.log(6);
// })

const MyPromise = require('./MyPromise1.js')
const promise = new MyPromise((resolve, reject) => {
    resolve('success')
    reject('err')
})

 promise.then(value => {
    console.log('resolve', value)
  }, reason => {
    console.log('reject', reason)
  })
\`\`\`

### 二、在 Promise 类中加入异步逻辑

MyPromise 类

\`\`\`jsx
 const PENDING = 'pending';
 const FULFILLED = 'fulfilled';
 const REJECTED = 'rejected';
 class MyPromise {
     constructor(executor) {
         executor(this.resolve, this.reject)
     }
     status=PENDING
 
     value = null
     reason = null
     resolve = (value) => {
         if(this.status === PENDING) {
             this.status = FULFILLED
             this.value = value
         }
     }
     reject = (reason) => {
         if(this.status === PENDING) {
             this.status = REJECTED
             this.reason = reason
         }
     }
     then(onFulfilled, onRejected) {
         // 判断状态
         if(this.status === FULFILLED) {
             // 调用成功的回调函数，并且把值返回
             onFulfilled(this.value)
         } else if(this.status === REJECTED) {
             // 调用成功的回调函数，并且把原因返回
             onRejected(this.reason)
         }
     }
 }
\`\`\`

1、缓存成功与失败回调

\`\`\`jsx
const PENDING = 'pending';
 const FULFILLED = 'fulfilled';
 const REJECTED = 'rejected';
 class MyPromise {
     constructor(executor) {
         executor(this.resolve, this.reject)
     }
     status=PENDING
 
     value = null
     reason = null
     // ======== new ==========
     // 存储 成功的回调函数
     onFulfilledCallback = null;

     // 存储 失败的回调函数
     onRejeectedCallback = null;

     resolve = (value) => {
         if(this.status === PENDING) {
             this.status = FULFILLED
             this.value = value
         }
     }
     reject = (reason) => {
         if(this.status === PENDING) {
             this.status = REJECTED
             this.reason = reason
         }
     }
     then(onFulfilled, onRejected) {
         // 判断状态
         if(this.status === FULFILLED) {
             // 调用成功的回调函数，并且把值返回
             onFulfilled(this.value)
         } else if(this.status === REJECTED) {
             // 调用成功的回调函数，并且把原因返回
             onRejected(this.reason)
         } 
     }
 }
\`\`\`

2、then 方法中的 Pending 的处理

\`\`\`jsx
const PENDING = 'pending';
 const FULFILLED = 'fulfilled';
 const REJECTED = 'rejected';
 class MyPromise {
     constructor(executor) {
         executor(this.resolve, this.reject)
     }
     status=PENDING
 
     value = null
     reason = null
     // 存储 成功的回调函数
     onFulfilledCallback = null;

     // 存储 失败的回调函数
     onRejeectedCallback = null;

     resolve = (value) => {
         if(this.status === PENDING) {
             this.status = FULFILLED
             this.value = value
         }
     }
     reject = (reason) => {
         if(this.status === PENDING) {
             this.status = REJECTED
             this.reason = reason
         }
     }
     then(onFulfilled, onRejected) {
         // 判断状态
         if(this.status === FULFILLED) {
             // 调用成功的回调函数，并且把值返回
             onFulfilled(this.value)
         } else if(this.status === REJECTED) {
             // 调用成功的回调函数，并且把原因返回
             onRejected(this.reason)
         } else if(this.status = PENDING) {
            // == new ==
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功或者失败函数的时候再传递
            this.onFulfilledCallback = onFulfilled
            this.onRejeectedCallback = onFulfilled
        }
     }
 }
\`\`\`

3、resolve 与 reject 中调用回调函数

\`\`\`jsx
const PENDING = 'pending';
 const FULFILLED = 'fulfilled';
 const REJECTED = 'rejected';
 class MyPromise {
     constructor(executor) {
         executor(this.resolve, this.reject)
     }
     status=PENDING
 
     value = null
     reason = null
     // 存储 成功的回调函数
     onFulfilledCallback = null;

     // 存储 失败的回调函数
     onRejeectedCallback = null;

     resolve = (value) => {
         if(this.status === PENDING) {
             this.status = FULFILLED
             this.value = value
             // == new ==
             // 判断成功回调是否存在，如果存在，就调用
             this.onFulfilledCallback && this.onFulfilledCallback(value)
         }
     }
     reject = (reason) => {
         if(this.status === PENDING) {
             this.status = REJECTED
             this.reason = reason
             // == new ==
             // 判断失败回调是否存在，如果存在，就调用
             this.onRejeectedCallback && this.onRejeectedCallback(value)
         }
     }
     then(onFulfilled, onRejected) {
         // 判断状态
         if(this.status === FULFILLED) {
             // 调用成功的回调函数，并且把值返回
             onFulfilled(this.value)
         } else if(this.status === REJECTED) {
             // 调用成功的回调函数，并且把原因返回
             onRejected(this.reason)
         } else if(this.status = PENDING) {
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功或者失败函数的时候再传递
            this.onFulfilledCallback = onFulfilled
            this.onRejeectedCallback = onFulfilled
        }
     }
 }
\`\`\`

test

\`\`\`jsx
const MyPromise = require('./MyPromise2.js')
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})
\`\`\`

### 三、实现 then 方法 多次调用 添加多个处理函数

- Promise 的 then 方法是可以被多次调用的，
- 如果有三个then的调用，如果是同步回调，那么直接返回当前的值就行，
- 如果是异步回调，那么保存的成功失败的回调，需要用不同的值来保存
- 因为都互不相同

1、在 MyPromise 中新增两个数组

\`\`\`jsx
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
    constructor(executor) {
        executor(this.resolve, this.reject)
    }
    status=PENDING

    value = null
    reason = null
		// 存储 成功的回调函数
		// ============ new ============
		//  onFulfilledCallback = null;
		onFulfilledCallback = []
		// 存储 失败的回调函数
		//  onRejeectedCallback = null;
		onRejeectedCallback = []

    resolve = (value) => {
        if(this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            // == new ==
            // 判断成功回调是否存在，如果存在，就调用
            this.onFulfilledCallback && this.onFulfilledCallback(value)
        }
    }
    reject = (reason) => {
        if(this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            // == new ==
            // 判断失败回调是否存在，如果存在，就调用
            this.onRejeectedCallback && this.onRejeectedCallback(value)
        }
    }
    then(onFulfilled, onRejected) {
        // 判断状态
        if(this.status === FULFILLED) {
            // 调用成功的回调函数，并且把值返回
            onFulfilled(this.value)
        } else if(this.status === REJECTED) {
            // 调用成功的回调函数，并且把原因返回
            onRejected(this.reason)
        } else if(this.status = PENDING) {
		        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
		        // 等到执行成功或者失败函数的时候再传递
		        this.onFulfilledCallback = onFulfilled
		        this.onRejeectedCallback = onFulfilled
		    }
    }
}
\`\`\`

2、回调函数存在数组中

\`\`\`jsx
const PENDING = 'pending';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';
  class MyPromise {
    constructor(executor) {
        executor(this.resolve, this.reject)
    }
    status=PENDING

    value = null
    reason = null
    // 存储 成功的回调函数
    //  onFulfilledCallback = null;
     onFulfilledCallback = []
     // 存储 失败的回调函数
     onRejeectedCallback = null;
    onRejeectedCallback = []

    resolve = (value) => {
        if(this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            
            // 判断成功回调是否存在，如果存在，就调用
            this.onFulfilledCallback && this.onFulfilledCallback(value)
        }
    }
    reject = (reason) => {
        if(this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            // 判断失败回调是否存在，如果存在，就调用
            this.onRejeectedCallback && this.onRejeectedCallback(value)
        }
    }
    then(onFulfilled, onRejected) {
        // 判断状态
        if(this.status === FULFILLED) {
            // 调用成功的回调函数，并且把值返回
            onFulfilled(this.value)
        } else if(this.status === REJECTED) {
            // 调用成功的回调函数，并且把原因返回
            onRejected(this.reason)
        } else if(this.status = PENDING) {
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功或者失败函数的时候再传递
            // == new ==
            this.onFulfilledCallback.push(onFulfilled)
            this.onRejeectedCallback.push(onFulfilled)
        }
    }
}
\`\`\`

3、循环成功和失败的回调

\`\`\`jsx
const PENDING = 'pending';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';
  class MyPromise {
    constructor(executor) {
        executor(this.resolve, this.reject)
    }
    status=PENDING

    value = null
    reason = null
    // 存储 成功的回调函数
    // == new ==
    //  onFulfilledCallback = null;
    onFulfilledCallback = []
    // 存储 失败的回调函数
    //  onRejeectedCallback = null;
    onRejeectedCallback = []

    resolve = (value) => {
        if(this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            // 判断成功回调是否存在，如果存在，就调用
            // == new ==

            // resolve 里面将所有成功的回调拿出来执行
            // this.onFulfilledCallback && this.onFulfilledCallback(value)
            while(this.onFulfilledCallbacks.length) {
                // Array.shift() 取出数组的第一个元素，然后传入参数调用
                // shift不是纯函数，取出后，数组将失去该元素，直到数组为空
                this.onFulfilledCallback.shift()(value)
            }
        }
    }
    
    reject = (reason) => {
        if(this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
            // 判断失败回调是否存在，如果存在，就调用
            // == new ==
            // reject 里面将所有失败的回调拿出来执行

            // this.onRejeectedCallback && this.onRejeectedCallback(value)
            while(this.onRejeectedCallback.length) {
                // Array.shift() 取出数组的第一个元素，然后传入参数调用
                // shift不是纯函数，取出后，数组将失去该元素，直到数组为空
                this.onRejeectedCallback.shift()(reason)
            }
        }
    }
    then(onFulfilled, onRejected) {
        // 判断状态
        if(this.status === FULFILLED) {
            // 调用成功的回调函数，并且把值返回
            onFulfilled(this.value)
        } else if(this.status === REJECTED) {
            // 调用成功的回调函数，并且把原因返回
            onRejected(this.reason)
        } else if(this.status = PENDING) {
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功或者失败函数的时候再传递
            
            this.onFulfilledCallback.push(onFulfilled)
            this.onRejeectedCallback.push(onFulfilled)
        }
    }
}
\`\`\`

test

\`\`\`jsx
const MyPromise = require('./MyPromise3.js')
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000); 
})

promise.then(value => {
  console.log(1)
  console.log('resolve', value)
})
 
promise.then(value => {
  console.log(2)
  console.log('resolve', value)
})

promise.then(value => {
  console.log(3)
  console.log('resolve', value)
})

// 3
// resolve success
\`\`\`

### 四、实现 then 方法 的链式调用

- then方法要链式调用的话，就需要返回一个Promise对象
- then方法里面 return 一个返回值，作为下一个 then方法的参数，
- 如果 return 一个 Promise对象，就需要判断它的状态

1、创建一个 MyPromise，并在后面 return 出去

\`\`\`jsx
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  constructor(executor) {
      executor(this.resolve, this.reject)
  }
  status=PENDING

  value = null
  reason = null
  // 存储 成功的回调函数
  // == new ==
  //  onFulfilledCallback = null;
  onFulfilledCallback = []
  // 存储 失败的回调函数
  //  onRejeectedCallback = null;
  onRejeectedCallback = []

  resolve = (value) => {
      if(this.status === PENDING) {
          this.status = FULFILLED
          this.value = value
          // 判断成功回调是否存在，如果存在，就调用
          // == new ==

          // resolve 里面将所有成功的回调拿出来执行
          // this.onFulfilledCallback && this.onFulfilledCallback(value)
          while(this.onFulfilledCallbacks.length) {
              // Array.shift() 取出数组的第一个元素，然后传入参数调用
              // shift不是纯函数，取出后，数组将失去该元素，直到数组为空
              this.onFulfilledCallback.shift()(value)
          }
      }
  }
  
  reject = (reason) => {
      if(this.status === PENDING) {
          this.status = REJECTED
          this.reason = reason
          // 判断失败回调是否存在，如果存在，就调用
          // == new ==
          // reject 里面将所有失败的回调拿出来执行

          // this.onRejeectedCallback && this.onRejeectedCallback(value)
          while(this.onRejeectedCallback.length) {
              // Array.shift() 取出数组的第一个元素，然后传入参数调用
              // shift不是纯函数，取出后，数组将失去该元素，直到数组为空
              this.onRejeectedCallback.shift()(reason)
          }
      }
  }
  then(onFulfilled, onRejected) {
    // ==== 新增 ====
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 获取成功回调函数的执行结果
        const x = onFulfilled(this.value);
        // 传入 resolvePromise 集中处理
        resolvePromise(x, resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    }) 
    
    return promise2;
}

function resolvePromise(x, resolve, reject) {
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}
\`\`\`

test

\`\`\`jsx
const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  // 目前这里只处理同步的问题
  resolve('success')
})

function other () {
  return new MyPromise((resolve, reject) =>{
    resolve('other')
  })
}
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return other()
}).then(value => {
  console.log(2)
  console.log('resolve', value)
})

\`\`\`

### **五、then 方法链式调用识别 Promise 是否返回自己**

> 如果 then 方法返回的是自己的 Promise 对象，则会发生循环调用，这个时候程序会报错
> 

\`\`\`jsx
const promise = new Promise((resolve, reject) => {
  resolve(100)
})
const p1 = promise.then(value => {
  console.log(value)
  return p1
})

输出
100
Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
\`\`\`

在MyPromise 中实现

\`\`\`jsx
function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if(x instanceof MyPromise) {
    x.then(resolve, reject)
  } else{
    resolve(x)
  }
}

resolvePromise(promise2, x, resolve, reject);
               ^
ReferenceError: Cannot access 'promise2' before initialization
\`\`\`

为啥会报错呢？

从错误提示可以看出，我们必须要等 promise2 完成初始化。

这个时候我们就要用上宏微任务和事件循环的知识了，

这里就需要创建一个异步函数去等待 promise2 完成初始化，前面我们已经确认了创建微任务的技术方案 --> \`queueMicrotask\`

\`\`\`jsx
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  constructor(executor) {
      executor(this.resolve, this.reject)
  }
  status=PENDING

  value = null
  reason = null
  // 存储 成功的回调函数
  // == new ==
  //  onFulfilledCallback = null;
  onFulfilledCallback = []
  // 存储 失败的回调函数
  //  onRejeectedCallback = null;
  onRejeectedCallback = []

  resolve = (value) => {
      if(this.status === PENDING) {
          this.status = FULFILLED
          this.value = value
          // 判断成功回调是否存在，如果存在，就调用
          // == new ==

          // resolve 里面将所有成功的回调拿出来执行
          // this.onFulfilledCallback && this.onFulfilledCallback(value)
          while(this.onFulfilledCallbacks.length) {
              // Array.shift() 取出数组的第一个元素，然后传入参数调用
              // shift不是纯函数，取出后，数组将失去该元素，直到数组为空
              this.onFulfilledCallback.shift()(value)
          }
      }
  }
  
  reject = (reason) => {
      if(this.status === PENDING) {
          this.status = REJECTED
          this.reason = reason
          // 判断失败回调是否存在，如果存在，就调用
          // == new ==
          // reject 里面将所有失败的回调拿出来执行

          // this.onRejeectedCallback && this.onRejeectedCallback(value)
          while(this.onRejeectedCallback.length) {
              // Array.shift() 取出数组的第一个元素，然后传入参数调用
              // shift不是纯函数，取出后，数组将失去该元素，直到数组为空
              this.onRejeectedCallback.shift()(reason)
          }
      }
  }
  then(onFulfilled, onRejected) {
    // ==== 新增 ====
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // ==== 新增 ====
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        })  
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    }) 
    
    return promise2;
}

function resolvePromise(x, resolve, reject) {
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}
\`\`\`

test

\`\`\`jsx
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
    resolve('success')
})
 
// 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
const p1 = promise.then(value => {
   console.log(1)
   console.log('resolve', value)
   return p1
})
 
// 运行的时候会走reject
p1.then(value => {
  console.log(2)
  console.log('resolve', value)
}, reason => {
  console.log(3)
  console.log(reason.message)
})

结果

1
resolve success
3
Chaining cycle detected for promise #<Promise>
\`\`\`

### **六、捕获错误及 then 链式调用其他状态代码补充**

1、捕获执行器错误

> 捕获执行器中的代码，如果执行器中有代码错误，那么 Promise 的状态要变为失败
> 

\`\`\`jsx
// MyPromise.js

constructor(executor){
  // ==== 新增 ====
  // executor 是一个执行器，进入会立即执行
  // 并传入resolve和reject方法
  try {
    executor(this.resolve, this.reject)
  } catch (error) {
    // 如果有错误，就直接执行 reject
    this.reject(error)
  }
}
\`\`\`

test

\`\`\`jsx
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
    // resolve('success')
    throw new Error('执行器错误')
})
 
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
}, reason => {
  console.log(2)
  console.log(reason.message)
})

2
执行器错误
\`\`\`

2、then 执行的时错误捕获

\`\`\`jsx
// MyPromise.js

then(onFulfilled, onRejected) {
  // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
  const promise2 = new MyPromise((resolve, reject) => {
    // 判断状态
    if (this.status === FULFILLED) {
      // 创建一个微任务等待 promise2 完成初始化
      queueMicrotask(() => {
        // ==== 新增 ====
        try {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        }  
      })  
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    } else if (this.status === PENDING) {
      // 等待
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
    }
  }) 
  
  return promise2;
}
\`\`\`

test

\`\`\`jsx
// test.js

const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
    resolve('success')
    // throw new Error('执行器错误')
 })
 
// 第一个then方法中的错误要在第二个then方法中捕获到
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  throw new Error('then error')
}, reason => {
  console.log(2)
  console.log(reason.message)
}).then(value => {
  console.log(3)
  console.log(value);
}, reason => {
  console.log(4)
  console.log(reason.message)
})

结果
1
resolve success
4
then error
\`\`\`

### **七、参考 fulfilled 状态下的处理方式，对 rejected 和 pending 状态进行改造**

1. 增加异步状态下的链式调用
2. 增加回调函数执行结果的判断
3. 增加识别 Promise 是否返回自己
4. 增加错误捕获

\`\`\`jsx
// MyPromise.js

then(onFulfilled, onRejected) {
  // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
  const promise2 = new MyPromise((resolve, reject) => {
    // 判断状态
    if (this.status === FULFILLED) {
      // 创建一个微任务等待 promise2 完成初始化
      queueMicrotask(() => {
        try {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        } 
      })  
    } else if (this.status === REJECTED) { 
      // ==== 新增 ====
      // 创建一个微任务等待 promise2 完成初始化
      queueMicrotask(() => {
        try {
          // 调用失败回调，并且把原因返回
          const x = onRejected(this.reason);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error)
        } 
      }) 
    } else if (this.status === PENDING) {
      // 等待
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallbacks.push(() => {
        // ==== 新增 ====
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        }) 
      });
      this.onRejectedCallbacks.push(() => {
        // ==== 新增 ====
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        }) 
      });
    }
  }) 
  
  return promise2;
}
\`\`\`

### **八、then 中的参数变为可选**

上面我们处理 then 方法的时候都是默认传入 onFulfilled、onRejected 两个回调函数，

但是实际上原生 Promise 是可以选择参数的单传或者不传，都不会影响执行。

\`\`\`jsx
// MyPromise.js

then(onFulfilled, onRejected) {
  // 如果不传，就使用默认函数
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

  // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
  const promise2 = new MyPromise((resolve, reject) => {
  ......
}
\`\`\`

test

resolve 之后

\`\`\`jsx
const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  resolve('succ')
})
 
promise.then().then().then(value => console.log(value))

// 打印 succ
\`\`\`

reject 之后

\`\`\`jsx
const MyPromise = require('./MyPromise')
const promise = new MyPromise((resolve, reject) => {
  reject('err')
})
 
promise.then().then().then(value => console.log(value), reason => console.log(reason))

// 打印 err
\`\`\`

### **九、实现 resolve 与 reject 的静态调用**

\`\`\`jsx
// MyPromise.js

MyPromise {
  ......
  // resolve 静态方法
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}
\`\`\`

- 总结
    
    \`\`\`jsx
    // MyPromise.js
    
    // 先定义三个常量表示状态
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';
    
    // 新建 MyPromise 类
    class MyPromise {
      constructor(executor){
        // executor 是一个执行器，进入会立即执行
        // 并传入resolve和reject方法
        try {
          executor(this.resolve, this.reject)
        } catch (error) {
          this.reject(error)
        }
      }
    
      // 储存状态的变量，初始值是 pending
      status = PENDING;
      // 成功之后的值
      value = null;
      // 失败之后的原因
      reason = null;
    
      // 存储成功回调函数
      onFulfilledCallbacks = [];
      // 存储失败回调函数
      onRejectedCallbacks = [];
    
      // 更改成功后的状态
      resolve = (value) => {
        // 只有状态是等待，才执行状态修改
        if (this.status === PENDING) {
          // 状态修改为成功
          this.status = FULFILLED;
          // 保存成功之后的值
          this.value = value;
          // resolve里面将所有成功的回调拿出来执行
          while (this.onFulfilledCallbacks.length) {
            // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
            this.onFulfilledCallbacks.shift()(value)
          }
        }
      }
    
      // 更改失败后的状态
      reject = (reason) => {
        // 只有状态是等待，才执行状态修改
        if (this.status === PENDING) {
          // 状态成功为失败
          this.status = REJECTED;
          // 保存失败后的原因
          this.reason = reason;
          // resolve里面将所有失败的回调拿出来执行
          while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(reason)
          }
        }
      }
    
      then(onFulfilled, onRejected) {
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
    
        // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
        const promise2 = new MyPromise((resolve, reject) => {
          const fulfilledMicrotask = () =>  {
            // 创建一个微任务等待 promise2 完成初始化
            queueMicrotask(() => {
              try {
                // 获取成功回调函数的执行结果
                const x = realOnFulfilled(this.value);
                // 传入 resolvePromise 集中处理
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error)
              } 
            })  
          }
    
          const rejectedMicrotask = () => { 
            // 创建一个微任务等待 promise2 完成初始化
            queueMicrotask(() => {
              try {
                // 调用失败回调，并且把原因返回
                const x = realOnRejected(this.reason);
                // 传入 resolvePromise 集中处理
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error)
              } 
            }) 
          }
          // 判断状态
          if (this.status === FULFILLED) {
            fulfilledMicrotask() 
          } else if (this.status === REJECTED) { 
            rejectedMicrotask()
          } else if (this.status === PENDING) {
            // 等待
            // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
            // 等到执行成功失败函数的时候再传递
            this.onFulfilledCallbacks.push(fulfilledMicrotask);
            this.onRejectedCallbacks.push(rejectedMicrotask);
          }
        }) 
        
        return promise2;
      }
    
      // resolve 静态方法
      static resolve (parameter) {
        // 如果传入 MyPromise 就直接返回
        if (parameter instanceof MyPromise) {
          return parameter;
        }
    
        // 转成常规方式
        return new MyPromise(resolve =>  {
          resolve(parameter);
        });
      }
    
      // reject 静态方法
      static reject (reason) {
        return new MyPromise((resolve, reject) => {
          reject(reason);
        });
      }
    }
    
    function resolvePromise(promise2, x, resolve, reject) {
      // 如果相等了，说明return的是自己，抛出类型错误并返回
      if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
      }
      // 判断x是不是 MyPromise 实例对象
      if(x instanceof MyPromise) {
        // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
        // x.then(value => resolve(value), reason => reject(reason))
        // 简化之后
        x.then(resolve, reject)
      } else{
        // 普通值
        resolve(x)
      }
    }
    
    module.exports = MyPromise;
    \`\`\`

## 参考


> [从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节 - 掘金](https://juejin.cn/post/6945319439772434469)
> 
> [【前端】深入promise原理-蒋神带你手写promise_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1V3411Y7d9?p=17&spm_id_from=pageDriver)
`;const cn={class:"md-box",id:"mdBox"},un={class:"right-menu"},hn={class:"md-menu-tree-box"},fn={__name:"index",setup(n){const e=D(""),s=D([]),o=D();function t(l){let i=document.createElement("a");i.download="test.md",i.style.display="none";let h=l,y=new Blob([h],{type:"text/markdown"});i.href=URL.createObjectURL(y),document.body.appendChild(i),i.click(),document.body.removeChild(i)}async function r(){const l=o.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6"),i=Array.from(l).filter(h=>!!h.innerText.trim());if(!i.length){s.value=[];return}await Z(),s.value=a(i)}function d(l){console.log(l);const{lineIndex:i}=l,h=o.value.$el.querySelector(`[data-v-md-line="${i}"]`);console.log(o.value),h&&o.value.scrollToTarget({target:h,scrollContainer:document.getElementById("mdBox"),top:60})}function a(l){let i=p(l);return m(i,0)}function p(l){let i=[],h=[];return l.forEach(y=>{let g=y.getAttribute("data-v-md-line"),C=y.tagName.slice(1),P={title:y.innerText,lineIndex:g,level:C};i.length>0?(i[i.length-1].level>=C&&(i=i.filter(x=>x.level<C)),P.pid=i[i.length-1]?i[i.length-1].id:0):P.pid=0,i.push({id:g,level:C}),h.push(P)}),h}function m(l,i){return l.reduce((h,y)=>y.pid===i?(y.children=m(l,y.lineIndex),h.concat(y)):h,[])}async function v(){e.value=dn,await Z(),await r()}function u(l){let i=document.getElementById("mdBox").clientHeight-80,h=document.querySelector(".md-menu-tree-box");h.style.maxHeight=`${i}px`}return ye(()=>{u(),window.addEventListener("resize",u),v()}),Te(()=>{window.removeEventListener("resize",u)}),(l,i)=>{const h=w("v-md-preview"),y=Oe,g=an;return j(),K("div",null,[B("div",cn,[$(h,{text:e.value,ref_key:"previewBox",ref:o,class:"preview-content"},null,8,["text"]),B("div",un,[$(y,{class:"flex flex-items-center flex-justify-right",type:"primary",onClick:i[0]||(i[0]=C=>t(e.value))},{default:W(()=>[Se("导出文件")]),_:1}),B("div",hn,[s.value.length>0?(j(),M(g,{key:0,data:s.value,"node-key":"lineIndex",props:{children:"children",label:"title"},"default-expanded-keys":["1"],onNodeClick:d,"expand-on-click-node":!1},null,8,["data"])):U("",!0)])])])])}}},Cn=Ke(fn,[["__scopeId","data-v-b997a9db"]]);export{Cn as default};
