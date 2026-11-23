export function compareObjects(obj1, obj2, differences1, differences2) {
  for (const key in obj1) {
    if (obj1[key] && typeof obj1[key] === 'object') {
      if (typeof obj2[key] === 'object') {
        compareObjects(obj1[key], obj2[key], differences1, differences2);
      } else {
        if (obj1[key] === obj2[key]) {
          delete differences1[key];
          delete differences2[key];
        }
      }
    } else {
      if (obj1[key] === obj2[key]) {
        delete differences1[key];
        delete differences2[key];
      }
    }
  }
}

export function compareProperty(prop, obj1, obj2, differences1, differences2) {
  if (JSON.stringify(obj1[prop]) === JSON.stringify(obj2[prop])) {
    delete differences1[prop];
    delete differences2[prop];
  }
}
