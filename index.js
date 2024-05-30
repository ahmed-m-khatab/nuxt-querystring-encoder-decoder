function convertToQueryString(params, prefix = '') {
    const query = new URLSearchParams();
  
    const addQuery = (key, value) => {
      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          addQuery(`${key}[${i}]`, v);
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.keys(value).forEach(subKey => {
          addQuery(`${key}[${subKey}]`, value[subKey]);
        });
      } else {
        query.append(key, value);
      }
    };
  
    Object.keys(params).forEach(key => {
      addQuery(prefix ? `${prefix}[${key}]` : key, params[key]);
    });
  
    return query.toString();
  }
  
  function parseQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const result = {};
  
    for (const [key, value] of params.entries()) {
      const keys = key.match(/[^\[\]]+/g);
      keys.reduce((acc, k, i) => {
        if (i === keys.length - 1) {
          acc[k] = isNaN(value) ? value : Number(value);
        } else {
          acc[k] = acc[k] || (isNaN(keys[i + 1]) ? {} : []);
        }
        return acc[k];
      }, result);
    }
  
    return result;
}
  
export default ({ app }, inject) => {
    inject('convertToQueryString', convertToQueryString);
    inject('parseQueryString', parseQueryString);
};
  
export { convertToQueryString, parseQueryString };
