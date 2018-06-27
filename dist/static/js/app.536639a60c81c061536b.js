webpackJsonp([1],[,,,,,,,,function(t,e,n){"use strict";var a=n(24),s=n(30);e.a={name:"App",data:function(){return{collName:"",taskName:"",tip:'Start by entering some text and pressing <span class="border">Enter</span>',updateTip:!1}},components:{tasks:a.a,collections:s.a},computed:{collections:function(){return this.$store.state.collections},activeCollection:function(){return this.$store.state.activeCollection},activeCollData:function(){return this.$store.getters.activeCollection}},created:function(){var t=this,e=["Create collections to organize your tasks","All the tasks are saved for future","Stay focused and work towards your goal","Remove your old tasks using the trash icon","By completing a task you are one step ahead towards your goal",'Start by entering some text and pressing <span class="border">Enter</span>'];if(localStorage.getItem("app.akash.focus")){var n=JSON.parse(localStorage.getItem("app.akash.focus"));n.todo&&(localStorage.setItem("app.akash.focus",""),n=[]),this.$store.commit("setStorage",n)}window.addEventListener("popstate",function(e){t.$store.commit("loadCollection",e.state?e.state.id:e.state)}),setInterval(function(){if(!t.collections.length){var n=e.indexOf(t.tip);t.tip=e[n==e.length-1?0:n+1],t.updateTip=!t.updateTip}},7e3)},methods:{createTask:function(){this.taskName&&(this.$store.commit("addTask",this.taskName),this.taskName="")},createCollection:function(){this.collName&&(this.$store.commit("addCollection",this.collName),this.collName="")}}}},function(t,e,n){"use strict";var a=n(26);e.a={name:"TasksList",components:{task:a.a},computed:{todo:function(){return this.$store.getters.tasks()},completed:function(){return this.$store.getters.tasks(!0)}}}},function(t,e,n){"use strict";e.a={name:"Task",props:{task:Object},methods:{removeTask:function(){this.$store.commit("removeTask",this.task.id)},toggleTask:function(){this.$store.commit("toggleTask",this.task.id)}}}},function(t,e,n){"use strict";var a=n(32);e.a={name:"Collections",components:{acrylic:a.a},computed:{collections:function(){return this.$store.state.collections}},methods:{openCollection:function(t){window.history.pushState({id:t},null,"./collection="+t),this.$store.commit("loadCollection",t)},getMeter:function(t){var e=t.filter(function(t){return t.completed}).length;if(0!==t.length)return e/t.length*100}}}},function(t,e,n){"use strict";e.a={name:"Acrylic",props:["icon","title","subtitle","color","meter"]}},,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(7),s=n(21),o=n(37);a.a.config.productionTip=!1,new a.a({el:"#app",store:o.a,template:"<App/>",components:{App:s.a}})},,,,function(t,e,n){"use strict";function a(t){n(22)}var s=n(8),o=n(36),i=n(0),c=a,l=i(s.a,o.a,!1,c,null,null);e.a=l.exports},function(t,e){},,function(t,e,n){"use strict";function a(t){n(25)}var s=n(9),o=n(29),i=n(0),c=a,l=i(s.a,o.a,!1,c,"data-v-5e2353ce",null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";function a(t){n(27)}var s=n(10),o=n(28),i=n(0),c=a,l=i(s.a,o.a,!1,c,"data-v-52e0c10f",null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"item",class:{completed:t.task.completed}},[n("button",{staticClass:"primary",on:{click:t.toggleTask}},[t.task.completed?n("ion-icon",{attrs:{name:"ios-checkmark"}}):t._e()],1),t._v(" "),n("span",{staticClass:"name"},[t._v(t._s(t.task.title))]),t._v(" "),n("div",{staticClass:"buttons"},[n("button",{staticClass:"danger",on:{click:t.removeTask}},[n("ion-icon",{attrs:{name:"trash"}})],1)])])},s=[],o={render:a,staticRenderFns:s};e.a=o},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tasks"},[n("div",{staticClass:"wrapper"},[t.todo.length?n("ul",{staticClass:"acrylic"},t._l(t.todo,function(t){return n("task",{key:t.id,attrs:{task:t}})})):n("span",[t._v("\n      Nothing left todo!\n    ")])]),t._v(" "),t.completed.length?n("ul",{staticClass:"acrylic"},t._l(t.completed,function(t){return n("task",{key:t.id,attrs:{task:t}})})):n("span",[t._v("\n    You haven't completed anything!\n  ")])])},s=[],o={render:a,staticRenderFns:s};e.a=o},function(t,e,n){"use strict";function a(t){n(31)}var s=n(11),o=n(35),i=n(0),c=a,l=i(s.a,o.a,!1,c,"data-v-a8151340",null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";function a(t){n(33)}var s=n(12),o=n(34),i=n(0),c=a,l=i(s.a,o.a,!1,c,null,null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"acrylic card"},[t.meter?n("span",{staticClass:"meter",style:{width:t.meter+"%"}}):t._e(),t._v(" "),t.icon?n("i",{class:"icon "+t.icon,style:{color:t.color}}):t._e(),t._v(" "),n("div",{staticClass:"info"},[n("div",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),n("div",{staticClass:"subtitle"},[t._v(t._s(t.subtitle))])])])},s=[],o={render:a,staticRenderFns:s};e.a=o},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"collections"},t._l(t.collections,function(e,a){return n("acrylic",{key:a,attrs:{title:e.title,subtitle:e.tasks.length+" tasks",meter:t.getMeter(e.tasks)},nativeOn:{click:function(e){t.openCollection(a)}}})}))},s=[],o={render:a,staticRenderFns:s};e.a=o},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("h1",{staticClass:"title"},[t._v("Focus")]),t._v(" "),t._m(0),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"acrylic input-wrapper"},[null!==t.activeCollection?n("input",{directives:[{name:"model",rawName:"v-model",value:t.taskName,expression:"taskName"}],attrs:{type:"text",maxlength:"45",placeholder:"Enter a task in "+t.activeCollData.title.toLowerCase()},domProps:{value:t.taskName},on:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.createTask(e)},input:function(e){e.target.composing||(t.taskName=e.target.value)}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:t.collName,expression:"collName"}],attrs:{type:"text",maxlength:"20",placeholder:"Enter a collection name"},domProps:{value:t.collName},on:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.createCollection(e)},input:function(e){e.target.composing||(t.collName=e.target.value)}}})]),t._v(" "),n("br"),t._v(" "),null!==t.activeCollection?n("div",[n("tasks")],1):null===t.activeCollection?n("collections"):t._e(),t._v(" "),t.collections.length?t._e():n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("span",{key:t.updateTip,staticClass:"help",domProps:{innerHTML:t._s(t.tip)}})])],1)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h4",{staticClass:"subtitle"},[t._v("Developed by "),n("a",{attrs:{href:"https://github.com/blenderskool",target:"_blank"}},[t._v("Akash Hamirwasia")])])}],o={render:a,staticRenderFns:s};e.a=o},function(t,e,n){"use strict";function a(t,e){return t.collections[t.activeCollection].tasks.filter(function(t){return t.id===e})}function s(t){localStorage.setItem("app.akash.focus",l()(t))}var o=n(38),i=n.n(o),c=n(67),l=n.n(c),r=n(7),u=n(69);r.a.use(u.a),e.a=new u.a.Store({state:{collections:[],activeCollection:null},getters:{activeCollection:function(t){var e=i()({},t.collections[t.activeCollection]);return e.tasks=void 0,e},tasks:function(t){return function(e){return t.collections[t.activeCollection].tasks.filter(function(t){return e?t.completed:!t.completed})}}},mutations:{setStorage:function(t,e){t.collections=e},loadCollection:function(t,e){t.activeCollection=e},addCollection:function(t,e){t.collections.push({title:e,tasks:[]}),s(t.collections)},addTask:function(t,e){t.collections[t.activeCollection].tasks.unshift({title:e,completed:!1,id:Math.random().toString(36).substring(7)}),s(t.collections)},toggleTask:function(t,e){var n=a(t,e);n.length&&(n[0].completed=!n[0].completed,s(t.collections))},removeTask:function(t,e){var n=t.collections[t.activeCollection].tasks,o=a(t,e);o.length&&(n.splice(n.indexOf(o[0]),1),s(t.collections))}}})}],[17]);
//# sourceMappingURL=app.536639a60c81c061536b.js.map