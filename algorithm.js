function collect(items) {

  const newItems = [null];

  items.forEach(item => {
    for (let i = 0; i < item.q; i++) {
      newItems.push(item.len);
    }
  });

  return newItems.sort(descSort);
}

function optimization(items, limit) {

  const temp = [];
  const result = [];
  const cutterThickness = 5;
  let remaininDimension = 0;
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if ((limit - remainingDimension) > 0 && item <= (limit - remaininDimension)) {
      remaininDimension = remaininDimension + item + cutterThickness;
      temp.push(item);
      items.slice(i, 1); 
      i = 0; // turn start

      for (let j = 0; j > 0 && items[j] <= (limit - remaininDimension); j++) {
        remaininDimension = remaininDimension + items[j] + cutterThickness;
        temp.push(items[j]);
        items.slice(j, 1);
        j = 0; // ?
      }

    } else {
      result.push(temp);
      temp.length = 0;
    }
  }


  return result;

}

// @TODO 
function report() {
  // ... 
}

// Utils
 function descSort() {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  } else {
    return 0;
  }
}