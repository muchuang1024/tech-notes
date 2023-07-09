# 二.Vue3 快速上手

## 安装

```
npm init vue@latest
```

## vue3 与 vue2 的区别

Vue 2（选项 API）示例：

```
<template>
  <div>
    <button @click="increment">{{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>
```

Vue 3（组合式 API）示例：

```
<template>
  <div>
    <button @click="increment">{{ count }}</button>
  </div>
</template>


<script>
import { ref } from 'vue';


export default {
  setup() {
    const count = ref(0);

    function increment() {
      count.value++;
    }

    return {
      count,
      increment,
    };

  },
};
</script>
```

在 Vue 2 的示例中，使用了选项 API 来定义组件的数据和方法。在`data`选项中定义了`count`属性，并在`methods`选项中定义了`increment`方法。

而在 Vue 3 的示例中，使用了组合式 API。通过`import { ref } from 'vue'`引入了`ref`函数，然后在`setup`函数中使用`ref(0)`创建了一个响应式的`count`变量，并定义了`increment`方法来增加`count`的值。

### Composition API

根据函数的作用，以下是 Vue 3 Composition API 中常用函数的分类：

1. 响应式相关函数：

   - `ref`：创建一个响应式数据。
   - `reactive`：创建一个响应式对象。
   - `toRefs`：将响应式对象转换为响应式引用。
   - `computed`：创建一个计算属性。
   - `watch`：监听响应式数据的变化。
   - `watchEffect`：监听响应式数据的变化并执行副作用代码。
   - `watchPostEffect`：在 DOM 更新之后执行副作用代码。
   - `shallowRef`：创建一个浅层响应式数据。

2. 生命周期相关函数：

   - `onBeforeMount`：在组件挂载之前调用。
   - `onMounted`：在组件挂载后调用。
   - `onBeforeUpdate`：在组件更新之前调用。
   - `onUpdated`：在组件更新后调用。
   - `onBeforeUnmount`：在组件卸载之前调用。
   - `onUnmounted`：在组件卸载后调用。
   - `onRenderTriggered`：在渲染时追踪的副作用函数触发更新时调用。
   - `onRenderTracked`：在渲染时追踪的副作用函数被触发时调用。
   - `onActivated`：在使用 `<keep-alive>` 组件缓存的组件被激活时调用。
   - `onDeactivated`：在使用 `<keep-alive>` 组件缓存的组件被停用时调用。
   - `onErrorCaptured`：捕获组件内部的错误。

3. 副作用函数：

   - `watchEffect`：监听响应式数据的变化并执行副作用代码。
   - `watchPostEffect`：在 DOM 更新之后执行副作用代码。
   - `onRenderTriggered`：在渲染时追踪的副作用函数触发更新时调用。
   - `onRenderTracked`：在渲染时追踪的副作用函数被触发时调用。

4. DOM 相关函数：
   - `ref`：创建一个响应式数据。
   - `toRefs`：将响应式对象转换为响应式引用。
   - `onBeforeMount`：在组件挂载之前调用。
   - `onMounted`：在组件挂载后调用。
   - `onBeforeUpdate`：在组件更新之前调用。
   - `onUpdated`：在组件更新后调用。
   - `onBeforeUnmount`：在组件卸载之前调用。
   - `onUnmounted`：在组件卸载后调用。

这只是列举了一些常用的 Vue 3 Composition API 函数，还有其他函数可供使用，具体使用哪些函数取决于组件的需求和逻辑。

### 路由函数

在 Vue.js 中，`useRoute` 和 `useRouter` 是 Vue Router 提供的两个函数。

1. `useRoute`：`useRoute` 是一个 Vue Router 的函数，它返回当前路由的路由信息对象。你可以通过调用 `useRoute` 来获取当前页面的路由信息，包括路径参数、查询参数、哈希值等。通过 `useRoute`，你可以在组件中方便地访问和操作当前的路由信息。

   示例代码：

   ```vue
   <script>
   import { useRoute } from 'vue-router'

   export default {
     setup() {
       const route = useRoute()
       console.log(route.path) // 当前路由路径
       console.log(route.params) // 路径参数
       console.log(route.query) // 查询参数
       console.log(route.hash) // 哈希值

       return {
         route
       }
     }
   }
   </script>
   ```

2. `useRouter`：`useRouter` 是另一个 Vue Router 的函数，它返回一个路由实例，通过该实例可以进行路由导航、参数传递等操作。通过调用 `useRouter`，你可以在组件中获取到 Vue Router 的实例，以便使用其提供的方法进行页面导航。

   示例代码：

   ```vue
   <script>
   import { useRouter } from 'vue-router'

   export default {
     setup() {
       const router = useRouter()

       const goToHome = () => {
         router.push('/home') // 导航到'/home'路径
       }

       return {
         router,
         goToHome
       }
     }
   }
   </script>
   ```

通过使用 `useRoute` 和 `useRouter`，你可以方便地获取当前路由信息并进行页面导航，实现更灵活和强大的路由功能。
