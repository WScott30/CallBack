const identity = function (value) {
return value;
};

const first = function (array, n) {
  if (n === undefined){
    return array[0];
  }else{
    return array.slice(0, n);
  }
};
  
const last = function (array,n) {
  if (n === undefined) {
    return array[array.length - 1];
  }else{
    return array.slice(Math.max(array.length - n,0));
  }
};

const each = function (collection, iterator) {
  if(Array.isArray(collection)){
    for(let i= 0; i < collection.length; i++){
      iterator(collection[i], i, collection);
    }
  }else if (typeof collection === 'object' && collection !== null) {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        iterator(collection[key], key, collection);
      }
    }
  }
};

const indexOf = function (array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
  
};

const map = function (collection, iterator) {
const result = [];
each(collection, function(item, index, collection){
  result.push(iterator(item,index,collection));
});
return result;
};

const filter = (collection, test) => {
const result = [];
each(collection, (item, index, collection) => {
  if(test(item, index, collection)) {
    result.push(item);
  }
});
return result;
};

const reject = (collection, test)=>{
const result = [];
each(collection, (item, index, collection) => {
  if (!test(item, index, collection)) {
    result.push(item);
}
}); 
return result;
};

const uniq = (array) =>{
  const result = []
  const seen = {}
  each(array,(item) => {
    if (!seen.hasOwnProperty(item)){
      seen[item] = true
      result.push(item)
    }
  });
  return result;
}

const reduce = (collection, iterator, initialValue) => {
  let accumulator = initialValue;
  let startIndex = 0;

  if (initialValue === undefined) {
    if (Array.isArray(collection) && collection.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    if (Array.isArray(collection)) {
      accumulator = collection[0];
      startIndex = 1;
    } else {
      const keys = Object.keys(collection);
      if (keys.length === 0) {
        throw new TypeError('Reduce of empty object with no initial value');
      }
      accumulator = collection[keys[0]];
      startIndex = 1;
    }
  }

  if (Array.isArray(collection)) {
    for (let i = startIndex; i < collection.length; i++) {
      accumulator = iterator(accumulator, collection[i], i, collection);
    }
  } else {
    const keys = Object.keys(collection);
    for (let i = startIndex; i < keys.length; i++) {
      const key = keys[i];
      accumulator = iterator(accumulator, collection[key], key, collection);
    }
  }

  return accumulator;
};

module.exports = {
  identity,
  first,
  last,
  each,
  indexOf,
  map,
  filter, 
  reject, 
  uniq, 
  reduce
};