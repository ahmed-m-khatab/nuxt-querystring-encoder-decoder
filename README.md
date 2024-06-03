# Vue Query Utils

[![npm version](https://badge.fury.io/js/vue-query-utils.svg)](https://badge.fury.io/js/vue-query-utils)

A utility for converting objects to query strings and vice versa, specifically designed for Vue.js and Nuxt.js projects.

## Features

- Convert any JavaScript object to a URL query string.
- Parse URL query strings back into JavaScript objects.
- Easy integration with Vue.js and Nuxt.js.
- Handles nested objects and arrays.

## Installation

Install the package using npm or yarn:

```bash
npm install vue-query-utils
```

## Usage

### In a Vue.js 3 Project

1. **Create a Plugin**

  Create a file named `vue-query-utils.js` in the `sr`c directory of your Vue project.

  src/vue-query-utils.js

   ```javascript
    import { convertToQueryString, parseQueryString } from 'vue-query-utils';

    export default {
      install(app) {
        app.config.globalProperties.$convertToQueryString = convertToQueryString;
        app.config.globalProperties.$parseQueryString = parseQueryString;
      }
    };
   ```

2. **Register the Plugin**

  Register the plugin in your main application file, usually main.js or main.ts.

  src/main.js

  ```javascript
    import { createApp } from 'vue';
    import App from './App.vue';
    import vueQueryUtils from './vue-query-utils';

    const app = createApp(App);

    app.use(vueQueryUtils);

    app.mount('#app');
  ```

3. **Use in Components**

  ```vue
    <template>
      <div>
        <p>Query String: {{ queryString }}</p>
        <p>Parsed Object: {{ parsedObject }}</p>
      </div>
    </template>

    <script>
    export default {
      data() {
        return {
          params: {
            cityName: 'mecca',
            checkIn: '2024-10-05',
            checkOut: '2024-10-10',
            stayDays: 8,
            occupancy: [
              {
                adults: 1,
                children: 1,
                ages: [5]
              }
            ]
          },
          queryString: '',
          parsedObject: {}
        };
      },
      mounted() {
        // Convert to query string
        this.queryString = this.$convertToQueryString(this.params);
        
        // Parse back to object
        this.parsedObject = this.$parseQueryString(this.queryString);
      }
    };
    </script>
  ```

### In a Nuxt.js 3 Project

1. **Create a Plugin**

   Create a file named `vue-query-utils.js` in the `plugins` directory of your Nuxt.js project.

   ```javascript
   // plugins/vue-query-utils.js
    import { defineNuxtPlugin } from '#app';
    import { convertToQueryString, parseQueryString } from 'vue-query-utils';

    export default defineNuxtPlugin((nuxtApp) => {
        nuxtApp.provide('convertToQueryString', convertToQueryString);
        nuxtApp.provide('parseQueryString', parseQueryString);
    });
   ```

2. **Register the Plugin**

   In Nuxt 3, plugins are automatically registered if they are placed in the plugins directory with the correct naming conventions.
   Ensure that your plugin file name ends with .js or .ts.

3. **Use in Components**

   Now you can use the `$convertToQueryString` and `$parseQueryString` methods in your Vue components.

   ```vue
   <template>
     <div>
       <p>Query String: {{ queryString }}</p>
       <p>Parsed Object: {{ parsedObject }}</p>
     </div>
   </template>

   <script setup>
        import { ref, onMounted } from 'vue';
        import { useNuxtApp } from '#app';

        const params = ref({
            hotel: 'hotel-name',
            checkIn: '2024-10-05',
            checkOut: '2024-10-10',
            stayDays: 5,
            occupancy: [
                {
                    adults: 1,
                    children: 1,
                    ages: [5]
                }
            ]
        });

        const queryString = ref('');
        const parsedObject = ref({});

        const { $convertToQueryString, $parseQueryString } = useNuxtApp();

        onMounted(() => {
            // Convert to query string
            queryString.value = $convertToQueryString(params.value);
            
            // Parse back to object
            parsedObject.value = $parseQueryString(queryString.value);
        });
    </script>
   ```

### In a Nuxt.js 2 Project

1. **Create a Plugin**

   Create a file named `vue-query-utils.js` in the `plugins` directory of your Nuxt.js project.

   ```javascript
   // plugins/vue-query-utils.js
   import Vue from 'vue';
   import { convertToQueryString, parseQueryString } from 'vue-query-utils';

   Vue.prototype.$convertToQueryString = convertToQueryString;
   Vue.prototype.$parseQueryString = parseQueryString;
   ```

2. **Register the Plugin**

   Add the plugin to your `nuxt.config.js` file.

   ```javascript
   // nuxt.config.js
   export default {
     // Other configurations...
     plugins: [
       '~/plugins/vue-query-utils.js'
     ]
   };
   ```

3. **Use in Components**

   Now you can use the `$convertToQueryString` and `$parseQueryString` methods in your Vue components.

   ```vue
   <template>
     <div>
       <p>Query String: {{ queryString }}</p>
       <p>Parsed Object: {{ parsedObject }}</p>
     </div>
   </template>

   <script>
   export default {
     data() {
       return {
         params: {
           hotel: "hotel-name",
           checkIn: "2024-10-05",
           checkOut: "2024-10-10",
           stayDays: 5,
           occupancy: [
             {
               adults: 1,
               children: 1,
               ages: [5]
             }
           ]
         },
         queryString: '',
         parsedObject: {}
       };
     },
     mounted() {
       // Convert to query string
       this.queryString = this.$convertToQueryString(this.params);
       
       // Parse back to object
       this.parsedObject = this.$parseQueryString(this.queryString);
     }
   };
   </script>
   ```

## API

### `convertToQueryString(params, prefix = '')`

Converts a JavaScript object to a URL query string.

- **params** (Object): The object to be converted.
- **prefix** (String): An optional prefix for nested objects.

**Returns**: A URL query string.

### `parseQueryString(queryString)`

Parses a URL query string into a JavaScript object.

- **queryString** (String): The URL query string to be parsed.

**Returns**: A JavaScript object.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
